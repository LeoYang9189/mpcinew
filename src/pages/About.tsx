import { Link } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Users,
  Globe,
  Shield,
  Award,
  Clock,
} from "lucide-react"

/**
 * 公司核心价值观
 */
const values = [
  {
    icon: Target,
    title: "专注专业",
    description: "深耕国际物流领域，专注于海关申报与合规服务，持续提升专业能力",
  },
  {
    icon: Heart,
    title: "客户至上",
    description: "以客户需求为导向，提供贴心、高效的服务体验",
  },
  {
    icon: Shield,
    title: "合规为本",
    description: "严格遵守各国法规，确保每一笔申报都合法合规",
  },
  {
    icon: Eye,
    title: "创新驱动",
    description: "持续技术创新，用智能化工具提升物流效率",
  },
]

/**
 * 公司里程碑
 */
const milestones = [
  { year: "2020", title: "公司成立", description: "AI物流正式成立，开始提供海关申报服务" },
  { year: "2021", title: "产品升级", description: "推出智能申报系统，支持AMS、ISF等主流申报" },
  { year: "2022", title: "全球拓展", description: "业务覆盖美国、加拿大、日本、阿联酋等国家" },
  { year: "2023", title: "合规资质", description: "新增NVOCC、FMC等合规资质办理服务" },
  { year: "2024", title: "持续增长", description: "服务企业超过1000家，申报成功率100%" },
]

/**
 * 数据统计
 */
const stats = [
  { icon: Users, value: "1000+", label: "企业客户" },
  { icon: Globe, value: "全球", label: "覆盖范围" },
  { icon: Award, value: "100%", label: "申报成功率" },
  { icon: Clock, value: "7×24", label: "专业支持" },
]


/**
 * 关于我们页面
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero区域 */}
        <section className="bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.1),transparent_50%)]" />

          <div className="container mx-auto px-4 py-24 md:py-32 relative">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-teal-400 text-sm tracking-widest uppercase font-medium mb-6">
                关于我们
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6">
                让国际物流
                <br />
                <span className="text-teal-400">更简单、更合规</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                AI物流是一家专注于国际物流智能工具的科技公司，致力于为全球贸易企业提供高效、合规的海关申报与资质服务
              </p>
            </div>
          </div>
        </section>

        {/* 数据统计 */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 我们的故事 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
                我们的故事
              </h2>
              <div className="prose prose-lg prose-slate mx-auto">
                <p className="text-slate-600 leading-relaxed mb-6">
                  AI物流成立于2020年，由一群深耕国际物流行业多年的专业人士创立。我们深知海关申报的复杂性和合规的重要性，因此致力于用技术手段简化这一过程。
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  经过多年发展，我们已经建立起覆盖全球主要贸易国家的申报网络，支持美国AMS/ISF、加拿大eManifest、日本AFR、阿联酋MPCI等多种申报系统，同时提供NVOCC、FMC等合规资质办理服务。
                </p>
                <p className="text-slate-600 leading-relaxed">
                  我们的使命是让每一家贸易企业都能轻松、合规地开展国际业务，用智能化工具提升物流效率，降低合规风险。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心价值观 */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                核心价值观
              </h2>
              <p className="text-lg text-slate-600">
                这些价值观指引着我们的每一个决策和行动
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm text-teal-600 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 发展历程 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                发展历程
              </h2>
              <p className="text-lg text-slate-600">
                从创立到成长，我们一直在前进
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2" />

                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center mb-12 last:mb-0 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* 时间点 */}
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-teal-600 transform md:-translate-x-1/2 z-10" />

                    {/* 内容 */}
                    <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="bg-slate-50 rounded-lg p-6">
                        <div className="text-teal-600 font-bold text-lg mb-1">{milestone.year}</div>
                        <div className="font-serif font-semibold text-slate-900 mb-2">{milestone.title}</div>
                        <p className="text-slate-600 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              与我们一起，开启智能物流之旅
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              无论您是货代企业还是进出口商，我们都能为您提供专业的服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="h-12 px-8 bg-teal-600 hover:bg-teal-500">
                <Link to="/register">
                  免费注册
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 border-slate-700 text-slate-300 hover:bg-slate-800">
                <Link to="/contact">联系我们</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
