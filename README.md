# 🎰 DUMPSC Lotto - โปรแกรมทำนายหวยอัตโนมัติ

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</div>

## ✨ คุณสมบัติเด่น

- 🎨 **Luxury Design** - ดีไซน์สวยงามระดับพรีเมียม
- 📱 **Responsive** - รองรับทั้งมือถือและคอมพิวเตอร์
- 🎯 **ปรับแต่งได้** - ปรับขนาดโปสเตอร์และตัวเลขได้ตามต้องการ
- 🌍 **ธงประเทศ** - มีธงประเทศสำหรับแต่ละประเภทหวย
- 💧 **Watermark** - มีวอเตอร์มาร์ค DUMPSC.COM
- 📥 **ดาวน์โหลด** - ดาวน์โหลดรูปภาพได้
- 🔗 **แชร์** - แชร์รูปภาพได้ง่าย
- 🖼️ **เปลี่ยนพื้นหลัง** - อัพโหลดรูปพื้นหลังได้

## 🎯 ประเภทหวยที่รองรับ

### รายวัน (Daily)
- ประชาชนลาว, ลาวExtra, ฮานอยอาเชียน
- ลาว TV, ฮานอย HD, ฮานอย สตาร์
- ลาว HD, ฮานอย TV, ลาวสตาร์
- และอีกมากมาย...

### รัฐบาลไทย
- รัฐบาลไทย, ออมสิน, ธ.ก.ส

### ฮานอย
- ฮานอย, ฮานอยพิเศษ, ฮานอยปกติ
- ฮานอย VIP, ฮานอยมัดรวม

### หุ้น (Stock)
- หุ้นนิเคอิ (เช้า/บ่าย)
- หุ้นจีน (เช้า/บ่าย)
- หุ้นฮั้งเส็ง (เช้า/บ่าย)
- หุ้นไต้หวัน, หุ้นเกาหลี
- หุ้นสิงค์โปร์, หุ้นอินเดีย
- หุ้นเยอรมัน, หุ้นรัสเซีย
- หุ้นอังกฤษ, หุ้นดาวโจนส์

### หุ้น VIP
- ทุกประเภทหุ้นในรูปแบบ VIP

### พิเศษ (Special)
- ฮานอยเที่ยง, ลาวพิเศษ
- ลาวVIP, ลาวเวียงจัน

### อื่นๆ (Others)
- ฮานอย EXTRA, ฮานอยตรุษจีน

## 🚀 การติดตั้งและใช้งาน

### ติดตั้ง Dependencies

```bash
npm install
```

### รันในโหมด Development

```bash
npm run dev
```

เปิดเบราว์เซอร์และไปที่ `http://localhost:5173`

### Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ build เสร็จจะอยู่ในโฟลเดอร์ `dist`

### Preview Build

```bash
npm run preview
```

## 📦 การ Deploy บน Hostinger

ดูคู่มือการ deploy ได้ที่ [DEPLOYMENT.md](./DEPLOYMENT.md)

### สรุปขั้นตอน

1. Build โปรเจค: `npm run build`
2. Upload ไฟล์จากโฟลเดอร์ `dist` ไปยัง Hostinger
3. ตั้งค่า Domain/Subdomain ให้ชี้ไปที่โฟลเดอร์ที่ upload
4. สร้างไฟล์ `.htaccess` สำหรับ SPA routing
5. เปิดเว็บไซต์และทดสอบ

## 🎨 การปรับแต่ง UI

### ปรับขนาดโปสเตอร์

```typescript
// ในส่วน UI Customization
setPosterWidth(400)  // ความกว้าง (300-600px)
setPosterHeight(700) // ความสูง (500-900px)
```

### ปรับขนาดตัวเลข

```typescript
setProminentSize(10)   // ตัวเลขเด่น (6-14 rem)
setTwoDigitSize(2.5)   // เลข 2 ตัว (1.5-4 rem)
setThreeDigitSize(2.5) // เลข 3 ตัว (1.5-4 rem)
```

## 🛠️ เทคโนโลยีที่ใช้

- **React 19.2.0** - UI Library
- **TypeScript 5.9.3** - Type Safety
- **Vite 7.2.4** - Build Tool
- **Tailwind CSS 3.4.19** - Styling
- **html2canvas 1.4.1** - Screenshot/Download
- **Radix UI** - Accessible Components
- **Lucide React** - Icons

## 📱 Responsive Design

เว็บไซต์รองรับหน้าจอทุกขนาด:

- 📱 Mobile (< 600px)
- 📱 Tablet (600px - 900px)
- 💻 Desktop (900px - 1400px)
- 🖥️ Large Desktop (> 1400px)

## 🎯 การใช้งาน

1. **เลือกประเภทหวย** - คลิกที่การ์ดหวยที่ต้องการ
2. **กรอกข้อมูล** - กรอกเลขเด่น, เลข 2 ตัว, เลข 3 ตัว
3. **ปรับแต่ง** - ปรับขนาดและรูปแบบตามต้องการ
4. **เปลี่ยนพื้นหลัง** - อัพโหลดรูปพื้นหลังได้
5. **ดาวน์โหลด/แชร์** - บันทึกหรือแชร์รูปภาพ

## 🌐 Domain

- **Domain หลัก**: dumpsc.com
- **แนะนำ Subdomain**:
  - lotto.dumpsc.com
  - lottery.dumpsc.com
  - huay.dumpsc.com

## 📄 License

This project is private and proprietary to DUMPSC.

## 👨‍💻 Developer

Developed with ❤️ by DUMPSC Team

---

**หมายเหตุ**: โปรเจคนี้ใช้สำหรับ dumpsc.com เท่านั้น ห้ามนำไปใช้เพื่อการค้าโดยไม่ได้รับอนุญาต
