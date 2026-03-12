# 🚀 Quick Start Guide - DUMPSC Lotto

## สำหรับนักพัฒนา (Development)

### 1. Clone และติดตั้ง

```bash
# Clone repository
git clone <repository-url>
cd Dumpsc-Lotto

# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

### 2. การพัฒนา

```bash
# รัน dev server
npm run dev

# Build สำหรับ production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## สำหรับการ Deploy (Production)

### ขั้นตอนที่ 1: Build โปรเจค

```bash
npm run build
```

### ขั้นตอนที่ 2: Upload ไปยัง Hostinger

1. เข้า Hostinger Control Panel
2. ไปที่ **File Manager**
3. สร้างโฟลเดอร์ใหม่ (เช่น `lottery`)
4. Upload ไฟล์ทั้งหมดจากโฟลเดอร์ `dist/`
5. Copy ไฟล์ `.htaccess.example` ไปเป็น `.htaccess`

### ขั้นตอนที่ 3: ตั้งค่า Domain

#### สำหรับ Subdomain (แนะนำ)

1. ไปที่ **Domains** > **Subdomains**
2. สร้าง subdomain ใหม่:
   - Subdomain: `lotto` (หรือชื่ออื่นที่ต้องการ)
   - Document Root: `/public_html/lottery` (หรือโฟลเดอร์ที่ upload)
3. คลิก **Create**

#### สำหรับ Domain หลัก

1. ไปที่ **Domains**
2. เลือก `dumpsc.com`
3. แก้ไข **Document Root** ให้ชี้ไปที่โฟลเดอร์ที่ upload

### ขั้นตอนที่ 4: ตรวจสอบ

เปิดเบราว์เซอร์และไปที่:
- `https://lotto.dumpsc.com` (ถ้าใช้ subdomain)
- `https://dumpsc.com` (ถ้าใช้ domain หลัก)

## 📁 โครงสร้างไฟล์ที่ต้อง Upload

```
lottery/                    # โฟลเดอร์บน Hostinger
├── index.html             # ไฟล์หลัก
├── assets/                # ไฟล์ CSS, JS, และรูปภาพ
│   ├── index-xxx.js
│   └── index-xxx.css
└── .htaccess              # สำหรับ routing (สำคัญ!)
```

## ⚠️ สิ่งที่ต้องระวัง

1. **อย่าลืม .htaccess** - จำเป็นสำหรับ Single Page Application
2. **ตรวจสอบ Document Root** - ต้องชี้ไปที่โฟลเดอร์ที่ถูกต้อง
3. **HTTPS** - ควรใช้ HTTPS เสมอ (Hostinger มี SSL ฟรี)
4. **Cache** - ถ้าอัพเดทแล้วไม่เห็นการเปลี่ยนแปลง ให้ Clear Cache

## 🔄 การอัพเดท

เมื่อต้องการอัพเดทเว็บไซต์:

```bash
# 1. แก้ไขโค้ด
# 2. Build ใหม่
npm run build

# 3. Upload ไฟล์ใหม่จาก dist/ ไปแทนที่ไฟล์เก่า
# 4. Clear browser cache และทดสอบ
```

## 🆘 แก้ปัญหา

### ปัญหา: หน้าเว็บไม่โหลด

- ตรวจสอบว่า upload ไฟล์ครบหรือไม่
- ตรวจสอบ Document Root
- ตรวจสอบว่ามีไฟล์ `.htaccess` หรือไม่

### ปัญหา: Refresh แล้วเจอ 404

- ตรวจสอบไฟล์ `.htaccess`
- ตรวจสอบว่า mod_rewrite เปิดอยู่หรือไม่

### ปัญหา: CSS/JS ไม่โหลด

- ตรวจสอบว่า upload โฟลเดอร์ `assets/` ครบหรือไม่
- ตรวจสอบ path ในไฟล์ `index.html`

### ปัญหา: รูปธงประเทศไม่โหลด

- ตรวจสอบ internet connection
- ใช้ CDN สำหรับรูปธง (flagcdn.com)

## 📞 ติดต่อ

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อทีมพัฒนา

---

**สำเร็จ!** 🎉 เว็บไซต์ของคุณพร้อมใช้งานแล้ว
