import { useState, useMemo, useCallback } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  X,
  Rows3,
  Calculator,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * 字段定义
 */
interface PivotField {
  id: string
  label: string
  type: "string" | "number" | "date"
}

/**
 * 聚合配置
 */
interface AggregationConfig {
  fieldId: string
  type: "sum" | "count" | "avg" | "min" | "max"
}

/**
 * 透视表属性
 */
interface PivotTableProps<TData> {
  data: TData[]
  fields: PivotField[]
  defaultRowFields?: string[]
  defaultValueFields?: AggregationConfig[]
}

/**
 * 可拖拽字段标签
 */
function DraggableField({
  field,
  isInZone = false,
  onRemove,
  aggregationType,
  onAggregationChange,
}: {
  field: PivotField
  isInZone?: boolean
  onRemove?: () => void
  aggregationType?: string
  onAggregationChange?: (type: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: field.id,
    data: { field, isInZone },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm cursor-grab active:cursor-grabbing transition-colors ${
        isInZone
          ? "bg-teal-100 text-teal-800 border border-teal-200"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-3.5 w-3.5 text-slate-400" />
      <span className="font-medium">{field.label}</span>
      {aggregationType && onAggregationChange && (
        <select
          value={aggregationType}
          onChange={(e) => {
            e.stopPropagation()
            onAggregationChange(e.target.value)
          }}
          onClick={(e) => e.stopPropagation()}
          className="ml-1 text-xs bg-white border border-teal-300 rounded px-1 py-0.5"
        >
          {field.type === "number" ? (
            <>
              <option value="sum">求和</option>
              <option value="count">计数</option>
              <option value="avg">平均</option>
              <option value="min">最小</option>
              <option value="max">最大</option>
            </>
          ) : (
            <>
              <option value="count">计数</option>
              <option value="countDistinct">去重计数</option>
            </>
          )}
        </select>
      )}
      {isInZone && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 p-0.5 rounded hover:bg-teal-200"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}


/**
 * 放置区域组件
 */
function DropZone({
  id,
  title,
  icon: Icon,
  fields,
  allFields,
  onRemove,
  aggregations,
  onAggregationChange,
}: {
  id: string
  title: string
  icon: React.ElementType
  fields: string[]
  allFields: PivotField[]
  onRemove: (fieldId: string) => void
  aggregations?: Record<string, string>
  onAggregationChange?: (fieldId: string, type: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-[80px] rounded-lg border-2 border-dashed p-3 transition-colors ${
        isOver ? "border-teal-400 bg-teal-50" : "border-slate-200 bg-slate-50/50"
      }`}
    >
      <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500 uppercase">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {fields.length === 0 ? (
          <span className="text-xs text-slate-400">拖拽字段到此处</span>
        ) : (
          fields.map((fieldId) => {
            const field = allFields.find((f) => f.id === fieldId)
            if (!field) return null
            return (
              <DraggableField
                key={fieldId}
                field={field}
                isInZone
                onRemove={() => onRemove(fieldId)}
                aggregationType={aggregations?.[fieldId]}
                onAggregationChange={
                  onAggregationChange
                    ? (type) => onAggregationChange(fieldId, type)
                    : undefined
                }
              />
            )
          })
        )}
      </div>
    </div>
  )
}

/**
 * 透视表数据行
 */
interface PivotRow {
  key: string
  label: string
  values: Record<string, number>
  children?: PivotRow[]
  depth: number
  isExpanded?: boolean
}


/**
 * 透视表组件
 * 支持拖拽字段进行分组和聚合计算
 */
export function PivotTable<TData extends object>({
  data,
  fields,
  defaultRowFields = [],
  defaultValueFields = [],
}: PivotTableProps<TData>) {
  // 行分组字段
  const [rowFields, setRowFields] = useState<string[]>(defaultRowFields)
  // 值聚合字段
  const [valueFields, setValueFields] = useState<AggregationConfig[]>(defaultValueFields)
  // 展开状态
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  // 当前拖拽的字段
  const [activeField, setActiveField] = useState<PivotField | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  /**
   * 计算聚合值
   */
  const calculateAggregation = useCallback(
    (items: TData[], fieldId: string, type: string): number => {
      // 计数操作适用于所有类型
      if (type === "count") {
        return items.filter((item) => (item as Record<string, unknown>)[fieldId] != null).length
      }

      // 去重计数
      if (type === "countDistinct") {
        const uniqueValues = new Set(
          items.map((item) => (item as Record<string, unknown>)[fieldId]).filter((v) => v != null)
        )
        return uniqueValues.size
      }

      // 其他聚合操作只适用于数字类型
      const values = items
        .map((item) => (item as Record<string, unknown>)[fieldId])
        .filter((v) => typeof v === "number") as number[]

      if (values.length === 0) return 0

      switch (type) {
        case "sum":
          return values.reduce((a, b) => a + b, 0)
        case "avg":
          return values.reduce((a, b) => a + b, 0) / values.length
        case "min":
          return Math.min(...values)
        case "max":
          return Math.max(...values)
        default:
          return 0
      }
    },
    []
  )

  /**
   * 构建透视表数据
   */
  const pivotData = useMemo(() => {
    if (rowFields.length === 0) {
      // 没有分组字段，显示总计
      const values: Record<string, number> = {}
      valueFields.forEach((vf) => {
        values[vf.fieldId] = calculateAggregation(data, vf.fieldId, vf.type)
      })
      return [{ key: "total", label: "总计", values, depth: 0 }] as PivotRow[]
    }

    /**
     * 递归分组数据
     */
    const groupData = (
      items: TData[],
      groupFields: string[],
      depth: number,
      parentKey: string
    ): PivotRow[] => {
      if (groupFields.length === 0) return []

      const [currentField, ...remainingFields] = groupFields
      const groups = new Map<string, TData[]>()

      // 按当前字段分组
      items.forEach((item) => {
        const key = String((item as Record<string, unknown>)[currentField] ?? "未知")
        if (!groups.has(key)) {
          groups.set(key, [])
        }
        groups.get(key)!.push(item)
      })

      // 构建行数据
      const rows: PivotRow[] = []
      groups.forEach((groupItems, groupKey) => {
        const rowKey = parentKey ? `${parentKey}|${groupKey}` : groupKey
        const values: Record<string, number> = {}

        valueFields.forEach((vf) => {
          values[vf.fieldId] = calculateAggregation(groupItems, vf.fieldId, vf.type)
        })

        const children =
          remainingFields.length > 0
            ? groupData(groupItems, remainingFields, depth + 1, rowKey)
            : undefined

        rows.push({
          key: rowKey,
          label: groupKey,
          values,
          children,
          depth,
          isExpanded: expandedRows.has(rowKey),
        })
      })

      return rows.sort((a, b) => a.label.localeCompare(b.label))
    }

    const rows = groupData(data, rowFields, 0, "")

    // 添加总计行
    const totalValues: Record<string, number> = {}
    valueFields.forEach((vf) => {
      totalValues[vf.fieldId] = calculateAggregation(data, vf.fieldId, vf.type)
    })
    rows.push({ key: "grand-total", label: "总计", values: totalValues, depth: 0 })

    return rows
  }, [data, rowFields, valueFields, expandedRows, calculateAggregation])


  /**
   * 处理拖拽开始
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const field = active.data.current?.field as PivotField
    setActiveField(field)
  }

  /**
   * 处理拖拽结束
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveField(null)

    if (!over) return

    const field = active.data.current?.field as PivotField
    const isFromZone = active.data.current?.isInZone
    const targetZone = over.id as string

    // 从字段面板拖到区域
    if (!isFromZone) {
      if (targetZone === "rows" && !rowFields.includes(field.id)) {
        setRowFields([...rowFields, field.id])
      } else if (targetZone === "values" && !valueFields.find((v) => v.fieldId === field.id)) {
        // 数字类型默认求和，其他类型默认计数
        const defaultAggType = field.type === "number" ? "sum" : "count"
        setValueFields([...valueFields, { fieldId: field.id, type: defaultAggType }])
      }
    }
  }

  /**
   * 从行区域移除字段
   */
  const removeFromRows = (fieldId: string) => {
    setRowFields(rowFields.filter((f) => f !== fieldId))
  }

  /**
   * 从值区域移除字段
   */
  const removeFromValues = (fieldId: string) => {
    setValueFields(valueFields.filter((v) => v.fieldId !== fieldId))
  }

  /**
   * 更改聚合类型
   */
  const changeAggregationType = (fieldId: string, type: string) => {
    setValueFields(
      valueFields.map((v) =>
        v.fieldId === fieldId ? { ...v, type: type as AggregationConfig["type"] } : v
      )
    )
  }

  /**
   * 切换行展开状态
   */
  const toggleRowExpanded = (rowKey: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowKey)) {
        next.delete(rowKey)
      } else {
        next.add(rowKey)
      }
      return next
    })
  }

  /**
   * 展开所有行
   */
  const expandAll = () => {
    const allKeys = new Set<string>()
    const collectKeys = (rows: PivotRow[]) => {
      rows.forEach((row) => {
        if (row.children) {
          allKeys.add(row.key)
          collectKeys(row.children)
        }
      })
    }
    collectKeys(pivotData)
    setExpandedRows(allKeys)
  }

  /**
   * 折叠所有行
   */
  const collapseAll = () => {
    setExpandedRows(new Set())
  }

  // 可用字段（未被使用的）
  const availableFields = fields.filter(
    (f) => !rowFields.includes(f.id) && !valueFields.find((v) => v.fieldId === f.id)
  )

  // 聚合类型映射
  const aggregationMap = valueFields.reduce(
    (acc, v) => ({ ...acc, [v.fieldId]: v.type }),
    {} as Record<string, string>
  )

  // 聚合标签
  const aggLabels: Record<string, string> = {
    sum: "求和",
    count: "计数",
    countDistinct: "去重",
    avg: "平均",
    min: "最小",
    max: "最大",
  }


  /**
   * 渲染透视表行
   */
  const renderPivotRows = (rows: PivotRow[]): React.ReactNode => {
    return rows.map((row) => {
      const isGrandTotal = row.key === "grand-total"
      const hasChildren = row.children && row.children.length > 0
      const isExpanded = expandedRows.has(row.key)

      return (
        <>
          <tr
            key={row.key}
            className={`border-b border-slate-100 ${
              isGrandTotal
                ? "bg-slate-100 font-semibold"
                : row.depth === 0
                  ? "bg-slate-50/50"
                  : ""
            }`}
          >
            <td
              className="px-4 py-2.5 text-sm"
              style={{ paddingLeft: `${row.depth * 24 + 16}px` }}
            >
              <div className="flex items-center gap-2">
                {hasChildren && (
                  <button
                    onClick={() => toggleRowExpanded(row.key)}
                    className="p-0.5 rounded hover:bg-slate-200"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    )}
                  </button>
                )}
                {!hasChildren && row.depth > 0 && <span className="w-5" />}
                <span className={isGrandTotal ? "text-slate-900" : "text-slate-700"}>
                  {row.label}
                </span>
              </div>
            </td>
            {valueFields.map((vf) => (
              <td
                key={vf.fieldId}
                className="px-4 py-2.5 text-sm text-right font-medium tabular-nums"
              >
                <span className={isGrandTotal ? "text-teal-700" : "text-slate-900"}>
                  {vf.type === "count"
                    ? row.values[vf.fieldId]?.toLocaleString()
                    : vf.type === "avg"
                      ? row.values[vf.fieldId]?.toFixed(2)
                      : `$${row.values[vf.fieldId]?.toLocaleString()}`}
                </span>
              </td>
            ))}
          </tr>
          {hasChildren && isExpanded && renderPivotRows(row.children!)}
        </>
      )
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        {/* 配置面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-white rounded-xl border border-slate-200">
          {/* 可用字段 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase">
              <LayoutGrid className="h-4 w-4" />
              可用字段
            </div>
            <div className="flex flex-wrap gap-2 min-h-[60px] p-2 bg-slate-50 rounded-lg">
              {availableFields.length === 0 ? (
                <span className="text-xs text-slate-400">所有字段已使用</span>
              ) : (
                availableFields.map((field) => (
                  <DraggableField key={field.id} field={field} />
                ))
              )}
            </div>
          </div>

          {/* 行分组区域 */}
          <DropZone
            id="rows"
            title="行 (分组)"
            icon={Rows3}
            fields={rowFields}
            allFields={fields}
            onRemove={removeFromRows}
          />

          {/* 值聚合区域 */}
          <DropZone
            id="values"
            title="值 (聚合)"
            icon={Calculator}
            fields={valueFields.map((v) => v.fieldId)}
            allFields={fields}
            onRemove={removeFromValues}
            aggregations={aggregationMap}
            onAggregationChange={changeAggregationType}
          />
        </div>

        {/* 工具栏 */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            全部展开
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            全部折叠
          </Button>
          <span className="text-sm text-slate-500 ml-auto">
            共 {data.length} 条数据
          </span>
        </div>

        {/* 透视表 */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {rowFields.length > 0
                      ? rowFields.map((f) => fields.find((ff) => ff.id === f)?.label).join(" / ")
                      : "分组"}
                  </th>
                  {valueFields.map((vf) => {
                    const field = fields.find((f) => f.id === vf.fieldId)
                    return (
                      <th
                        key={vf.fieldId}
                        className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider"
                      >
                        {field?.label} ({aggLabels[vf.type]})
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {valueFields.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <Calculator className="h-8 w-8 text-slate-300" />
                        <span>请将数字字段拖拽到"值"区域</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  renderPivotRows(pivotData.filter((r) => r.key !== "grand-total"))
                )}
              </tbody>
              {valueFields.length > 0 && (
                <tfoot>
                  {renderPivotRows(pivotData.filter((r) => r.key === "grand-total"))}
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* 拖拽覆盖层 */}
      <DragOverlay>
        {activeField && (
          <div className="px-3 py-1.5 rounded-lg bg-teal-500 text-white text-sm font-medium shadow-lg">
            {activeField.label}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

export type { PivotField, AggregationConfig }
