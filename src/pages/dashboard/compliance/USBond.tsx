import ComplianceList from "@/components/dashboard/ComplianceList"

/**
 * 美国海关Bond 页面
 */
export default function USBondPage() {
  return (
    <ComplianceList
      title="美国海关Bond"
      description="美国海关保证金管理"
      type="BOND"
    />
  )
}
