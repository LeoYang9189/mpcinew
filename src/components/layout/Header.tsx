import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 海关申报产品列表
 */
const customsProducts = [
  { title: "UAE MPCI", href: "/products/uae-mpci", description: "阿联酋货物预申报系统" },
  { title: "AMS", href: "/products/ams", description: "美国舱单自动化系统" },
  { title: "ISF", href: "/products/isf", description: "进口商安全申报" },
  { title: "AFR", href: "/products/afr", description: "日本提前申报规则" },
  { title: "eManifest", href: "/products/emanifest", description: "加拿大电子舱单" },
  { title: "上海预配", href: "/products/shanghai-pre", description: "上海港预配舱单" },
  { title: "青岛预配", href: "/products/qingdao-pre", description: "青岛港预配舱单" },
]

/**
 * 合规资质产品列表
 */
const complianceProducts = [
  { title: "中国NVOCC", href: "/products/china-nvocc", description: "中国无船承运人资质" },
  { title: "美国FMC", href: "/products/us-fmc", description: "美国联邦海事委员会注册" },
  { title: "加拿大NVOCC", href: "/products/canada-nvocc", description: "加拿大无船承运人资质" },
  { title: "海关Bond", href: "/products/customs-bond", description: "美国海关保证金" },
]

/**
 * 导航链接组件
 */
function ListItem({ className, title, href, children }: {
  className?: string
  title: string
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}


/**
 * 网站顶部导航栏
 * 包含Logo、产品导航、登录注册按钮
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/Gemini_Generated_Image_f54pr3f54pr3f54p.png" alt="AI物流" className="h-10 w-auto object-contain" />
        </Link>

        {/* 桌面端导航 */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* 海关申报 */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-serif">海关申报</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {customsProducts.map((product) => (
                    <ListItem key={product.title} title={product.title} href={product.href}>
                      {product.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 合规资质 */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-serif">合规资质</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {complianceProducts.map((product) => (
                    <ListItem key={product.title} title={product.title} href={product.href}>
                      {product.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 关于我们 */}
            <NavigationMenuItem>
              <Link to="/about" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground font-serif">
                关于我们
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* 登录注册按钮 */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/login">登录</Link>
          </Button>
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link to="/register">免费注册</Link>
          </Button>
        </div>

        {/* 移动端菜单 */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <div className="space-y-2">
                <h4 className="font-serif font-medium text-sm text-muted-foreground">海关申报</h4>
                {customsProducts.map((product) => (
                  <Link key={product.title} to={product.href} className="block py-2 text-sm hover:text-primary">
                    {product.title}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-serif font-medium text-sm text-muted-foreground">合规资质</h4>
                {complianceProducts.map((product) => (
                  <Link key={product.title} to={product.href} className="block py-2 text-sm hover:text-primary">
                    {product.title}
                  </Link>
                ))}
              </div>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">登录</Link>
                </Button>
                <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                  <Link to="/register">免费注册</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
