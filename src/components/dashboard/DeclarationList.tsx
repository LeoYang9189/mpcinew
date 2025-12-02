import { useMemo, useState } from "react"
import { DataTable, type ColumnDef } from "@/components/ui/data-table"
import { PivotTable, type PivotField } from "@/components/ui/pivot-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Eye, Edit, Trash2, Table2, BarChart3 } from "lucide-react"

/**
 * 申报记录数据类型
 */
interface DeclarationRecord {
  id: string
  blNumber: string
  shipper: string
  consignee: string
  portOfLoading: string
  portOfDischarge: string
  status: string
  amount: number
  submitDate: string
  updateDate: string
}

/**
 * 状态徽章组件
 */
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    已完成: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    处理中: "bg-amber-50 text-amber-700 ring-amber-600/20",
    待提交: "bg-slate-50 text-slate-600 ring-slate-500/20",
    已拒绝: "bg-red-50 text-red-700 ring-red-600/20",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${styles[status] || styles["待提交"]}`}>
      {status}
    </span>
  )
}

/**
 * 操作按钮组件
 */
const ActionButtons = () => {
  return (
    <div className="flex items-center gap-1">
      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
        <Eye className="h-4 w-4" />
      </button>
      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
        <Edit className="h-4 w-4" />
      </button>
      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

interface DeclarationListProps {
  title: string
  description: string
  type: string
}

/**
 * 申报列表组件
 * 使用 TanStack Table 实现高阶表格功能
 */
export default function DeclarationList({ title, description, type }: DeclarationListProps) {
  // 模拟数据
  const data: DeclarationRecord[] = useMemo(
    () => [
      { id: `${type}-2024-001`, blNumber: "MSKU1234567", shipper: "上海贸易有限公司", consignee: "ABC Trading Co.", portOfLoading: "上海", portOfDischarge: "洛杉矶", status: "已完成", amount: 125000, submitDate: "2024-01-15", updateDate: "2024-01-16" },
      { id: `${type}-2024-002`, blNumber: "COSU2345678", shipper: "深圳进出口公司", consignee: "XYZ Import LLC", portOfLoading: "深圳", portOfDischarge: "纽约", status: "处理中", amount: 89000, submitDate: "2024-01-15", updateDate: "2024-01-15" },
      { id: `${type}-2024-003`, blNumber: "OOLU3456789", shipper: "广州国际贸易", consignee: "Global Trade Inc.", portOfLoading: "广州", portOfDischarge: "长滩", status: "已完成", amount: 156000, submitDate: "2024-01-14", updateDate: "2024-01-15" },
      { id: `${type}-2024-004`, blNumber: "EGLV4567890", shipper: "宁波外贸公司", consignee: "US Imports Corp.", portOfLoading: "宁波", portOfDischarge: "西雅图", status: "待提交", amount: 72000, submitDate: "2024-01-14", updateDate: "2024-01-14" },
      { id: `${type}-2024-005`, blNumber: "CMDU5678901", shipper: "青岛贸易集团", consignee: "Pacific Trading", portOfLoading: "青岛", portOfDischarge: "奥克兰", status: "已完成", amount: 198000, submitDate: "2024-01-13", updateDate: "2024-01-14" },
      { id: `${type}-2024-006`, blNumber: "HLCU6789012", shipper: "天津国际货运", consignee: "West Coast Imports", portOfLoading: "天津", portOfDischarge: "旧金山", status: "已完成", amount: 145000, submitDate: "2024-01-12", updateDate: "2024-01-13" },
      { id: `${type}-2024-007`, blNumber: "YMLU7890123", shipper: "厦门远洋物流", consignee: "East Trade Corp.", portOfLoading: "厦门", portOfDischarge: "休斯顿", status: "处理中", amount: 112000, submitDate: "2024-01-11", updateDate: "2024-01-12" },
      { id: `${type}-2024-008`, blNumber: "MAEU8901234", shipper: "大连港务集团", consignee: "North America Logistics", portOfLoading: "大连", portOfDischarge: "温哥华", status: "已完成", amount: 167000, submitDate: "2024-01-10", updateDate: "2024-01-11" },
      { id: `${type}-2024-009`, blNumber: "COSCO901234", shipper: "连云港国际", consignee: "Global Shipping Inc.", portOfLoading: "连云港", portOfDischarge: "鹿特丹", status: "待提交", amount: 203000, submitDate: "2024-01-09", updateDate: "2024-01-09" },
      { id: `${type}-2024-010`, blNumber: "OOCL0123456", shipper: "烟台海运公司", consignee: "Euro Trade GmbH", portOfLoading: "烟台", portOfDischarge: "汉堡", status: "已拒绝", amount: 95000, submitDate: "2024-01-08", updateDate: "2024-01-10" },
      { id: `${type}-2024-011`, blNumber: "EVER1234567", shipper: "福州远洋贸易", consignee: "Asia Pacific Ltd.", portOfLoading: "福州", portOfDischarge: "新加坡", status: "已完成", amount: 78000, submitDate: "2024-01-07", updateDate: "2024-01-08" },
      { id: `${type}-2024-012`, blNumber: "YANG2345678", shipper: "海口国际物流", consignee: "Southeast Trading", portOfLoading: "海口", portOfDischarge: "曼谷", status: "处理中", amount: 134000, submitDate: "2024-01-06", updateDate: "2024-01-07" },
    ],
    [type]
  )


  // 列定义
  const columns: ColumnDef<DeclarationRecord, unknown>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "申报编号",
        cell: ({ row }) => (
          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
            {row.getValue("id")}
          </span>
        ),
        size: 130,
        minSize: 100,
      },
      {
        accessorKey: "blNumber",
        header: "提单号",
        cell: ({ row }) => (
          <span className="font-medium text-slate-900 whitespace-nowrap">{row.getValue("blNumber")}</span>
        ),
        size: 120,
        minSize: 100,
      },
      {
        accessorKey: "shipper",
        header: "发货人",
        cell: ({ row }) => (
          <span className="truncate block max-w-[180px]">{row.getValue("shipper")}</span>
        ),
        size: 150,
        minSize: 100,
      },
      {
        accessorKey: "consignee",
        header: "收货人",
        cell: ({ row }) => (
          <span className="truncate block max-w-[160px]">{row.getValue("consignee")}</span>
        ),
        size: 140,
        minSize: 100,
      },
      {
        accessorKey: "portOfLoading",
        header: "装货港",
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
            {row.getValue("portOfLoading")}
          </span>
        ),
        size: 80,
        minSize: 70,
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "portOfDischarge",
        header: "卸货港",
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
            {row.getValue("portOfDischarge")}
          </span>
        ),
        size: 80,
        minSize: 70,
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "status",
        header: "状态",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
        meta: { filterVariant: "select" },
        size: 85,
        minSize: 75,
      },
      {
        accessorKey: "amount",
        header: "金额",
        cell: ({ row }) => (
          <span className="font-medium text-slate-900 whitespace-nowrap">
            ${(row.getValue("amount") as number).toLocaleString()}
          </span>
        ),
        meta: { filterVariant: "range" },
        size: 100,
        minSize: 80,
      },
      {
        accessorKey: "submitDate",
        header: "提交日期",
        cell: ({ row }) => (
          <span className="text-slate-500 whitespace-nowrap">{row.getValue("submitDate")}</span>
        ),
        size: 95,
        minSize: 85,
      },
      {
        accessorKey: "updateDate",
        header: "更新日期",
        cell: ({ row }) => (
          <span className="text-slate-500 whitespace-nowrap">{row.getValue("updateDate")}</span>
        ),
        size: 95,
        minSize: 85,
      },
      {
        id: "actions",
        header: "操作",
        cell: () => <ActionButtons />,
        enableSorting: false,
        enableColumnFilter: false,
        enableResizing: false,
        size: 100,
      },
    ],
    []
  )

  // 视图模式：table 或 pivot
  const [viewMode, setViewMode] = useState<"table" | "pivot">("table")

  // 透视表字段定义 - 包含所有字段
  const pivotFields: PivotField[] = useMemo(
    () => [
      { id: "id", label: "申报编号", type: "string" },
      { id: "blNumber", label: "提单号", type: "string" },
      { id: "shipper", label: "发货人", type: "string" },
      { id: "consignee", label: "收货人", type: "string" },
      { id: "portOfLoading", label: "装货港", type: "string" },
      { id: "portOfDischarge", label: "卸货港", type: "string" },
      { id: "status", label: "状态", type: "string" },
      { id: "amount", label: "金额", type: "number" },
      { id: "submitDate", label: "提交日期", type: "date" },
      { id: "updateDate", label: "更新日期", type: "date" },
    ],
    []
  )

  // 视图切换按钮组件
  const viewSwitcher = (
    <div className="flex items-center bg-slate-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode("table")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          viewMode === "table"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <Table2 className="h-4 w-4" />
        表格
      </button>
      <button
        onClick={() => setViewMode("pivot")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          viewMode === "pivot"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <BarChart3 className="h-4 w-4" />
        透视表
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-500 mt-1">{description}</p>
        </div>
        <Button size="sm" className="gap-1.5 bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          新建申报
        </Button>
      </div>

      {/* 根据视图模式显示不同内容 */}
      {viewMode === "table" ? (
        <Card className="p-4">
          <DataTable
            data={data}
            columns={columns}
            searchPlaceholder="搜索提单号、发货人、收货人..."
            enableRowSelection
            enableColumnResizing
            enableColumnOrdering
            enableAggregation
            enableContextMenu
            enableExport
            aggregations={{ amount: "sum" }}
            pageSize={10}
            toolbarRight={viewSwitcher}
          />
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-end mb-4">
            {viewSwitcher}
          </div>
          <PivotTable
            data={data}
            fields={pivotFields}
            defaultRowFields={["portOfLoading", "status"]}
            defaultValueFields={[{ fieldId: "amount", type: "sum" }]}
          />
        </Card>
      )}
    </div>
  )
}
