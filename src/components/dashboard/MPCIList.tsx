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
  Trash2,
  Send,
  Table2,
  BarChart3,
  FileSpreadsheet,
  Sparkles,
  Download,
  XCircle,
} from "lucide-react"
import MPCIExportDialog from "./MPCIExportDialog"

/**
 * MPCI 申报记录数据类型
 */
interface MPCIRecord {
  // 系统字段
  declarationNo: string
  verifyStatus: string
  declareStatus: string
  customsStatus: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
  // 基本信息
  declarantMpciId: string
  transportType: string
  hasSubHbl: boolean
  blIssueDate: string
  estimatedShipDate: string
  // 提单信息
  blType: string
  hblNo: string
  upperBlIssuerType: string
  upperBlIssuerMpciId: string
  upperBlNo: string
  siblingHblCount: number
  subDeclarantMpciId: string
  // 港口信息
  placeOfReceipt: string
  portOfLoading: string
  portOfDischarge: string
  placeOfDelivery: string
  clearanceLocation: string
  // 收发通信息（只显示抬头）
  shipperName: string
  consigneeName: string
  forwarderName: string
  // 汇总信息
  totalQuantity: number
  totalWeight: number
  totalVolume: number
  containerSummary: string
}

/**
 * 状态徽章组件
 */
