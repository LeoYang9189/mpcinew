import { useRef, useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import { getMPCIFullData, type MPCIFullData } from "@/lib/mpci-data"

interface MPCIExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  declarationNo: string | null
}

/**
 * MPCI 申报单导出预览弹窗
 * 基于编辑页面的真实字段结构
 */
export default function MPCIExportDialog({ open, onOpenChange, declarationNo }: MPCIExportDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)
  const [data, setData] = useState<MPCIFullData | null>(null)

  /**
   * 根据申报单号加载完整数据
   */
  useEffect(() => {
    if (open && declarationNo) {
      const fullData = getMPCIFullData(declarationNo)
      setData(fullData)
    }
  }, [open, declarationNo])

  if (!data) return null

  const { formData, containers, cargos } = data

  /**
   * 获取当前日期时间字符串
   */
  const getCurrentDateTime = () => {
    const now = new Date()
    return now.toISOString().slice(0, 19).replace("T", " ")
  }

  /**
   * 导出为 PDF
   * 使用 iframe 完全隔离 oklch 颜色问题
   */
  const handleExport = async () => {
    if (!contentRef.current) return
    setExporting(true)
    try {
      // 创建隔离的 iframe
      const iframe = document.createElement("iframe")
      iframe.style.cssText = "position:absolute;left:-9999px;top:0;width:800px;height:auto;border:none;"
      document.body.appendChild(iframe)
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) throw new Error("无法创建 iframe")
      
      // 写入纯净的 HTML，不继承任何外部样式
      iframeDoc.open()
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; font-size: 14px; color: #1e293b; background: #fff; }
          </style>
        </head>
        <body>${contentRef.current.innerHTML}</body>
        </html>
      `)
      iframeDoc.close()
      
      // 等待图片加载
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })
      
      document.body.removeChild(iframe)

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      pdf.addImage(imgData, "PNG", imgX, 5, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`MPCI_${data.declarationNo}.pdf`)
    } catch (error) {
      console.error("导出 PDF 失败:", error)
    } finally {
      setExporting(false)
    }
  }

  // 内联样式常量
  const labelStyle = { color: "#64748b", fontSize: "12px", marginBottom: "4px" }
  const valueStyle = { fontWeight: "500" as const }
  const sectionStyle = { marginBottom: "16px" }
  const gridStyle = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", padding: "16px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", marginBottom: "16px" }
  const thStyle = { border: "1px solid #e2e8f0", padding: "8px 12px", textAlign: "left" as const, fontSize: "12px", fontWeight: "500" as const, color: "#475569", backgroundColor: "#f1f5f9" }
  const tdStyle = { border: "1px solid #e2e8f0", padding: "8px 12px" }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>申报单预览</span>
            <Button onClick={handleExport} disabled={exporting} className="gap-2">
              {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              导出 PDF
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* PDF 内容区域 */}
        <div ref={contentRef} style={{ backgroundColor: "#ffffff", padding: "32px", fontSize: "14px", fontFamily: "Arial, sans-serif", color: "#1e293b" }}>
          {/* 头部 */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid #cbd5e1" }}>
            <img src="/Gemini_Generated_Image_f54pr3f54pr3f54p.png" alt="Logo" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
            <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b" }}>MPCI FILING CERTIFICATE</h1>
            <span style={{ color: "#64748b", fontSize: "12px" }}>{getCurrentDateTime()}</span>
          </div>

          {/* 状态信息（来自列表页） */}
          <table style={{ width: "100%", marginBottom: "16px", borderCollapse: "collapse" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "8px 0", color: "#64748b", width: "25%" }}>申报单号:</td>
                <td style={{ padding: "8px 0", fontWeight: "500" }}>{data.declarationNo}</td>
                <td style={{ padding: "8px 0", color: "#64748b", width: "25%" }}>校验状态:</td>
                <td style={{ padding: "8px 0" }}>{data.verifyStatus}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "8px 0", color: "#64748b" }}>申报状态:</td>
                <td style={{ padding: "8px 0" }}>{data.declareStatus}</td>
                <td style={{ padding: "8px 0", color: "#64748b" }}>海关回执:</td>
                <td style={{ padding: "8px 0" }}>{data.customsStatus || "-"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "8px 0", color: "#64748b" }}>创建人:</td>
                <td style={{ padding: "8px 0" }}>{data.creator}</td>
                <td style={{ padding: "8px 0", color: "#64748b" }}>创建时间:</td>
                <td style={{ padding: "8px 0" }}>{data.createTime}</td>
              </tr>
            </tbody>
          </table>

          {/* 基本信息 */}
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>基本信息</h3>
          <div style={gridStyle}>
            <div><div style={labelStyle}>申报责任方 MPCI ID</div><div style={valueStyle}>{formData.declarantMpciId}</div></div>
            <div><div style={labelStyle}>运输类型</div><div style={valueStyle}>{formData.transportType === "import" ? "进口" : "中转"}</div></div>
            <div><div style={labelStyle}>是否有下层分单</div><div style={valueStyle}>{formData.hasSubHbl ? "是" : "否"}</div></div>
            <div><div style={labelStyle}>提单签发日期</div><div style={valueStyle}>{formData.blIssueDate}</div></div>
            <div><div style={labelStyle}>预计装船日期</div><div style={valueStyle}>{formData.estimatedShipDate}</div></div>
            <div><div style={labelStyle}>提单类型</div><div style={valueStyle}>{formData.blType}</div></div>
            <div><div style={labelStyle}>HBL No</div><div style={valueStyle}>{formData.hblNo}</div></div>
            <div><div style={labelStyle}>同层分单数量</div><div style={valueStyle}>{formData.siblingHblCount}</div></div>
          </div>

          {/* 上层提单信息 */}
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>上层提单信息</h3>
          <div style={gridStyle}>
            <div><div style={labelStyle}>上层签发人类型</div><div style={valueStyle}>{formData.upperBlIssuerType === "carrier" ? "船公司" : "货代"}</div></div>
            <div><div style={labelStyle}>上层签发人 MPCI ID</div><div style={valueStyle}>{formData.upperBlIssuerMpciId}</div></div>
            <div><div style={labelStyle}>上层提单号</div><div style={valueStyle}>{formData.upperBlNo}</div></div>
            <div><div style={labelStyle}>下层申报责任方</div><div style={valueStyle}>{formData.subDeclarantMpciId || "-"}</div></div>
          </div>

          {/* 港口信息 */}
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>港口信息</h3>
          <div style={gridStyle}>
            <div><div style={labelStyle}>收货地</div><div style={valueStyle}>{formData.placeOfReceipt}</div></div>
            <div><div style={labelStyle}>装货港</div><div style={valueStyle}>{formData.portOfLoading}</div></div>
            <div><div style={labelStyle}>卸货港</div><div style={valueStyle}>{formData.portOfDischarge}</div></div>
            <div><div style={labelStyle}>交货地</div><div style={valueStyle}>{formData.placeOfDelivery}</div></div>
            <div><div style={labelStyle}>清关地</div><div style={valueStyle}>{formData.clearanceLocation}</div></div>
          </div>

          {/* 发货人信息 */}
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>发货人 (Shipper)</h3>
          <div style={{ ...gridStyle, gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div><div style={labelStyle}>名称</div><div style={valueStyle}>{formData.shipperName}</div></div>
            <div><div style={labelStyle}>城市</div><div style={valueStyle}>{formData.shipperCity}</div></div>
            <div><div style={labelStyle}>国家</div><div style={valueStyle}>{formData.shipperCountry}</div></div>
            <div style={{ gridColumn: "span 3" }}><div style={labelStyle}>地址</div><div style={valueStyle}>{formData.shipperAddress}</div></div>
            <div><div style={labelStyle}>电话</div><div style={valueStyle}>{formData.shipperPhone}</div></div>
            <div><div style={labelStyle}>邮箱</div><div style={valueStyle}>{formData.shipperEmail}</div></div>
          </div>

          {/* 收货人信息 */}
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>收货人 (Consignee)</h3>
          <div style={{ ...gridStyle, gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div><div style={labelStyle}>名称</div><div style={valueStyle}>{formData.consigneeName}</div></div>
            <div><div style={labelStyle}>城市</div><div style={valueStyle}>{formData.consigneeCity}</div></div>
            <div><div style={labelStyle}>国家</div><div style={valueStyle}>{formData.consigneeCountry}</div></div>
            <div style={{ gridColumn: "span 3" }}><div style={labelStyle}>地址</div><div style={valueStyle}>{formData.consigneeAddress}</div></div>
            <div><div style={labelStyle}>电话</div><div style={valueStyle}>{formData.consigneePhone}</div></div>
            <div><div style={labelStyle}>邮箱</div><div style={valueStyle}>{formData.consigneeEmail}</div></div>
          </div>

          {/* 起运港货代信息 */}
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>起运港货代 (Forwarder)</h3>
          <div style={{ ...gridStyle, gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div><div style={labelStyle}>名称</div><div style={valueStyle}>{formData.forwarderName}</div></div>
            <div><div style={labelStyle}>城市</div><div style={valueStyle}>{formData.forwarderCity}</div></div>
            <div><div style={labelStyle}>国家</div><div style={valueStyle}>{formData.forwarderCountry}</div></div>
            <div style={{ gridColumn: "span 3" }}><div style={labelStyle}>地址</div><div style={valueStyle}>{formData.forwarderAddress}</div></div>
          </div>

          {/* 集装箱明细 */}
          <div style={sectionStyle}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>集装箱明细</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e2e8f0" }}>
              <thead>
                <tr>
                  <th style={thStyle}>箱号</th>
                  <th style={thStyle}>箱型</th>
                  <th style={thStyle}>封号</th>
                  <th style={thStyle}>VGM重量 (KGS)</th>
                </tr>
              </thead>
              <tbody>
                {containers.map((c) => (
                  <tr key={c.id}>
                    <td style={tdStyle}>{c.containerNo}</td>
                    <td style={tdStyle}>{c.containerType}</td>
                    <td style={tdStyle}>{c.sealNo}</td>
                    <td style={tdStyle}>{c.vgmWeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 货物明细 */}
          <div style={sectionStyle}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px", borderBottom: "1px solid #cbd5e1", paddingBottom: "4px" }}>货物明细</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e2e8f0" }}>
              <thead>
                <tr>
                  <th style={thStyle}>关联箱号</th>
                  <th style={thStyle}>HS Code</th>
                  <th style={thStyle}>唛头</th>
                  <th style={thStyle}>货物描述</th>
                  <th style={thStyle}>数量</th>
                  <th style={thStyle}>包装</th>
                  <th style={thStyle}>毛重(KGS)</th>
                  <th style={thStyle}>体积(CBM)</th>
                </tr>
              </thead>
              <tbody>
                {cargos.map((c) => (
                  <tr key={c.id}>
                    <td style={tdStyle}>{c.containerNos.join(", ")}</td>
                    <td style={tdStyle}>{c.hsCode}</td>
                    <td style={tdStyle}>{c.marks}</td>
                    <td style={tdStyle}>{c.description}</td>
                    <td style={tdStyle}>{c.quantity}</td>
                    <td style={tdStyle}>{c.packageUnit}</td>
                    <td style={tdStyle}>{c.weight}</td>
                    <td style={tdStyle}>{c.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 底部信息 */}
          <div style={{ marginTop: "32px", paddingTop: "16px", borderTop: "1px solid #cbd5e1", fontSize: "12px", color: "#94a3b8", textAlign: "center" }}>
            This certificate is automatically generated by AI Logistics System.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
