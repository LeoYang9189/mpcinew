import { Link } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Check,
  FileText,
  Globe,
  Shield,
  Clock,
  Zap,
  Ship,
  Plane,
} from "lucide-react"

/**
 * 海关申报服务列表
 */
const services = [
  {
    id: "uae-mpci",
    title: "UAE MPCI",
    subtitle: "阿联酋货物预申报",
    description: "符合阿联酋海关要求的货物预申报系统，确保货物顺利进入阿联酋港口。",
    features: ["24小时内完成申报", "自动数据校验", "实时状态追踪", "多语言支持"],
    icon: Ship,
  },
  {
    id: "ams",
    title: "AMS",
    subtitle: "美国舱单自动化系统",
    description: "美国海关边境保护局要求的自动舱单系统，适用于所有进入美国的海运货物。",
    features: ["提前24小时申报", "CBP直连", "自动异常预警", "历史记录查询"],
    icon: Ship,
  },
  {
    id: "isf",
    title: "ISF",
    subtitle: "进口商安全申报",
    description: "美国进口商安全申报（10+2规则），确保进口货物符合美国安全要求。",
    features: ["10+2数据完整性检查", "截止时间提醒", "修改记录追踪", "合规报告生成"],
    icon: Shield,
  },
  {
    id: "afr",
    title: "AFR",
    subtitle: "日本提前申报规则",
    description: "日本海关提前申报规则，适用于所有进入日本的海运和空运货物。",
    features: ["海运/空运双支持", "日本海关直连", "中日双语界面", "快速响应处理"],
    icon: Plane,
  },
  {
    id: "emanifest",
    title: "eManifest",
    subtitle: "加拿大电子舱单",
    description: "加拿大边境服务局要求的电子舱单系统，覆盖海运、空运、公路运输。",
    features: ["多运输方式支持", "CBSA认证", "自动合规检查", "批量数据导入"],
    icon: Globe,
  },
  {
    id: "shanghai-pre",
    title: "上海预配",
    subtitle: "上海港预配舱单",
    description: "上海港出口货物预配舱单申报，确保货物顺利装船出运。",
    features: ["与船公司系统对接", "自动生成报关单", "装箱单管理", "实时放行状态"],
    icon: Ship,
  },
  {
    id: "qingdao-pre",
    title: "青岛预配",
    subtitle: "青岛港预配舱单",
    description: "青岛港出口货物预配舱单申报，支持多种贸易方式。",
    features: ["海关直连申报", "多口岸联动", "异常自动预警", "数据统计分析"],
    icon: Ship,
  },
]

/**
 * 平台优势
 */
const advantages = [
  {
    icon: Zap,
    title: "智能填报",
    description: "AI辅助自动识别和填充申报数据，减少人工输入错误",
  },
  {
    icon: Clock,
    title: "快速处理",
    description: "平均处理时间不超过5分钟，批量申报效率提升80%",
  },
  {
    icon: Shield,
    title: "合规保障",
    description: "实时更新各国海关法规，确保申报始终符合最新要求",
  },
  {
    icon: Globe,
    title: "全球覆盖",
    description: "支持全球主要港口和国家的海关申报系统",
  },
]


/**
 * 海关申报产品落地页
 */
export default function CustomsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero区域 */}
        <section className="bg-slate-900 text-white py-20 md:py-28 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-teal-500 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-slate-500 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* 左侧文案 */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-sm mb-6 border border-teal-500/30">
                  <FileText className="h-4 w-4" />
                  <span>海关申报服务</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
                  全球海关申报
                  <br />
                  <span className="text-teal-400">一站式解决方案</span>
                </h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">
                  覆盖美国、加拿大、日本、阿联酋、中国等主要贸易国家的海关申报系统，智能化工具助您轻松完成合规申报。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link to="/register">
                      免费试用
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-slate-600 text-white hover:bg-slate-800">
                    <Link to="/contact">咨询专家</Link>
                  </Button>
                </div>
              </div>

              {/* 右侧数据展示 */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  {/* 统计卡片 */}
                  <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                    <div className="text-3xl font-bold text-teal-400 mb-1">7+</div>
                    <div className="text-slate-400 text-sm">申报系统</div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                    <div className="text-3xl font-bold text-orange-400 mb-1">全球</div>
                    <div className="text-slate-400 text-sm">覆盖范围</div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                    <div className="text-3xl font-bold text-white mb-1">100%</div>
                    <div className="text-slate-400 text-sm">申报成功率</div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                    <div className="text-3xl font-bold text-white mb-1">&lt;5min</div>
                    <div className="text-slate-400 text-sm">平均处理时间</div>
                  </div>
                </div>

                {/* 支持的系统标签 */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["AMS", "ISF", "AFR", "eManifest", "MPCI"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 服务列表 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                支持的申报系统
              </h2>
              <p className="text-lg text-slate-600">
                我们提供全球主要国家和地区的海关申报服务，满足您的各类申报需求
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-serif text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-slate-700">
                      {service.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                          <Check className="h-4 w-4 text-teal-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 平台优势 */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                为什么选择我们
              </h2>
              <p className="text-lg text-slate-600">
                专业的技术团队和丰富的行业经验，为您提供可靠的申报服务
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              开始您的智能申报之旅
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              注册即可免费试用，体验高效、合规的海关申报服务
            </p>
            <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
              <Link to="/register">
                立即注册
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
