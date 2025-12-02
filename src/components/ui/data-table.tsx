import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getGroupedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type ExpandedState,
  type RowSelectionState,
  type ColumnOrderState,
  type ColumnSizingState,
  type GroupingState,
  type Column,
  type Table,
  type Row,
  type Header,
  type Cell,
} from "@tanstack/react-table"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Check,
  X,
  GripVertical,
  Download,
  Copy,
  Filter,
  Pin,
  PinOff,
  Eye,
  EyeOff,
  Group,
  Ungroup,
  Calculator,
  FileSpreadsheet,
} from "lucide-react"


/**
 * 列元数据扩展类型
 */
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    filterVariant?: "text" | "select" | "range" | "date"
    aggregationLabel?: string
  }
}

/**
 * DataTable 组件属性
 */
interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  searchPlaceholder?: string
  enableRowSelection?: boolean
  enableExpanding?: boolean
  enableColumnResizing?: boolean
  enableColumnOrdering?: boolean
  enableGrouping?: boolean
  enableAggregation?: boolean
  enableContextMenu?: boolean
  enableExport?: boolean
  getSubRows?: (row: TData) => TData[] | undefined
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode
  pageSize?: number
  aggregations?: Record<string, "sum" | "count" | "mean" | "min" | "max">
  toolbarRight?: React.ReactNode
  onSelectionChange?: (count: number) => void
  batchActions?: React.ReactNode
}

/**
 * 右键菜单状态
 */
interface ContextMenuState {
  visible: boolean
  x: number
  y: number
  type: "cell" | "header" | "row"
  data?: {
    cell?: Cell<unknown, unknown>
    column?: Column<unknown, unknown>
    row?: Row<unknown>
    value?: unknown
  }
}

/**
 * 防抖输入组件
 */
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}


/**
 * 多选下拉筛选组件
 */
function MultiSelectFilter<TData>({
  column,
  values,
}: {
  column: Column<TData, unknown>
  values: unknown[]
}) {
  const [open, setOpen] = useState(false)
  const selectedValues = (column.getFilterValue() as string[]) || []

  /**
   * 切换选中状态
   */
  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    column.setFilterValue(newValues.length > 0 ? newValues : undefined)
  }

  /**
   * 清除所有选中
   */
  const clearAll = () => {
    column.setFilterValue(undefined)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-7 w-full rounded-md border border-slate-200 bg-white px-2 text-xs text-left flex items-center justify-between hover:border-slate-300"
      >
        <span className="truncate">
          {selectedValues.length > 0
            ? `已选 ${selectedValues.length} 项`
            : `全部 (${values.length})`}
        </span>
        <ChevronDown className="h-3 w-3 text-slate-400 flex-shrink-0" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-50 w-48 max-h-48 overflow-auto rounded-lg border bg-white shadow-lg">
            <div className="p-1.5 border-b flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {selectedValues.length > 0 ? `已选 ${selectedValues.length}` : "请选择"}
              </span>
              {selectedValues.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-teal-600 hover:text-teal-700"
                >
                  清除
                </button>
              )}
            </div>
            <div className="p-1">
              {values.map((value) => {
                const strValue = String(value)
                const isSelected = selectedValues.includes(strValue)
                return (
                  <label
                    key={strValue}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleValue(strValue)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-xs truncate">{strValue}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/**
 * 日期区间筛选组件
 */
function DateRangeFilter<TData>({ column }: { column: Column<TData, unknown> }) {
  const filterValue = (column.getFilterValue() as [string, string]) || ["", ""]

  return (
    <div className="flex gap-1">
      <input
        type="date"
        value={filterValue[0] || ""}
        onChange={(e) =>
          column.setFilterValue([e.target.value || undefined, filterValue[1]])
        }
        className="h-7 w-full rounded-md border border-slate-200 bg-white px-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <input
        type="date"
        value={filterValue[1] || ""}
        onChange={(e) =>
          column.setFilterValue([filterValue[0], e.target.value || undefined])
        }
        className="h-7 w-full rounded-md border border-slate-200 bg-white px-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  )
}

/**
 * 高级列筛选器组件
 * 支持文本、多选下拉、范围筛选、日期区间筛选
 */
function AdvancedColumnFilter<TData>({
  column,
}: {
  column: Column<TData, unknown>
}) {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  // 获取唯一值用于下拉选择
  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range" || filterVariant === "date") return []
    const values = Array.from(column.getFacetedUniqueValues().keys())
    return values.sort().slice(0, 5000)
  }, [column.getFacetedUniqueValues(), filterVariant])

  // 日期区间筛选
  if (filterVariant === "date") {
    return <DateRangeFilter column={column} />
  }

  // 范围筛选（数字类型）
  if (filterVariant === "range") {
    const [min, max] = column.getFacetedMinMaxValues() ?? [0, 100]
    return (
      <div className="flex gap-1">
        <DebouncedInput
          type="number"
          min={min}
          max={max}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [
              value === "" ? undefined : Number(value),
              old?.[1],
            ])
          }
          placeholder={`最小 (${min})`}
          className="h-7 w-20 text-xs"
        />
        <DebouncedInput
          type="number"
          min={min}
          max={max}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              value === "" ? undefined : Number(value),
            ])
          }
          placeholder={`最大 (${max})`}
          className="h-7 w-20 text-xs"
        />
      </div>
    )
  }

  // 多选下拉筛选（枚举值）
  if (filterVariant === "select") {
    return <MultiSelectFilter column={column} values={sortedUniqueValues} />
  }

  // 文本筛选（带自动补全）
  return (
    <div className="relative">
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value || undefined)}
        placeholder={`搜索 (${column.getFacetedUniqueValues().size})`}
        className="h-7 w-full text-xs"
        list={`${column.id}-list`}
      />
      <datalist id={`${column.id}-list`}>
        {sortedUniqueValues.slice(0, 100).map((value) => (
          <option key={String(value)} value={String(value)} />
        ))}
      </datalist>
    </div>
  )
}


