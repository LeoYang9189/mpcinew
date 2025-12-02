import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/home/Hero"
import Features from "@/components/home/Features"
import Products from "@/components/home/Products"
import CTA from "@/components/home/CTA"

/**
 * 首页落地页
 * 包含Header、Hero、功能优势、产品展示、CTA、Footer
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Products />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
