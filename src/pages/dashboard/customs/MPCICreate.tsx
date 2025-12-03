import React, { useState, useCallback, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Send,
  Save,
  FileText,
  MapPin,
  Users,
  Package,
  Container,
  Paperclip,
  HelpCircle,
  Plus,
  Minus,
  Sparkles,
  Loader2,
  Upload,
  X,
  File,
  History,
  XCircle,
  Edit,
} from "lucide-react"

/**
 * 船公司 MPCI ID 枚举值（Mock 数据）
 */
const carrierMpciOptions = [
  { value: "MAEU", label: "MAEU - Maersk" },
  { value: "MSCU", label: "MSCU - MSC" },
  { value: "COSU", label: "COSU - COSCO" },
  { value: "OOLU", label: "OOLU - OOCL" },
  { value: "EGLV", label: "EGLV - Evergreen" },
  { value: "YMLU", label: "YMLU - Yang Ming" },
  { value: "HLCU", label: "HLCU - Hapag-Lloyd" },
  { value: "ONEY", label: "ONEY - ONE" },
  { value: "CMDU", label: "CMDU - CMA CGM" },
]

/**
 * 港口数据（Mock 数据）
 */
const portOptions = [
  { code: "CNSHA", name: "Shanghai", label: "Shanghai-CNSHA" },
  { code: "CNSHE", name: "Shenzhen", label: "Shenzhen-CNSHE" },
  { code: "CNNGB", name: "Ningbo", label: "Ningbo-CNNGB" },
  { code: "CNQIN", name: "Qingdao", label: "Qingdao-CNQIN" },
  { code: "CNTAO", name: "Tianjin", label: "Tianjin-CNTAO" },
  { code: "CNXMN", name: "Xiamen", label: "Xiamen-CNXMN" },
  { code: "CNGUA", name: "Guangzhou", label: "Guangzhou-CNGUA" },
  { code: "CNDAL", name: "Dalian", label: "Dalian-CNDAL" },
  { code: "HKHKG", name: "Hong Kong", label: "Hong Kong-HKHKG" },
  { code: "SGSIN", name: "Singapore", label: "Singapore-SGSIN" },
  { code: "KRPUS", name: "Busan", label: "Busan-KRPUS" },
  { code: "JPTYO", name: "Tokyo", label: "Tokyo-JPTYO" },
  { code: "JPYOK", name: "Yokohama", label: "Yokohama-JPYOK" },
  { code: "AEJEA", name: "Jebel Ali", label: "Jebel Ali-AEJEA" },
  { code: "AEDXB", name: "Dubai", label: "Dubai-AEDXB" },
  { code: "AEAUH", name: "Abu Dhabi", label: "Abu Dhabi-AEAUH" },
  { code: "AESHJ", name: "Sharjah", label: "Sharjah-AESHJ" },
  { code: "NLRTM", name: "Rotterdam", label: "Rotterdam-NLRTM" },
  { code: "DEHAM", name: "Hamburg", label: "Hamburg-DEHAM" },
  { code: "GBFXT", name: "Felixstowe", label: "Felixstowe-GBFXT" },
  { code: "USNYC", name: "New York", label: "New York-USNYC" },
  { code: "USLAX", name: "Los Angeles", label: "Los Angeles-USLAX" },
  { code: "USLGB", name: "Long Beach", label: "Long Beach-USLGB" },
]

/**
 * UAE 清关地枚举
 */
const uaeClearanceLocations = [
  { value: "AZ", label: "Abu Dhabi (AZ)" },
  { value: "DU", label: "Dubai (DU)" },
  { value: "SH", label: "Sharjah (SH)" },
  { value: "UQ", label: "Umm Al Quwain (UQ)" },
  { value: "AJ", label: "Ajman (AJ)" },
  { value: "FU", label: "Al Fujairah (FU)" },
  { value: "RK", label: "Ras Al Khaimah (RK)" },
]

/**
 * 全球国家列表
 */
const countryOptions = [
  { code: "CN", name: "China", label: "CN-China (中国)" },
  { code: "US", name: "United States", label: "US-United States (美国)" },
  { code: "GB", name: "United Kingdom", label: "GB-United Kingdom (英国)" },
  { code: "DE", name: "Germany", label: "DE-Germany (德国)" },
  { code: "FR", name: "France", label: "FR-France (法国)" },
  { code: "JP", name: "Japan", label: "JP-Japan (日本)" },
  { code: "KR", name: "South Korea", label: "KR-South Korea (韩国)" },
  { code: "SG", name: "Singapore", label: "SG-Singapore (新加坡)" },
  { code: "HK", name: "Hong Kong", label: "HK-Hong Kong (香港)" },
  { code: "TW", name: "Taiwan", label: "TW-Taiwan (台湾)" },
  { code: "AE", name: "United Arab Emirates", label: "AE-United Arab Emirates (阿联酋)" },
  { code: "SA", name: "Saudi Arabia", label: "SA-Saudi Arabia (沙特)" },
  { code: "IN", name: "India", label: "IN-India (印度)" },
  { code: "TH", name: "Thailand", label: "TH-Thailand (泰国)" },
  { code: "VN", name: "Vietnam", label: "VN-Vietnam (越南)" },
  { code: "MY", name: "Malaysia", label: "MY-Malaysia (马来西亚)" },
  { code: "ID", name: "Indonesia", label: "ID-Indonesia (印尼)" },
  { code: "PH", name: "Philippines", label: "PH-Philippines (菲律宾)" },
  { code: "AU", name: "Australia", label: "AU-Australia (澳大利亚)" },
  { code: "NZ", name: "New Zealand", label: "NZ-New Zealand (新西兰)" },
  { code: "CA", name: "Canada", label: "CA-Canada (加拿大)" },
  { code: "MX", name: "Mexico", label: "MX-Mexico (墨西哥)" },
  { code: "BR", name: "Brazil", label: "BR-Brazil (巴西)" },
  { code: "NL", name: "Netherlands", label: "NL-Netherlands (荷兰)" },
  { code: "BE", name: "Belgium", label: "BE-Belgium (比利时)" },
  { code: "IT", name: "Italy", label: "IT-Italy (意大利)" },
  { code: "ES", name: "Spain", label: "ES-Spain (西班牙)" },
  { code: "PT", name: "Portugal", label: "PT-Portugal (葡萄牙)" },
  { code: "RU", name: "Russia", label: "RU-Russia (俄罗斯)" },
  { code: "TR", name: "Turkey", label: "TR-Turkey (土耳其)" },
  { code: "EG", name: "Egypt", label: "EG-Egypt (埃及)" },
  { code: "ZA", name: "South Africa", label: "ZA-South Africa (南非)" },
  { code: "NG", name: "Nigeria", label: "NG-Nigeria (尼日利亚)" },
  { code: "KE", name: "Kenya", label: "KE-Kenya (肯尼亚)" },
  { code: "PK", name: "Pakistan", label: "PK-Pakistan (巴基斯坦)" },
  { code: "BD", name: "Bangladesh", label: "BD-Bangladesh (孟加拉)" },
  { code: "LK", name: "Sri Lanka", label: "LK-Sri Lanka (斯里兰卡)" },
  { code: "MM", name: "Myanmar", label: "MM-Myanmar (缅甸)" },
  { code: "KH", name: "Cambodia", label: "KH-Cambodia (柬埔寨)" },
]

