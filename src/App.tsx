import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import './App.css'

const lotteryTypes = [
  // รายวัน
  { id: 'lao-prachachon', name: 'ประชาชนลาว',   flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'lao-extra',      name: 'ลาวExtra',       flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'hanoi-asian',    name: 'ฮานอยอาเชียน',  flag: 'https://flagcdn.com/w80/vn.png', category: 'รายวัน' },
  { id: 'lao-tv',         name: 'ลาว TV',         flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'hanoi-hd',       name: 'ฮานอย HD',       flag: 'https://flagcdn.com/w80/vn.png', category: 'รายวัน' },
  { id: 'hanoi-star',     name: 'ฮานอย สตาร์',   flag: 'https://flagcdn.com/w80/vn.png', category: 'รายวัน' },
  { id: 'lao-hd',         name: 'ลาว HD',         flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'hanoi-tv',       name: 'ฮานอย TV',       flag: 'https://flagcdn.com/w80/vn.png', category: 'รายวัน' },
  { id: 'lao-star',       name: 'ลาวสตาร์',      flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'hanoi-redcross', name: 'ฮานอย กาชาด',   flag: 'https://flagcdn.com/w80/vn.png', category: 'รายวัน' },
  { id: 'hanoi-samak',    name: 'ฮานอยสามัคคี',  flag: 'https://flagcdn.com/w80/vn.png', category: 'รายวัน' },
  { id: 'hanoi-pattana',  name: 'ฮานอยพัฒนา',    flag: 'https://flagcdn.com/w80/vn.png', category: 'รายวัน' },
  { id: 'lao-samak',      name: 'ลาวสามัคคี',    flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'lao-asean',      name: 'ลาวอาเซียน',    flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'lao-samak-vip',  name: 'ลาวสามัคคี VIP',flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'uk-vip',         name: 'อังกฤษVIP',     flag: 'https://flagcdn.com/w80/gb.png', category: 'รายวัน' },
  { id: 'lao-star-vip',   name: 'ลาวSTAR VIP',   flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'malaysia',       name: 'มาเลเซีย',      flag: 'https://flagcdn.com/w80/my.png', category: 'รายวัน' },
  { id: 'germany-vip',    name: 'เยอรมัน VIP',   flag: 'https://flagcdn.com/w80/de.png', category: 'รายวัน' },
  { id: 'lao-redcross',   name: 'ลาว กาชาด',     flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'russia-vip',     name: 'รัสเซียVIP',    flag: 'https://flagcdn.com/w80/ru.png', category: 'รายวัน' },
  { id: 'dow-vip',        name: 'ดาวโจนส์ VIP',  flag: 'https://flagcdn.com/w80/us.png', category: 'รายวัน' },
  { id: 'dow-star',       name: 'ดาวโจนส์ STAR', flag: 'https://flagcdn.com/w80/us.png', category: 'รายวัน' },
  { id: 'lao-santipab',   name: 'ลาวสันติภาพ',   flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  { id: 'lao-patuxay',    name: 'ลาวประตูชัย',   flag: 'https://flagcdn.com/w80/la.png', category: 'รายวัน' },
  // รัฐบาลไทย
  { id: 'thai-gov', name: 'รัฐบาลไทย', flag: 'https://flagcdn.com/w80/th.png', category: 'รัฐบาลไทย' },
  { id: 'omsin',    name: 'ออมสิน',    flag: 'https://flagcdn.com/w80/th.png', category: 'รัฐบาลไทย' },
  { id: 'baac',     name: 'ธ.ก.ส',     flag: 'https://flagcdn.com/w80/th.png', category: 'รัฐบาลไทย' },
  // ฮานอย
  { id: 'hanoi',        name: 'ฮานอย',       flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-sp',     name: 'ฮานอยพิเศษ',  flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-normal', name: 'ฮานอยปกติ',   flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-vip',    name: 'ฮานอย VIP',   flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-bundle', name: 'ฮานอยมัดรวม', flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  // ต่างประเทศ
  { id: 'lao-pattana',     name: 'ลาวพัฒนา',     flag: 'https://flagcdn.com/w80/la.png', category: 'ต่างประเทศ' },
  { id: 'hanoi-foreign',   name: 'ฮานอย',        flag: 'https://flagcdn.com/w80/vn.png', category: 'ต่างประเทศ' },
  { id: 'hanoi-special-f', name: 'ฮานอยพิเศษ',   flag: 'https://flagcdn.com/w80/vn.png', category: 'ต่างประเทศ' },
  { id: 'china-f',         name: 'จีน',           flag: 'https://flagcdn.com/w80/cn.png', category: 'ต่างประเทศ' },
  { id: 'singapore-f',     name: 'สิงคโปร์',      flag: 'https://flagcdn.com/w80/sg.png', category: 'ต่างประเทศ' },
  { id: 'malaysia-f',      name: 'มาเลเซีย',     flag: 'https://flagcdn.com/w80/my.png', category: 'ต่างประเทศ' },
  // หุ้น
  { id: 'thai-morning',       name: 'หุ้นไทยเช้า',       flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้น' },
  { id: 'thai-noon',          name: 'หุ้นไทยเที่ยง',     flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้น' },
  { id: 'thai-afternoon',     name: 'หุ้นไทยบ่าย',       flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้น' },
  { id: 'thai-evening',       name: 'หุ้นไทยเย็น',       flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้น' },
  { id: 'nikkei-morning',     name: 'หุ้นนิเคอิเช้า',    flag: 'https://flagcdn.com/w80/jp.png', category: 'หุ้น' },
  { id: 'nikkei-afternoon',   name: 'หุ้นนิเคอิบ่าย',   flag: 'https://flagcdn.com/w80/jp.png', category: 'หุ้น' },
  { id: 'china-morning',      name: 'หุ้นจีนเช้า',       flag: 'https://flagcdn.com/w80/cn.png', category: 'หุ้น' },
  { id: 'china-afternoon',    name: 'หุ้นจีนบ่าย',       flag: 'https://flagcdn.com/w80/cn.png', category: 'หุ้น' },
  { id: 'hangseng-morning',   name: 'หุ้นฮั้งเส็งเช้า',  flag: 'https://flagcdn.com/w80/hk.png', category: 'หุ้น' },
  { id: 'hangseng-afternoon', name: 'หุ้นฮั้งเส็งบ่าย',  flag: 'https://flagcdn.com/w80/hk.png', category: 'หุ้น' },
  { id: 'taiwan',             name: 'หุ้นไต้หวัน',       flag: 'https://flagcdn.com/w80/tw.png', category: 'หุ้น' },
  { id: 'korea',              name: 'หุ้นเกาหลี',        flag: 'https://flagcdn.com/w80/kr.png', category: 'หุ้น' },
  { id: 'singapore',          name: 'หุ้นสิงค์โปร์',     flag: 'https://flagcdn.com/w80/sg.png', category: 'หุ้น' },
  { id: 'egypt',              name: 'หุ้นอียิปต์',       flag: 'https://flagcdn.com/w80/eg.png', category: 'หุ้น' },
  { id: 'india',              name: 'หุ้นอินเดีย',       flag: 'https://flagcdn.com/w80/in.png', category: 'หุ้น' },
  { id: 'germany',            name: 'หุ้นเยอรมัน',       flag: 'https://flagcdn.com/w80/de.png', category: 'หุ้น' },
  { id: 'russia',             name: 'หุ้นรัสเซีย',       flag: 'https://flagcdn.com/w80/ru.png', category: 'หุ้น' },
  { id: 'uk',                 name: 'หุ้นอังกฤษ',        flag: 'https://flagcdn.com/w80/gb.png', category: 'หุ้น' },
  { id: 'dowjones',           name: 'หุ้นดาวโจนส์',      flag: 'https://flagcdn.com/w80/us.png', category: 'หุ้น' },
  // หุ้น VIP
  { id: 'thai-morning-vip',       name: 'หุ้นไทยเช้า VIP',       flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้น VIP' },
  { id: 'thai-evening-vip',       name: 'หุ้นไทยเย็น VIP',       flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้น VIP' },
  { id: 'nikkei-morning-vip',     name: 'หุ้นนิเคอิ(เช้า) VIP',   flag: 'https://flagcdn.com/w80/jp.png', category: 'หุ้น VIP' },
  { id: 'nikkei-afternoon-vip',   name: 'หุ้นนิเคอิ(บ่าย) VIP',   flag: 'https://flagcdn.com/w80/jp.png', category: 'หุ้น VIP' },
  { id: 'china-morning-vip',      name: 'หุ้นจีน(เช้า) VIP',      flag: 'https://flagcdn.com/w80/cn.png', category: 'หุ้น VIP' },
  { id: 'china-afternoon-vip',    name: 'หุ้นจีน(บ่าย) VIP',      flag: 'https://flagcdn.com/w80/cn.png', category: 'หุ้น VIP' },
  { id: 'hangseng-morning-vip',   name: 'หุ้นฮั้งเส็ง(เช้า) VIP', flag: 'https://flagcdn.com/w80/hk.png', category: 'หุ้น VIP' },
  { id: 'hangseng-afternoon-vip', name: 'หุ้นฮั้งเส็ง(บ่าย) VIP', flag: 'https://flagcdn.com/w80/hk.png', category: 'หุ้น VIP' },
  { id: 'taiwan-vip',             name: 'หุ้นไต้หวัน VIP',        flag: 'https://flagcdn.com/w80/tw.png', category: 'หุ้น VIP' },
  { id: 'korea-vip',              name: 'หุ้นเกาหลี VIP',         flag: 'https://flagcdn.com/w80/kr.png', category: 'หุ้น VIP' },
  { id: 'singapore-vip',          name: 'หุ้นสิงค์โปร์ VIP',      flag: 'https://flagcdn.com/w80/sg.png', category: 'หุ้น VIP' },
  { id: 'india-vip',              name: 'หุ้นอินเดีย VIP',         flag: 'https://flagcdn.com/w80/in.png', category: 'หุ้น VIP' },
  { id: 'germany-vip-s',          name: 'หุ้นเยอรมัน VIP',        flag: 'https://flagcdn.com/w80/de.png', category: 'หุ้น VIP' },
  { id: 'russia-vip-s',           name: 'หุ้นรัสเซีย VIP',        flag: 'https://flagcdn.com/w80/ru.png', category: 'หุ้น VIP' },
  { id: 'uk-vip-s',               name: 'หุ้นอังกฤษ VIP',         flag: 'https://flagcdn.com/w80/gb.png', category: 'หุ้น VIP' },
  { id: 'dowjones-vip-s',         name: 'หุ้นดาวโจนส์ VIP',       flag: 'https://flagcdn.com/w80/us.png', category: 'หุ้น VIP' },
  // พิเศษ
  { id: 'hanoi-noon',    name: 'ฮานอยเที่ยง', flag: 'https://flagcdn.com/w80/vn.png', category: 'พิเศษ' },
  { id: 'lao-special',   name: 'ลาวพิเศษ',    flag: 'https://flagcdn.com/w80/la.png', category: 'พิเศษ' },
  { id: 'lao-vip',       name: 'ลาวVIP',       flag: 'https://flagcdn.com/w80/la.png', category: 'พิเศษ' },
  { id: 'lao-viangchan', name: 'ลาวเวียงจัน', flag: 'https://flagcdn.com/w80/la.png', category: 'พิเศษ' },
  // อื่นๆ
  { id: 'hanoi-extra', name: 'ฮานอย EXTRA',   flag: 'https://flagcdn.com/w80/vn.png', category: 'อื่นๆ' },
  { id: 'hanoi-cny',   name: 'ฮานอยตรุษจีน', flag: 'https://flagcdn.com/w80/vn.png', category: 'อื่นๆ' },
]

// ─── Size presets like Canva ──────────────────────────────────────────────────
const SIZE_PRESETS = [
  { id: 'ig-story',  label: 'IG Story',           w: 1080, h: 1920, icon: '📱' },
  { id: 'ig-post',   label: 'IG Post (1:1)',      w: 1080, h: 1080, icon: '📸' },
  { id: 'ig-45',     label: 'IG Post (4:5)',      w: 1080, h: 1350, icon: '🖼' },
  { id: 'fb-post',   label: 'Facebook Post',      w: 1200, h: 630,  icon: '👤' },
  { id: 'fb-story',  label: 'Facebook Story',     w: 1080, h: 1920, icon: '📖' },
  { id: 'fb-cover',  label: 'Facebook Cover',     w: 820,  h: 312,  icon: '🏞' },
  { id: 'tiktok',    label: 'TikTok',             w: 1080, h: 1920, icon: '🎵' },
  { id: 'poster-a4', label: 'Poster A4',          w: 595,  h: 842,  icon: '📄' },
  { id: 'poster-4x6',label: 'Poster 4×6"',        w: 400,  h: 600,  icon: '🖨' },
  { id: 'lotto-std', label: 'หวยมาตรฐาน',         w: 400,  h: 700,  icon: '🎰' },
  { id: 'line-share',label: 'LINE Share',          w: 520,  h: 520,  icon: '💬' },
  { id: 'custom',    label: 'กำหนดเอง',            w: 0,    h: 0,    icon: '✏️' },
]

// ─── Fonts (extended with Thai fonts) ─────────────────────────────────────────
const FONTS = [
  { value: 'Prompt',             label: 'Prompt' },
  { value: 'Sarabun',            label: 'Sarabun' },
  { value: 'Kanit',              label: 'Kanit' },
  { value: 'Mitr',               label: 'Mitr' },
  { value: 'K2D',                label: 'K2D' },
  { value: 'Itim',               label: 'Itim (ลายมือ)' },
  { value: 'Sriracha',           label: 'Sriracha (ลายมือ)' },
  { value: 'Charm',              label: 'Charm' },
  { value: 'Chonburi',           label: 'Chonburi (หนา)' },
  { value: 'Bai Jamjuree',       label: 'Bai Jamjuree' },
  { value: 'Chakra Petch',       label: 'Chakra Petch' },
  { value: 'Kodchasan',          label: 'Kodchasan' },
  { value: 'Krub',               label: 'Krub' },
  { value: 'Mali',               label: 'Mali' },
  { value: 'Noto Serif Thai',    label: 'Noto Serif Thai' },
  { value: 'IBM Plex Sans Thai', label: 'IBM Plex Sans Thai' },
  { value: 'Cinzel',             label: 'Cinzel (Roman)' },
  { value: 'Impact',             label: 'Impact' },
]

const ACCENT_COLORS = [
  { value: '#D4AF37', label: '🟡 Imperial Gold' },
  { value: '#FFD700', label: '🌕 Bright Gold' },
  { value: '#FF4444', label: '🔴 Crimson Red' },
  { value: '#00C9FF', label: '🔵 Sky Blue' },
  { value: '#00FF88', label: '🟢 Jade Green' },
  { value: '#FF69B4', label: '🌸 Pink' },
  { value: '#FFFFFF', label: '⬜ White' },
]

const NUMBER_STYLES = [
  { value: 'box',     label: 'กล่อง (Box)' },
  { value: 'outline', label: 'กรอบ (Outline)' },
  { value: 'glow',    label: 'เรืองแสง (Glow)' },
  { value: 'badge',   label: 'แบดจ์ (Badge)' },
  { value: 'plain',   label: 'ตัวเปล่า (Plain)' },
]

const MAX_NUMS = 5

function App() {
  const [currentPage, setCurrentPage] = useState<'select' | 'editor'>('select')

  const [lotteryName,   setLotteryName]   = useState('ลาวสตาร์VIP')
  const [lotteryFormat, setLotteryFormat] = useState('VIP')
  const [lotteryDate,   setLotteryDate]   = useState(() => new Date().toISOString().split('T')[0])
  const [seed,          setSeed]          = useState('322215')

  const [prominentNumber,  setProminentNumber]  = useState('7')
  const [twoDigitNumbers,  setTwoDigitNumbers]  = useState<string[]>(['02', '68', '45', '', ''])
  const [threeDigitNumbers,setThreeDigitNumbers] = useState<string[]>(['402', '936', '', '', ''])
  const [twoDigitCount,    setTwoDigitCount]    = useState(3)
  const [threeDigitCount,  setThreeDigitCount]  = useState(2)

  const [facebookName, setFacebookName] = useState('')
  const [lineId,       setLineId]       = useState('')

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [bgScale,  setBgScale]  = useState(100)
  const [bgPosX,   setBgPosX]   = useState(50)
  const [bgPosY,   setBgPosY]   = useState(50)
  const [overlayOpacity, setOverlayOpacity] = useState(30)

  // Size preset system
  const [activeSizePreset, setActiveSizePreset] = useState('lotto-std')
  const [posterWidth,  setPosterWidth]  = useState(400)
  const [posterHeight, setPosterHeight] = useState(700)

  const [prominentSize,  setProminentSize]  = useState(7)
  const [twoDigitSize,   setTwoDigitSize]   = useState(2.2)
  const [threeDigitSize, setThreeDigitSize] = useState(2.2)

  // Position: each group has X and Y (percentage of poster)
  const [promX, setPromX] = useState(50)    // 0=left, 100=right
  const [promY, setPromY] = useState(50)    // 0=top, 100=bottom
  const [twoX,  setTwoX]  = useState(82)    // default: right side
  const [twoY,  setTwoY]  = useState(50)
  const [threeX, setThreeX] = useState(50)  // center
  const [threeY, setThreeY] = useState(88)  // near bottom

  const [posterFont,  setPosterFont]  = useState('Prompt')
  const [numberStyle, setNumberStyle] = useState('box')
  const [accentColor, setAccentColor] = useState('#D4AF37')

  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewFormat,    setPreviewFormat]    = useState<'full' | 'png'>('full')

  const posterRef    = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min).toString()
  const randTwo   = () => rand(10, 99).padStart(2, '0')
  const randThree = () => rand(100, 999)
  const randOne   = () => rand(0, 9)

  const randomizeAllNumbers = () => {
    setProminentNumber(randOne())
    setTwoDigitNumbers(Array.from({ length: MAX_NUMS }, (_, i) => i < twoDigitCount ? randTwo() : ''))
    setThreeDigitNumbers(Array.from({ length: MAX_NUMS }, (_, i) => i < threeDigitCount ? randThree() : ''))
    setSeed(rand(100000, 999999))
  }

  const randomizeDate = () => {
    const s = new Date(2024, 0, 1), e = new Date(2026, 11, 31)
    const d = new Date(s.getTime() + Math.random() * (e.getTime() - s.getTime()))
    setLotteryDate(d.toISOString().split('T')[0])
  }

  const setToday = () => setLotteryDate(new Date().toISOString().split('T')[0])

  const applySizePreset = (id: string) => {
    const p = SIZE_PRESETS.find(x => x.id === id)
    if (!p) return
    setActiveSizePreset(id)
    if (p.w > 0 && p.h > 0) {
      const scale = Math.min(600 / p.w, 900 / p.h, 1)
      setPosterWidth(Math.round(p.w * scale))
      setPosterHeight(Math.round(p.h * scale))
    }
  }

  const handleSelectLottery = (l: typeof lotteryTypes[0]) => {
    setLotteryName(l.name)
    setCurrentPage('editor')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const r = new FileReader()
    r.onload = ev => setBackgroundImage(ev.target?.result as string)
    r.readAsDataURL(file)
  }

  const updateTwo   = (i: number, v: string) => { const a = [...twoDigitNumbers]; a[i] = v.slice(0, 2); setTwoDigitNumbers(a) }
  const updateThree = (i: number, v: string) => { const a = [...threeDigitNumbers]; a[i] = v.slice(0, 3); setThreeDigitNumbers(a) }

  const formatDate = (s: string) => {
    if (!s) return ''
    const [y, m, d] = s.split('-')
    return `${d}/${m}/${(parseInt(y) + 543).toString().slice(2)}`
  }

  const capturePoster = async () => {
    if (!posterRef.current) return null
    return html2canvas(posterRef.current, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: null })
  }

  const downloadPNG = useCallback(async () => {
    try {
      const c = await capturePoster()
      if (!c) return
      const a = document.createElement('a')
      a.download = `dumpsc_${lotteryName}_${lotteryDate}.png`
      a.href = c.toDataURL('image/png')
      a.click()
    } catch { alert('เกิดข้อผิดพลาดในการบันทึกรูปภาพ') }
  }, [lotteryName, lotteryDate])

  const shareImage = useCallback(async () => {
    try {
      const c = await capturePoster()
      if (!c) return
      const w = window.open()
      if (w) w.document.write(`<html><head><title>${lotteryName}</title>
        <style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0000}
        img{max-width:100%;max-height:100vh;object-fit:contain}</style></head>
        <body><img src="${c.toDataURL('image/png')}"></body></html>`)
    } catch {}
  }, [lotteryName])

  const confirmPreview = () => { setShowPreviewModal(false); shareImage() }

  const groupedLotteries = lotteryTypes.reduce((acc, l) => {
    if (!acc[l.category]) acc[l.category] = []
    acc[l.category].push(l)
    return acc
  }, {} as Record<string, typeof lotteryTypes>)

  const displayTwo   = twoDigitNumbers.slice(0, twoDigitCount).filter(n => n)
  const displayThree = threeDigitNumbers.slice(0, threeDigitCount).filter(n => n)

  const posterBg = backgroundImage
    ? `url(${backgroundImage})`
    : `linear-gradient(160deg, #3d0000 0%, #1e0000 30%, #0a0000 65%, #1e0000 100%)`

  // ══════════════════════════════════════════════════════════════════════════
  // SELECT PAGE
  // ══════════════════════════════════════════════════════════════════════════
  if (currentPage === 'select') {
    return (
      <div className="select-page">
        <div className="imperial-bg-overlay"></div>
        <div className="select-header">
          <div className="header-container">
            <span className="corner-rune tl">◈</span><span className="corner-rune tr">◈</span>
            <span className="corner-rune bl">◈</span><span className="corner-rune br">◈</span>
            <div className="dragon-side"><span className="dragon-icon dragon-left">🐉</span></div>
            <div className="header-inner">
              <div className="header-ornament top">
                <span className="ornament-gem">◆</span><span className="ornament-bar"></span>
                <span className="ornament-gem">✦</span><span className="ornament-bar"></span>
                <span className="ornament-gem">◆</span>
              </div>
              <h1>DUMPSC จัดให้</h1>
              <p className="header-subtitle">โปรแกรมทำนายหวยอัตโนมัติ</p>
              <div className="header-badge">⚜ ทีเด็ดหวยทุกงวด ⚜</div>
              <div className="header-ornament bottom">
                <span className="ornament-gem">◆</span><span className="ornament-bar"></span>
                <span className="ornament-gem">✦</span><span className="ornament-bar"></span>
                <span className="ornament-gem">◆</span>
              </div>
            </div>
            <div className="dragon-side"><span className="dragon-icon dragon-right">🐉</span></div>
          </div>
        </div>
        <div className="lottery-grid-full">
          {Object.entries(groupedLotteries).map(([cat, lotteries]) => (
            <div key={cat} className="lottery-category">
              <div className="category-header">
                <span className="category-ornament">⚜</span>
                <span className="category-divider-line"></span>
                <h2 className="category-title">{cat}</h2>
                <span className="category-divider-line"></span>
                <span className="category-ornament">⚜</span>
              </div>
              <div className="lottery-row">
                {lotteries.map(l => (
                  <button key={l.id} className="lottery-card-full" onClick={() => handleSelectLottery(l)}>
                    <div className="flag-frame"><img src={l.flag} alt="" className="lottery-flag-img" /></div>
                    <div className="lottery-info">
                      <span className="lottery-name-full">{l.name}</span>
                      <span className="lottery-date-small">{formatDate(new Date().toISOString().split('T')[0])}</span>
                    </div>
                    <span className="card-arrow">›</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════════════════
  // EDITOR PAGE
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="app-container">
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />

      {showPreviewModal && (
        <div className="modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>⚜ เลือกรูปแบบ ⚜</h3>
            <div className="format-options">
              {(['full', 'png'] as const).map(v => (
                <label key={v} className={`format-option ${previewFormat === v ? 'selected' : ''}`}>
                  <input type="radio" name="fmt" value={v} checked={previewFormat === v} onChange={() => setPreviewFormat(v)} />
                  <span>{v === 'full' ? 'รูปเต็มตัว' : 'PNG (ไม่มีพื้นหลัง)'}</span>
                </label>
              ))}
            </div>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowPreviewModal(false)}>ยกเลิก</button>
              <button className="btn-confirm" onClick={confirmPreview}>ตกลง</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIG PANEL */}
      <div className="config-panel">
        <div className="config-header">
          <button className="back-btn" onClick={() => setCurrentPage('select')}>← กลับ</button>
          <h2>⚙ ตั้งค่าโพย</h2>
        </div>
        <div className="config-content">

          {/* ── ข้อมูลหวย ── */}
          <div className="config-section">
            <h3 className="section-title">📋 ข้อมูลหวย</h3>
            <div className="input-row">
              <div className="input-group">
                <label>ชื่อหวย</label>
                <input type="text" value={lotteryName} onChange={e => setLotteryName(e.target.value)} className="modern-input" />
              </div>
              <div className="input-group">
                <label>รูปแบบ</label>
                <select value={lotteryFormat} onChange={e => setLotteryFormat(e.target.value)} className="modern-input">
                  {['VIP','ธรรมดา','พิเศษ','STAR','HD'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>วันที่</label>
              <div className="date-input-group">
                <input type="date" value={lotteryDate} onChange={e => setLotteryDate(e.target.value)} className="modern-input" />
                <button className="small-btn" onClick={randomizeDate}>สุ่มวัน</button>
                <button className="small-btn" onClick={setToday}>วันนี้</button>
              </div>
            </div>
            <div className="input-group" style={{ marginTop: 8 }}>
              <label>Seed (n)</label>
              <div className="date-input-group">
                <input type="text" value={seed} onChange={e => setSeed(e.target.value)} className="modern-input" style={{ flex: 1 }} />
                <button className="small-btn" onClick={() => setSeed(rand(100000, 999999))}>สุ่ม</button>
              </div>
            </div>
          </div>

          {/* ── ตัวเลข ── */}
          <div className="config-section">
            <h3 className="section-title">🔢 ตัวเลข</h3>
            <div className="input-group" style={{ marginBottom: 10 }}>
              <label>เลขเด่น (1 ตัว)</label>
              <input type="text" value={prominentNumber}
                onChange={e => setProminentNumber(e.target.value.replace(/\D/g, '').slice(0, 1))}
                className="number-input" maxLength={1} style={{ maxWidth: 80, textAlign: 'center' }} />
            </div>
            <div className="input-group" style={{ marginBottom: 8 }}>
              <label>เลข 2 ตัว — จำนวน: {twoDigitCount}</label>
              <input type="range" value={twoDigitCount} onChange={e => setTwoDigitCount(Number(e.target.value))} className="slider" min={1} max={MAX_NUMS} step={1} />
            </div>
            <div className="number-row-flex">
              {Array.from({ length: twoDigitCount }).map((_, i) => (
                <input key={i} type="text" value={twoDigitNumbers[i] ?? ''} onChange={e => updateTwo(i, e.target.value.replace(/\D/g, ''))} className="number-input" maxLength={2} placeholder="--" />
              ))}
            </div>
            <div className="input-group" style={{ marginBottom: 8, marginTop: 12 }}>
              <label>เลข 3 ตัว — จำนวน: {threeDigitCount}</label>
              <input type="range" value={threeDigitCount} onChange={e => setThreeDigitCount(Number(e.target.value))} className="slider" min={1} max={MAX_NUMS} step={1} />
            </div>
            <div className="number-row-flex">
              {Array.from({ length: threeDigitCount }).map((_, i) => (
                <input key={i} type="text" value={threeDigitNumbers[i] ?? ''} onChange={e => updateThree(i, e.target.value.replace(/\D/g, ''))} className="number-input" maxLength={3} placeholder="---" />
              ))}
            </div>
            <button className="btn-action btn-random" style={{ width: '100%', marginTop: 12 }} onClick={randomizeAllNumbers}>🎲 สุ่มเลขทั้งหมด</button>
          </div>

          {/* ── ขนาดโพย (Canva-style presets) ── */}
          <div className="config-section">
            <h3 className="section-title">📐 ขนาดโพย</h3>
            <div className="preset-grid preset-grid-4">
              {SIZE_PRESETS.map(p => (
                <button key={p.id} className={`preset-btn ${activeSizePreset === p.id ? 'active' : ''}`}
                  onClick={() => applySizePreset(p.id)}>
                  <span className="preset-icon">{p.icon}</span>
                  <span className="preset-label">{p.label}</span>
                </button>
              ))}
            </div>
            {activeSizePreset === 'custom' && (
              <div className="size-input-group" style={{ marginTop: 10 }}>
                <input type="number" value={posterWidth} onChange={e => setPosterWidth(Number(e.target.value))} className="modern-input" min={200} max={1200} />
                <span className="size-separator">×</span>
                <input type="number" value={posterHeight} onChange={e => setPosterHeight(Number(e.target.value))} className="modern-input" min={200} max={1920} />
              </div>
            )}
          </div>

          {/* ── ตำแหน่งตัวเลข (X/Y sliders) ── */}
          <div className="config-section">
            <h3 className="section-title">📐 ตำแหน่งตัวเลข</h3>
            <div className="pos-group">
              <label className="pos-label">🔴 เลขเด่น</label>
              <div className="input-group"><label>X: {promX}%</label><input type="range" value={promX} onChange={e => setPromX(Number(e.target.value))} className="slider" min={10} max={90} step={1} /></div>
              <div className="input-group"><label>Y: {promY}%</label><input type="range" value={promY} onChange={e => setPromY(Number(e.target.value))} className="slider" min={20} max={80} step={1} /></div>
            </div>
            <div className="pos-group">
              <label className="pos-label">🟡 เลข 2 ตัว</label>
              <div className="input-group"><label>X: {twoX}%</label><input type="range" value={twoX} onChange={e => setTwoX(Number(e.target.value))} className="slider" min={5} max={95} step={1} /></div>
              <div className="input-group"><label>Y: {twoY}%</label><input type="range" value={twoY} onChange={e => setTwoY(Number(e.target.value))} className="slider" min={15} max={85} step={1} /></div>
            </div>
            <div className="pos-group">
              <label className="pos-label">🟢 เลข 3 ตัว</label>
              <div className="input-group"><label>X: {threeX}%</label><input type="range" value={threeX} onChange={e => setThreeX(Number(e.target.value))} className="slider" min={10} max={90} step={1} /></div>
              <div className="input-group"><label>Y: {threeY}%</label><input type="range" value={threeY} onChange={e => setThreeY(Number(e.target.value))} className="slider" min={40} max={95} step={1} /></div>
            </div>
          </div>

          {/* ── ฟอนต์ & สไตล์ ── */}
          <div className="config-section">
            <h3 className="section-title">🔤 ฟอนต์ & สไตล์</h3>
            <div className="input-group">
              <label>ฟอนต์โพย</label>
              <select value={posterFont} onChange={e => setPosterFont(e.target.value)} className="modern-input">
                {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>สไตล์กล่องตัวเลข</label>
              <select value={numberStyle} onChange={e => setNumberStyle(e.target.value)} className="modern-input">
                {NUMBER_STYLES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>สีตัวเลข (Accent)</label>
              <select value={accentColor} onChange={e => setAccentColor(e.target.value)} className="modern-input">
                {ACCENT_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <div className="color-row" style={{ marginTop: 6 }}>
                <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="color-picker" />
                <span style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.6)' }}>กำหนดเอง</span>
              </div>
            </div>
          </div>

          {/* ── ขนาดตัวเลข ── */}
          <div className="config-section">
            <h3 className="section-title">📏 ขนาดตัวเลข</h3>
            <div className="input-group"><label>เลขเด่น: {prominentSize} rem</label><input type="range" value={prominentSize} onChange={e => setProminentSize(Number(e.target.value))} className="slider" min={4} max={12} step={0.5} /></div>
            <div className="input-group"><label>เลข 2 ตัว: {twoDigitSize} rem</label><input type="range" value={twoDigitSize} onChange={e => setTwoDigitSize(Number(e.target.value))} className="slider" min={1} max={4} step={0.1} /></div>
            <div className="input-group"><label>เลข 3 ตัว: {threeDigitSize} rem</label><input type="range" value={threeDigitSize} onChange={e => setThreeDigitSize(Number(e.target.value))} className="slider" min={1} max={4} step={0.1} /></div>
          </div>

          {/* ── รูปพื้นหลัง ── */}
          <div className="config-section">
            <h3 className="section-title">🖼 รูปพื้นหลัง</h3>
            <button className="btn-action btn-preview" style={{ width: '100%', marginBottom: 14 }} onClick={() => fileInputRef.current?.click()}>📂 อัพโหลดรูปพื้นหลัง</button>
            {backgroundImage && <button className="btn-action btn-share" style={{ width: '100%', marginBottom: 14 }} onClick={() => setBackgroundImage(null)}>✕ ลบรูปพื้นหลัง</button>}
            <div className="input-group"><label>ซูมรูป: {bgScale}%</label><input type="range" value={bgScale} onChange={e => setBgScale(Number(e.target.value))} className="slider" min={50} max={300} step={5} /></div>
            <div className="input-group"><label>ตำแหน่ง แนวนอน: {bgPosX}%</label><input type="range" value={bgPosX} onChange={e => setBgPosX(Number(e.target.value))} className="slider" min={0} max={100} step={1} /></div>
            <div className="input-group"><label>ตำแหน่ง แนวตั้ง: {bgPosY}%</label><input type="range" value={bgPosY} onChange={e => setBgPosY(Number(e.target.value))} className="slider" min={0} max={100} step={1} /></div>
            <div className="input-group"><label>ความมืดพื้นหลัง: {overlayOpacity}%</label><input type="range" value={overlayOpacity} onChange={e => setOverlayOpacity(Number(e.target.value))} className="slider" min={0} max={85} step={5} /></div>
          </div>

          {/* ── โซเชียล ── */}
          <div className="config-section">
            <h3 className="section-title">💬 โซเชียล</h3>
            <div className="input-group"><label>Facebook</label><input type="text" value={facebookName} onChange={e => setFacebookName(e.target.value)} className="modern-input" placeholder="ชื่อเฟส" /></div>
            <div className="input-group" style={{ marginTop: 8 }}><label>LINE ID</label><input type="text" value={lineId} onChange={e => setLineId(e.target.value)} className="modern-input" placeholder="ไอดีไลน์" /></div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="action-buttons">
            <button className="btn-action btn-preview" onClick={() => setShowPreviewModal(true)}>👁 ดูตัวอย่าง</button>
            <button className="btn-action btn-download" onClick={downloadPNG}>⬇ ดาวน์โหลด</button>
            <button className="btn-action btn-share" onClick={shareImage}>📤 แชร์</button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          POSTER PREVIEW
      ══════════════════════════════════════════ */}
      <div className="preview-panel">
        <div
          className="poster"
          ref={posterRef}
          style={{
            width: `${posterWidth}px`,
            height: `${posterHeight}px`,
            backgroundImage: posterBg,
            backgroundSize: backgroundImage ? `${bgScale}%` : 'cover',
            backgroundPosition: backgroundImage ? `${bgPosX}% ${bgPosY}%` : 'center',
            backgroundRepeat: 'no-repeat',
            fontFamily: `'${posterFont}', 'Prompt', sans-serif`,
          }}
        >
          <div className="poster-frame"></div>
          <div className="poster-overlay" style={{ background: `rgba(0,0,0,${overlayOpacity / 100})` }}></div>

          {/* DUMPSC Badge */}
          <div className="dumpsc-badge">
            <span className="dumpsc-logo">DUMPSC</span>
            <span className="dumpsc-domain">.com</span>
          </div>

          {/* Header — always at top */}
          <div className="poster-header">
            <div className="poster-title-text" style={{ color: accentColor }}>หวย</div>
            <div className="poster-lottery-name">{lotteryName}</div>
            <div className="poster-subtitle" style={{ color: accentColor }}>เลขเด็ด</div>
            <div className="poster-date-pill" style={{ borderColor: accentColor, color: accentColor }}>{formatDate(lotteryDate)}</div>
          </div>

          {/* Canvas area — all numbers positioned absolutely by % */}
          <div className="poster-canvas">
            {/* Prominent */}
            <div className="canvas-el" style={{ left: `${promX}%`, top: `${promY}%` }}>
              <div className="prominent-ring" style={{ width: `${Math.max(prominentSize * 14, 100)}px`, height: `${Math.max(prominentSize * 14, 100)}px`, borderColor: `${accentColor}80` }}>
                <div className="prominent-number" style={{ fontSize: `${prominentSize}rem`, color: accentColor, textShadow: `0 0 30px ${accentColor}, 0 0 60px ${accentColor}66, 0 4px 8px rgba(0,0,0,0.8)` }}>
                  {prominentNumber}
                </div>
              </div>
              <div className="prominent-label" style={{ color: accentColor }}>เด่น</div>
            </div>

            {/* 2-digit */}
            <div className="canvas-el" style={{ left: `${twoX}%`, top: `${twoY}%` }}>
              <div className="num-col">
                {displayTwo.map((num, i) => (
                  <div key={i} className={`num-box num-style-${numberStyle}`} style={{ fontSize: `${twoDigitSize}rem`, borderColor: `${accentColor}55`, color: accentColor, textShadow: numberStyle === 'glow' ? `0 0 18px ${accentColor}` : `0 2px 6px rgba(0,0,0,0.9)` }}>{num}</div>
                ))}
              </div>
            </div>

            {/* 3-digit */}
            <div className="canvas-el" style={{ left: `${threeX}%`, top: `${threeY}%` }}>
              <div className="num-row">
                {displayThree.map((num, i) => (
                  <div key={i} className={`num-box num-box-wide num-style-${numberStyle}`} style={{ fontSize: `${threeDigitSize}rem`, borderColor: `${accentColor}55`, color: accentColor, textShadow: numberStyle === 'glow' ? `0 0 18px ${accentColor}` : `0 2px 6px rgba(0,0,0,0.9)` }}>{num}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Social footer */}
          {(facebookName || lineId) && (
            <div className="poster-social">
              {facebookName && <div className="social-pill fb"><span className="social-icon">f</span><span>{facebookName}</span></div>}
              {lineId && <div className="social-pill ln"><span className="social-icon">L</span><span>{lineId}</span></div>}
            </div>
          )}

          {/* Watermark — always on */}
          <div className="watermark">
            {[1,2,3,4].map(i => <span key={i}>DUMPSC.COM</span>)}
          </div>
        </div>

        <div className="poster-actions">
          <button className="btn-action btn-random" onClick={randomizeAllNumbers}>🎲 สุ่มเลข</button>
          <button className="btn-action btn-download" onClick={downloadPNG}>⬇ ดาวน์โหลด</button>
        </div>
      </div>
    </div>
  )
}

export default App
