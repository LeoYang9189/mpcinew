import { useMemo } from "react"
import { DataTable, type ColumnDef } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Eye, Edit, Trash2, FileCheck, AlertCircle } from "lucide-react"

/**
 * 合规资质记录数据类型
 */
interface ComplianceRecord {
  id: string
  companyName: string
  licenseNumber: string
  applicant: string
  status: string
  applyDate: string
  expireDate: string
  updateDate: string
}

/**
 * 状态徽章组件
 */
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, { bg: string; icon: React.ReactNode }> = {
    有效: { bg: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", icon: <FileCheck className="h-3 w-3" /> },
    审核中: { bg: "bg-amber-50 text-amber-700 ring-amber-600/20", icon: null },
    待提交: { bg: "bg-slate-50 text-slate-600 ring-slate-500/20", icon: null },
    已过期: { bg: "bg-red-50 text-red-700 ring-red-600/20", icon: <AlertCircle className="h-3 w-3" /> },
  }
  const style = styles[status] || styles["待提交"]
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${style.bg}`}>
      {style.icon}
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

interface ComplianceListProps {
  title: string
  description: string
  type: string
}

/**
 * 合规资质列表组件
 * 使用 TanStack Table 实现高阶表格功能
 */
export default function ComplianceList({ title, description, type }: ComplianceListProps) {
  // 模拟数据
  const data: ComplianceRecord[] = useMemo(
    () => [
      { id: `${type}-001`, companyName: "上海国际物流有限公司", licenseNumber: "MOT-2024-001234", applicant: "张三", status: "有效", applyDate: "2023-06-15", expireDate: "2026-06-14", updateDate: "2024-01-10" },
      { id: `${type}-002`, companyName: "深圳环球货运代理", licenseNumber: "MOT-2024-002345", applicant: "李四", status: "审核中", applyDate: "2024-01-10", expireDate: "-", updateDate: "2024-01-15" },
      { id: `${type}-003`, companyName: "广州远洋物流集团", licenseNumber: "MOT-2023-003456", applicant: "王五", status: "有效", applyDate: "2022-03-20", expireDate: "2025-03-19", updateDate: "2024-01-05" },
      { id: `${type}-004`, companyName: "宁波港航运输公司", licenseNumber: "-", applicant: "赵六", status: "待提交", applyDate: "2024-01-14", expireDate: "-", updateDate: "2024-01-14" },
      { id: `${type}-005`, companyName: "青岛海运贸易有限公司", licenseNumber: "MOT-2021-004567", applicant: "钱七", status: "已过期", applyDate: "2021-01-10", expireDate: "2024-01-09", updateDate: "2024-01-09" },
      { id: `${type}-006`, companyName: "天津国际货运代理", licenseNumber: "MOT-2023-005678", applicant: "孙八", status: "有效", applyDate: "2023-02-20", expireDate: "2026-02-19", updateDate: "2024-01-08" },
      { id: `${type}-007`, companyName: "厦门远洋运输公司", licenseNumber: "MOT-2024-006789", applicant: "周九", status: "审核中", applyDate: "2024-01-05", expireDate: "-", updateDate: "2024-01-10" },
      { id: `${type}-008`, companyName: "大连港务物流集团", licenseNumber: "MOT-2023-007890", applicant: "吴十", status: "有效", applyDate: "2023-08-15", expireDate: "2026-08-14", updateDate: "2024-01-12" },
      { id: `${type}-009`, companyName: "连云港国际货运", licenseNumber: "MOT-2022-008901", applicant: "郑一", status: "有效", applyDate: "2022-11-20", expireDate: "2025-11-19", updateDate: "2024-01-06" },
      { id: `${type}-010`, companyName: "烟台海运物流公司", licenseNumber: "-", applicant: "王二", status: "待提交", applyDate: "2024-01-13", expireDate: "-", updateDate: "2024-01-13" },
      { id: `${type}-011`, companyName: "福州远洋贸易有限公司", licenseNumber: "MOT-2020-009012", applicant: "张四", status: "已过期", applyDate: "2020-05-10", expireDate: "2023-05-09", updateDate: "2023-05-10" },
      { id: `${type}-012`, companyName: "海口国际物流中心", licenseNumber: "MOT-2024-010123", applicant: "李五", status: "审核中", applyDate: "2024-01-08", expireDate: "-", updateDate: "2024-01-11" },
    ],
    [type]
  )


  // 列定义
  const columns: ColumnDef<ComplianceRecord, unknown>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "申请编号",
        cell: ({ row }) => (
          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
            {row.getValue("id")}
          </span>
        ),
        size: 100,
        minSize: 80,
      },
      {
        accessorKey: "companyName",
        header: "公司名称",
        cell: ({ row }) => (
          <span className="font-medium text-slate-900 truncate block max-w-[200px]">
            {row.getValue("companyName")}
          </span>
        ),
        size: 180,
        minSize: 120,
      },
      {
        accessorKey: "licenseNumber",
        header: "证书编号",
        cell: ({ row }) => {
          const value = row.getValue("licenseNumber") as string
          return value === "-" ? (
            <span className="text-slate-400">-</span>
          ) : (
            <span className="font-mono text-xs whitespace-nowrap">{value}</span>
          )
        },
        size: 140,
        minSize: 100,
      },
      {
        accessorKey: "applicant",
        header: "申请人",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-medium text-slate-600 flex-shrink-0">
              {(row.getValue("applicant") as string).charAt(0)}
            </div>
            <span>{row.getValue("applicant")}</span>
          </div>
        ),
        meta: { filterVariant: "select" },
        size: 90,
        minSize: 80,
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
        accessorKey: "applyDate",
        header: "申请日期",
        cell: ({ row }) => (
          <span className="text-slate-500 whitespace-nowrap">{row.getValue("applyDate")}</span>
        ),
        size: 95,
        minSize: 85,
      },
      {
        accessorKey: "expireDate",
        header: "到期日期",
        cell: ({ row }) => {
          const value = row.getValue("expireDate") as string
          const isExpired = value !== "-" && new Date(value) < new Date()
          return (
            <span className={`whitespace-nowrap ${isExpired ? "text-red-500 font-medium" : "text-slate-500"}`}>
              {value}
            </span>
          )
        },
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
          新建申请
        </Button>
      </div>

      {/* 数据表格 */}
      <Card className="p-4">
        <DataTable
          data={data}
          columns={columns}
          searchPlaceholder="搜索公司名称、证书编号、申请人..."
          enableRowSelection
          enableColumnResizing
          enableColumnOrdering
          enableContextMenu
          enableExport
          pageSize={10}
        />
      </Card>
    </div>
  )
}
