import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Ship, Eye, EyeOff, Check } from "lucide-react"

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
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <Ship className="h-8 w-8" />
          <span className="text-2xl font-serif font-semibold">AI物流</span>
        </Link>

        <div className="space-y-8">
          <h1 className="font-serif text-4xl font-bold leading-tight">
            开启您的智能物流之旅
          </h1>
          <ul className="space-y-4">
            {[
              "覆盖全球50+国家和地区",
              "智能AI辅助申报",
              "7x24小时专业支持",
              "100%合规保障",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-slate-400">
          © 2024 AI物流. 保留所有权利.
        </p>
      </div>

      {/* 右侧注册表单 */}
      <div className="flex-1 flex flex-col">
        {/* 移动端Logo */}
        <div className="p-6 lg:hidden">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <Ship className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-serif font-semibold">AI物流</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 pb-20 lg:pb-0">
          <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-2xl">创建账户</CardTitle>
              <CardDescription>填写以下信息完成注册</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">姓</Label>
                    <Input id="firstName" placeholder="张" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">名</Label>
                    <Input id="lastName" placeholder="三" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">公司名称</Label>
                  <Input id="company" placeholder="您的公司名称" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="13800138000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="至少8位字符"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  点击注册即表示您同意我们的{" "}
                  <Link to="/terms" className="text-teal-600 hover:underline">服务条款</Link>
                  {" "}和{" "}
                  <Link to="/privacy" className="text-teal-600 hover:underline">隐私政策</Link>
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  注册
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                已有账户？{" "}
                <Link to="/login" className="text-teal-600 hover:underline font-medium">
                  立即登录
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