/**
 * 集装箱类型枚举
 */
const containerTypeOptions = [
  { value: "20GP", label: "20GP" },
  { value: "40GP", label: "40GP" },
  { value: "40HQ", label: "40HQ" },
  { value: "45HQ", label: "45HQ" },
  { value: "20RF", label: "20RF" },
  { value: "40RF", label: "40RF" },
  { value: "20OT", label: "20OT" },
  { value: "40OT", label: "40OT" },
  { value: "20FR", label: "20FR" },
  { value: "40FR", label: "40FR" },
  { value: "20TK", label: "20TK" },
]

/**
 * 集装箱数据类型
 */
interface ContainerItem {
  id: string
  containerNo: string
  sealNo: string
  containerType: string
  vgmWeight: string
}

/**
 * 包装单位枚举
 */
const packageUnitOptions = [
  { value: "PK", label: "PK-Package" },
  { value: "CT", label: "CT-Carton" },
  { value: "BX", label: "BX-Box" },
  { value: "PL", label: "PL-Pallet" },
  { value: "BG", label: "BG-Bag" },
  { value: "DR", label: "DR-Drum" },
  { value: "RL", label: "RL-Roll" },
  { value: "PC", label: "PC-Piece" },
  { value: "ST", label: "ST-Set" },
  { value: "UN", label: "UN-Unit" },
]

/**
 * 货物数据类型
 */
interface CargoItem {
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
 * 表单区块标题组件
 */
const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType
  title: string
}) => (
  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
    <Icon className="h-5 w-5 text-teal-600" />
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
  </div>
)

/**
 * 字段帮助提示组件
 */
const FieldTooltip = ({ content }: { content: string }) => (
  <div className="relative group inline-flex ml-1">
    <HelpCircle className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
    <div className="absolute bottom-full left-0 mb-2 px-4 py-3 text-xs text-white bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-wrap w-80 z-50 pointer-events-none shadow-lg leading-relaxed">
      {content}
      <div className="absolute top-full left-4 border-4 border-transparent border-t-slate-800" />
    </div>
  </div>
)

/**
 * 表单字段包装组件
 */
const FormField = ({
  label,
  required = false,
  tooltip = "--",
  children,
  className = "",
}: {
  label: string
  required?: boolean
  tooltip?: string
  children: React.ReactNode
  className?: string
}) => (
  <div className={`w-full ${className}`}>
    <Label className="text-sm font-medium text-slate-700 mb-1.5 flex items-center">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
      <FieldTooltip content={tooltip} />
    </Label>
    {children}
  </div>
)

/**
 * 港口搜索选择组件
 */
const PortSearchSelect = ({
  value,
  searchValue,
  onSearchChange,
  onSelect,
  placeholder = "输入港口名称或代码搜索",
  disabled = false,
}: {
  value: string
  searchValue: string
  onSearchChange: (v: string) => void
  onSelect: (v: string) => void
  placeholder?: string
  disabled?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // 过滤港口选项
  const filteredPorts = portOptions.filter(
    (port) =>
      port.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      port.code.toLowerCase().includes(searchValue.toLowerCase())
  )

  // 获取显示值
  const displayValue = value
    ? portOptions.find((p) => p.code === value)?.label || value
    : ""

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={isOpen ? searchValue : displayValue}
        onChange={(e) => {
          if (disabled) return
          onSearchChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => !disabled && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        disabled={disabled}
      />
      {!disabled && isOpen && searchValue && filteredPorts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-lg z-50 max-h-48 overflow-y-auto">
          {filteredPorts.map((port) => (
            <div
              key={port.code}
              className="px-3 py-2 hover:bg-slate-100 cursor-pointer text-sm"
              onMouseDown={() => {
                onSelect(port.code)
                onSearchChange("")
                setIsOpen(false)
              }}
            >
              {port.label}
            </div>
          ))}
        </div>
      )}
      {!disabled && isOpen && searchValue && filteredPorts.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-lg z-50 px-3 py-2 text-sm text-slate-400">
          未找到匹配的港口
        </div>
      )}
    </div>
  )
}

/**
 * 国家搜索选择组件
 */
