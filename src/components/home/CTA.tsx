import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

import { BackgroundBeams } from "@/components/ui/background-beams"

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-teal-500"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

      {/* Background Beams */}
      <BackgroundBeams className="opacity-20" />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          准备好开启您的<br className="hidden sm:block" />
          智能物流之旅了吗？
        </h2>
        <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto leading-relaxed">
          加入全球数千家物流企业的行列，体验 AI 带来的效率革命。
          <br />
          立即注册，免费试用所有核心功能。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="h-14 px-8 text-lg bg-white text-teal-600 hover:bg-teal-50 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] rounded-full transition-all hover:scale-105" asChild>
            <Link to="/register">
              立即免费注册 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full transition-all hover:scale-105" asChild>
            <Link to="/contact">
              联系销售团队
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
