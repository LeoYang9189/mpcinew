import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

/**
 * 产品分类数据
 */
const productCategories = [
  {
    title: "海关申报",
    description: "覆盖全球主要港口的电子申报系统",
    products: [
      { name: "UAE MPCI", desc: "阿联酋货物预申报" },
      { name: "AMS", desc: "美国舱单系统" },
      { name: "ISF", desc: "进口商安全申报" },
      { name: "AFR", desc: "日本提前申报" },
      { name: "eManifest", desc: "加拿大电子舱单" },
      { name: "上海预配", desc: "上海港预配舱单" },
      { name: "青岛预配", desc: "青岛港预配舱单" },
    ],
  },
  {
    title: "合规资质",
    description: "一站式资质申请与维护服务",
    products: [
      { name: "中国NVOCC", desc: "无船承运人资质" },
      { name: "美国FMC", desc: "联邦海事委员会注册" },
      { name: "加拿大NVOCC", desc: "加拿大无船承运人" },
      { name: "海关Bond", desc: "美国海关保证金" },
    ],
  },
]

/**
 * 产品展示组件
 */
export default function Products() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* 标题区 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            我们的产品与服务
          </h2>
          <p className="text-lg text-slate-600">
            专业的国际物流工具，满足您的各类申报和合规需求
          </p>
        </div>

        {/* 产品分类 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {productCategories.map((category) => (
            <Card key={category.title} className="border-slate-200">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">{category.title}</CardTitle>
                <CardDescription className="text-base">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {category.products.map((product) => (
                    <div
                      key={product.name}
                      className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="text-sm text-slate-500">{product.desc}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to={`/products/${category.title === "海关申报" ? "customs" : "compliance"}`}>
                    查看全部
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
