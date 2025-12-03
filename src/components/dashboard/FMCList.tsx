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
 * US FMC 备案记录数据类型
 */
interface FMCRecord {
    // 系统字段
    id: string
    status: string // Status: Filed, Accepted, Rejected, Draft, Expired
    creator: string
    createTime: string
    updater: string
    updateTime: string
    // 备案信息
    tariffNo: string
    orgNo: string
    filingType: string // NRA, RATE, RULE
    // 运价信息
    carrier: string
    origin: string
    destination: string
    commodity: string
    rate: number
    currency: string
    effectiveDate: string
    expirationDate: string
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
        "Expired": "bg-gray-50 text-gray-700 ring-gray-600/20",
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

interface FMCListProps {
    title: string
    description: string
}

/**
 * US FMC 列表组件
 */
export default function FMCList({ title, description }: FMCListProps) {
    const navigate = useNavigate()

    const handleView = useCallback((id: string) => {
        navigate(`/dashboard/compliance/usfmc/view/${id}`)
    }, [navigate])

    const handleEdit = useCallback((id: string) => {
        navigate(`/dashboard/compliance/usfmc/edit/${id}`)
    }, [navigate])

    // Mock 数据配置
    const statuses = ["Filed", "Accepted", "Rejected", "Draft", "Expired"]
    const users = ["John Smith", "Emily Chen", "Robert Wang"]
    const types = ["NRA", "RATE", "RULE"]
    const carriers = ["COSCO", "MAERSK", "CMA CGM", "MSC", "EVERGREEN"]
    const origins = ["Shanghai", "Ningbo", "Shenzhen", "Qingdao"]
    const destinations = ["Los Angeles", "Long Beach", "New York", "Savannah"]
    const commodities = ["ELECTRONICS", "FURNITURE", "TEXTILES", "MACHINERY"]

    // 生成 mock 数据
    const data: FMCRecord[] = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => {
            const idx = i + 1
            const status = statuses[Math.floor(Math.random() * statuses.length)]
            const type = types[Math.floor(Math.random() * types.length)]

            return {
                id: `FMC${String(idx).padStart(6, "0")}`,
                tariffNo: `TRF${String(idx).padStart(6, "0")}`,
                orgNo: `ORG${Math.floor(Math.random() * 90000) + 10000}`,
                filingType: type,
                status,
                creator: users[Math.floor(Math.random() * users.length)],
                createTime: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                updater: users[Math.floor(Math.random() * users.length)],
                updateTime: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                carrier: carriers[Math.floor(Math.random() * carriers.length)],
                origin: origins[Math.floor(Math.random() * origins.length)],
                destination: destinations[Math.floor(Math.random() * destinations.length)],
                commodity: commodities[Math.floor(Math.random() * commodities.length)],
                rate: Math.floor(Math.random() * 5000) + 1000,
                currency: "USD",
                effectiveDate: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                expirationDate: `2024-04-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
            }
        })
    }, [])

    // 列定义
    const columns: ColumnDef<FMCRecord, unknown>[] = useMemo(
        () => [
            {
                accessorKey: "tariffNo",
                header: "运价本号",
                cell: ({ row }) => <span className="font-mono font-medium">{row.getValue("tariffNo")}</span>,
                size: 100,
            },
            {
                accessorKey: "status",
                header: "状态",
                cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "filingType",
                header: "类型",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("filingType")}</span>,
                meta: { filterVariant: "select" },
                size: 80,
            },
            {
                accessorKey: "orgNo",
                header: "组织代码",
                cell: ({ row }) => <span className="font-mono">{row.getValue("orgNo")}</span>,
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
                accessorKey: "origin",
                header: "起运地",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("origin")}</span>,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "destination",
                header: "目的地",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("destination")}</span>,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "commodity",
                header: "品名",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("commodity")}>{row.getValue("commodity")}</span>,
                size: 150,
            },
            {
                accessorKey: "rate",
                header: "费率",
                cell: ({ row }) => <span>{row.original.currency} {(row.getValue("rate") as number).toLocaleString()}</span>,
                size: 100,
            },
            {
                accessorKey: "effectiveDate",
                header: "生效日期",
                cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("effectiveDate")}</span>,
                meta: { filterVariant: "date" },
                size: 100,
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
    const [selectedRows, setSelectedRows] = useState<FMCRecord[]>([])

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
            { id: "tariffNo", label: "运价本号", type: "string" },
            { id: "status", label: "状态", type: "string" },
            { id: "filingType", label: "类型", type: "string" },
            { id: "carrier", label: "承运人", type: "string" },
            { id: "origin", label: "起运地", type: "string" },
            { id: "destination", label: "目的地", type: "string" },
            { id: "commodity", label: "品名", type: "string" },
            { id: "rate", label: "费率", type: "number" },
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
                        searchPlaceholder="搜索运价本号、组织代码、品名..."
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
                        defaultRowFields={["status", "filingType"]}
                        defaultValueFields={[{ fieldId: "rate", type: "sum" }]}
                    />
                </Card>
            )}
        </div>
    )
}
