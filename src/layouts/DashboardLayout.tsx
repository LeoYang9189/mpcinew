import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Ship,
  Menu,
  Home,
  FileText,
  Shield,
  Settings,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 侧边栏菜单配置
 */
const menuItems = [
  { icon: Home, label: "控制台", href: "/dashboard" },
  {
    icon: FileText,
    label: "海关申报",
    children: [
      { label: "UAE MPCI", href: "/dashboard/customs/uae-mpci" },
      { label: "AMS", href: "/dashboard/customs/ams" },
      { label: "ISF", href: "/dashboard/customs/isf" },
      { label: "eManifest", href: "/dashboard/customs/emanifest" },
      { label: "AFR", href: "/dashboard/customs/afr" },
    ],
  },
  {
    icon: Shield,
    label: "合规资质",
    children: [
      { label: "中国NVOCC", href: "/dashboard/compliance/china-nvocc" },
      { label: "美国FMC", href: "/dashboard/compliance/us-fmc" },
      { label: "加拿大ACI", href: "/dashboard/compliance/canada-aci" },
      { label: "美国海关Bond", href: "/dashboard/compliance/us-bond" },
    ],
  },
  { icon: Settings, label: "设置", href: "/dashboard/settings" },
]


/**
 * 侧边栏组件
 */
function Sidebar({ className }: { className?: string }) {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["海关申报", "合规资质"])

  /**
   * 切换菜单展开状态
   */
  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  return (
    <aside className={cn("w-64 bg-slate-900 text-white flex flex-col", className)}>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Ship className="h-6 w-6 text-teal-400" />
          <span className="text-lg font-serif font-semibold">AI物流</span>
        </Link>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const hasChildren = "children" in item && item.children
          const isExpanded = expandedMenus.includes(item.label)
          const isActive = "href" in item && location.pathname === item.href
          const isChildActive = hasChildren && item.children?.some((child) => location.pathname === child.href)

          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                    isChildActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children?.map((child) => {
                      const isChildItemActive = location.pathname === child.href
                      return (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm transition-colors",
                            isChildItemActive
                              ? "bg-slate-800 text-white"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          )}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              to={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* 底部返回首页 */}
      <div className="p-4 border-t border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
        >
          返回官网
        </Link>
      </div>
    </aside>
  )
}

/**
 * 用户后台布局组件
 */
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar className="hidden lg:flex fixed inset-y-0 left-0 z-50" />

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-40">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-slate-200 text-slate-700">U</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">用户名</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  个人资料
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  账户设置
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 min-w-0 overflow-hidden flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
