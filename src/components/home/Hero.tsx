import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Shield, Zap, Ship, FileCheck, BarChart3 } from "lucide-react"

/**
 * 首页英雄区组件
 * 展示主要价值主张和行动号召
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧文案区 */}
          <div>
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm mb-6 border border-orange-200">
              <Zap className="h-4 w-4" />
              <span>智能物流解决方案</span>
            </div>

            {/* 主标题 */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              让国际物流
              <br />
              <span className="text-teal-600">更简单、更合规</span>
            </h1>

            {/* 副标题 */}
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl">
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
              <Button size="lg" variant="outline" asChild className="text-base">
                <Link to="/products/customs">了解产品</Link>
              </Button>
            </div>

            {/* 信任指标 */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-teal-600" />
                <span>覆盖全球</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <span>100% 合规</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-teal-600" />
                <span>&lt; 5分钟处理</span>
              </div>
            </div>
          </div>

          {/* 右侧视觉区 */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* 主卡片 */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Ship className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">智能申报平台</div>
                    <div className="text-sm text-slate-500">实时数据同步</div>
                  </div>
                </div>
                
                {/* 模拟数据展示 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-slate-700">AMS 申报</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">已完成</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-sm text-slate-700">ISF 申报</span>
                    </div>
                    <span className="text-sm font-medium text-orange-600">处理中</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-slate-700">eManifest</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">已完成</span>
                  </div>
                </div>
              </div>

              {/* 浮动小卡片 - 左上 */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <FileCheck className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-xs text-slate-500">申报成功率</div>
                  </div>
                </div>
              </div>

              {/* 浮动小卡片 - 右下 */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">1000+</div>
                    <div className="text-xs text-slate-500">企业信赖</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
