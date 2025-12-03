import { useMemo, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { DataTable, type ColumnDef } from "@/components/ui/data-table"
import { PivotTable, type PivotField } from "@/components/ui/pivot-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Plus,
    Eye,
    Edit,
    Table2,
    BarChart3,
    FileSpreadsheet,
    Sparkles,
    Download,
    Send,
    Trash2,
} from "lucide-react"

/**
 * China NVOCC 备案记录数据类型
 */
interface NVOCCRecord {
    // 系统字段
    id: string
    status: string // Status: Filed, Accepted, Rejected, Draft
    creator: string
    createTime: string
    updater: string
    updateTime: string
    // 备案信息
    filingNo: string
    licenseNo: string
    carrier: string
    route: string
    // 航次信息
    vessel: string
    voyage: string
    pol: string // Port of Loading
    pod: string // Port of Discharge
    etd: string
    // 货物信息
    qty: number
    weight: number
    volume: number
    shipper: string
    consignee: string
}

/**
 * 状态徽章组件
 */
const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        "Filed": "bg-blue-50 text-blue-700 ring-blue-600/20",
        "Accepted": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        "Rejected": "bg-red-50 text-red-700 ring-red-600/20",
        "Draft": "bg-slate-50 text-slate-600 ring-slate-500/20",
    }
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status] || "bg-slate-50 text-slate-600 ring-slate-500/20"}`}
        >
            {status}
        </span>
    )
}

/**
 * 带 Tooltip 的操作按钮
 */
const ActionButton = ({
    icon: Icon,
    label,
    className = "",
    onClick,
}: {
    icon: React.ElementType
    label: string
    className?: string
    onClick?: () => void
}) => (
    <div className="relative group">
        <button className={`p-1.5 transition-colors ${className}`} onClick={onClick}>
            <Icon className="h-4 w-4" />
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {label}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
    </div>
)

/**
 * 操作按钮组件
 */
const ActionButtons = ({
    id,
    onView,
    onEdit,
}: {
    id: string
    onView: (id: string) => void
    onEdit: (id: string) => void
}) => (
    <div className="flex items-center gap-0.5">
        <ActionButton
            icon={Eye}
            label="查看"
            className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
            onClick={() => onView(id)}
        />
        <ActionButton
            icon={Edit}
            label="编辑"
            className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
            onClick={() => onEdit(id)}
        />
        <ActionButton icon={Send} label="发送备案" className="hover:bg-teal-50 text-slate-500 hover:text-teal-600" />
        <ActionButton icon={Download} label="下载回执" className="hover:bg-slate-100 text-slate-500 hover:text-slate-700" />
    </div>
)

interface NVOCCListProps {
    title: string
    description: string
}

/**
 * China NVOCC 列表组件
 */
export default function NVOCCList({ title, description }: NVOCCListProps) {
    const navigate = useNavigate()

    const handleView = useCallback((id: string) => {
        navigate(`/dashboard/compliance/chinanvocc/view/${id}`)
    }, [navigate])

    const handleEdit = useCallback((id: string) => {
        navigate(`/dashboard/compliance/chinanvocc/edit/${id}`)
    }, [navigate])

    // Mock 数据配置
    const statuses = ["Filed", "Accepted", "Rejected", "Draft"]
    const users = ["John Smith", "Emily Chen", "Robert Wang"]
    const carriers = ["COSCO", "MAERSK", "CMA CGM", "MSC", "EVERGREEN"]
    const routes = ["CN-US", "CN-EU", "CN-JP", "CN-KR"]
    const pols = ["Shanghai", "Ningbo", "Shenzhen", "Qingdao"]
    const pods = ["Los Angeles", "Long Beach", "Rotterdam", "Hamburg", "Tokyo"]
    const shippers = ["SHANGHAI TRADING", "NINGBO EXPORT", "QINGDAO LOGISTICS"]
    const consignees = ["US IMPORTS INC", "EU TRADING GMBH", "JP RETAIL LTD"]

    // 生成 mock 数据
    const data: NVOCCRecord[] = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => {
            const idx = i + 1
            const status = statuses[Math.floor(Math.random() * statuses.length)]

            return {
                id: `NVOCC${String(idx).padStart(6, "0")}`,
                filingNo: `FIL${String(idx).padStart(10, "0")}`,
                licenseNo: `MOC-NV${Math.floor(Math.random() * 90000) + 10000}`,
                carrier: carriers[Math.floor(Math.random() * carriers.length)],
                route: routes[Math.floor(Math.random() * routes.length)],
                status,
                creator: users[Math.floor(Math.random() * users.length)],
                createTime: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                updater: users[Math.floor(Math.random() * users.length)],
                updateTime: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                vessel: "COSCO STAR",
                voyage: `${Math.floor(Math.random() * 90)}E`,
                pol: pols[Math.floor(Math.random() * pols.length)],
                pod: pods[Math.floor(Math.random() * pods.length)],
                etd: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                qty: Math.floor(Math.random() * 1000) + 10,
                weight: Math.floor(Math.random() * 20000) + 500,
                volume: Math.floor(Math.random() * 60) + 1,
                shipper: shippers[Math.floor(Math.random() * shippers.length)],
                consignee: consignees[Math.floor(Math.random() * consignees.length)],
            }
        })
    }, [])

    // 列定义
    const columns: ColumnDef<NVOCCRecord, unknown>[] = useMemo(
        () => [
            {
                accessorKey: "filingNo",
                header: "备案号",
                cell: ({ row }) => <span className="font-mono font-medium">{row.getValue("filingNo")}</span>,
                size: 140,
            },
            {
                accessorKey: "status",
                header: "状态",
                cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "carrier",
                header: "承运人",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("carrier")}</span>,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "licenseNo",
                header: "许可证号",
                cell: ({ row }) => <span className="font-mono">{row.getValue("licenseNo")}</span>,
                size: 120,
            },
            {
                accessorKey: "route",
                header: "航线",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("route")}</span>,
                meta: { filterVariant: "select" },
                size: 80,
            },
            {
                accessorKey: "pol",
                header: "装货港",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("pol")}</span>,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "pod",
                header: "卸货港",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("pod")}</span>,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "vessel",
                header: "船名",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("vessel")}>{row.getValue("vessel")}</span>,
                size: 150,
            },
            {
                accessorKey: "voyage",
                header: "航次",
                cell: ({ row }) => <span>{row.getValue("voyage")}</span>,
                size: 80,
            },
            {
                accessorKey: "shipper",
                header: "发货人",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("shipper")}>{row.getValue("shipper")}</span>,
                size: 150,
            },
            {
                accessorKey: "consignee",
                header: "收货人",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("consignee")}>{row.getValue("consignee")}</span>,
                size: 150,
            },
            {
                id: "actions",
                header: "操作",
                cell: ({ row }) => (
                    <ActionButtons
                        id={row.original.id}
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                ),
                enableSorting: false,
                enableColumnFilter: false,
                enableResizing: false,
                size: 140,
            },
        ],
        [handleView, handleEdit]
    )

    // 视图模式
    const [viewMode, setViewMode] = useState<"table" | "pivot">("table")
    const [selectedRows, setSelectedRows] = useState<NVOCCRecord[]>([])

    // 批量操作按钮
    const batchActions = useMemo(() => (
        <div className="flex items-center gap-1">
            <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={() => console.log("Batch delete", selectedRows)}
            >
                <Trash2 className="h-3.5 w-3.5" />
                删除
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={() => console.log("Batch export", selectedRows)}
            >
                <Download className="h-3.5 w-3.5" />
                导出
            </Button>
        </div>
    ), [selectedRows])

    // 透视表字段定义
    const pivotFields: PivotField[] = useMemo(
        () => [
            { id: "filingNo", label: "备案号", type: "string" },
            { id: "status", label: "状态", type: "string" },
            { id: "carrier", label: "承运人", type: "string" },
            { id: "pol", label: "装货港", type: "string" },
            { id: "pod", label: "卸货港", type: "string" },
            { id: "shipper", label: "发货人", type: "string" },
            { id: "consignee", label: "收货人", type: "string" },
            { id: "qty", label: "件数", type: "number" },
            { id: "weight", label: "毛重", type: "number" },
        ],
        []
    )

    const viewSwitcher = (
        <div className="flex items-center bg-slate-100 p-1">
            <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
            >
                <Table2 className="h-4 w-4" />
                表格
            </button>
            <button
                onClick={() => setViewMode("pivot")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === "pivot" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
            >
                <BarChart3 className="h-4 w-4" />
                透视表
            </button>
        </div>
    )

    return (
        <div className="flex flex-col min-w-0 h-full">
            {/* 页面标题和操作按钮 */}
            <div className="flex-shrink-0 mb-3">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500">{description}</span>
                </div>
                <div className="h-[2px] mt-3 mb-2 w-full bg-gradient-to-r from-slate-400 via-slate-300 to-transparent" />
                <div className="flex items-center gap-2 bg-white px-3 py-2 shadow-sm border border-slate-200">
                    <Button
                        size="sm"
                        className="gap-1.5 bg-teal-600 hover:bg-teal-700"
                    >
                        <Plus className="h-4 w-4" />
                        新建备案
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5">
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        Excel导入
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        AI识别
                    </Button>
                </div>
            </div>

            {/* 根据视图模式显示不同内容 */}
            {viewMode === "table" ? (
                <Card className="p-4 min-w-0 flex-1 flex flex-col overflow-hidden">
                    <DataTable
                        data={data}
                        columns={columns}
                        searchPlaceholder="搜索备案号、许可证号、承运人..."
                        enableRowSelection
                        enableColumnResizing
                        enableColumnOrdering
                        enableContextMenu
                        enableExport
                        pageSize={20}
                        toolbarRight={viewSwitcher}
                        onSelectionChange={setSelectedRows}
                        batchActions={batchActions}
                    />
                </Card>
            ) : (
                <Card className="p-4">
                    <div className="flex items-center justify-end mb-4">{viewSwitcher}</div>
                    <PivotTable
                        data={data}
                        fields={pivotFields}
                        defaultRowFields={["status", "carrier"]}
                        defaultValueFields={[{ fieldId: "qty", type: "sum" }]}
                    />
                </Card>
            )}
        </div>
    )
}
