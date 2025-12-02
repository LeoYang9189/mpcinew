import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react"

/**
 * 统计卡片数据
 */
const stats = [
  { icon: FileText, label: "本月申报", value: "128", change: "+12%", color: "text-teal-600", bg: "bg-teal-50" },
  { icon: CheckCircle, label: "已完成", value: "115", change: "+8%", color: "text-green-600", bg: "bg-green-50" },
  { icon: Clock, label: "处理中", value: "10", change: "-5%", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: AlertTriangle, label: "待处理", value: "3", change: "+2", color: "text-red-600", bg: "bg-red-50" },
]

/**
 * 最近申报记录
 */
const recentRecords = [
  { id: "AMS-2024-001", type: "AMS", status: "已完成", date: "2024-01-15" },
  { id: "ISF-2024-002", type: "ISF", status: "处理中", date: "2024-01-15" },
  { id: "AFR-2024-003", type: "AFR", status: "已完成", date: "2024-01-14" },
  { id: "MPCI-2024-004", type: "UAE MPCI", status: "待处理", date: "2024-01-14" },
  { id: "AMS-2024-005", type: "AMS", status: "已完成", date: "2024-01-13" },
]

/**
 * 状态标签样式
 */
function getStatusStyle(status: string) {
  switch (status) {
    case "已完成":
      return "bg-green-100 text-green-700"
    case "处理中":
      return "bg-amber-100 text-amber-700"
    case "待处理":
      return "bg-red-100 text-red-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

/**
 * 用户后台首页
 * 展示统计数据和最近申报记录
 */
export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">控制台</h1>
        <p className="text-slate-500">欢迎回来，查看您的申报概览</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                较上月 <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 最近申报 */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">最近申报</CardTitle>
          <CardDescription>您最近的申报记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-slate-500">
                  <th className="pb-3 font-medium">申报编号</th>
                  <th className="pb-3 font-medium">类型</th>
                  <th className="pb-3 font-medium">状态</th>
                  <th className="pb-3 font-medium">日期</th>
                </tr>
              </thead>
              <tbody>
                {recentRecords.map((record) => (
                  <tr key={record.id} className="border-b last:border-0">
                    <td className="py-3 text-sm font-medium text-slate-900">{record.id}</td>
                    <td className="py-3 text-sm text-slate-600">{record.type}</td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusStyle(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-500">{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
