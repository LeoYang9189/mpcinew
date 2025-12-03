/**
 * MPCI 数据服务
 * 基于编辑页面的真实字段结构
 */

/**
 * 集装箱数据类型（与编辑页面一致）
 */
export interface ContainerItem {
  id: string
  containerNo: string
  sealNo: string
  containerType: string
  vgmWeight: string
}

/**
 * 货物数据类型（与编辑页面一致）
 */
export interface CargoItem {
  id: string
  containerNos: string[]
  hsCode: string
  marks: string
  description: string
  quantity: string
  packageUnit: string
  weight: string
  volume: string
  dgUn: string
}

/**
 * 表单数据类型（与编辑页面一致）
 */
export interface FormData {
  // 基本信息
  declarantMpciId: string
  transportType: string
  hasSubHbl: boolean
  blIssueDate: string
  estimatedShipDate: string
  // 提单信息
  blType: string
  hblNo: string
  upperBlIssuerType: string
  upperBlIssuerMpciId: string
  upperBlNo: string
  siblingHblCount: number
  subDeclarantMpciId: string
  // 港口信息
  placeOfReceipt: string
  portOfLoading: string
  portOfDischarge: string
  placeOfDelivery: string
  clearanceLocation: string
  // 发货人信息
  shipperName: string
  shipperAddress: string
  shipperCity: string
  shipperCountry: string
  shipperPhone: string
  shipperEmail: string
  // 收货人信息
  consigneeName: string
  consigneeAddress: string
  consigneeCity: string
  consigneeCountry: string
  consigneePhone: string
  consigneeEmail: string
  // 起运港货代信息
  forwarderName: string
  forwarderAddress: string
  forwarderCity: string
  forwarderCountry: string
  // 补充信息
  internalRemark: string
}

/**
 * MPCI 完整申报数据（编辑页面数据 + 列表页状态字段）
 */
export interface MPCIFullData {
  // 列表页状态字段
  declarationNo: string
  verifyStatus: string
  declareStatus: string
  customsStatus: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
  // 编辑页面表单数据
  formData: FormData
  // 集装箱列表
  containers: ContainerItem[]
  // 货物列表
  cargos: CargoItem[]
}

/**
 * 根据申报单号生成完整的 Mock 数据
 * @param declarationNo 申报单号
 * @returns 完整的 MPCI 数据
 */
export function getMPCIFullData(declarationNo: string): MPCIFullData {
  const seed = parseInt(declarationNo.replace(/\D/g, "")) || 1
  const random = (max: number) => ((seed * 9301 + 49297) % 233280) % max

  const declareStatuses = ["草稿", "已提交", "发送成功", "已删除", "已过期"]
  const customsStatuses = ["允许装船", "要求补充信息", "风险装船", "禁止装船", "下层未申报"]
  const users = ["John Smith", "Emily Chen", "Robert Wang", "Lisa Zhang", "Kevin Liu"]

  const day = String((random(28) + 1)).padStart(2, "0")
  const hour = String((random(12) + 8)).padStart(2, "0")
  const minute = String(random(60)).padStart(2, "0")
  const declareStatus = declareStatuses[random(declareStatuses.length)]

  return {
    // 列表页状态字段
    declarationNo,
    verifyStatus: random(2) > 0 ? "校验通过" : "校验失败",
    declareStatus,
    customsStatus: declareStatus === "草稿" ? "" : customsStatuses[random(customsStatuses.length)],
    creator: users[random(users.length)],
    createTime: `2024-01-${day} ${hour}:${minute}`,
    updater: users[random(users.length)],
    updateTime: `2024-01-${day} ${String(Number(hour) + 2).padStart(2, "0")}:${minute}`,
    // 编辑页面表单数据
    formData: {
      declarantMpciId: `AEMP${String(random(9000) + 1000)}`,
      transportType: random(10) > 3 ? "import" : "transit",
      hasSubHbl: random(10) > 7,
      blIssueDate: "2024-01-15",
      estimatedShipDate: "2024-02-20",
      blType: random(10) > 5 ? "NON" : "NEG",
      hblNo: `HBL${declarationNo.replace(/\D/g, "").padStart(8, "0")}`,
      upperBlIssuerType: random(10) > 3 ? "carrier" : "forwarder",
      upperBlIssuerMpciId: ["MAEU", "MSCU", "COSU", "OOLU", "EGLV"][random(5)],
      upperBlNo: `MBL${String(parseInt(declarationNo.replace(/\D/g, "")) + 1000).padStart(8, "0")}`,
      siblingHblCount: random(5) + 1,
      subDeclarantMpciId: random(10) > 7 ? `AEMP${String(random(9000) + 1000)}` : "",
      placeOfReceipt: "CNSHA",
      portOfLoading: "CNSHA",
      portOfDischarge: "AEJEA",
      placeOfDelivery: "AEJEA",
      clearanceLocation: "DU",
      shipperName: "SHANGHAI GLOBAL TRADING CO LTD",
      shipperAddress: "NO.888 PUDONG AVENUE, PUDONG NEW AREA",
      shipperCity: "SHANGHAI",
      shipperCountry: "CN",
      shipperPhone: "+86-21-12345678",
      shipperEmail: "export@shanghaitrade.com",
      consigneeName: "DUBAI TRADING LLC",
      consigneeAddress: "JEBEL ALI FREE ZONE, WAREHOUSE 15",
      consigneeCity: "DUBAI",
      consigneeCountry: "AE",
      consigneePhone: "+971-4-8765432",
      consigneeEmail: "import@dubaitrading.ae",
      forwarderName: "ORIENT LOGISTICS CO LTD",
      forwarderAddress: "ROOM 2001, SHIPPING TOWER",
      forwarderCity: "SHANGHAI",
      forwarderCountry: "CN",
      internalRemark: "URGENT SHIPMENT - HANDLE WITH CARE",
    },
    // 集装箱列表
    containers: [
      { id: "1", containerNo: "MSKU1234567", sealNo: "SL123456", containerType: "40HQ", vgmWeight: "25680.00" },
      { id: "2", containerNo: "TCLU7654321", sealNo: "SL789012", containerType: "20GP", vgmWeight: "18500.00" },
    ],
    // 货物列表
    cargos: [
      {
        id: "1",
        containerNos: ["MSKU1234567"],
        hsCode: "8471300000",
        marks: "N/M",
        description: "LAPTOP COMPUTERS AND ACCESSORIES",
        quantity: "500",
        packageUnit: "CT",
        weight: "12500.00",
        volume: "25.50",
        dgUn: "",
      },
      {
        id: "2",
        containerNos: ["MSKU1234567", "TCLU7654321"],
        hsCode: "8528720000",
        marks: "ABC BRAND",
        description: "LED MONITORS 27 INCH",
        quantity: "300",
        packageUnit: "CT",
        weight: "8500.00",
        volume: "18.20",
        dgUn: "",
      },
    ],
  }
}
