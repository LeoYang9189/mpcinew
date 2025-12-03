import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

/**
 * 登录页面
 */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  /**
   * 处理表单提交
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 实现登录逻辑
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 左侧品牌区 */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/60 to-slate-900/90"></div>

        {/* 内容 */}
        <div className="relative z-10">
          {/* Logo moved to top right */}
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-2xl font-medium leading-relaxed">
              "AI物流平台极大地简化了我们的报关流程，让复杂的国际物流变得前所未有的简单和高效。"
            </p>
            <footer className="text-slate-400 text-base">
              — 全球供应链总监, TechGlobal Inc.
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © 2024 AI物流. 保留所有权利.
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 bg-white relative">
        {/* Logo positioned at top right */}
        <div className="absolute top-6 right-6">
          <Link to="/" className="flex items-center w-fit">
            <img src="/logo.png" alt="AI物流" className="h-20 w-auto" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">欢迎回来</h1>
            <p className="text-slate-500">
              请输入您的账户信息以登录
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">密码</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-teal-600 hover:text-teal-500 transition-colors"
                >
                  忘记密码？
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
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

            <Button type="submit" className="w-full h-11 text-base bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all hover:shadow-teal-600/40">
              立即登录
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
                或者
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            还没有账户？{" "}
            <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500 transition-colors">
              免费注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
