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
 * ISF 申报记录数据类型
 */
interface ISFRecord {
    // 系统字段
    id: string
    status: string // ISF Status: Accepted, Rejected, Pending, Draft
    creator: string
    createTime: string
    updater: string
    updateTime: string
    // 申报信息
    isfNo: string
    mblNo: string // Master Bill of Lading
    hblNo: string // House Bill of Lading
    amsNo: string // AMS Bill of Lading
    // 实体信息
    importer: string
    consignee: string
    buyer: string
    seller: string
    manufacturer: string
    bookingParty: string
    shipToParty: string
    containerStuffingLoc: string
    consolidator: string
    // 航次信息
    vessel: string
    voyage: string
    etd: string
    eta: string
    pol: string // Port of Loading
    pod: string // Port of Discharge
}

/**
 * 状态徽章组件
 */
const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        "Accepted": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        "Rejected": "bg-red-50 text-red-700 ring-red-600/20",
        "Pending": "bg-blue-50 text-blue-700 ring-blue-600/20",
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
        <ActionButton icon={Send} label="发送ISF" className="hover:bg-teal-50 text-slate-500 hover:text-teal-600" />
        <ActionButton icon={Download} label="下载回执" className="hover:bg-slate-100 text-slate-500 hover:text-slate-700" />
    </div>
)

interface ISFListProps {
    title: string
    description: string
}

/**
 * ISF 列表组件
 */
export default function ISFList({ title, description }: ISFListProps) {
    const navigate = useNavigate()

    const handleView = useCallback((id: string) => {
        navigate(`/dashboard/customs/isf/view/${id}`)
    }, [navigate])

    const handleEdit = useCallback((id: string) => {
        navigate(`/dashboard/customs/isf/edit/${id}`)
    }, [navigate])

    // Mock 数据配置
    const statuses = ["Accepted", "Rejected", "Pending", "Draft"]
    const users = ["John Smith", "Emily Chen", "Robert Wang"]
    const vessels = ["COSCO STAR", "MAERSK ALABAMA", "EVER GIVEN", "CMA CGM MARCO POLO"]
    const pols = ["Shanghai", "Ningbo", "Shenzhen", "Qingdao"]
    const pods = ["Los Angeles", "Long Beach", "New York", "Savannah"]
    const importers = ["US IMPORTS INC", "GLOBAL TRADING LLC", "NORTH AMERICAN MFG"]
    const sellers = ["SHANGHAI TRADING", "NINGBO EXPORT", "QINGDAO LOGISTICS"]

    // 生成 mock 数据
    const data: ISFRecord[] = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => {
            const idx = i + 1
            const status = statuses[Math.floor(Math.random() * statuses.length)]

            return {
                id: `ISF${String(idx).padStart(6, "0")}`,
                isfNo: `ISF${String(idx).padStart(10, "0")}`,
                mblNo: `MBL${Math.floor(Math.random() * 90000000) + 10000000}`,
                hblNo: `HBL${Math.floor(Math.random() * 90000000) + 10000000}`,
                amsNo: `AMS${Math.floor(Math.random() * 90000000) + 10000000}`,
                status,
                creator: users[Math.floor(Math.random() * users.length)],
                createTime: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                updater: users[Math.floor(Math.random() * users.length)],
                updateTime: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                importer: importers[Math.floor(Math.random() * importers.length)],
                consignee: importers[Math.floor(Math.random() * importers.length)],
                buyer: importers[Math.floor(Math.random() * importers.length)],
                seller: sellers[Math.floor(Math.random() * sellers.length)],
                manufacturer: sellers[Math.floor(Math.random() * sellers.length)],
                bookingParty: sellers[Math.floor(Math.random() * sellers.length)],
                shipToParty: importers[Math.floor(Math.random() * importers.length)],
                containerStuffingLoc: sellers[Math.floor(Math.random() * sellers.length)],
                consolidator: "GLOBAL LOGISTICS CO",
                vessel: vessels[Math.floor(Math.random() * vessels.length)],
                voyage: `${Math.floor(Math.random() * 90)}W`,
                etd: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                eta: `2024-04-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                pol: pols[Math.floor(Math.random() * pols.length)],
                pod: pods[Math.floor(Math.random() * pods.length)],
            }
        })
    }, [])

    // 列定义
    const columns: ColumnDef<ISFRecord, unknown>[] = useMemo(
        () => [
            {
                accessorKey: "isfNo",
                header: "ISF No",
                cell: ({ row }) => <span className="font-mono font-medium">{row.getValue("isfNo")}</span>,
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
                accessorKey: "mblNo",
                header: "MBL No",
                cell: ({ row }) => <span className="font-mono">{row.getValue("mblNo")}</span>,
                size: 140,
            },
            {
                accessorKey: "hblNo",
                header: "HBL No",
                cell: ({ row }) => <span className="font-mono">{row.getValue("hblNo")}</span>,
                size: 140,
            },
            {
                accessorKey: "importer",
                header: "进口商 (Importer)",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("importer")}>{row.getValue("importer")}</span>,
                size: 150,
            },
            {
                accessorKey: "seller",
                header: "卖家 (Seller)",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("seller")}>{row.getValue("seller")}</span>,
                size: 150,
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
                accessorKey: "etd",
                header: "ETD",
                cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("etd")}</span>,
                meta: { filterVariant: "date" },
                size: 100,
            },
            {
                accessorKey: "eta",
                header: "ETA",
                cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("eta")}</span>,
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
    const [selectedRows, setSelectedRows] = useState<ISFRecord[]>([])

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
            { id: "isfNo", label: "ISF No", type: "string" },
            { id: "status", label: "状态", type: "string" },
            { id: "importer", label: "进口商", type: "string" },
            { id: "seller", label: "卖家", type: "string" },
            { id: "vessel", label: "船名", type: "string" },
            { id: "pol", label: "装货港", type: "string" },
            { id: "pod", label: "卸货港", type: "string" },
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
                        新建ISF
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
                        searchPlaceholder="搜索ISF号、MBL、HBL..."
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
                        defaultRowFields={["status", "importer"]}
                        defaultValueFields={[{ fieldId: "isfNo", type: "count" }]}
                    />
                </Card>
            )}
        </div>
    )
}
