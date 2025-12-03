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
  Menu,
  Home,
  FileText,
  Shield,
  Settings,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Bell,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import "flag-icons/css/flag-icons.min.css"

/**
 * 侧边栏菜单配置
 * flagCode 使用 ISO 3166-1 alpha-2 国家代码（小写）
 */
const menuItems = [
  { icon: Home, label: "控制台", href: "/dashboard" },
  {
    icon: FileText,
    label: "海关申报",
    children: [
      { flagCode: "ae", label: "UAE MPCI", href: "/dashboard/customs/uae-mpci" },
      { flagCode: "us", label: "AMS", href: "/dashboard/customs/ams" },
      { flagCode: "us", label: "ISF", href: "/dashboard/customs/isf" },
      { flagCode: "ca", label: "eManifest", href: "/dashboard/customs/emanifest" },
      { flagCode: "jp", label: "AFR", href: "/dashboard/customs/afr" },
    ],
  },
  {
    icon: Shield,
    label: "合规资质",
    children: [
      { flagCode: "cn", label: "中国NVOCC", href: "/dashboard/compliance/china-nvocc" },
      { flagCode: "us", label: "美国FMC", href: "/dashboard/compliance/us-fmc" },
      { flagCode: "ca", label: "加拿大ACI", href: "/dashboard/compliance/canada-aci" },
      { flagCode: "us", label: "美国海关Bond", href: "/dashboard/compliance/us-bond" },
    ],
  },
  { icon: Settings, label: "设置", href: "/dashboard/settings" },
]


/**
 * 侧边栏组件
 */
function Sidebar({ 
  className, 
  collapsed = false,
  onToggle,
}: { 
  className?: string
  collapsed?: boolean
  onToggle?: () => void
}) {
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
    <aside className={cn(
      "bg-slate-900 text-white flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-3 border-b border-slate-800 relative">
        <Link to="/dashboard" className="flex items-center justify-center">
          <img 
            src="/Gemini_Generated_Image_f54pr3f54pr3f54p.png" 
            alt="AI物流" 
            className={cn(
              "object-contain flex-shrink-0 transition-all duration-300",
              collapsed ? "h-10 w-10" : "h-12 w-auto max-w-[140px]"
            )} 
          />
        </Link>
        {onToggle && !collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="收起侧边栏"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
        {onToggle && collapsed && (
          <button
            onClick={onToggle}
            className="absolute top-4 right-1 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="展开侧边栏"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 导航菜单 */}
      <nav className={cn("flex-1 space-y-1 overflow-y-auto", collapsed ? "p-2" : "p-4")}>
        {menuItems.map((item) => {
          const hasChildren = "children" in item && item.children
          const isExpanded = expandedMenus.includes(item.label) && !collapsed
          const isActive = "href" in item && location.pathname === item.href
          const isChildActive = hasChildren && item.children?.some((child) => location.pathname === child.href)

          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => !collapsed && toggleMenu(item.label)}
                  className={cn(
                    "w-full flex items-center rounded-lg text-sm transition-colors",
                    collapsed ? "justify-center px-2 py-2" : "justify-between px-3 py-2",
                    isChildActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <div className={cn("flex items-center", collapsed ? "" : "gap-3")}>
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && item.label}
                  </div>
                  {!collapsed && <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />}
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
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                            isChildItemActive
                              ? "bg-slate-800 text-white"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          )}
                        >
                          {"flagCode" in child && (
                            <span className={`fi fi-${child.flagCode} rounded-sm`} style={{ fontSize: '14px' }} />
                          )}
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
                "flex items-center rounded-lg text-sm transition-colors",
                collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2",
                isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>

      {/* 底部返回首页 */}
      <div className={cn("border-t border-slate-800", collapsed ? "p-2" : "p-4")}>
        <Link
          to="/"
          className={cn(
            "flex items-center rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors",
            collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"
          )}
          title={collapsed ? "返回官网" : undefined}
        >
          <ChevronLeft className="h-5 w-5 flex-shrink-0" />
          {!collapsed && "返回官网"}
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  /**
   * 切换侧边栏收缩状态
   */
  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar 
        className="hidden lg:flex fixed inset-y-0 left-0 z-50" 
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className={cn(
        "flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        {/* 顶栏 - 蓝黑色配白色字体 */}
        <header className="h-16 bg-slate-900 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-40">
          <div className="flex items-center gap-3">
            {/* 移动端菜单按钮 */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden text-white hover:bg-slate-800" 
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-slate-800">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-slate-700 text-white">U</AvatarFallback>
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
