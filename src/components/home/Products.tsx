
import { Link } from "react-router-dom"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { GlowingBorder } from "@/components/ui/glowing-border"
import { Button } from "@/components/ui/button"
import { ArrowRight, Box, FileCheck, Truck, Anchor } from "lucide-react"

const products = [
  {
    title: "海关申报系统",
    description: "支持美国AMS/ISF、加拿大ACI、日本AFR等全球主要海关系统的自动申报。",
    icon: FileCheck,
    link: "/products/customs"
  },
  {
    title: "物流轨迹追踪",
    description: "覆盖全球98%的集装箱船舶与航空货物，提供实时位置更新与预计到达时间预测。",
    icon: Anchor,
    link: "/products/tracking"
  },
  {
    title: "智能仓储管理",
    description: "基于AI的库存预测与库内作业优化，帮助海外仓提升周转效率，降低运营成本。",
    icon: Box,
    link: "/products/wms"
  },
  {
    title: "跨境物流ERP",
    description: "专为货代企业打造的业务财务一体化管理系统，实现全流程数字化管控。",
    icon: Truck,
    link: "/products/erp"
  },
]

export function Products() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              我们的<span className="text-teal-600">产品与服务</span>
            </h2>
            <p className="text-lg text-slate-600">
              打造全链路数字化物流解决方案，赋能企业降本增效
            </p>
          </div>
          <Button variant="ghost" className="group text-teal-600 hover:text-teal-700 hover:bg-teal-50" asChild>
            <Link to="/products">
              查看所有产品 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <GlowingBorder key={index} containerClassName="h-full">
              <Card className="group border-none shadow-sm hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] transition-all duration-300 bg-white overflow-hidden h-full">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="p-8 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-500 transition-all duration-300">
                      <product.icon className="h-7 w-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardContent className="p-0">
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {product.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-teal-600 transition-colors">
                        了解详情 <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </CardContent>
                  </div>
                  {/* Decorative right side/image placeholder */}
                  <div className="w-full sm:w-1/3 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden group-hover:from-teal-50 group-hover:to-teal-100 transition-colors duration-500">
                    <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
                    <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                      <product.icon className="h-32 w-32 text-slate-200 group-hover:text-teal-200/50 transition-colors duration-500" />
                    </div>
                  </div>
                </div>
              </Card>
            </GlowingBorder>
          ))}
        </div>
      </div>
    </section>
  )
}
