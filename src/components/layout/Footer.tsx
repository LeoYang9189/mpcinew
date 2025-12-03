import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

/**
 * 网站底部组件
 * 包含公司信息、产品链接、联系方式等
 */
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/Gemini_Generated_Image_f54pr3f54pr3f54p.png" alt="AI物流" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm text-slate-400">
              专业的国际物流智能工具服务平台，为您提供高效、合规的物流解决方案。
            </p>
          </div>

          {/* 海关申报 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">海关申报</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products/uae-mpci" className="hover:text-white transition-colors">UAE MPCI</Link></li>
              <li><Link to="/products/ams" className="hover:text-white transition-colors">AMS</Link></li>
              <li><Link to="/products/isf" className="hover:text-white transition-colors">ISF</Link></li>
              <li><Link to="/products/afr" className="hover:text-white transition-colors">AFR</Link></li>
              <li><Link to="/products/emanifest" className="hover:text-white transition-colors">eManifest</Link></li>
            </ul>
          </div>

          {/* 合规资质 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">合规资质</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products/china-nvocc" className="hover:text-white transition-colors">中国NVOCC</Link></li>
              <li><Link to="/products/us-fmc" className="hover:text-white transition-colors">美国FMC</Link></li>
              <li><Link to="/products/canada-nvocc" className="hover:text-white transition-colors">加拿大NVOCC</Link></li>
              <li><Link to="/products/customs-bond" className="hover:text-white transition-colors">海关Bond</Link></li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">联系我们</h4>
            <ul className="space-y-2 text-sm">
              <li>客服热线：400-XXX-XXXX</li>
              <li>邮箱：support@ailogistics.com</li>
              <li>工作时间：周一至周五 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2024 AI物流. 保留所有权利.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
            <Link to="/terms" className="hover:text-white transition-colors">服务条款</Link>
            <Link to="/contact" className="hover:text-white transition-colors">联系我们</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
