import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Clock, Globe, Headphones, BarChart3 } from "lucide-react"

/**
 * 功能特性数据
 */
const features = [
  {
    icon: FileText,
    title: "智能申报",
    description: "AI驱动的智能填报系统，自动识别并校验申报数据，大幅降低人工错误率。",
    color: "text-teal-600 bg-teal-50",
  },
  {
    icon: Shield,
    title: "合规保障",
    description: "实时更新各国海关法规，确保您的申报始终符合最新要求，避免罚款风险。",
    color: "text-orange-600 bg-orange-50",
  },
  {
    icon: Clock,
    title: "高效处理",
    description: "批量处理能力，支持一键导入Excel数据，平均处理时间缩短80%。",
    color: "text-slate-700 bg-slate-100",
  },
  {
    icon: Globe,
    title: "全球覆盖",
    description: "支持美国AMS、ISF，加拿大eManifest，日本AFR，阿联酋MPCI等主流申报系统。",
    color: "text-teal-600 bg-teal-50",
  },
  {
    icon: Headphones,
    title: "专业支持",
    description: "7x24小时专业客服团队，提供中英文双语支持，快速响应您的需求。",
    color: "text-slate-700 bg-slate-100",
  },
  {
    icon: BarChart3,
    title: "数据分析",
    description: "完整的申报记录和数据分析，帮助您优化物流流程，降低运营成本。",
    color: "text-orange-600 bg-orange-50",
  },
]

/**
 * 功能优势展示组件
 */
export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* 标题区 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            为什么选择 AI物流
          </h2>
          <p className="text-lg text-slate-600">
            我们提供全方位的国际物流智能工具，让复杂的海关申报变得简单高效
          </p>
        </div>

        {/* 功能卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
