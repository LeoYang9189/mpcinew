import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowingBorder } from "@/components/ui/glowing-border"
import { FileText, Globe, Shield, Zap, BarChart3, Clock } from "lucide-react"

const features = [
  {
    title: "智能单证识别",
    description: "利用OCR与NLP技术，自动识别并提取发票、箱单等单证信息，准确率高达99%。",
    icon: FileText,
  },
  {
    title: "全球物流追踪",
    description: "对接全球50+船公司与航空公司数据，实时掌握货物动态，异常情况即时预警。",
    icon: Globe,
  },
  {
    title: "智能合规风控",
    description: "内置各国海关法规库，自动审核申报要素，提前规避查验风险，确保通关顺畅。",
    icon: Shield,
  },
  {
    title: "极速自动申报",
    description: "一键生成报关单，直连单一窗口，实现秒级申报，通关效率提升80%以上。",
    icon: Zap,
  },
  {
    title: "多维数据分析",
    description: "可视化数据看板，从成本、时效、航线等多维度分析物流表现，辅助决策优化。",
    icon: BarChart3,
  },
  {
    title: "7x24小时响应",
    description: "AI客服全天候在线，专业关务团队实时支持，随时解决您的物流疑难问题。",
    icon: Clock,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            为什么选择 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">AI物流</span>
          </h2>
          <p className="text-lg text-slate-600">
            我们将前沿科技融入物流的每一个环节，为您打造极致的数字化物流体验
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlowingBorder key={index} containerClassName="h-full">
              <Card className="group border-slate-100 bg-white hover:border-teal-200 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-teal-50/0 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(20,184,166,0.4)]">
                    <feature.icon className="h-6 w-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </GlowingBorder>
          ))}
        </div>
      </div>
    </section>
  )
}
