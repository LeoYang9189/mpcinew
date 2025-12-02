import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Ship, Eye, EyeOff } from "lucide-react"

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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 顶部Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <Ship className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-serif font-semibold">AI物流</span>
        </Link>
      </div>

      {/* 登录表单 */}
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">欢迎回来</CardTitle>
            <CardDescription>登录您的账户以继续</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">密码</Label>
                  <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
                    忘记密码？
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="输入密码"
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
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                登录
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              还没有账户？{" "}
              <Link to="/register" className="text-teal-600 hover:underline font-medium">
                立即注册
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
