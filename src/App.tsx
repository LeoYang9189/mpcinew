import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "@/pages/Home"
import LoginPage from "@/pages/Login"
import RegisterPage from "@/pages/Register"
import AboutPage from "@/pages/About"
import CustomsPage from "@/pages/products/Customs"
import CompliancePage from "@/pages/products/Compliance"
import DashboardLayout from "@/layouts/DashboardLayout"
import DashboardHome from "@/pages/dashboard/Home"
// 海关申报页面
import AMSPage from "@/pages/dashboard/customs/AMS"
import UAEMPCIPage from "@/pages/dashboard/customs/UAEMPCI"
import ISFPage from "@/pages/dashboard/customs/ISF"
import EManifestPage from "@/pages/dashboard/customs/eManifest"
import AFRPage from "@/pages/dashboard/customs/AFR"
// 合规资质页面
import ChinaNVOCCPage from "@/pages/dashboard/compliance/ChinaNVOCC"
import USFMCPage from "@/pages/dashboard/compliance/USFMC"
import CanadaACIPage from "@/pages/dashboard/compliance/CanadaACI"
import USBondPage from "@/pages/dashboard/compliance/USBond"

/**
 * 应用根组件
 * 配置路由和全局布局
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 公开页面 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* 产品页面 */}
        <Route path="/products/customs" element={<CustomsPage />} />
        <Route path="/products/compliance" element={<CompliancePage />} />

        {/* 用户后台 */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          {/* 海关申报 */}
          <Route path="customs/uae-mpci" element={<UAEMPCIPage />} />
          <Route path="customs/ams" element={<AMSPage />} />
          <Route path="customs/isf" element={<ISFPage />} />
          <Route path="customs/emanifest" element={<EManifestPage />} />
          <Route path="customs/afr" element={<AFRPage />} />
          {/* 合规资质 */}
          <Route path="compliance/china-nvocc" element={<ChinaNVOCCPage />} />
          <Route path="compliance/us-fmc" element={<USFMCPage />} />
          <Route path="compliance/canada-aci" element={<CanadaACIPage />} />
          <Route path="compliance/us-bond" element={<USBondPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
