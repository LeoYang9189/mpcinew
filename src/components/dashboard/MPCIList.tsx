import { useMemo, useState } from "react"
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

/**
 * MPCI 申报记录数据类型
 */
interface MPCIRecord {
  hbl: string
  mbl: string
  declarationNo: string
  verifyStatus: string
  declareStatus: string
  customsStatus: string
  carrier: string
  mpciCode: string
  portOfLoading: string
  portOfDischarge: string
  portOfDestination: string
  shipper: string
  consignee: string
  creator: string
  createTime: string
  sender: string
  sendTime: string
  updater: string
  updateTime: string
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
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${typeStyles[status] || "bg-slate-50 text-slate-600 ring-slate-500/20"}`}
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
}: {
  icon: React.ElementType
  label: string
  className?: string
}) => (
  <div className="relative group">
    <button
      className={`p-1.5 rounded-lg transition-colors ${className}`}
    >
      <Icon className="h-4 w-4" />
    </button>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
      {label}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
    </div>
  </div>
)

/**
 * 操作按钮组件
 */
const ActionButtons = () => {
  return (
    <div className="flex items-center gap-0.5">
      <ActionButton
        icon={Eye}
        label="查看"
        className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
      />
      <ActionButton
        icon={Edit}
        label="编辑"
        className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
      />
      <ActionButton
        icon={Send}
        label="发送"
        className="hover:bg-teal-50 text-slate-500 hover:text-teal-600"
      />
      <ActionButton
        icon={Download}
        label="导出"
        className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
      />
      <ActionButton
        icon={Trash2}
        label="删除"
        className="hover:bg-red-50 text-slate-500 hover:text-red-600"
      />
    </div>
  )
}

interface MPCIListProps {
  title: string
  description: string
}

/**
 * MPCI 申报列表组件
 */
export default function MPCIList({ title, description }: MPCIListProps) {
  // 生成模拟数据的配置
  const carriers = ["MSK | 马士基", "COSCO | 中远", "OOCL | 东方海外", "EMC | 长荣", "YML | 阳明", "HPL | 赫伯罗特", "ONE | 海洋网联", "CMA | 达飞"]
  const ports = ["Shanghai | 上海", "Shenzhen | 深圳", "Guangzhou | 广州", "Ningbo | 宁波", "Qingdao | 青岛", "Tianjin | 天津", "Xiamen | 厦门", "Dalian | 大连"]
  const destPorts = ["Dubai | 迪拜", "Abu Dhabi | 阿布扎比", "Sharjah | 沙迦"]
  const verifyStatuses = ["校验通过", "校验失败"]
  const declareStatuses = ["草稿", "已提交", "发送成功", "已删除", "已过期"]
  const customsStatuses = ["允许装船", "要求补充信息", "风险装船", "禁止装船", "下层未申报"]
  const declarants = ["John Smith", "Emily Chen", "Robert Wang", "Lisa Zhang", "Kevin Liu", "Amy Sun", "Tom Zhou", "Nancy Wu", "James Lee", "Sarah Wilson"]
  const shippers = ["Shanghai Global Trading Co., Ltd", "Shenzhen Import Export Corp", "Guangzhou International Trade", "Ningbo Foreign Trade Company", "Qingdao Trading Group", "Tianjin International Freight", "Xiamen Ocean Logistics", "Dalian Port Group"]
  const consignees = ["Dubai Trading LLC", "Sharjah Import Co.", "UAE Global Trade", "Abu Dhabi Imports", "Emirates Trading", "Gulf Logistics", "Middle East Trade", "Dubai Port Services"]

  // 生成 120 条模拟数据
  const data: MPCIRecord[] = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => {
      const idx = i + 1
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")
      const hour = String(Math.floor(Math.random() * 12) + 8).padStart(2, "0")
      const minute = String(Math.floor(Math.random() * 60)).padStart(2, "0")
      const hasSender = Math.random() > 0.3
      return {
        hbl: `HBL2024${String(idx).padStart(6, "0")}`,
        mbl: `MBL2024${String(idx + 1000).padStart(6, "0")}`,
        declarationNo: `MPCI2024${String(idx).padStart(6, "0")}`,
        verifyStatus: verifyStatuses[Math.floor(Math.random() * verifyStatuses.length)],
        declareStatus: declareStatuses[Math.floor(Math.random() * declareStatuses.length)],
        customsStatus: customsStatuses[Math.floor(Math.random() * customsStatuses.length)],
        carrier: carriers[Math.floor(Math.random() * carriers.length)],
        mpciCode: `AEMP2024${String(idx).padStart(3, "0")}`,
        portOfLoading: ports[Math.floor(Math.random() * ports.length)],
        portOfDischarge: destPorts[Math.floor(Math.random() * destPorts.length)],
        portOfDestination: destPorts[Math.floor(Math.random() * destPorts.length)],
        shipper: shippers[Math.floor(Math.random() * shippers.length)],
        consignee: consignees[Math.floor(Math.random() * consignees.length)],
        creator: declarants[Math.floor(Math.random() * declarants.length)],
        createTime: `2024-01-${day} ${hour}:${minute}`,
        sender: hasSender ? declarants[Math.floor(Math.random() * declarants.length)] : "-",
        sendTime: hasSender ? `2024-01-${day} ${String(Number(hour) + 1).padStart(2, "0")}:${minute}` : "-",
        updater: declarants[Math.floor(Math.random() * declarants.length)],
        updateTime: `2024-01-${day} ${String(Number(hour) + 2).padStart(2, "0")}:${minute}`,
      }
    })
  }, [])


  // 列定义 - 删除了申报单号字段
  const columns: ColumnDef<MPCIRecord, unknown>[] = useMemo(
    () => [
      {
        accessorKey: "hbl",
        header: "HBL",
        cell: ({ row }) => (
          <span className="font-medium text-slate-900 whitespace-nowrap">
            {row.getValue("hbl")}
          </span>
        ),
        size: 150,
      },
      {
        accessorKey: "mbl",
        header: "MBL",
        cell: ({ row }) => (
          <span className="font-medium text-slate-900 whitespace-nowrap">
            {row.getValue("mbl")}
          </span>
        ),
        size: 150,
      },
      {
        accessorKey: "declarationNo",
        header: "申报单号",
        cell: ({ row }) => (
          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
            {row.getValue("declarationNo")}
          </span>
        ),
        size: 140,
      },
      {
        accessorKey: "verifyStatus",
        header: "校验状态",
        cell: ({ row }) => (
          <StatusBadge status={row.getValue("verifyStatus")} type="verify" />
        ),
        meta: { filterVariant: "select" },
        size: 100,
      },
      {
        accessorKey: "declareStatus",
        header: "申报状态",
        cell: ({ row }) => (
          <StatusBadge status={row.getValue("declareStatus")} type="declare" />
        ),
        meta: { filterVariant: "select" },
        size: 100,
      },
      {
        accessorKey: "customsStatus",
        header: "海关回执",
        cell: ({ row }) => (
          <StatusBadge status={row.getValue("customsStatus")} type="customs" />
        ),
        meta: { filterVariant: "select" },
        size: 110,
      },
      {
        accessorKey: "carrier",
        header: "船公司",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("carrier")}</span>
        ),
        meta: { filterVariant: "select" },
        size: 100,
      },
      {
        accessorKey: "mpciCode",
        header: "MPCI Code",
        cell: ({ row }) => (
          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
            {row.getValue("mpciCode")}
          </span>
        ),
        size: 130,
      },
      {
        accessorKey: "portOfLoading",
        header: "起运港",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("portOfLoading")}</span>
        ),
        meta: { filterVariant: "select" },
        size: 130,
      },
      {
        accessorKey: "portOfDischarge",
        header: "卸货港",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("portOfDischarge")}</span>
        ),
        meta: { filterVariant: "select" },
        size: 120,
      },
      {
        accessorKey: "portOfDestination",
        header: "目的港",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("portOfDestination")}</span>
        ),
        meta: { filterVariant: "select" },
        size: 150,
      },
      {
        accessorKey: "shipper",
        header: "发货人",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("shipper")}</span>
        ),
        size: 200,
      },
      {
        accessorKey: "consignee",
        header: "收货人",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("consignee")}</span>
        ),
        size: 160,
      },
      {
        accessorKey: "creator",
        header: "创建人",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("creator")}</span>
        ),
        size: 120,
      },
      {
        accessorKey: "createTime",
        header: "创建时间",
        cell: ({ row }) => (
          <span className="text-slate-500 whitespace-nowrap">
            {row.getValue("createTime")}
          </span>
        ),
        meta: { filterVariant: "date" },
        size: 140,
      },
      {
        accessorKey: "sender",
        header: "发送人",
        cell: ({ row }) => {
          const value = row.getValue("sender") as string
          return value === "-" ? (
            <span className="text-slate-400">-</span>
          ) : (
            <span className="whitespace-nowrap">{value}</span>
          )
        },
        size: 120,
      },
      {
        accessorKey: "sendTime",
        header: "发送时间",
        cell: ({ row }) => {
          const value = row.getValue("sendTime") as string
          return value === "-" ? (
            <span className="text-slate-400">-</span>
          ) : (
            <span className="text-slate-500 whitespace-nowrap">{value}</span>
          )
        },
        meta: { filterVariant: "date" },
        size: 140,
      },
      {
        accessorKey: "updater",
        header: "更新人",
        cell: ({ row }) => (
          <span className="whitespace-nowrap">{row.getValue("updater")}</span>
        ),
        size: 120,
      },
      {
        accessorKey: "updateTime",
        header: "更新时间",
        cell: ({ row }) => (
          <span className="text-slate-500 whitespace-nowrap">
            {row.getValue("updateTime")}
          </span>
        ),
        meta: { filterVariant: "date" },
        size: 140,
      },
      {
        id: "actions",
        header: "操作",
        cell: () => <ActionButtons />,
        enableSorting: false,
        enableColumnFilter: false,
        enableResizing: false,
        size: 160,
      },
    ],
    []
  )

  // 视图模式
  const [viewMode, setViewMode] = useState<"table" | "pivot">("table")

  // 透视表字段定义
  const pivotFields: PivotField[] = useMemo(
    () => [
      { id: "hbl", label: "HBL", type: "string" },
      { id: "mbl", label: "MBL", type: "string" },
      { id: "declarationNo", label: "申报单号", type: "string" },
      { id: "verifyStatus", label: "校验状态", type: "string" },
      { id: "declareStatus", label: "申报状态", type: "string" },
      { id: "customsStatus", label: "海关回执", type: "string" },
      { id: "carrier", label: "船公司", type: "string" },
      { id: "portOfLoading", label: "起运港", type: "string" },
      { id: "portOfDischarge", label: "卸货港", type: "string" },
      { id: "portOfDestination", label: "目的港", type: "string" },
      { id: "shipper", label: "发货人", type: "string" },
      { id: "consignee", label: "收货人", type: "string" },
      { id: "creator", label: "创建人", type: "string" },
    ],
    []
  )

  // 视图切换按钮
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

  // 批量操作按钮组 - 传给 DataTable 在工具栏内显示
  const batchActionsNode = (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" className="gap-1.5 h-8">
        <Send className="h-3.5 w-3.5" />
        批量发送
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5 h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
        <Trash2 className="h-3.5 w-3.5" />
        批量删除
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5 h-8">
        <XCircle className="h-3.5 w-3.5" />
        批量删单
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5 h-8">
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
          <button className="text-sm text-teal-600 hover:text-teal-700 hover:underline">
            下载操作手册
          </button>
        </div>
        {/* 渐变分割线 */}
        <div className="h-[2px] mt-3 mb-2 w-full bg-gradient-to-r from-slate-400 via-slate-300 to-transparent rounded-full" />
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
          <Button size="sm" className="gap-1.5 bg-teal-600 hover:bg-teal-700">
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
            searchPlaceholder="搜索 HBL、MBL、发货人、收货人..."
            enableRowSelection
            enableColumnResizing
            enableColumnOrdering
            enableContextMenu
            enableExport
            pageSize={20}
            toolbarRight={viewSwitcher}
            batchActions={batchActionsNode}
          />
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-end mb-4">{viewSwitcher}</div>
          <PivotTable
            data={data}
            fields={pivotFields}
            defaultRowFields={["carrier", "declareStatus"]}
            defaultValueFields={[{ fieldId: "hbl", type: "count" }]}
          />
        </Card>
      )}
    </div>
  )
}