const CountrySearchSelect = ({
  value,
  searchValue,
  onSearchChange,
  onSelect,
  placeholder = "输入国家名称或代码",
  disabled = false,
}: {
  value: string
  searchValue: string
  onSearchChange: (v: string) => void
  onSelect: (v: string) => void
  placeholder?: string
  disabled?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // 过滤国家选项
  const filteredCountries = countryOptions.filter(
    (country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      country.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      country.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  // 获取显示值
  const displayValue = value
    ? countryOptions.find((c) => c.code === value)?.label || value
    : ""

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={isOpen ? searchValue : displayValue}
        onChange={(e) => {
          if (disabled) return
          onSearchChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => !disabled && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        disabled={disabled}
      />
      {!disabled && isOpen && filteredCountries.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 shadow-lg z-50 max-h-48 overflow-y-auto">
          {filteredCountries.slice(0, 10).map((country) => (
            <div
              key={country.code}
              className="px-3 py-2 hover:bg-slate-100 cursor-pointer text-sm"
              onMouseDown={() => {
                onSelect(country.code)
                onSearchChange("")
                setIsOpen(false)
              }}
            >
              {country.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 集装箱多选组件
 */
const ContainerMultiSelect = ({
  value,
  options,
  onChange,
}: {
  value: string[]
  options: string[]
  onChange: (v: string[]) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      })
    }
    setIsOpen(!isOpen)
  }

  const displayText = value.length > 0 ? value.join(", ") : "选择箱号"

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="w-full h-8 px-2 text-xs text-left border border-slate-200 bg-white flex items-center justify-between hover:border-slate-300"
      >
        <span className={value.length > 0 ? "text-slate-900 truncate" : "text-slate-400"}>
          {displayText}
        </span>
        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={() => setIsOpen(false)} />
          <div
            style={dropdownStyle}
            className="bg-white border border-slate-200 shadow-lg max-h-40 overflow-y-auto"
          >
            {options.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-400">请先填写集装箱号</div>
            ) : (
              options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={value.includes(opt)}
                    onChange={() => toggleOption(opt)}
                    className="w-3.5 h-3.5"
                  />
                  {opt}
                </label>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

/**
 * 文本展开编辑弹窗组件
 */
const TextExpandModal = ({
  isOpen,
  title,
  value,
  maxLength,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  title: string
  value: string
  maxLength: number
  onClose: () => void
  onConfirm: (value: string) => void
}) => {
  const [text, setText] = useState(value)

  React.useEffect(() => {
    if (isOpen) {
      setText(value)
    }
  }, [isOpen, value])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-[600px] max-h-[80vh] shadow-xl flex flex-col">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <span className="text-xs text-slate-400">{text.length}/{maxLength}</span>
        </div>
        <div className="p-4 flex-1">
          <textarea
            className="w-full h-64 p-3 border border-slate-200 text-sm resize-none focus:outline-none focus:border-teal-500"
            value={text}
            onChange={(e) => {
              const formatted = e.target.value.toUpperCase().replace(/[^A-Z0-9\s\-\/.,&()#@!?:;'"]/g, "").slice(0, maxLength)
              setText(formatted)
            }}
            placeholder="请输入内容..."
          />
        </div>
        <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            取消
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => onConfirm(text)}>
            确认
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * AI识别弹窗组件
 */
const AIRecognizeModal = ({
  isOpen,
  title,
  onClose,
  onRecognize,
}: {
  isOpen: boolean
  title: string
  onClose: () => void
  onRecognize: (text: string) => void
}) => {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRecognize = async () => {
    if (!text.trim()) return
    setIsLoading(true)
    // 模拟 AI 识别延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    onRecognize(text)
    setText("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-[650px] max-h-[80vh] shadow-xl flex flex-col">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        <div className="p-4 flex-1">
          <p className="text-sm text-slate-500 mb-3">
            请粘贴包含集装箱信息的文本，AI 将自动识别并填充到表单中
          </p>
          <textarea
            className="w-full h-64 p-3 border border-slate-200 text-sm resize-none focus:outline-none focus:border-teal-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="示例：&#10;CONTAINER NO: MSKU1234567&#10;SEAL NO: SL123456&#10;TYPE: 40HQ&#10;VGM: 25000 KGS"
          />
        </div>
        <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            取消
          </Button>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 gap-1.5"
            onClick={handleRecognize}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                识别中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                识别
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * 生成编辑模式的 Mock 数据
 */
const generateMockEditData = (id: string) => {
  // 基于 ID 生成一致的随机数据
  const seed = parseInt(id.replace(/\D/g, "")) || 1
  const random = (max: number) => ((seed * 9301 + 49297) % 233280) % max

  return {
    formData: {
      declarantMpciId: `AEMP${String(random(9000) + 1000)}`,
      transportType: random(10) > 3 ? "import" : "transit",
      hasSubHbl: random(10) > 7,
      blIssueDate: "2024-01-15",
      estimatedShipDate: "2024-02-20",
      blType: random(10) > 5 ? "NON" : "NEG",
      hblNo: `HBL${id.replace(/\D/g, "").padStart(8, "0")}`,
      upperBlIssuerType: random(10) > 3 ? "carrier" : "forwarder",
      upperBlIssuerMpciId: ["MAEU", "MSCU", "COSU", "OOLU", "EGLV"][random(5)],
      upperBlNo: `MBL${String(parseInt(id.replace(/\D/g, "")) + 1000).padStart(8, "0")}`,
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
    containers: [
      { id: "1", containerNo: "MSKU1234567", sealNo: "SL123456", containerType: "40HQ", vgmWeight: "25680.00" },
      { id: "2", containerNo: "TCLU7654321", sealNo: "SL789012", containerType: "20GP", vgmWeight: "18500.00" },
    ],
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

/**
 * MPCI 新建/编辑/查看申报页面
 */
export default function MPCICreate() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  
  // 判断页面模式：查看、编辑、新建
  const isViewMode = location.pathname.includes("/view/")
  const isEditMode = location.pathname.includes("/edit/")
  const isReadOnly = isViewMode

  // 表单状态
  const [formData, setFormData] = useState({
    // 基本信息
    declarantMpciId: "",
    transportType: "import",
    hasSubHbl: false,
    blIssueDate: "",
    estimatedShipDate: "",
    // 提单信息
    blType: "NON",
    hblNo: "",
    upperBlIssuerType: "carrier",
    upperBlIssuerMpciId: "",
    upperBlNo: "",
    siblingHblCount: 1,
    subDeclarantMpciId: "",
    // 港口信息
    placeOfReceipt: "",
    portOfLoading: "",
    portOfDischarge: "",
    placeOfDelivery: "",
    clearanceLocation: "",
    // 发货人信息
    shipperName: "",
    shipperAddress: "",
    shipperCity: "",
    shipperCountry: "",
    shipperPhone: "",
    shipperEmail: "",
    // 收货人信息
    consigneeName: "",
    consigneeAddress: "",
    consigneeCity: "",
    consigneeCountry: "",
    consigneePhone: "",
    consigneeEmail: "",
    // 起运港货代信息
    forwarderName: "",
    forwarderAddress: "",
    forwarderCity: "",
    forwarderCountry: "",
    // 补充信息
    internalRemark: "",
  })

  // 上传文件列表
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  /**
   * 处理文件上传
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploadedFiles((prev) => [...prev, ...Array.from(files)])
    }
    e.target.value = ""
  }

  /**
   * 删除上传的文件
   */
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // 港口搜索状态
  const [portSearches, setPortSearches] = useState({
    placeOfReceipt: "",
    portOfLoading: "",
    portOfDischarge: "",
    placeOfDelivery: "",
  })

  // 国家搜索状态
  const [countrySearches, setCountrySearches] = useState({
    shipperCountry: "",
    consigneeCountry: "",
    forwarderCountry: "",
  })

  // 集装箱列表
  const [containers, setContainers] = useState<ContainerItem[]>([
    { id: "1", containerNo: "", sealNo: "", containerType: "20GP", vgmWeight: "" },
  ])

  /**
   * 编辑/查看模式下加载数据
   */
  useEffect(() => {
    if ((isEditMode || isViewMode) && id) {
      const mockData = generateMockEditData(id)
      setFormData(mockData.formData)
      setContainers(mockData.containers)
      setCargos(mockData.cargos)
    }
  }, [isEditMode, isViewMode, id])

  /**
   * 添加集装箱
   */
  const addContainer = () => {
    const newId = String(Date.now())
    setContainers((prev) => [
      ...prev,
      { id: newId, containerNo: "", sealNo: "", containerType: "20GP", vgmWeight: "" },
    ])
  }

  /**
   * 删除集装箱
   */
  const removeContainer = (id: string) => {
    if (containers.length > 1) {
      setContainers((prev) => prev.filter((c) => c.id !== id))
    }
  }

  /**
   * 更新集装箱字段
   */
  const updateContainer = (id: string, field: keyof ContainerItem, value: string) => {
    setContainers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  // 货物列表
  const [cargos, setCargos] = useState<CargoItem[]>([
    {
      id: "1",
      containerNos: [],
      hsCode: "",
      marks: "N/M",
      description: "",
      quantity: "",
      packageUnit: "PK",
      weight: "",
      volume: "",
      dgUn: "",
    },
  ])

  /**
   * 添加货物
   */
  const addCargo = () => {
    const newId = String(Date.now())
    setCargos((prev) => [
      ...prev,
      {
        id: newId,
        containerNos: [],
        hsCode: "",
        marks: "N/M",
        description: "",
        quantity: "",
        packageUnit: "PK",
        weight: "",
        volume: "",
        dgUn: "",
      },
    ])
  }

  /**
   * 删除货物
   */
  const removeCargo = (id: string) => {
    if (cargos.length > 1) {
      setCargos((prev) => prev.filter((c) => c.id !== id))
    }
  }

  /**
   * 更新货物字段
   */
  const updateCargo = (id: string, field: keyof CargoItem, value: string | string[]) => {
    setCargos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  // 文本展开弹窗状态
  const [expandModal, setExpandModal] = useState<{
    isOpen: boolean
    cargoId: string
    field: "marks" | "description"
    title: string
  }>({
    isOpen: false,
    cargoId: "",
    field: "marks",
    title: "",
  })

  // AI识别弹窗状态
  const [aiModalOpen, setAiModalOpen] = useState(false)

  /**
   * AI识别回调 - 模拟填充数据
   */
  const handleAIRecognize = () => {
    // 模拟识别结果，添加一条集装箱数据
    const newId = String(Date.now())
    setContainers((prev) => [
      ...prev,
      {
        id: newId,
        containerNo: "MSKU" + Math.random().toString().slice(2, 9),
        sealNo: "SL" + Math.random().toString().slice(2, 8),
        containerType: "40HQ",
        vgmWeight: "25000.00",
      },
    ])
    setAiModalOpen(false)
  }

  /**
   * 打开文本展开弹窗
   */
  const openExpandModal = (cargoId: string, field: "marks" | "description", title: string) => {
    setExpandModal({ isOpen: true, cargoId, field, title })
  }

  /**
   * 关闭文本展开弹窗
   */
  const closeExpandModal = () => {
    setExpandModal((prev) => ({ ...prev, isOpen: false }))
  }

  /**
   * 确认文本展开弹窗
   */
  const confirmExpandModal = (value: string) => {
    updateCargo(expandModal.cargoId, expandModal.field, value)
    closeExpandModal()
  }

  /**
   * 更新表单字段
   */
  const updateField = useCallback(
    <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  /**
   * 格式化输入：只允许大写字母和数字
   */
  const formatUpperAlphaNumeric = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, "")
  }

  /**
   * 格式化输入：只允许大写字母、数字、短横杠、斜杠
   */
  const formatBlNumber = (value: string) => {
    // 移除全角字符，只保留半角
    const halfWidth = value.replace(/[\uFF00-\uFFEF]/g, "")
    return halfWidth.toUpperCase().replace(/[^A-Z0-9\-\/]/g, "").slice(0, 20)
  }

  /**
   * 格式化输入：只允许大写字母、数字、半角符号
   */
  const formatUpperWithSymbols = (value: string, maxLength: number) => {
    // 移除全角字符，只保留半角
    const halfWidth = value.replace(/[\uFF00-\uFFEF]/g, "")
    return halfWidth.toUpperCase().replace(/[^A-Z0-9\s\-\/.,&()#@!?:;'"]/g, "").slice(0, maxLength)
  }

  /**
   * 返回列表页
   */
  const handleBack = () => {
    navigate("/dashboard/customs/uae-mpci")
  }

  /**
   * 暂存草稿
   */
  const handleSaveDraft = () => {
    console.log("保存草稿:", formData)
    // TODO: 实现保存逻辑
  }

  /**
   * 发送申报
   */
  const handleSubmit = () => {
    console.log("发送申报:", formData)
    // TODO: 实现发送逻辑
  }

  /**
   * 跳转到编辑页面（从查看页面）
   */
  const handleGoToEdit = () => {
    if (id) {
      navigate(`/dashboard/customs/uae-mpci/edit/${id}`)
    }
  }

  /**
   * 查看操作历史
   */
  const handleViewHistory = () => {
    console.log("查看操作历史:", id)
    // TODO: 实现操作历史弹窗
  }

  /**
   * 删单操作
   */
  const handleCancelDeclaration = () => {
    console.log("删单:", id)
    // TODO: 实现删单逻辑
  }

  /**
   * 获取页面标题
   */
  const getPageTitle = () => {
    if (isViewMode) return "查看 MPCI 申报"
    if (isEditMode) return "编辑 MPCI 申报"
    return "新建 MPCI 申报"
  }

  return (
    <div className="flex flex-col h-full min-w-0">
      {/* 顶部吸顶功能区 */}
      <div className="flex-shrink-0 sticky top-0 z-10 bg-slate-100 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              返回
            </Button>
            <div className="h-5 w-px bg-slate-300" />
            <h1 className="text-xl font-bold text-slate-900">{getPageTitle()}</h1>
          </div>
          
          {/* 根据模式显示不同按钮 */}
          {isViewMode ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewHistory}
                className="gap-1.5"
              >
                <History className="h-4 w-4" />
                操作历史
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelDeclaration}
                className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4" />
                删单
              </Button>
              <Button
                size="sm"
                onClick={handleGoToEdit}
                className="gap-1.5 bg-teal-600 hover:bg-teal-700"
              >
                <Edit className="h-4 w-4" />
                编辑
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                className="gap-1.5"
              >
                <Save className="h-4 w-4" />
                暂存草稿
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                className="gap-1.5 bg-teal-600 hover:bg-teal-700"
              >
                <Send className="h-4 w-4" />
                发送
              </Button>
            </div>
          )}
        </div>
        {/* 渐变分割线 */}
        <div className="h-[2px] mt-3 w-full bg-gradient-to-r from-slate-400 via-slate-300 to-transparent rounded-full" />
      </div>

      {/* 表单内容区域 */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-6">
        {/* 基本信息 */}
        <Card className="p-6">
          <SectionTitle icon={FileText} title="基本信息" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField 
              label="申报责任方 MPCI ID" 
              required={!isReadOnly}
              tooltip="本票业务的申报责任方，一般情况下，请输入您的UAE目的港代理的 MPCI ID"
            >
              <Input
                placeholder="请输入大写字母和数字"
                value={formData.declarantMpciId}
                onChange={(e) =>
                  updateField(
                    "declarantMpciId",
                    formatUpperAlphaNumeric(e.target.value)
                  )
                }
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="运输类型" required={!isReadOnly}>
              <Select
                value={formData.transportType}
                onValueChange={(v) => updateField("transportType", v)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="import">进口</SelectItem>
                  <SelectItem value="transit">中转</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="提单签发日期">
              <Input
                type="date"
                value={formData.blIssueDate}
                onChange={(e) => updateField("blIssueDate", e.target.value)}
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="预计装船日期">
              <Input
                type="date"
                value={formData.estimatedShipDate}
                onChange={(e) => updateField("estimatedShipDate", e.target.value)}
                disabled={isReadOnly}
              />
            </FormField>

            <div className="flex items-center gap-2 pt-6">
              <Checkbox
                id="hasSubHbl"
                checked={formData.hasSubHbl}
                onCheckedChange={(checked) =>
                  updateField("hasSubHbl", checked === true)
                }
                disabled={isReadOnly}
              />
              <Label htmlFor="hasSubHbl" className="text-sm cursor-pointer flex items-center">
                是否有下层 HBL
                <FieldTooltip content="--" />
              </Label>
            </div>
          </div>
        </Card>

        {/* 提单信息 */}
        <Card className="p-6">
          <SectionTitle icon={FileText} title="提单信息" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField 
              label="提单类型" 
              required={!isReadOnly}
              tooltip="可转让提单(Negotiable bill of lading) 又称指示提单,是指在收货人栏内写上'Order'字样的提单。它可通过指示人的背书进行转让,此类提单可分为记名指示和不记名指示。记名指示提单主要有凭托运人指示 (Order of Shipper) 开A指示 (Order of Applicant)开行指示(Order of Issuing Bank)三种;不记名指示提单仅写上'Order'即可,但亦须由托运人背书方可转让。不可转让提单(Non-negotiable bill of lading) 又称记名提单,是指在提单的收货人栏内直接写明收货人名称,或写明货物交付某方的提单。根据这种提单,承运人只能将货物交给提单指定的收货人，原则上此类提单不得背书转让。"
            >
              <Select
                value={formData.blType}
                onValueChange={(v) => updateField("blType", v)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NON">
                    Non-negotiable bills of lading (NON)
                  </SelectItem>
                  <SelectItem value="NEG">
                    Negotiable bills of lading (NEG)
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="HBL No" required={!isReadOnly}>
              <Input
                placeholder="最多20个字符"
                value={formData.hblNo}
                onChange={(e) =>
                  updateField("hblNo", formatBlNumber(e.target.value))
                }
                maxLength={20}
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="上层提单签发人类型">
              <Select
                value={formData.upperBlIssuerType}
                onValueChange={(v) => {
                  updateField("upperBlIssuerType", v)
                  updateField("upperBlIssuerMpciId", "")
                }}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carrier">船公司</SelectItem>
                  <SelectItem value="forwarder">货代</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="上层提单签发人 MPCI ID">
              {formData.upperBlIssuerType === "carrier" ? (
                <Select
                  value={formData.upperBlIssuerMpciId}
                  onValueChange={(v) => updateField("upperBlIssuerMpciId", v)}
                  disabled={isReadOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="请选择船公司" />
                  </SelectTrigger>
                  <SelectContent>
                    {carrierMpciOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  placeholder="请输入大写字母和数字"
                  value={formData.upperBlIssuerMpciId}
                  onChange={(e) =>
                    updateField(
                      "upperBlIssuerMpciId",
                      formatUpperAlphaNumeric(e.target.value)
                    )
                  }
                  disabled={isReadOnly}
                />
              )}
            </FormField>

            <FormField label="上层提单号" required={!isReadOnly}>
              <Input
                placeholder="最多20个字符"
                value={formData.upperBlNo}
                onChange={(e) =>
                  updateField("upperBlNo", formatBlNumber(e.target.value))
                }
                maxLength={20}
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="同级 HBL 数量">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() =>
                    updateField(
                      "siblingHblCount",
                      Math.max(1, formData.siblingHblCount - 1)
                    )
                  }
                  disabled={isReadOnly}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min={1}
                  value={formData.siblingHblCount}
                  onChange={(e) =>
                    updateField(
                      "siblingHblCount",
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-20 text-center"
                  disabled={isReadOnly}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() =>
                    updateField("siblingHblCount", formData.siblingHblCount + 1)
                  }
                  disabled={isReadOnly}
                >
                  +
                </Button>
              </div>
            </FormField>

            {/* 下层申报人 MPCI ID - 仅当勾选有下层 HBL 时显示 */}
            {formData.hasSubHbl && (
              <FormField label="下层申报人/代理 MPCI ID" required={!isReadOnly}>
                <Input
                  placeholder="请输入大写字母和数字"
                  value={formData.subDeclarantMpciId}
                  onChange={(e) =>
                    updateField(
                      "subDeclarantMpciId",
                      formatUpperAlphaNumeric(e.target.value)
                    )
                  }
                  disabled={isReadOnly}
                />
              </FormField>
            )}
          </div>
        </Card>

        {/* 港口信息 */}
        <Card className="p-6">
          <SectionTitle icon={MapPin} title="港口信息" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <FormField label="收货地" required={!isReadOnly}>
              <PortSearchSelect
                value={formData.placeOfReceipt}
                searchValue={portSearches.placeOfReceipt}
                onSearchChange={(v) =>
                  setPortSearches((prev) => ({ ...prev, placeOfReceipt: v }))
                }
                onSelect={(v) => updateField("placeOfReceipt", v)}
                placeholder="输入港口名称或代码"
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="装货港" required={!isReadOnly}>
              <PortSearchSelect
                value={formData.portOfLoading}
                searchValue={portSearches.portOfLoading}
                onSearchChange={(v) =>
                  setPortSearches((prev) => ({ ...prev, portOfLoading: v }))
                }
                onSelect={(v) => {
                  updateField("portOfLoading", v)
                  if (!formData.placeOfReceipt) {
                    updateField("placeOfReceipt", v)
                  }
                }}
                placeholder="输入港口名称或代码"
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="卸货港" required={!isReadOnly}>
              <PortSearchSelect
                value={formData.portOfDischarge}
                searchValue={portSearches.portOfDischarge}
                onSearchChange={(v) =>
                  setPortSearches((prev) => ({ ...prev, portOfDischarge: v }))
                }
                onSelect={(v) => {
                  updateField("portOfDischarge", v)
                  if (!formData.placeOfDelivery) {
                    updateField("placeOfDelivery", v)
                  }
                }}
                placeholder="输入港口名称或代码"
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="目的港" required={!isReadOnly}>
              <PortSearchSelect
                value={formData.placeOfDelivery}
                searchValue={portSearches.placeOfDelivery}
                onSearchChange={(v) =>
                  setPortSearches((prev) => ({ ...prev, placeOfDelivery: v }))
                }
                onSelect={(v) => updateField("placeOfDelivery", v)}
                placeholder="输入港口名称或代码"
                disabled={isReadOnly}
              />
            </FormField>

            <FormField label="预计清关地">
              <Select
                value={formData.clearanceLocation}
                onValueChange={(v) => updateField("clearanceLocation", v)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择清关地" />
                </SelectTrigger>
                <SelectContent>
                  {uaeClearanceLocations.map((loc) => (
                    <SelectItem key={loc.value} value={loc.value}>
                      {loc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </Card>

        {/* 收发通信息 */}
        <Card className="p-6">
          <SectionTitle icon={Users} title="收发通信息" />
          
          {/* 发货人 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-teal-500"></span>
              发货人
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField label="抬头" required={!isReadOnly}>
                <Input
                  placeholder="最多70个字符"
                  value={formData.shipperName}
                  onChange={(e) =>
                    updateField("shipperName", formatUpperWithSymbols(e.target.value, 70))
                  }
                  maxLength={70}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="地址" required={!isReadOnly}>
                <Input
                  placeholder="最多140个字符"
                  value={formData.shipperAddress}
                  onChange={(e) =>
                    updateField("shipperAddress", formatUpperWithSymbols(e.target.value, 140))
                  }
                  maxLength={140}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="城市" required={!isReadOnly}>
                <Input
                  placeholder="最多20个字符"
                  value={formData.shipperCity}
                  onChange={(e) =>
                    updateField("shipperCity", formatUpperWithSymbols(e.target.value, 20))
                  }
                  maxLength={20}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="国家（地区）" required={!isReadOnly}>
                <CountrySearchSelect
                  value={formData.shipperCountry}
                  searchValue={countrySearches.shipperCountry}
                  onSearchChange={(v) =>
                    setCountrySearches((prev) => ({ ...prev, shipperCountry: v }))
                  }
                  onSelect={(v) => updateField("shipperCountry", v)}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField 
                label="电话" 
                required={!isReadOnly && !formData.shipperEmail}
                tooltip="电话和邮箱至少填写一项"
              >
                <Input
                  placeholder="联系电话"
                  value={formData.shipperPhone}
                  onChange={(e) => updateField("shipperPhone", e.target.value)}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField 
                label="邮箱" 
                required={!isReadOnly && !formData.shipperPhone}
                tooltip="电话和邮箱至少填写一项"
              >
                <Input
                  type="email"
                  placeholder="电子邮箱"
                  value={formData.shipperEmail}
                  onChange={(e) => updateField("shipperEmail", e.target.value)}
                  disabled={isReadOnly}
                />
              </FormField>
            </div>
          </div>

          {/* 收货人 */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-teal-500"></span>
              收货人
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField label="抬头" required={!isReadOnly}>
                <Input
                  placeholder="最多70个字符"
                  value={formData.consigneeName}
                  onChange={(e) =>
                    updateField("consigneeName", formatUpperWithSymbols(e.target.value, 70))
                  }
                  maxLength={70}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="地址" required={!isReadOnly}>
                <Input
                  placeholder="最多140个字符"
                  value={formData.consigneeAddress}
                  onChange={(e) =>
                    updateField("consigneeAddress", formatUpperWithSymbols(e.target.value, 140))
                  }
                  maxLength={140}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="城市" required={!isReadOnly}>
                <Input
                  placeholder="最多20个字符"
                  value={formData.consigneeCity}
                  onChange={(e) =>
                    updateField("consigneeCity", formatUpperWithSymbols(e.target.value, 20))
                  }
                  maxLength={20}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="国家（地区）" required={!isReadOnly}>
                <CountrySearchSelect
                  value={formData.consigneeCountry}
                  searchValue={countrySearches.consigneeCountry}
                  onSearchChange={(v) =>
                    setCountrySearches((prev) => ({ ...prev, consigneeCountry: v }))
                  }
                  onSelect={(v) => updateField("consigneeCountry", v)}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField 
                label="电话" 
                required={!isReadOnly && !formData.consigneeEmail}
                tooltip="电话和邮箱至少填写一项"
              >
                <Input
                  placeholder="联系电话"
                  value={formData.consigneePhone}
                  onChange={(e) => updateField("consigneePhone", e.target.value)}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField 
                label="邮箱" 
                required={!isReadOnly && !formData.consigneePhone}
                tooltip="电话和邮箱至少填写一项"
              >
                <Input
                  type="email"
                  placeholder="电子邮箱"
                  value={formData.consigneeEmail}
                  onChange={(e) => updateField("consigneeEmail", e.target.value)}
                  disabled={isReadOnly}
                />
              </FormField>
            </div>
          </div>

          {/* 起运港货代 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-slate-400"></span>
              起运港货代
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField label="抬头" required={!isReadOnly}>
                <Input
                  placeholder="最多70个字符"
                  value={formData.forwarderName}
                  onChange={(e) =>
                    updateField("forwarderName", formatUpperWithSymbols(e.target.value, 70))
                  }
                  maxLength={70}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="地址">
                <Input
                  placeholder="最多140个字符"
                  value={formData.forwarderAddress}
                  onChange={(e) =>
                    updateField("forwarderAddress", formatUpperWithSymbols(e.target.value, 140))
                  }
                  maxLength={140}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="城市">
                <Input
                  placeholder="最多20个字符"
                  value={formData.forwarderCity}
                  onChange={(e) =>
                    updateField("forwarderCity", formatUpperWithSymbols(e.target.value, 20))
                  }
                  maxLength={20}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField label="国家（地区）">
                <CountrySearchSelect
                  value={formData.forwarderCountry}
                  searchValue={countrySearches.forwarderCountry}
                  onSearchChange={(v) =>
                    setCountrySearches((prev) => ({ ...prev, forwarderCountry: v }))
                  }
                  onSelect={(v) => updateField("forwarderCountry", v)}
                  disabled={isReadOnly}
                />
              </FormField>
            </div>
          </div>
        </Card>

        {/* 集装箱信息 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Container className="h-5 w-5 text-teal-600" />
              <h3 className="text-base font-semibold text-slate-900">集装箱信息</h3>
              {!isReadOnly && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="gap-1.5 h-7 text-xs"
                  onClick={() => setAiModalOpen(true)}
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  AI识别
                </Button>
              )}
            </div>
            {/* 箱型箱量汇总 */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              {Object.entries(
                containers.reduce((acc, c) => {
                  if (c.containerType) {
                    acc[c.containerType] = (acc[c.containerType] || 0) + 1
                  }
                  return acc
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <span key={type} className="bg-slate-100 px-2 py-1">
                  {type} × {count}
                </span>
              ))}
              <span className="font-medium text-slate-700">
                共 {containers.length} 箱
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-3 py-2 text-left font-medium text-slate-700 w-14">序号</th>
                  <th className="px-3 py-2 text-left font-medium text-slate-700 w-40">
                    集装箱号 {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-700 w-44">
                    封号 {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-700 w-28">
                    箱型 {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-700 w-36">
                    VGM重量(KGS) {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  {!isReadOnly && <th className="px-3 py-2 text-center font-medium text-slate-700 w-20">操作</th>}
                </tr>
              </thead>
              <tbody>
                {containers.map((container, index) => (
                  <tr key={container.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-500">{index + 1}</td>
                    <td className="px-3 py-1">
                      <Input
                        className="h-8"
                        placeholder="11位字符"
                        value={container.containerNo}
                        onChange={(e) =>
                          updateContainer(
                            container.id,
                            "containerNo",
                            e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11)
                          )
                        }
                        maxLength={11}
                        disabled={isReadOnly}
                      />
                    </td>
                    <td className="px-3 py-1">
                      <Input
                        className="h-8"
                        placeholder="最多20个字符"
                        value={container.sealNo}
                        onChange={(e) =>
                          updateContainer(
                            container.id,
                            "sealNo",
                            e.target.value.toUpperCase().replace(/[^A-Z0-9\-\/]/g, "").slice(0, 20)
                          )
                        }
                        maxLength={20}
                        disabled={isReadOnly}
                      />
                    </td>
                    <td className="px-3 py-1">
                      <Select
                        value={container.containerType}
                        onValueChange={(v) => updateContainer(container.id, "containerType", v)}
                        disabled={isReadOnly}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {containerTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-1">
                      <Input
                        className="h-8"
                        placeholder="0.00"
                        value={container.vgmWeight}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "")
                          const parts = val.split(".")
                          const formatted = parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "")
                          updateContainer(container.id, "vgmWeight", formatted)
                        }}
                        disabled={isReadOnly}
                      />
                    </td>
                    {!isReadOnly && (
                      <td className="px-3 py-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={addContainer}
                            className="p-1 hover:bg-teal-50 text-teal-600 transition-colors"
                            title="添加"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeContainer(container.id)}
                            disabled={containers.length <= 1}
                            className="p-1 hover:bg-red-50 text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="删除"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 货物信息 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-teal-600" />
              <h3 className="text-base font-semibold text-slate-900">货物信息</h3>
            </div>
            {/* 件毛体汇总 */}
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-600">
                件数: <span className="font-medium text-slate-800">
                  {cargos.reduce((sum, c) => sum + (parseInt(c.quantity) || 0), 0)}
                </span>
              </span>
              <span className="text-slate-600">
                毛重: <span className="font-medium text-slate-800">
                  {cargos.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0).toFixed(2)} KGS
                </span>
              </span>
              <span className="text-slate-600">
                体积: <span className="font-medium text-slate-800">
                  {cargos.reduce((sum, c) => sum + (parseFloat(c.volume) || 0), 0).toFixed(2)} CBM
                </span>
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-12">序号</th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-36">关联箱号</th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-28">HS CODE</th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-28">
                    唛头 {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-44">
                    品名货描 {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-20">
                    件数 {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-32">
                    包装单位 {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-28">
                    重量(KGS) {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-28">
                    体积(CBM) {!isReadOnly && <span className="text-red-500">*</span>}
                  </th>
                  <th className="px-2 py-2 text-left font-medium text-slate-700 w-24">DG UN</th>
                  {!isReadOnly && <th className="px-2 py-2 text-center font-medium text-slate-700 w-16">操作</th>}
                </tr>
              </thead>
              <tbody>
                {cargos.map((cargo, index) => (
                  <tr key={cargo.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-2 py-2 text-slate-500">{index + 1}</td>
                    <td className="px-2 py-1">
                      <ContainerMultiSelect
                        value={cargo.containerNos}
                        options={containers.filter((c) => c.containerNo).map((c) => c.containerNo)}
                        onChange={(v) => updateCargo(cargo.id, "containerNos", v)}
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        className="h-8 text-xs"
                        placeholder="6-10位"
                        value={cargo.hsCode}
                        onChange={(e) =>
                          updateCargo(cargo.id, "hsCode", e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
                        }
                        maxLength={10}
                      />
                    </td>
                    <td className="px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Input
                          className="h-8 text-xs flex-1"
                          placeholder="N/M"
                          value={cargo.marks}
                          onChange={(e) =>
                            updateCargo(
                              cargo.id,
                              "marks",
                              e.target.value.toUpperCase().replace(/[^A-Z0-9\s\-\/.,&()#@!?:;'"]/g, "").slice(0, 1000)
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => openExpandModal(cargo.id, "marks", "唛头")}
                          className="text-[10px] text-teal-600 hover:text-teal-700 whitespace-nowrap"
                        >
                          展开
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-1">
                      <div className="flex items-center gap-1">
                        <Input
                          className="h-8 text-xs flex-1"
                          placeholder="货物描述"
                          value={cargo.description}
                          onChange={(e) =>
                            updateCargo(
                              cargo.id,
                              "description",
                              e.target.value.toUpperCase().replace(/[^A-Z0-9\s\-\/.,&()#@!?:;'"]/g, "").slice(0, 1000)
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => openExpandModal(cargo.id, "description", "品名货描")}
                          className="text-[10px] text-teal-600 hover:text-teal-700 whitespace-nowrap"
                        >
                          展开
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        className="h-8 text-xs"
                        placeholder="0"
                        value={cargo.quantity}
                        onChange={(e) =>
                          updateCargo(cargo.id, "quantity", e.target.value.replace(/[^0-9]/g, ""))
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Select
                        value={cargo.packageUnit}
                        onValueChange={(v) => updateCargo(cargo.id, "packageUnit", v)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {packageUnitOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        className="h-8 text-xs"
                        placeholder="0.00"
                        value={cargo.weight}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "")
                          const parts = val.split(".")
                          const formatted = parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "")
                          updateCargo(cargo.id, "weight", formatted)
                        }}
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        className="h-8 text-xs"
                        placeholder="0.00"
                        value={cargo.volume}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, "")
                          const parts = val.split(".")
                          const formatted = parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "")
                          updateCargo(cargo.id, "volume", formatted)
                        }}
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        className="h-8 text-xs"
                        placeholder="4位数字"
                        value={cargo.dgUn}
                        onChange={(e) =>
                          updateCargo(cargo.id, "dgUn", e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
                        }
                        maxLength={4}
                      />
                    </td>
                    {!isReadOnly && (
                      <td className="px-2 py-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={addCargo}
                            className="p-1 hover:bg-teal-50 text-teal-600 transition-colors"
                            title="添加"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeCargo(cargo.id)}
                            disabled={cargos.length <= 1}
                            className="p-1 hover:bg-red-50 text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="删除"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 补充文件 */}
        <Card className="p-6">
          <SectionTitle icon={Paperclip} title="补充文件" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 内部备注 */}
            <FormField label="内部备注" tooltip="仅供内部参考，不会提交给海关">
              <textarea
                className="w-full h-32 p-3 border border-slate-200 text-sm resize-none focus:outline-none focus:border-teal-500"
                placeholder="请输入内部备注信息..."
                value={formData.internalRemark}
                onChange={(e) => updateField("internalRemark", e.target.value)}
                disabled={isReadOnly}
              />
            </FormField>

            {/* 文件上传 */}
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-1.5 flex items-center">
                附件上传
                <FieldTooltip content="支持上传任意格式文件" />
              </Label>
              {!isReadOnly ? (
                <div className="border border-dashed border-slate-300 p-4 hover:border-teal-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer py-4"
                  >
                    <Upload className="h-8 w-8 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-600">点击或拖拽文件到此处上传</span>
                    <span className="text-xs text-slate-400 mt-1">支持任意格式文件</span>
                  </label>
                </div>
              ) : (
                <div className="border border-slate-200 p-4 bg-slate-50 text-sm text-slate-500">
                  暂无附件
                </div>
              )}
              {/* 已上传文件列表 */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <File className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-700 truncate">{file.name}</span>
                        <span className="text-xs text-slate-400 flex-shrink-0">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* 文本展开编辑弹窗 */}
      <TextExpandModal
        isOpen={expandModal.isOpen}
        title={expandModal.title}
        value={cargos.find((c) => c.id === expandModal.cargoId)?.[expandModal.field] || ""}
        maxLength={1000}
        onClose={closeExpandModal}
        onConfirm={confirmExpandModal}
      />

      {/* AI识别弹窗 */}
      <AIRecognizeModal
        isOpen={aiModalOpen}
        title="AI识别集装箱信息"
        onClose={() => setAiModalOpen(false)}
        onRecognize={handleAIRecognize}
      />
    </div>
  )
}
