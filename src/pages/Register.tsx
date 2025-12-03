import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Check } from "lucide-react"

/**
 * 注册页面
 */
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  /**
   * 处理表单提交
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 实现注册逻辑
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 左侧信息区 */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/60 to-slate-900/90"></div>

        <div className="relative z-10">
          {/* Logo moved to top right */}
        </div>

        <div className="relative z-10 space-y-8 max-w-lg">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            开启您的<br />
            <span className="text-teal-400">智能物流</span>之旅
          </h1>
          <ul className="space-y-4">
            {[
              "覆盖全球50+国家和地区",
              "智能AI辅助申报，效率提升80%",
              "7x24小时专业合规支持",
              "银行级数据安全保障",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg text-slate-200">
                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                  <Check className="h-3.5 w-3.5 text-teal-400" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © 2024 AI物流. 保留所有权利.
        </div>
      </div>

      {/* 右侧注册表单 */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 bg-white relative">
        {/* Logo positioned at top right */}
        <div className="absolute top-6 right-6">
          <Link to="/" className="flex items-center w-fit">
            <img src="/logo.png" alt="AI物流" className="h-20 w-auto" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">创建账户</h1>
            <p className="text-slate-500">
              填写以下信息完成注册
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">姓</Label>
                <Input id="firstName" placeholder="张" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">名</Label>
                <Input id="lastName" placeholder="三" required className="h-11" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">公司名称</Label>
              <Input id="company" placeholder="您的公司名称" required className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">手机号码</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="138 0000 0000"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">设置密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="至少8位字符"
                  required
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              点击注册即表示您同意我们的{" "}
              <Link to="/terms" className="text-teal-600 hover:text-teal-500 hover:underline">服务条款</Link>
              {" "}和{" "}
              <Link to="/privacy" className="text-teal-600 hover:text-teal-500 hover:underline">隐私政策</Link>
            </div>

            <Button type="submit" className="w-full h-11 text-base bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:shadow-teal-600/40">
              立即注册
            </Button>
          </form>

          <div className="text-center text-sm">
            已有账户？{" "}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500 transition-colors">
              立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
