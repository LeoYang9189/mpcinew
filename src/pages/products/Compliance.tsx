import { Link } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Check,
  Shield,
  FileCheck,
  Building2,
  Scale,
  Clock,
  Users,
  BadgeCheck,
  Headphones,
} from "lucide-react"

/**
 * 合规资质服务列表
 */
const services = [
  {
    id: "china-nvocc",
    title: "中国NVOCC",
    subtitle: "中国无船承运人资质",
    description: "协助企业申请中国交通运输部颁发的无船承运人资质，合法开展国际货运代理业务。",
    features: [
      "资质申请全程代办",
      "材料准备指导",
      "年审续期服务",
      "政策法规咨询",
    ],
    icon: Building2,
    highlight: true,
  },
  {
    id: "us-fmc",
    title: "美国FMC",
    subtitle: "美国联邦海事委员会注册",
    description: "协助企业完成美国FMC（联邦海事委员会）的OTI注册，获得在美国开展海运业务的资质。",
    features: [
      "OTI牌照申请",
      "保证金安排",
      "合规审计支持",
      "年度报告协助",
    ],
    icon: Scale,
  },
  {
    id: "canada-nvocc",
    title: "加拿大NVOCC",
    subtitle: "加拿大无船承运人资质",
    description: "协助企业获得加拿大运输局颁发的无船承运人资质，合法开展加拿大航线业务。",
    features: [
      "CTA注册申请",
      "保险安排协助",
      "合规文件准备",
      "持续合规监控",
    ],
    icon: FileCheck,
  },
  {
    id: "customs-bond",
    title: "海关Bond",
    subtitle: "美国海关保证金",
    description: "提供美国海关保证金（Customs Bond）服务，确保进口商符合美国海关要求。",
    features: [
      "单次Bond办理",
      "年度Bond办理",
      "快速出单",
      "理赔协助服务",
    ],
    icon: Shield,
  },
]

/**
 * 服务流程
 */
const process = [
  { step: 1, title: "需求咨询", description: "了解您的业务需求，推荐合适的资质方案" },
  { step: 2, title: "材料准备", description: "指导准备申请所需的各类文件和材料" },
  { step: 3, title: "提交申请", description: "代为提交申请，跟进审批进度" },
  { step: 4, title: "获得资质", description: "成功获得资质，提供后续维护服务" },
]

/**
 * 服务优势
 */
const advantages = [
  {
    icon: BadgeCheck,
    title: "专业团队",
    description: "拥有多年行业经验的专业顾问团队，熟悉各国法规要求",
  },
  {
    icon: Clock,
    title: "高效办理",
    description: "标准化流程，缩短办理周期，快速获得资质",
  },
  {
    icon: Users,
    title: "一对一服务",
    description: "专属客户经理全程跟进，及时响应您的需求",
  },
  {
    icon: Headphones,
    title: "持续支持",
    description: "资质获得后提供年审、续期等持续合规服务",
  },
]


/**
 * 合规资质产品落地页
 */
export default function CompliancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero区域 */}
        <section className="bg-slate-900 text-white py-20 md:py-28 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-orange-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-slate-500 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* 左侧文案 */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm mb-6 border border-orange-500/30">
                  <Shield className="h-4 w-4" />
                  <span>合规资质服务</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
                  国际物流资质
                  <br />
                  <span className="text-orange-400">一站式办理服务</span>
                </h1>
                <p className="text-lg text-slate-300 mb-8 max-w-xl">
                  专业团队协助您办理中国、美国、加拿大等国家的物流行业资质，确保您的业务合法合规运营。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
                    <Link to="/register">
                      免费咨询
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-slate-600 text-white hover:bg-slate-800">
                    <Link to="/contact">联系顾问</Link>
                  </Button>
                </div>
              </div>

              {/* 右侧资质卡片 */}
              <div className="hidden lg:block">
                <div className="space-y-4">
                  {/* 资质卡片列表 */}
                  {[
                    { name: "中国NVOCC", status: "热门", color: "teal" },
                    { name: "美国FMC", status: "推荐", color: "orange" },
                    { name: "加拿大NVOCC", status: "", color: "slate" },
                    { name: "海关Bond", status: "快速", color: "slate" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.color === "teal" ? "bg-teal-500/20 text-teal-400" :
                          item.color === "orange" ? "bg-orange-500/20 text-orange-400" :
                          "bg-slate-700 text-slate-300"
                        }`}>
                          <Shield className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {item.status && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "热门" ? "bg-teal-500/20 text-teal-300" :
                          item.status === "推荐" ? "bg-orange-500/20 text-orange-300" :
                          "bg-slate-700 text-slate-300"
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 底部统计 */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-slate-400">成功案例</div>
                  </div>
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-2xl font-bold text-white">99%</div>
                    <div className="text-xs text-slate-400">通过率</div>
                  </div>
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-2xl font-bold text-white">7天</div>
                    <div className="text-xs text-slate-400">快速办理</div>
                  </div>
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
                我们的资质服务
              </h2>
              <p className="text-lg text-slate-600">
                覆盖主要贸易国家的物流行业资质申请与维护服务
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`border-slate-200 hover:shadow-lg transition-shadow ${
                    service.highlight ? "ring-2 ring-teal-500 ring-offset-2" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                        <service.icon className="h-6 w-6" />
                      </div>
                      {service.highlight && (
                        <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 rounded">
                          热门
                        </span>
                      )}
                    </div>
                    <CardTitle className="font-serif text-xl mt-4">{service.title}</CardTitle>
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
                    <Button variant="outline" className="w-full mt-6" asChild>
                      <Link to="/contact">了解详情</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 服务流程 */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                服务流程
              </h2>
              <p className="text-lg text-slate-600">
                标准化的服务流程，确保高效、透明的办理体验
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={item.step} className="relative">
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200" />
                  )}
                  <div className="relative text-center">
                    <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold relative z-10">
                      {item.step}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 服务优势 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                我们的优势
              </h2>
              <p className="text-lg text-slate-600">
                专业、高效、贴心的服务，让资质办理更简单
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
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
              需要办理资质？立即咨询
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              专业顾问为您提供一对一咨询服务，解答您的所有疑问
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-teal-600 hover:bg-teal-700">
                <Link to="/register">
                  免费注册咨询
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-slate-600 text-white hover:bg-slate-800">
                <Link to="/contact">电话咨询</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
