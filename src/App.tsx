import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import './App.css'

// Lottery types data with flag images
const lotteryTypes = [
  { id: 'lao-vip', name: 'ลาวสตาร์VIP', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao', name: 'ลาวสตาร์', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-abc-vip', name: 'ลาวอับคัสVIP', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-abc', name: 'ลาวอับคัส', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-pad', name: 'ลาวพัฒนา', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-hd', name: 'ลาวHD', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-tv', name: 'ลาวทีวี', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-extra', name: 'ลาวอัดฉั้บ', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-extra-vip', name: 'ลาวอัดฉั้บVIP', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'lao-ruam', name: 'ลาวรวม', flag: 'https://flagcdn.com/w80/la.png', category: 'ลาว' },
  { id: 'hanoi-special', name: 'ฮานอยพิเศษ', flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-vip', name: 'ฮานอยวีไอพี', flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi', name: 'ฮานอย', flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-extra', name: 'ฮานอยอาเซียน', flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-ruam', name: 'ฮานอยรวม', flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'hanoi-ruam-vip', name: 'ฮานอยรวมVIP', flag: 'https://flagcdn.com/w80/vn.png', category: 'ฮานอย' },
  { id: 'thai-ku', name: 'หุ้นไทยเช้า', flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้นไทย' },
  { id: 'thai-bai', name: 'หุ้นไทยเที่ยง', flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้นไทย' },
  { id: 'thai-bai2', name: 'หุ้นไทยบ่าย', flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้นไทย' },
  { id: 'thai-yen', name: 'หุ้นไทยเย็น', flag: 'https://flagcdn.com/w80/th.png', category: 'หุ้นไทย' },
  { id: 'nikkei-ku', name: 'นิเคอิรอบเช้า', flag: 'https://flagcdn.com/w80/jp.png', category: 'นิเคอิ' },
  { id: 'nikkei-bai', name: 'นิเคอิรอบบ่าย', flag: 'https://flagcdn.com/w80/jp.png', category: 'นิเคอิ' },
  { id: 'nikkei-vip', name: 'นิเคอิบ่ายVIP', flag: 'https://flagcdn.com/w80/jp.png', category: 'นิเคอิ' },
  { id: 'china-vip', name: 'จีนบ่ายVIP', flag: 'https://flagcdn.com/w80/cn.png', category: 'จีน' },
  { id: 'china-morning', name: 'จีนเช้าVIP', flag: 'https://flagcdn.com/w80/cn.png', category: 'จีน' },
  { id: 'china', name: 'หุ้นจีน', flag: 'https://flagcdn.com/w80/cn.png', category: 'จีน' },
  { id: 'dow-vip', name: 'ดาวโจนส์VIP', flag: 'https://flagcdn.com/w80/us.png', category: 'ดาวโจนส์' },
  { id: 'germany-vip', name: 'เยอรมันVIP', flag: 'https://flagcdn.com/w80/de.png', category: 'เยอรมัน' },
  { id: 'germany', name: 'หุ้นเยอรมัน', flag: 'https://flagcdn.com/w80/de.png', category: 'เยอรมัน' },
  { id: 'uk-vip', name: 'อังกฤษVIP', flag: 'https://flagcdn.com/w80/gb.png', category: 'อังกฤษ' },
  { id: 'uk', name: 'หุ้นอังกฤษ', flag: 'https://flagcdn.com/w80/gb.png', category: 'อังกฤษ' },
  { id: 'america-vip', name: 'อเมริกาVIP', flag: 'https://flagcdn.com/w80/us.png', category: 'อเมริกา' },
  { id: 'korea-vip', name: 'เกาหลีVIP', flag: 'https://flagcdn.com/w80/kr.png', category: 'เกาหลี' },
  { id: 'singapore-vip', name: 'สิงคโปร์VIP', flag: 'https://flagcdn.com/w80/sg.png', category: 'สิงคโปร์' },
  { id: 'taiwan-vip', name: 'ไต้หวันVIP', flag: 'https://flagcdn.com/w80/tw.png', category: 'ไต้หวัน' },
  { id: 'russia', name: 'รัฐบาลไทย', flag: 'https://flagcdn.com/w80/th.png', category: 'รัฐบาล' },
]

function App() {
  // Page state
  const [currentPage, setCurrentPage] = useState<'select' | 'editor'>('select')

  // Form state
  const [lotteryName, setLotteryName] = useState('ลาวสตาร์VIP')
  const [lotteryFormat, setLotteryFormat] = useState('VIP')
  const [lotteryDate, setLotteryDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [seed, setSeed] = useState('322215')
  const [prominentNumber, setProminentNumber] = useState('7')
  const [twoDigitNumbers, setTwoDigitNumbers] = useState(['02', '68', '45'])
  const [threeDigitNumbers, setThreeDigitNumbers] = useState(['402', '936', ''])
  const [facebookName, setFacebookName] = useState('')
  const [lineId, setLineId] = useState('')
  const [showWatermark, setShowWatermark] = useState(true)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  // Modal state
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewFormat, setPreviewFormat] = useState<'full' | 'png'>('full')

  // Refs
  const posterRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Random generators
  const generateRandomNumber = (min: number, max: number): string => {
    return Math.floor(Math.random() * (max - min + 1) + min).toString()
  }

  const generateTwoDigitNumber = (): string => {
    return generateRandomNumber(10, 99).padStart(2, '0')
  }

  const generateThreeDigitNumber = (): string => {
    return generateRandomNumber(100, 999)
  }

  const generateSingleDigit = (): string => {
    return generateRandomNumber(0, 9)
  }

  // Random all numbers
  const randomizeAllNumbers = () => {
    setProminentNumber(generateSingleDigit())
    setTwoDigitNumbers([
      generateTwoDigitNumber(),
      generateTwoDigitNumber(),
      generateTwoDigitNumber()
    ])
    setThreeDigitNumbers([
      generateThreeDigitNumber(),
      generateThreeDigitNumber(),
      generateThreeDigitNumber()
    ])
    setSeed(generateRandomNumber(100000, 999999))
  }

  // Random date
  const randomizeDate = () => {
    const start = new Date(2024, 0, 1)
    const end = new Date(2025, 11, 31)
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    setLotteryDate(randomDate.toISOString().split('T')[0])
  }

  // Random seed
  const randomizeSeed = () => {
    setSeed(generateRandomNumber(100000, 999999))
  }

  // Set today
  const setToday = () => {
    const today = new Date()
    setLotteryDate(today.toISOString().split('T')[0])
  }

  // Handle lottery selection
  const handleSelectLottery = (lottery: typeof lotteryTypes[0]) => {
    setLotteryName(lottery.name)
    setCurrentPage('editor')
  }

  // Handle background image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Change background image
  const changeBackground = () => {
    fileInputRef.current?.click()
  }

  // Update two digit number
  const updateTwoDigitNumber = (index: number, value: string) => {
    const newNumbers = [...twoDigitNumbers]
    newNumbers[index] = value.slice(0, 2)
    setTwoDigitNumbers(newNumbers)
  }

  // Update three digit number
  const updateThreeDigitNumber = (index: number, value: string) => {
    const newNumbers = [...threeDigitNumbers]
    newNumbers[index] = value.slice(0, 3)
    setThreeDigitNumbers(newNumbers)
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const [year, month, day] = dateStr.split('-')
    const thaiYear = parseInt(year) + 543
    return `${day}/${month}/${thaiYear.toString().slice(2)}`
  }

  // Download PNG
  const downloadPNG = useCallback(async () => {
    if (posterRef.current) {
      try {
        const canvas = await html2canvas(posterRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null
        })
        
        const link = document.createElement('a')
        link.download = `huay_poster_${lotteryName}_${lotteryDate}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      } catch (error) {
        console.error('Error saving poster:', error)
        alert('เกิดข้อผิดพลาดในการบันทึกรูปภาพ')
      }
    }
  }, [lotteryName, lotteryDate])

  // Share image
  const shareImage = useCallback(async () => {
    if (posterRef.current) {
      try {
        const canvas = await html2canvas(posterRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null
        })
        
        const imageUrl = canvas.toDataURL('image/png')
        const newWindow = window.open()
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>แชร์รูปภาพ - ${lotteryName}</title>
                <style>
                  body {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: #1a1a2e;
                  }
                  img {
                    max-width: 100%;
                    max-height: 100vh;
                    object-fit: contain;
                  }
                </style>
              </head>
              <body>
                <img src="${imageUrl}" alt="Lottery Poster">
              </body>
            </html>
          `)
        }
      } catch (error) {
        console.error('Error sharing poster:', error)
      }
    }
  }, [lotteryName])

  // Preview with format
  const handlePreview = () => {
    setShowPreviewModal(true)
  }

  // Confirm preview
  const confirmPreview = () => {
    setShowPreviewModal(false)
    shareImage()
  }

  // Group lottery types by category
  const groupedLotteries = lotteryTypes.reduce((acc, lottery) => {
    if (!acc[lottery.category]) {
      acc[lottery.category] = []
    }
    acc[lottery.category].push(lottery)
    return acc
  }, {} as Record<string, typeof lotteryTypes>)

  // Lottery Selection Page
  if (currentPage === 'select') {
    return (
      <div className="select-page">
        <div className="select-header">
          <h1>DUMPSCจัดให้</h1>
          <div className="header-badge">ทีเด็ด7โกรก</div>
        </div>
        <div className="lottery-grid-full">
          {Object.entries(groupedLotteries).map(([category, lotteries]) => (
            <div key={category} className="lottery-row">
              {lotteries.map((lottery) => (
                <button
                  key={lottery.id}
                  className="lottery-card-full"
                  onClick={() => handleSelectLottery(lottery)}
                >
                  <img src={lottery.flag} alt="flag" className="lottery-flag-img" />
                  <div className="lottery-info">
                    <span className="lottery-name-full">{lottery.name}</span>
                    <span className="lottery-date-small">{formatDate(new Date().toISOString().split('T')[0])}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Editor Page
  return (
    <div className="app-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>เลือกรูปแบบที่จะดูตัวอย่าง</h3>
            <div className="format-options">
              <label className={`format-option ${previewFormat === 'full' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="format"
                  value="full"
                  checked={previewFormat === 'full'}
                  onChange={() => setPreviewFormat('full')}
                />
                <span>รูปเต็มตัว</span>
              </label>
              <label className={`format-option ${previewFormat === 'png' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="format"
                  value="png"
                  checked={previewFormat === 'png'}
                  onChange={() => setPreviewFormat('png')}
                />
                <span>PNG (ไม่มีพื้นหลัง)</span>
              </label>
            </div>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowPreviewModal(false)}>
                ยกเลิก
              </button>
              <button className="btn-confirm" onClick={confirmPreview}>
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Config Panel */}
      <div className="config-panel">
        <div className="config-header">
          <button className="back-btn" onClick={() => setCurrentPage('select')}>
            ← กลับไปเลือกหวย
          </button>
          <h2>ตั้งค่า</h2>
        </div>

        <div className="config-content">
          {/* Lottery Info */}
          <div className="config-section">
            <div className="input-row">
              <div className="input-group">
                <label>ชื่อหวย</label>
                <input
                  type="text"
                  value={lotteryName}
                  onChange={(e) => setLotteryName(e.target.value)}
                  className="modern-input"
                />
              </div>
              <div className="input-group">
                <label>รูปแบบ</label>
                <select
                  value={lotteryFormat}
                  onChange={(e) => setLotteryFormat(e.target.value)}
                  className="modern-input"
                >
                  <option value="VIP">VIP</option>
                  <option value="ธรรมดา">ธรรมดา</option>
                  <option value="พิเศษ">พิเศษ</option>
                </select>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>วันที่</label>
                <div className="date-input-group">
                  <input
                    type="date"
                    value={lotteryDate}
                    onChange={(e) => setLotteryDate(e.target.value)}
                    className="modern-input"
                  />
                  <button className="small-btn" onClick={randomizeDate}>ลบวัน</button>
                  <button className="small-btn" onClick={setToday}>บวกวัน</button>
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Seed (n)</label>
              <div className="seed-input-group" style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  className="modern-input"
                  style={{ flex: 1 }}
                />
                <button className="small-btn" onClick={randomizeSeed}>สุ่ม Seed</button>
              </div>
            </div>
          </div>

          {/* Numbers */}
          <div className="config-section">
            <div className="number-row">
              <div className="input-group">
                <label>เด่น</label>
                <input
                  type="text"
                  value={prominentNumber}
                  onChange={(e) => setProminentNumber(e.target.value.slice(0, 1))}
                  className="number-input"
                  maxLength={1}
                />
              </div>
            </div>

            <div className="number-row">
              {twoDigitNumbers.map((num, idx) => (
                <div key={idx} className="input-group">
                  <label>{idx === 0 ? 'สองตัว' : ''}</label>
                  <input
                    type="text"
                    value={num}
                    onChange={(e) => updateTwoDigitNumber(idx, e.target.value)}
                    className="number-input"
                    maxLength={2}
                  />
                </div>
              ))}
            </div>

            <div className="number-row">
              {threeDigitNumbers.map((num, idx) => (
                <div key={idx} className="input-group">
                  <label>{idx === 0 ? 'สามตัว' : ''}</label>
                  <input
                    type="text"
                    value={num}
                    onChange={(e) => updateThreeDigitNumber(idx, e.target.value)}
                    className="number-input"
                    maxLength={3}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="config-section">
            <div className="input-group">
              <label>โซเชียล</label>
              <input
                type="text"
                value={facebookName}
                onChange={(e) => setFacebookName(e.target.value)}
                className="modern-input"
                placeholder="ชื่อเฟส"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                value={lineId}
                onChange={(e) => setLineId(e.target.value)}
                className="modern-input"
                placeholder="ไอดีไลน์"
              />
            </div>
          </div>

          {/* Watermark */}
          <div className="config-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
              />
              <span>ใส่วอเตอร์มาร์ค</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-action btn-random" onClick={randomizeAllNumbers}>
              สุ่มเลข
            </button>
            <button className="btn-action btn-preview" onClick={handlePreview}>
              ดูตัวอย่าง
            </button>
            <button className="btn-action btn-download" onClick={downloadPNG}>
              ดาวน์โหลด
            </button>
            <button className="btn-action btn-share" onClick={shareImage}>
              แชร์รูปนี้
            </button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="preview-panel">
        <div 
          className="poster"
          ref={posterRef}
          style={{
            backgroundImage: backgroundImage 
              ? `url(${backgroundImage})` 
              : 'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <div className="poster-overlay"></div>

          {/* Header */}
          <div className="poster-header">
            <div className="poster-title">
              <span className="title-main">หวย</span>
              <span className="title-sub">{lotteryName}</span>
              <span className="title-extra">เลขเด็ด</span>
            </div>
            <div className="poster-date">{formatDate(lotteryDate)}</div>
          </div>

          {/* Prominent Number */}
          <div className="prominent-section">
            <div className="prominent-number">{prominentNumber}</div>
            <div className="prominent-label">เด่น</div>
          </div>

          {/* Two Digit Numbers - Right Side */}
          <div className="two-digit-section">
            {twoDigitNumbers.filter(n => n).map((num, idx) => (
              <div key={idx} className="two-digit-number">{num}</div>
            ))}
          </div>

          {/* Three Digit Numbers - Bottom */}
          <div className="three-digit-section">
            {threeDigitNumbers.filter(n => n).map((num, idx) => (
              <div key={idx} className="three-digit-number">{num}</div>
            ))}
          </div>

          {/* Social */}
          {(facebookName || lineId) && (
            <div className="social-section">
              {facebookName && (
                <div className="social-badge facebook">
                  <span className="social-icon">f</span>
                  <span>{facebookName}</span>
                </div>
              )}
              {lineId && (
                <div className="social-badge line">
                  <span className="social-icon">L</span>
                  <span>{lineId}</span>
                </div>
              )}
            </div>
          )}

          {/* Watermark */}
          {showWatermark && (
            <div className="watermark">
              <span>ทีเด็ด7โกรก</span>
              <span>ทีเด็ด7โกรก</span>
              <span>ทีเด็ด7โกรก</span>
              <span>ทีเด็ด7โกรก</span>
              <span>ทีเด็ด7โกรก</span>
            </div>
          )}
        </div>

        {/* Change Background Button */}
        <button className="change-bg-btn" onClick={changeBackground}>
          เปลี่ยนรูปพื้นหลัง
        </button>
      </div>
    </div>
  )
}

export default App