/**
 * 计算固定列的偏移量
 */
function getPinnedColumnOffset<TData>(
  column: Column<TData, unknown>,
  position: "left" | "right",
  table: Table<TData>
): number {
  const pinnedColumns = position === "left" 
    ? table.getLeftLeafColumns() 
    : table.getRightLeafColumns()
  
  let offset = 0
  for (const pinnedCol of pinnedColumns) {
    if (pinnedCol.id === column.id) break
    offset += pinnedCol.getSize()
  }
  return offset
}

/**
 * 可拖拽排序的表头单元格
 */
function DraggableHeader<TData>({
  header,
  showColumnFilters,
  enableColumnOrdering,
  table,
}: {
  header: Header<TData, unknown>
  showColumnFilters: boolean
  enableColumnOrdering: boolean
  table: Table<TData>
}) {
  const { column } = header
  const isPinned = column.getIsPinned()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    disabled: !enableColumnOrdering || !!isPinned,
  })

  const size = header.getSize()
  
  // 计算固定列偏移量
  const pinnedOffset = isPinned 
    ? getPinnedColumnOffset(column, isPinned, table) 
    : undefined

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: isPinned ? ("sticky" as const) : ("relative" as const),
    left: isPinned === "left" ? pinnedOffset : undefined,
    right: isPinned === "right" ? pinnedOffset : undefined,
    zIndex: isPinned ? 20 : isDragging ? 5 : 1,
    backgroundColor: isPinned ? "rgb(248 250 252)" : undefined,
    width: size,
    minWidth: column.columnDef.minSize ?? 60,
  }

  return (
    <th
      ref={setNodeRef}
      style={style}
      colSpan={header.colSpan}
      className={`px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200 bg-slate-50/80 whitespace-nowrap ${
        isPinned ? "shadow-sm" : ""
      }`}
    >
      {header.isPlaceholder ? null : (
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            {/* 拖拽手柄 */}
            {enableColumnOrdering && !isPinned && (
              <button
                {...attributes}
                {...listeners}
                className="p-0.5 rounded hover:bg-slate-200 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 flex-shrink-0"
              >
                <GripVertical className="h-3.5 w-3.5" />
              </button>
            )}
            {/* 表头内容 + 排序 */}
            <div
              className={`flex items-center gap-1 flex-1 whitespace-nowrap ${
                column.getCanSort() ? "cursor-pointer select-none hover:text-slate-900" : ""
              }`}
              onClick={column.getToggleSortingHandler()}
            >
              {flexRender(column.columnDef.header, header.getContext())}
              {column.getCanSort() && (
                <span className="ml-1">
                  {column.getIsSorted() === "asc" ? (
                    <ArrowUp className="h-3.5 w-3.5 text-teal-600" />
                  ) : column.getIsSorted() === "desc" ? (
                    <ArrowDown className="h-3.5 w-3.5 text-teal-600" />
                  ) : (
                    <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                  )}
                </span>
              )}
            </div>
            {/* 固定列指示器 */}
            {isPinned && (
              <Pin className="h-3 w-3 text-teal-600" />
            )}
          </div>
          {/* 列筛选器 */}
          {showColumnFilters && column.getCanFilter() && (
            <AdvancedColumnFilter column={column} />
          )}
        </div>
      )}
      {/* 列宽调整手柄 */}
      <div
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        onDoubleClick={() => header.column.resetSize()}
        className={`absolute right-0 top-0 h-full w-1.5 cursor-col-resize select-none touch-none group ${
          header.column.getIsResizing() ? "bg-teal-500" : "hover:bg-teal-400"
        }`}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-slate-300 group-hover:bg-teal-500 rounded" />
      </div>
    </th>
  )
}


