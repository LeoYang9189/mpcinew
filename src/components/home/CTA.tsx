import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

/**
 * 行动号召组件
 * 引导用户注册使用
 */
export default function CTA() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            准备好提升您的物流效率了吗？
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            立即注册，免费体验我们的智能物流工具。无需信用卡，即刻开始。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/register">
                免费注册
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base border-slate-600 text-white hover:bg-slate-800">
              <Link to="/contact">联系销售</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            已有超过 1,000+ 企业选择 AI物流
          </p>
        </div>
      </div>
    </section>
  )
}
