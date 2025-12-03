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
    Download,
    ShieldCheck,
    Trash2,
} from "lucide-react"

/**
 * Bond 记录数据类型
 */
interface BondRecord {
    // 系统字段
    id: string
    status: string
    creator: string
    createTime: string
    updater: string
    updateTime: string
    // Bond信息
    bondNo: string
    bondType: string // Continuous, Single Transaction
    amount: number
    effectiveDate: string
    expiryDate: string
    // 关联方
    principalName: string // 被担保人
    suretyName: string // 担保公司
    portCode: string
    commodity: string
}

/**
 * 状态徽章组件
 */
const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        Terminated: "bg-red-50 text-red-700 ring-red-600/20",
        Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
        Draft: "bg-slate-50 text-slate-600 ring-slate-500/20",
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
        <ActionButton icon={ShieldCheck} label="续费" className="hover:bg-teal-50 text-slate-500 hover:text-teal-600" />
        <ActionButton icon={Download} label="下载证书" className="hover:bg-slate-100 text-slate-500 hover:text-slate-700" />
    </div>
)

interface BondListProps {
    title: string
    description: string
}

/**
 * Bond 列表组件
 */
export default function BondList({ title, description }: BondListProps) {
    const navigate = useNavigate()

    const handleView = useCallback((id: string) => {
        navigate(`/dashboard/compliance/bond/view/${id}`)
    }, [navigate])

    const handleEdit = useCallback((id: string) => {
        navigate(`/dashboard/compliance/bond/edit/${id}`)
    }, [navigate])

    // Mock 数据配置
    const bondTypes = ["Continuous", "Single Transaction"]
    const statuses = ["Active", "Pending", "Terminated", "Draft"]
    const sureties = ["Avalon Risk Management", "Hartford Fire Insurance", "Great American Insurance"]
    const principals = ["GLOBAL TRADING INC", "EASTERN IMPORTS LLC", "PACIFIC LOGISTICS CO"]
    const users = ["John Smith", "Emily Chen", "Robert Wang"]

    // 生成 mock 数据
    const data: BondRecord[] = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => {
            const idx = i + 1
            const status = statuses[Math.floor(Math.random() * statuses.length)]
            const type = bondTypes[Math.floor(Math.random() * bondTypes.length)]
            const amount = type === "Continuous" ? 50000 : Math.floor(Math.random() * 10000) + 1000

            return {
                id: `BOND${String(idx).padStart(6, "0")}`,
                bondNo: `${Math.floor(Math.random() * 900000000) + 100000000}`,
                status,
                creator: users[Math.floor(Math.random() * users.length)],
                createTime: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                updater: users[Math.floor(Math.random() * users.length)],
                updateTime: `2024-02-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                bondType: type,
                amount,
                effectiveDate: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                expiryDate: type === "Continuous" ? "2025-01-01" : `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                principalName: principals[Math.floor(Math.random() * principals.length)],
                suretyName: sureties[Math.floor(Math.random() * sureties.length)],
                portCode: "2704",
                commodity: "General Cargo",
            }
        })
    }, [])

    // 列定义
    const columns: ColumnDef<BondRecord, unknown>[] = useMemo(
        () => [
            {
                accessorKey: "bondNo",
                header: "Bond No",
                cell: ({ row }) => <span className="font-mono font-medium">{row.getValue("bondNo")}</span>,
                size: 120,
            },
            {
                accessorKey: "status",
                header: "状态",
                cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
                meta: { filterVariant: "select" },
                size: 100,
            },
            {
                accessorKey: "bondType",
                header: "类型",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("bondType")}</span>,
                meta: { filterVariant: "select" },
                size: 140,
            },
            {
                accessorKey: "amount",
                header: "金额 (USD)",
                cell: ({ row }) => <span className="font-mono">{(row.getValue("amount") as number).toLocaleString()}</span>,
                size: 120,
            },
            {
                accessorKey: "principalName",
                header: "被担保人 (Principal)",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[200px]" title={row.getValue("principalName")}>{row.getValue("principalName")}</span>,
                size: 200,
            },
            {
                accessorKey: "suretyName",
                header: "担保公司 (Surety)",
                cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[200px]" title={row.getValue("suretyName")}>{row.getValue("suretyName")}</span>,
                size: 200,
            },
            {
                accessorKey: "effectiveDate",
                header: "生效日期",
                cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("effectiveDate")}</span>,
                meta: { filterVariant: "date" },
                size: 120,
            },
            {
                accessorKey: "expiryDate",
                header: "到期日期",
                cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("expiryDate")}</span>,
                meta: { filterVariant: "date" },
                size: 120,
            },
            {
                accessorKey: "portCode",
                header: "港口代码",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("portCode")}</span>,
                size: 100,
            },
            {
                accessorKey: "creator",
                header: "创建人",
                cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("creator")}</span>,
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
    const [selectedRows, setSelectedRows] = useState<BondRecord[]>([])

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
            { id: "bondNo", label: "Bond No", type: "string" },
            { id: "status", label: "状态", type: "string" },
            { id: "bondType", label: "类型", type: "string" },
            { id: "amount", label: "金额", type: "number" },
            { id: "principalName", label: "被担保人", type: "string" },
            { id: "suretyName", label: "担保公司", type: "string" },
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
                        新建Bond
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5">
                        <Download className="h-4 w-4" />
                        导出列表
                    </Button>
                </div>
            </div>

            {/* 根据视图模式显示不同内容 */}
            {viewMode === "table" ? (
                <Card className="p-4 min-w-0 flex-1 flex flex-col overflow-hidden">
                    <DataTable
                        data={data}
                        columns={columns}
                        searchPlaceholder="搜索Bond号、被担保人..."
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
                        defaultRowFields={["status", "bondType"]}
                        defaultValueFields={[{ fieldId: "amount", type: "sum" }]}
                    />
                </Card>
            )}
        </div>
    )
}