const StatusBadge = ({
  status,
  type,
}: {
  status: string
  type: "verify" | "declare" | "customs"
}) => {
  const styles: Record<string, Record<string, string>> = {
    verify: {
      校验通过: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      校验失败: "bg-red-50 text-red-700 ring-red-600/20",
    },
    declare: {
      草稿: "bg-slate-50 text-slate-600 ring-slate-500/20",
      已提交: "bg-blue-50 text-blue-700 ring-blue-600/20",
      发送成功: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      已删除: "bg-red-50 text-red-700 ring-red-600/20",
      已过期: "bg-amber-50 text-amber-700 ring-amber-600/20",
    },
    customs: {
      允许装船: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      要求补充信息: "bg-amber-50 text-amber-700 ring-amber-600/20",
      风险装船: "bg-orange-50 text-orange-700 ring-orange-600/20",
      禁止装船: "bg-red-50 text-red-700 ring-red-600/20",
      下层未申报: "bg-slate-50 text-slate-600 ring-slate-500/20",
    },
  }
  const typeStyles = styles[type] || styles.verify
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${typeStyles[status] || "bg-slate-50 text-slate-600 ring-slate-500/20"}`}
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
  declarationNo,
  onView,
  onEdit,
  onExport,
}: {
  declarationNo: string
  onView: (id: string) => void
  onEdit: (id: string) => void
  onExport: (id: string) => void
}) => (
  <div className="flex items-center gap-0.5">
    <ActionButton
      icon={Eye}
      label="查看"
      className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
      onClick={() => onView(declarationNo)}
    />
    <ActionButton
      icon={Edit}
      label="编辑"
      className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
      onClick={() => onEdit(declarationNo)}
    />
    <ActionButton icon={Send} label="发送" className="hover:bg-teal-50 text-slate-500 hover:text-teal-600" />
    <ActionButton 
      icon={Download} 
      label="导出" 
      className="hover:bg-slate-100 text-slate-500 hover:text-slate-700" 
      onClick={() => onExport(declarationNo)}
    />
    <ActionButton icon={Trash2} label="删除" className="hover:bg-red-50 text-slate-500 hover:text-red-600" />
  </div>
)

interface MPCIListProps {
  title: string
  description: string
}

/**
 * MPCI 申报列表组件
 */
export default function MPCIList({ title, description }: MPCIListProps) {
  const navigate = useNavigate()

  /**
   * 跳转到查看页面
   */
  const handleView = useCallback((declarationNo: string) => {
    navigate(`/dashboard/customs/uae-mpci/view/${declarationNo}`)
  }, [navigate])

  /**
   * 跳转到编辑页面
   */
  const handleEdit = useCallback((declarationNo: string) => {
    navigate(`/dashboard/customs/uae-mpci/edit/${declarationNo}`)
  }, [navigate])

  // 导出弹窗状态
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportRecord, setExportRecord] = useState<MPCIRecord | null>(null)

  // Mock 数据配置
  const carriers = ["MAEU", "MSCU", "COSU", "OOLU", "EGLV", "YMLU", "HLCU", "ONEY", "CMDU"]
  
  // 港口名称映射（五码 -> 全称）
  const portNameMap: Record<string, string> = {
    CNSHA: "Shanghai",
    CNSHE: "Shenzhen",
    CNNGB: "Ningbo",
    CNQIN: "Qingdao",
    CNTAO: "Qingdao",
    HKHKG: "Hong Kong",
    SGSIN: "Singapore",
    AEJEA: "Jebel Ali",
    AEDXB: "Dubai",
    AEAUH: "Abu Dhabi",
    AESHJ: "Sharjah",
  }
  
  /**
   * 格式化港口显示：全称 - 五码
   */
  const formatPort = (code: string) => {
    const name = portNameMap[code] || code
    return `${name} - ${code}`
  }
  
  const ports = ["CNSHA", "CNSHE", "CNNGB", "CNQIN", "CNTAO", "HKHKG", "SGSIN"]
  const uaePorts = ["AEJEA", "AEDXB", "AEAUH", "AESHJ"]
  const clearanceLocations = ["AZ", "DU", "SH", "UQ", "AJ", "FU", "RK"]
  const verifyStatuses = ["校验通过", "校验失败"]
  const declareStatuses = ["草稿", "已提交", "发送成功", "已删除", "已过期"]
  const customsStatuses = ["允许装船", "要求补充信息", "风险装船", "禁止装船", "下层未申报"]
  const users = ["John Smith", "Emily Chen", "Robert Wang", "Lisa Zhang", "Kevin Liu"]
  const shippers = ["SHANGHAI GLOBAL TRADING CO LTD", "SHENZHEN IMPORT EXPORT CORP", "GUANGZHOU INTL TRADE"]
  const consignees = ["DUBAI TRADING LLC", "SHARJAH IMPORT CO", "UAE GLOBAL TRADE", "ABU DHABI IMPORTS"]
  const forwarders = ["ORIENT LOGISTICS", "GLOBAL FREIGHT", "PACIFIC SHIPPING"]

  // 生成 mock 数据
  const data: MPCIRecord[] = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      const idx = i + 1
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")
      const hour = String(Math.floor(Math.random() * 12) + 8).padStart(2, "0")
      const minute = String(Math.floor(Math.random() * 60)).padStart(2, "0")
      const declareStatus = declareStatuses[Math.floor(Math.random() * declareStatuses.length)]
      const hasSubHbl = Math.random() > 0.7
      const qty = Math.floor(Math.random() * 500) + 10
      const weight = Math.floor(Math.random() * 20000) + 1000
      const volume = Math.floor(Math.random() * 50) + 5
      // 生成箱型箱量汇总
      const c20 = Math.floor(Math.random() * 3)
      const c40 = Math.floor(Math.random() * 3)
      const c40hq = Math.floor(Math.random() * 3)
      const containerParts = []
      if (c20 > 0) containerParts.push(`20GP×${c20}`)
      if (c40 > 0) containerParts.push(`40GP×${c40}`)
      if (c40hq > 0) containerParts.push(`40HQ×${c40hq}`)
      const containerSummary = containerParts.length > 0 ? containerParts.join(" ") : "20GP×1"

      return {
        declarationNo: `MPCI2024${String(idx).padStart(6, "0")}`,
        verifyStatus: verifyStatuses[Math.floor(Math.random() * verifyStatuses.length)],
        declareStatus,
        customsStatus: declareStatus === "草稿" ? "" : customsStatuses[Math.floor(Math.random() * customsStatuses.length)],
        creator: users[Math.floor(Math.random() * users.length)],
        createTime: `2024-01-${day} ${hour}:${minute}`,
        updater: users[Math.floor(Math.random() * users.length)],
        updateTime: `2024-01-${day} ${String(Number(hour) + 2).padStart(2, "0")}:${minute}`,
        declarantMpciId: `AEMP${String(Math.floor(Math.random() * 9000) + 1000)}`,
        transportType: Math.random() > 0.3 ? "进口" : "中转",
        hasSubHbl,
        blIssueDate: `2024-01-${day}`,
        estimatedShipDate: `2024-02-${day}`,
        blType: Math.random() > 0.5 ? "NON" : "NEG",
        hblNo: `HBL${String(idx).padStart(8, "0")}`,
        upperBlIssuerType: Math.random() > 0.3 ? "船公司" : "货代",
        upperBlIssuerMpciId: carriers[Math.floor(Math.random() * carriers.length)],
        upperBlNo: `MBL${String(idx + 1000).padStart(8, "0")}`,
        siblingHblCount: Math.floor(Math.random() * 5) + 1,
        subDeclarantMpciId: hasSubHbl ? `AEMP${String(Math.floor(Math.random() * 9000) + 1000)}` : "",
        placeOfReceipt: formatPort(ports[Math.floor(Math.random() * ports.length)]),
        portOfLoading: formatPort(ports[Math.floor(Math.random() * ports.length)]),
        portOfDischarge: formatPort(uaePorts[Math.floor(Math.random() * uaePorts.length)]),
        placeOfDelivery: formatPort(uaePorts[Math.floor(Math.random() * uaePorts.length)]),
        clearanceLocation: clearanceLocations[Math.floor(Math.random() * clearanceLocations.length)],
        shipperName: shippers[Math.floor(Math.random() * shippers.length)],
        consigneeName: consignees[Math.floor(Math.random() * consignees.length)],
        forwarderName: forwarders[Math.floor(Math.random() * forwarders.length)],
        totalQuantity: qty,
        totalWeight: weight,
        totalVolume: volume,
        containerSummary,
      }
    })
  }, [])

  /**
   * 打开导出预览弹窗
   */
  const handleExport = useCallback((declarationNo: string) => {
    const record = data.find((r) => r.declarationNo === declarationNo)
    if (record) {
      setExportRecord(record)
      setExportDialogOpen(true)
    }
  }, [data])

  // 列定义
  const columns: ColumnDef<MPCIRecord, unknown>[] = useMemo(
    () => [
      {
        accessorKey: "hblNo",
        header: "HBL No",
        cell: ({ row }) => <span className="font-medium whitespace-nowrap">{row.getValue("hblNo")}</span>,
        size: 130,
      },
      {
        accessorKey: "declarationNo",
        header: "申报单号",
        cell: ({ row }) => (
          <span className="font-mono text-xs bg-slate-100 px-2 py-1 whitespace-nowrap">
            {row.getValue("declarationNo")}
          </span>
        ),
        size: 140,
      },
      {
        accessorKey: "verifyStatus",
        header: "校验状态",
        cell: ({ row }) => <StatusBadge status={row.getValue("verifyStatus")} type="verify" />,
        meta: { filterVariant: "select" },
        size: 90,
      },
      {
        accessorKey: "declareStatus",
        header: "申报状态",
        cell: ({ row }) => <StatusBadge status={row.getValue("declareStatus")} type="declare" />,
        meta: { filterVariant: "select" },
        size: 90,
      },
      {
        accessorKey: "customsStatus",
        header: "海关回执",
        cell: ({ row }) => {
          const val = row.getValue("customsStatus") as string
          return val ? <StatusBadge status={val} type="customs" /> : <span className="text-slate-400">-</span>
        },
        meta: { filterVariant: "select" },
        size: 100,
      },
      {
        accessorKey: "upperBlNo",
        header: "上层提单号",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("upperBlNo")}</span>,
        size: 130,
      },
      {
        accessorKey: "blType",
        header: "提单类型",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("blType")}</span>,
        meta: { filterVariant: "select" },
        size: 80,
      },
      {
        accessorKey: "transportType",
        header: "运输类型",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("transportType")}</span>,
        meta: { filterVariant: "select" },
        size: 80,
      },
      {
        accessorKey: "declarantMpciId",
        header: "申报责任方",
        cell: ({ row }) => <span className="font-mono text-xs whitespace-nowrap">{row.getValue("declarantMpciId")}</span>,
        size: 100,
      },
      {
        accessorKey: "upperBlIssuerMpciId",
        header: "上层签发人",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("upperBlIssuerMpciId")}</span>,
        size: 100,
      },
      {
        accessorKey: "portOfLoading",
        header: "装货港",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("portOfLoading")}</span>,
        meta: { filterVariant: "select" },
        size: 150,
      },
      {
        accessorKey: "portOfDischarge",
        header: "卸货港",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("portOfDischarge")}</span>,
        meta: { filterVariant: "select" },
        size: 140,
      },
      {
        accessorKey: "placeOfDelivery",
        header: "目的港",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("placeOfDelivery")}</span>,
        meta: { filterVariant: "select" },
        size: 140,
      },
      {
        accessorKey: "clearanceLocation",
        header: "清关地",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("clearanceLocation")}</span>,
        meta: { filterVariant: "select" },
        size: 70,
      },
      {
        accessorKey: "shipperName",
        header: "发货人",
        cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("shipperName")}>{row.getValue("shipperName")}</span>,
        size: 150,
      },
      {
        accessorKey: "consigneeName",
        header: "收货人",
        cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[150px]" title={row.getValue("consigneeName")}>{row.getValue("consigneeName")}</span>,
        size: 150,
      },
      {
        accessorKey: "forwarderName",
        header: "起运港货代",
        cell: ({ row }) => <span className="whitespace-nowrap truncate max-w-[120px]" title={row.getValue("forwarderName")}>{row.getValue("forwarderName")}</span>,
        size: 120,
      },
      {
        accessorKey: "containerSummary",
        header: "箱型箱量",
        cell: ({ row }) => <span className="whitespace-nowrap text-xs">{row.getValue("containerSummary")}</span>,
        size: 120,
      },
      {
        accessorKey: "totalQuantity",
        header: "件数",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("totalQuantity")}</span>,
        size: 70,
      },
      {
        accessorKey: "totalWeight",
        header: "毛重(KGS)",
        cell: ({ row }) => <span className="whitespace-nowrap">{(row.getValue("totalWeight") as number).toLocaleString()}</span>,
        size: 90,
      },
      {
        accessorKey: "totalVolume",
        header: "体积(CBM)",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("totalVolume")}</span>,
        size: 90,
      },
      {
        accessorKey: "blIssueDate",
        header: "提单签发日",
        cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("blIssueDate")}</span>,
        meta: { filterVariant: "date" },
        size: 100,
      },
      {
        accessorKey: "estimatedShipDate",
        header: "预计装船日",
        cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("estimatedShipDate")}</span>,
        meta: { filterVariant: "date" },
        size: 100,
      },
      {
        accessorKey: "creator",
        header: "创建人",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("creator")}</span>,
        size: 100,
      },
      {
        accessorKey: "createTime",
        header: "创建时间",
        cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("createTime")}</span>,
        meta: { filterVariant: "date" },
        size: 130,
      },
      {
        accessorKey: "updater",
        header: "更新人",
        cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("updater")}</span>,
        size: 100,
      },
      {
        accessorKey: "updateTime",
        header: "更新时间",
        cell: ({ row }) => <span className="text-slate-500 whitespace-nowrap">{row.getValue("updateTime")}</span>,
        meta: { filterVariant: "date" },
        size: 130,
      },
      {
        id: "actions",
        header: "操作",
        cell: ({ row }) => (
          <ActionButtons
            declarationNo={row.original.declarationNo}
            onView={handleView}
            onEdit={handleEdit}
            onExport={handleExport}
          />
        ),
        enableSorting: false,
        enableColumnFilter: false,
        enableResizing: false,
        size: 140,
      },
    ],
    [handleView, handleEdit, handleExport]
  )

  // 视图模式
  const [viewMode, setViewMode] = useState<"table" | "pivot">("table")

  // 选中的行数据
  const [selectedRows, setSelectedRows] = useState<MPCIRecord[]>([])

  // 计算批量操作按钮的可用状态
  const batchButtonStates = useMemo(() => {
    const hasSelection = selectedRows.length > 0
    const allDraft = hasSelection && selectedRows.every((row) => row.declareStatus === "草稿")
    const allSentOrExpired = hasSelection && selectedRows.every(
      (row) => row.declareStatus === "发送成功" || row.declareStatus === "已过期"
    )
    return {
      canSend: allDraft,
      canDelete: allDraft,
      canCancel: allSentOrExpired,
      canExport: hasSelection,
    }
  }, [selectedRows])

  // 透视表字段定义
  const pivotFields: PivotField[] = useMemo(
    () => [
      { id: "declarationNo", label: "申报单号", type: "string" },
      { id: "verifyStatus", label: "校验状态", type: "string" },
      { id: "declareStatus", label: "申报状态", type: "string" },
      { id: "customsStatus", label: "海关回执", type: "string" },
      { id: "hblNo", label: "HBL No", type: "string" },
      { id: "blType", label: "提单类型", type: "string" },
      { id: "transportType", label: "运输类型", type: "string" },
      { id: "declarantMpciId", label: "申报责任方", type: "string" },
      { id: "portOfLoading", label: "装货港", type: "string" },
      { id: "portOfDischarge", label: "卸货港", type: "string" },
      { id: "clearanceLocation", label: "清关地", type: "string" },
      { id: "shipperName", label: "发货人", type: "string" },
      { id: "consigneeName", label: "收货人", type: "string" },
      { id: "totalQuantity", label: "件数", type: "number" },
      { id: "totalWeight", label: "毛重", type: "number" },
      { id: "totalVolume", label: "体积", type: "number" },
      { id: "creator", label: "创建人", type: "string" },
    ],
    []
  )

  // 视图切换按钮
  const viewSwitcher = (
    <div className="flex items-center bg-slate-100 p-1">
      <button
        onClick={() => setViewMode("table")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
          viewMode === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <Table2 className="h-4 w-4" />
        表格
      </button>
      <button
        onClick={() => setViewMode("pivot")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
          viewMode === "pivot" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <BarChart3 className="h-4 w-4" />
        透视表
      </button>
    </div>
  )

  // 批量操作按钮组
  const batchActionsNode = (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" className="gap-1.5 h-8" disabled={!batchButtonStates.canSend}>
        <Send className="h-3.5 w-3.5" />
        批量发送
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5 h-8 text-red-600 hover:text-red-700 hover:bg-red-50 disabled:text-red-300"
        disabled={!batchButtonStates.canDelete}
      >
        <Trash2 className="h-3.5 w-3.5" />
        批量删除
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5 h-8" disabled={!batchButtonStates.canCancel}>
        <XCircle className="h-3.5 w-3.5" />
        批量删单
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5 h-8" disabled={!batchButtonStates.canExport}>
        <Download className="h-3.5 w-3.5" />
        批量导出
      </Button>
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
          <button className="text-sm text-teal-600 hover:text-teal-700 hover:underline">下载操作手册</button>
        </div>
        <div className="h-[2px] mt-3 mb-2 w-full bg-gradient-to-r from-slate-400 via-slate-300 to-transparent" />
        <div className="flex items-center gap-2 bg-white px-3 py-2 shadow-sm border border-slate-200">
          <Button
            size="sm"
            className="gap-1.5 bg-teal-600 hover:bg-teal-700"
            onClick={() => navigate("/dashboard/customs/uae-mpci/create")}
          >
            <Plus className="h-4 w-4" />
            新建申报
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            Excel识别
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
            searchPlaceholder="搜索申报单号、HBL、发货人、收货人..."
            enableRowSelection
            enableColumnResizing
            enableColumnOrdering
            enableContextMenu
            enableExport
            pageSize={20}
            toolbarRight={viewSwitcher}
            batchActions={batchActionsNode}
            onSelectionChange={setSelectedRows}
          />
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-end mb-4">{viewSwitcher}</div>
          <PivotTable
            data={data}
            fields={pivotFields}
            defaultRowFields={["declareStatus", "portOfDischarge"]}
            defaultValueFields={[{ fieldId: "totalQuantity", type: "sum" }]}
          />
        </Card>
      )}

      {/* 导出预览弹窗 */}
      <MPCIExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        declarationNo={exportRecord?.declarationNo ?? null}
      />
    </div>
  )
}
