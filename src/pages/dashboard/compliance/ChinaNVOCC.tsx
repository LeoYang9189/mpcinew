import ComplianceList from "@/components/dashboard/ComplianceList"

/**
 * 中国NVOCC 资质页面
 */
export default function ChinaNVOCCPage() {
  return (
    <ComplianceList
      title="中国NVOCC"
      description="中国无船承运人资质管理"
      type="NVOCC-CN"
    />
  )
}
