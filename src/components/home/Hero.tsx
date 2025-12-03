
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, PlayCircle, Globe, Shield, Zap, Activity, Scan } from "lucide-react"

import { BackgroundBeams } from "@/components/ui/background-beams"
import { TextReveal } from "@/components/ui/text-reveal"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-50 pt-16 md:pt-20 lg:pt-24 pb-16">
      {/* Tech Background Grid & Beams */}
      <BackgroundBeams className="opacity-40" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-teal-50/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-sm font-medium text-teal-700 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              新一代 AI 智能物流引擎
            </div>

            <div className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              <TextReveal text="让国际物流" />
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600 animate-glow">
                <TextReveal text="更简单、更智慧" delay={0.5} />
              </div>
            </div>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              利用先进的人工智能技术，为您提供全流程自动化申报、实时轨迹追踪与智能风险预警。体验前所未有的高效物流服务。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-14 px-8 text-lg bg-teal-600 hover:bg-teal-500 text-white shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:shadow-[0_0_30px_rgba(13,148,136,0.5)] rounded-full transition-all hover:scale-105" asChild>
                <Link to="/register">
                  立即开始 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-teal-200 text-teal-700 hover:bg-teal-50 shadow-sm rounded-full transition-all hover:scale-105 group" asChild>
                <Link to="/about">
                  <PlayCircle className="mr-2 h-5 w-5 text-teal-500 group-hover:text-teal-600 transition-colors" />
                  观看演示
                </Link>
              </Button>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-500">
              <div className="flex items-center gap-2 group">
                <div className="p-2 rounded-lg bg-teal-50 group-hover:bg-teal-100 transition-colors">
                  <Globe className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium group-hover:text-teal-700 transition-colors">全球覆盖</span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="p-2 rounded-lg bg-teal-50 group-hover:bg-teal-100 transition-colors">
                  <Zap className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium group-hover:text-teal-700 transition-colors">极速申报</span>
              </div>
              <div className="flex items-center gap-2 group">
                <div className="p-2 rounded-lg bg-teal-50 group-hover:bg-teal-100 transition-colors">
                  <Shield className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium group-hover:text-teal-700 transition-colors">安全合规</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none relative animate-float">
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-teal-100 shadow-2xl shadow-teal-900/10 p-6 lg:p-8">
              {/* Scanning Line Effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-50 animate-scan" />
              </div>

              {/* Decorative UI Elements simulating a dashboard */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">实时物流监控</div>
                      <div className="text-xs text-slate-500">Global Logistics Monitor</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-teal-50 text-xs font-medium text-teal-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                    Live
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-teal-200 transition-colors">
                    <div className="text-sm text-slate-500 mb-1">今日订单</div>
                    <div className="text-2xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">2,845</div>
                    <div className="text-xs text-teal-600 flex items-center mt-1">
                      +12.5% <span className="text-slate-400 ml-1">较昨日</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-teal-200 transition-colors">
                    <div className="text-sm text-slate-500 mb-1">准时送达率</div>
                    <div className="text-2xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">99.8%</div>
                    <div className="text-xs text-teal-600 flex items-center mt-1">
                      +0.2% <span className="text-slate-400 ml-1">较上周</span>
                    </div>
                  </div>
                </div>

                <div className="h-32 rounded-xl bg-gradient-to-br from-slate-50 to-teal-50/30 border border-slate-100 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 flex items-center justify-around opacity-40">
                    {/* Abstract chart lines */}
                    <div className="h-16 w-2 bg-teal-300 rounded-full group-hover:h-20 transition-all duration-500" />
                    <div className="h-24 w-2 bg-teal-400 rounded-full group-hover:h-16 transition-all duration-500" />
                    <div className="h-12 w-2 bg-teal-200 rounded-full group-hover:h-24 transition-all duration-500" />
                    <div className="h-20 w-2 bg-teal-500 rounded-full group-hover:h-14 transition-all duration-500" />
                    <div className="h-14 w-2 bg-teal-300 rounded-full group-hover:h-18 transition-all duration-500" />
                  </div>
                  <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-teal-700 bg-white/90 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-teal-100">
                    <Scan className="h-4 w-4 animate-spin-slow" />
                    AI 智能分析中...
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-4 top-10 p-4 bg-white rounded-xl shadow-xl border border-teal-100 animate-bounce-slow hidden lg:block">
              <Shield className="h-8 w-8 text-teal-500" />
            </div>
            <div className="absolute -left-8 bottom-20 p-4 bg-white rounded-xl shadow-xl border border-teal-100 animate-bounce-slow delay-700 hidden lg:block">
              <Zap className="h-8 w-8 text-teal-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
