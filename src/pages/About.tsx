import { Link } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TextReveal } from "@/components/ui/text-reveal"
import { GlowingBorder } from "@/components/ui/glowing-border"
import { Card, CardContent } from "@/components/ui/card"
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
  { year: "2021", title: "产品升级", description: "推出智能申报系统，支持AMS/ISF等主流申报" },
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        {/* Hero区域 */}
        <section className="relative overflow-hidden pt-24 pb-32">
          <BackgroundBeams className="opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e10_1px,transparent_1px),linear-gradient(to_bottom,#0f766e10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-sm font-medium text-teal-700 mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              关于我们
            </div>

            <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 text-slate-900 tracking-tight">
              <TextReveal text="让国际物流" className="justify-center" />
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600 animate-glow">
                <TextReveal text="更简单、更合规" delay={0.5} className="justify-center" />
              </div>
            </div>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              AI物流是一家专注于国际物流智能工具的科技公司，致力于为全球贸易企业提供高效、合规的海关申报与资质服务
            </p>
          </div>
        </section>

        {/* 数据统计 */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <GlowingBorder key={index} containerClassName="h-full">
                  <Card className="h-full border-none shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                      <div className="text-slate-500 font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                </GlowingBorder>
              ))}
            </div>
          </div>
        </section>

        {/* 我们的故事 */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight">
                我们的<span className="text-teal-600">故事</span>
              </h2>
              <div className="prose prose-lg prose-slate mx-auto text-slate-600">
                <p className="leading-relaxed mb-6">
                  AI物流成立于2020年，由一群深耕国际物流行业多年的专业人士创立。我们深知海关申报的复杂性和合规的重要性，因此致力于用技术手段简化这一过程。
                </p>
                <p className="leading-relaxed mb-6">
                  经过多年发展，我们已经建立起覆盖全球主要贸易国家的申报网络，支持美国AMS/ISF、加拿大eManifest、日本AFR、阿联酋MPCI等多种申报系统，同时提供NVOCC、FMC等合规资质办理服务。
                </p>
                <p className="leading-relaxed">
                  我们的使命是让每一家贸易企业都能轻松、合规地开展国际业务，用智能化工具提升物流效率，降低合规风险。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心价值观 */}
        <section className="py-24 bg-slate-50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                核心<span className="text-teal-600">价值观</span>
              </h2>
              <p className="text-lg text-slate-600">
                这些价值观指引着我们的每一个决策和行动
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <GlowingBorder key={index} containerClassName="h-full">
                  <Card className="h-full border-none shadow-sm bg-white hover:shadow-lg transition-all duration-300 group overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <value.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </GlowingBorder>
              ))}
            </div>
          </div>
        </section>

        {/* 发展历程 */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e05_1px,transparent_1px),linear-gradient(to_bottom,#0f766e05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                发展<span className="text-teal-600">历程</span>
              </h2>
              <p className="text-lg text-slate-600">
                从创立到成长，我们一直在前进
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-100 via-teal-300 to-teal-100 transform md:-translate-x-1/2" />

                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center mb-16 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* 时间点 */}
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-teal-500 transform md:-translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(20,184,166,0.2)]" />

                    {/* 内容 */}
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <div className="group relative">
                        <div className="absolute inset-0 bg-teal-50 rounded-xl transform transition-transform duration-300 group-hover:scale-105 -z-10" />
                        <div className="bg-white border border-teal-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="text-2xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                          <div className="font-bold text-slate-900 mb-2 text-lg">{milestone.title}</div>
                          <p className="text-slate-600 text-sm leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-teal-500"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <BackgroundBeams className="opacity-20" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              与我们一起，开启智能物流之旅
            </h2>
            <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              无论您是货代企业还是进出口商，我们都能为您提供专业的服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="h-14 px-8 text-lg bg-white text-teal-600 hover:bg-teal-50 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] rounded-full transition-all hover:scale-105">
                <Link to="/register">
                  免费注册
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full transition-all hover:scale-105">
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