/**
 * 右键上下文菜单组件
 */
function ContextMenu({
  state,
  onClose,
  onExport,
}: {
  state: ContextMenuState
  onClose: () => void
  onExport: (format: "xlsx" | "csv") => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (state.visible) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [state.visible, onClose])

  if (!state.visible) return null

  const { type, data } = state

  /**
   * 复制单元格值到剪贴板
   */
  const handleCopy = () => {
    if (data?.value !== undefined) {
      navigator.clipboard.writeText(String(data.value))
    }
    onClose()
  }

  /**
   * 复制整行数据
   */
  const handleCopyRow = () => {
    if (data?.row) {
      const rowData = data.row.original
      navigator.clipboard.writeText(JSON.stringify(rowData, null, 2))
    }
    onClose()
  }

  /**
   * 筛选当前值
   */
  const handleFilterValue = () => {
    if (data?.column && data?.value !== undefined) {
      data.column.setFilterValue(String(data.value))
    }
    onClose()
  }

  /**
   * 固定列
   */
  const handlePinColumn = (position: "left" | "right" | false) => {
    if (data?.column) {
      data.column.pin(position)
    }
    onClose()
  }

  /**
   * 隐藏列
   */
  const handleHideColumn = () => {
    if (data?.column) {
      data.column.toggleVisibility(false)
    }
    onClose()
  }

  /**
   * 分组
   */
  const handleGroupBy = () => {
    if (data?.column) {
      data.column.toggleGrouping()
    }
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-48 rounded-lg border border-slate-200 bg-white shadow-lg py-1"
      style={{ left: state.x, top: state.y }}
    >
      {/* 单元格操作 */}
      {type === "cell" && (
        <>
          <button
            onClick={handleCopy}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
          >
            <Copy className="h-4 w-4 text-slate-500" />
            复制单元格
          </button>
          <button
            onClick={handleCopyRow}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
          >
            <Copy className="h-4 w-4 text-slate-500" />
            复制整行
          </button>
          <button
            onClick={handleFilterValue}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
          >
            <Filter className="h-4 w-4 text-slate-500" />
            筛选此值
          </button>
          <div className="border-t border-slate-100 my-1" />
        </>
      )}

      {/* 列操作 */}
      {(type === "header" || type === "cell") && data?.column && (
        <>
          <div className="px-3 py-1 text-xs text-slate-400 font-medium">列操作</div>
          {data.column.getIsPinned() ? (
            <button
              onClick={() => handlePinColumn(false)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
            >
              <PinOff className="h-4 w-4 text-slate-500" />
              取消固定
            </button>
          ) : (
            <>
              <button
                onClick={() => handlePinColumn("left")}
                className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
              >
                <Pin className="h-4 w-4 text-slate-500" />
                固定到左侧
              </button>
              <button
                onClick={() => handlePinColumn("right")}
                className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
              >
                <Pin className="h-4 w-4 text-slate-500 rotate-180" />
                固定到右侧
              </button>
            </>
          )}
          <button
            onClick={handleHideColumn}
            className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
          >
            <EyeOff className="h-4 w-4 text-slate-500" />
            隐藏此列
          </button>
          {data.column.getCanGroup?.() && (
            <button
              onClick={handleGroupBy}
              className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
            >
              {data.column.getIsGrouped?.() ? (
                <>
                  <Ungroup className="h-4 w-4 text-slate-500" />
                  取消分组
                </>
              ) : (
                <>
                  <Group className="h-4 w-4 text-slate-500" />
                  按此列分组
                </>
              )}
            </button>
          )}
          <div className="border-t border-slate-100 my-1" />
        </>
      )}

      {/* 导出操作 */}
      <div className="px-3 py-1 text-xs text-slate-400 font-medium">导出</div>
      <button
        onClick={() => { onExport("xlsx"); onClose() }}
        className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
      >
        <FileSpreadsheet className="h-4 w-4 text-green-600" />
        导出为 Excel
      </button>
      <button
        onClick={() => { onExport("csv"); onClose() }}
        className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
      >
        <Download className="h-4 w-4 text-slate-500" />
        导出为 CSV
      </button>
    </div>
  )
}


/**
 * 列可见性下拉菜单
 */
function ColumnVisibilityDropdown<TData>({ table }: { table: Table<TData> }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="h-8 gap-1"
      >
        <Eye className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">列设置</span>
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-lg border bg-white shadow-lg">
            <div className="p-2 border-b flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">显示/隐藏列</span>
              <button
                onClick={() => table.toggleAllColumnsVisible(true)}
                className="text-xs text-teal-600 hover:text-teal-700"
              >
                显示全部
              </button>
            </div>
            <div className="max-h-64 overflow-auto p-1">
              {table.getAllLeafColumns().map((column) => {
                if (column.id === "select" || column.id === "expand") return null
                const isPinned = column.getIsPinned()
                return (
                  <div
                    key={column.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="flex-1 truncate text-sm">
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : column.id}
                    </span>
                    {isPinned && (
                      <Pin className="h-3 w-3 text-teal-600" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/**
 * 分页组件
 */
function Pagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>每页</span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="h-8 w-16 rounded-md border border-slate-200 bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {[10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>条</span>
        <span className="text-slate-400">|</span>
        <span>
          共 <span className="font-medium text-slate-900">{table.getFilteredRowModel().rows.length}</span> 条
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1 px-2">
          <span className="text-sm text-slate-600">第</span>
          <Input
            type="number"
            min={1}
            max={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="h-8 w-14 text-center text-sm"
          />
          <span className="text-sm text-slate-600">/ {table.getPageCount()} 页</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


/**
 * 聚合统计底栏
 */
function AggregationFooter<TData>({
  table,
  aggregations,
}: {
  table: Table<TData>
  aggregations: Record<string, "sum" | "count" | "mean" | "min" | "max">
}) {
  const rows = table.getFilteredRowModel().rows

  /**
   * 计算聚合值
   */
  const calculateAggregation = (columnId: string, type: string) => {
    const values = rows
      .map((row) => row.getValue(columnId))
      .filter((v) => typeof v === "number") as number[]

    if (values.length === 0) return "-"

    switch (type) {
      case "sum":
        return values.reduce((a, b) => a + b, 0).toLocaleString()
      case "count":
        return values.length.toLocaleString()
      case "mean":
        return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
      case "min":
        return Math.min(...values).toLocaleString()
      case "max":
        return Math.max(...values).toLocaleString()
      default:
        return "-"
    }
  }

  const aggLabels: Record<string, string> = {
    sum: "合计",
    count: "计数",
    mean: "平均",
    min: "最小",
    max: "最大",
  }

  return (
    <tfoot className="bg-slate-100/80 border-t-2 border-slate-200">
      <tr>
        {table.getVisibleLeafColumns().map((column, index) => {
          const aggType = aggregations[column.id]
          return (
            <td
              key={column.id}
              className="px-4 py-2 text-sm font-medium text-slate-700"
            >
              {index === 0 && !aggType ? (
                <div className="flex items-center gap-1 text-slate-500">
                  <Calculator className="h-4 w-4" />
                  <span>统计</span>
                </div>
              ) : aggType ? (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">{aggLabels[aggType]}</span>
                  <span className="font-semibold text-teal-700">
                    {calculateAggregation(column.id, aggType)}
                  </span>
                </div>
              ) : null}
            </td>
          )
        })}
      </tr>
    </tfoot>
  )
}


/**
 * 通用数据表格组件
 * 支持排序、筛选、分页、列可见性、行选择、展开行、列拖拽排序、列宽调整、右键菜单、聚合计算、导出等高阶功能
 */
export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder = "搜索...",
  enableRowSelection = false,
  enableExpanding = false,
  enableColumnResizing = true,
  enableColumnOrdering = true,
  enableGrouping = false,
  enableAggregation = false,
  enableContextMenu = true,
  enableExport = true,
  getSubRows,
  renderExpandedRow,
  pageSize = 10,
  aggregations = {},
  toolbarRight,
  onSelectionChange,
  batchActions,
}: DataTableProps<TData>) {
  // 状态管理
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [showColumnFilters, setShowColumnFilters] = useState(false)
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [grouping, setGrouping] = useState<GroupingState>([])
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    type: "cell",
  })

  // 计算固定列配置 - select/expand 固定左侧，actions 固定右侧
  const columnPinning = useMemo(() => {
    const left: string[] = []
    const right: string[] = []
    
    if (enableRowSelection) left.push("select")
    if (enableExpanding) left.push("expand")
    
    // 检查是否有 actions 列
    const hasActionsColumn = columns.some(
      (col) => (col as { id?: string }).id === "actions"
    )
    if (hasActionsColumn) right.push("actions")
    
    return { left, right }
  }, [enableRowSelection, enableExpanding, columns])

  // 拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // 构建完整的列定义
  const finalColumns = useMemo(() => {
    const cols: ColumnDef<TData, unknown>[] = []

    // 行选择列 - 固定在左侧
    if (enableRowSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
        ),
        size: 40,
        enableSorting: false,
        enableColumnFilter: false,
        enableResizing: false,
        enablePinning: true,
      })
    }

    // 展开列 - 固定在左侧
    if (enableExpanding) {
      cols.push({
        id: "expand",
        header: () => null,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <button
              onClick={row.getToggleExpandedHandler()}
              className="p-1 rounded hover:bg-slate-100 transition-colors"
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-500" />
              )}
            </button>
          ) : null,
        size: 40,
        enableSorting: false,
        enableColumnFilter: false,
        enableResizing: false,
        enablePinning: true,
      })
    }

    // 为列设置正确的 filterFn
    const processedColumns = columns.map((col) => {
      const meta = (col as { meta?: { filterVariant?: string } }).meta
      if (meta?.filterVariant === "select") {
        return { ...col, filterFn: "multiSelect" }
      }
      if (meta?.filterVariant === "date") {
        return { ...col, filterFn: "dateRange" }
      }
      return col
    }) as ColumnDef<TData, unknown>[]

    return [...cols, ...processedColumns]
  }, [columns, enableRowSelection, enableExpanding])

  // 初始化列顺序
  useEffect(() => {
    if (columnOrder.length === 0) {
      setColumnOrder(finalColumns.map((col) => (col as { id?: string; accessorKey?: string }).id || (col as { accessorKey?: string }).accessorKey || ""))
    }
  }, [finalColumns, columnOrder.length])

  // 自定义筛选函数
  const multiSelectFilterFn = useCallback(
    (row: Row<TData>, columnId: string, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true
      const value = String(row.getValue(columnId))
      return filterValue.includes(value)
    },
    []
  )

  const dateRangeFilterFn = useCallback(
    (row: Row<TData>, columnId: string, filterValue: [string, string]) => {
      if (!filterValue || (!filterValue[0] && !filterValue[1])) return true
      const cellValue = String(row.getValue(columnId))
      if (cellValue === "-") return true
      const cellDate = cellValue.split(" ")[0] // 取日期部分
      if (filterValue[0] && cellDate < filterValue[0]) return false
      if (filterValue[1] && cellDate > filterValue[1]) return false
      return true
    },
    []
  )

  // 创建表格实例
  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      globalFilter,
      columnOrder,
      columnSizing,
      grouping,
      columnPinning,
    },
    initialState: {
      pagination: { pageSize },
    },
    filterFns: {
      multiSelect: multiSelectFilterFn,
      dateRange: dateRangeFilterFn,
    },
    globalFilterFn: "includesString",
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getGroupedRowModel: enableGrouping ? getGroupedRowModel() : undefined,
    getSubRows,
    enableRowSelection,
    enableExpanding,
    enableColumnResizing,
    columnResizeMode: "onChange",
    enableGrouping,
    enablePinning: true,
  })

  const selectedCount = Object.keys(rowSelection).length

  // 监听选中状态变化，通知父组件
  useEffect(() => {
    onSelectionChange?.(selectedCount)
  }, [selectedCount, onSelectionChange])

  /**
   * 导出数据为 Excel 或 CSV
   */
  const handleExport = useCallback(
    (format: "xlsx" | "csv") => {
      const rows = table.getFilteredRowModel().rows
      const visibleColumns = table.getVisibleLeafColumns().filter(
        (col) => col.id !== "select" && col.id !== "expand" && col.id !== "actions"
      )

      // 构建导出数据
      const exportData = rows.map((row) => {
        const rowData: Record<string, unknown> = {}
        visibleColumns.forEach((col) => {
          const header =
            typeof col.columnDef.header === "string"
              ? col.columnDef.header
              : col.id
          rowData[header] = row.getValue(col.id)
        })
        return rowData
      })

      // 创建工作簿
      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "数据")

      // 导出文件
      const fileName = `导出数据_${new Date().toLocaleDateString("zh-CN")}`
      if (format === "xlsx") {
        XLSX.writeFile(wb, `${fileName}.xlsx`)
      } else {
        XLSX.writeFile(wb, `${fileName}.csv`)
      }
    },
    [table]
  )

  /**
   * 处理右键菜单
   */
  const handleContextMenu = useCallback(
    (
      e: React.MouseEvent,
      type: "cell" | "header" | "row",
      data?: ContextMenuState["data"]
    ) => {
      if (!enableContextMenu) return
      e.preventDefault()
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        type,
        data,
      })
    },
    [enableContextMenu]
  )

  /**
   * 处理列拖拽排序
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (active && over && active.id !== over.id) {
        setColumnOrder((items) => {
          const oldIndex = items.indexOf(active.id as string)
          const newIndex = items.indexOf(over.id as string)
          return arrayMove(items, oldIndex, newIndex)
        })
      }
    },
    []
  )

  // 获取列 ID 列表用于拖拽排序
  const columnIds = useMemo(
    () => table.getVisibleLeafColumns().map((col) => col.id),
    [table.getVisibleLeafColumns()]
  )


  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 工具栏 - 固定不滚动 */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between flex-shrink-0 mb-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <DebouncedInput
              value={globalFilter}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={searchPlaceholder}
              className="pl-9 h-9"
            />
          </div>
          {enableRowSelection && selectedCount > 0 && (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm">
                <Check className="h-4 w-4" />
                <span>已选 {selectedCount} 项</span>
                <button
                  onClick={() => setRowSelection({})}
                  className="ml-1 p-0.5 hover:bg-teal-100 rounded"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              {batchActions}
            </>
          )}
          {grouping.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm">
              <Group className="h-4 w-4" />
              <span>按 {grouping.join(", ")} 分组</span>
              <button
                onClick={() => setGrouping([])}
                className="ml-1 p-0.5 hover:bg-amber-100 rounded"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showColumnFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowColumnFilters(!showColumnFilters)}
            className={`h-8 gap-1 ${showColumnFilters ? "bg-teal-600 hover:bg-teal-700" : ""}`}
          >
            <Filter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">筛选</span>
          </Button>
          <ColumnVisibilityDropdown table={table} />
          {enableExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("xlsx")}
              className="h-8 gap-1"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-green-600" />
              <span className="hidden sm:inline">导出</span>
            </Button>
          )}
          {toolbarRight}
        </div>
      </div>

      {/* 表格容器 - 填满剩余空间 */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex-1 flex flex-col overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* 表格滚动区域 */}
          <div className="flex-1 overflow-auto">
            <table className="border-collapse" style={{ minWidth: "100%" }}>
              <thead className="sticky top-0 z-20 bg-slate-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <SortableContext
                      items={columnIds}
                      strategy={horizontalListSortingStrategy}
                    >
                      {headerGroup.headers.map((header) => (
                        <DraggableHeader
                          key={header.id}
                          header={header}
                          showColumnFilters={showColumnFilters}
                          enableColumnOrdering={enableColumnOrdering}
                          table={table}
                        />
                      ))}
                    </SortableContext>
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={finalColumns.length}
                      className="px-4 py-12 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-slate-300" />
                        <span>暂无数据</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <>
                      <tr
                        key={row.id}
                        className={`transition-colors hover:bg-slate-50/80 ${
                          row.getIsSelected() ? "bg-teal-50/50" : ""
                        } ${row.getIsExpanded() ? "bg-slate-50" : ""} ${
                          row.getIsGrouped?.() ? "bg-slate-100/50 font-medium" : ""
                        }`}
                        onContextMenu={(e) =>
                          handleContextMenu(e, "row", { row: row as Row<unknown> })
                        }
                      >
                        {row.getVisibleCells().map((cell) => {
                          const isPinned = cell.column.getIsPinned()
                          const pinnedOffset = isPinned
                            ? getPinnedColumnOffset(cell.column, isPinned, table)
                            : undefined
                          return (
                            <td
                              key={cell.id}
                              className={`px-4 py-3 text-sm text-slate-700 whitespace-nowrap ${
                                isPinned ? "sticky bg-white z-10" : ""
                              } ${isPinned === "left" ? "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""} ${isPinned === "right" ? "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""}`}
                              style={{
                                left: isPinned === "left" ? pinnedOffset : undefined,
                                right: isPinned === "right" ? pinnedOffset : undefined,
                                width: cell.column.getSize(),
                              }}
                              onContextMenu={(e) =>
                                handleContextMenu(e, "cell", {
                                  cell: cell as Cell<unknown, unknown>,
                                  column: cell.column as Column<unknown, unknown>,
                                  row: row as Row<unknown>,
                                  value: cell.getValue(),
                                })
                              }
                            >
                              {cell.getIsGrouped() ? (
                                <button
                                  onClick={row.getToggleExpandedHandler()}
                                  className="flex items-center gap-2"
                                >
                                  {row.getIsExpanded() ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  <span className="text-slate-400 text-xs">
                                    ({row.subRows.length})
                                  </span>
                                </button>
                              ) : cell.getIsAggregated() ? (
                                flexRender(
                                  cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                                  cell.getContext()
                                )
                              ) : cell.getIsPlaceholder() ? null : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </td>
                          )
                        })}
                      </tr>
                      {/* 展开行内容 */}
                      {row.getIsExpanded() && renderExpandedRow && (
                        <tr key={`${row.id}-expanded`}>
                          <td
                            colSpan={finalColumns.length}
                            className="px-4 py-4 bg-slate-50/50 border-t border-slate-100"
                          >
                            {renderExpandedRow(row)}
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
              {/* 聚合统计底栏 */}
              {enableAggregation && Object.keys(aggregations).length > 0 && (
                <AggregationFooter table={table} aggregations={aggregations} />
              )}
            </table>
          </div>
        </DndContext>

        {/* 分页 - 固定在底部 */}
        <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-3 flex-shrink-0">
          <Pagination table={table} />
        </div>
      </div>

      {/* 右键菜单 */}
      {enableContextMenu && (
        <ContextMenu
          state={contextMenu}
          onClose={() => setContextMenu((s) => ({ ...s, visible: false }))}
          onExport={handleExport}
        />
      )}
    </div>
  )
}

export { type ColumnDef }
