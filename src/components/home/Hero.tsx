import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Shield, Zap } from "lucide-react"

/**
 * 首页英雄区组件
 * 展示主要价值主张和行动号召
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[600px]">
      {/* Banner 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      />
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        <div className="max-w-2xl">
          {/* 标签 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm mb-6 border border-white/30 backdrop-blur-sm">
            <Zap className="h-4 w-4" />
            <span>智能物流解决方案</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            让国际物流
            <br />
            <span className="text-teal-300">更简单、更合规</span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
            一站式国际物流智能工具平台，覆盖全球主要港口的海关申报系统，助您轻松完成合规申报，提升物流效率。
          </p>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-base bg-teal-600 hover:bg-teal-700">
              <Link to="/register">
                免费开始使用
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base border-white text-white hover:bg-white/10">
              <Link to="/products/customs">了解产品</Link>
            </Button>
          </div>

          {/* 信任指标 */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-teal-300" />
              <span>覆盖全球</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-teal-300" />
              <span>100% 合规</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-teal-300" />
              <span>&lt; 5分钟处理</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
