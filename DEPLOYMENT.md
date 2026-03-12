# DUMPSC Lotto - Deployment Guide

## 🚀 การติดตั้งและ Deploy บน Hostinger

### ขั้นตอนที่ 1: Build โปรเจค

```bash
# ติดตั้ง dependencies
npm install

# Build โปรเจค
npm run build
```

หลังจาก build เสร็จ จะได้โฟลเดอร์ `dist` ที่มีไฟล์ทั้งหมดสำหรับ deploy

### ขั้นตอนที่ 2: Upload ไฟล์ไปยัง Hostinger

#### วิธีที่ 1: ใช้ File Manager ของ Hostinger

1. เข้าสู่ระบบ Hostinger Control Panel
2. ไปที่ **File Manager**
3. สร้างโฟลเดอร์ใหม่สำหรับโปรเจค (เช่น `lottery` หรือ `lotto`)
4. Upload ไฟล์ทั้งหมดจากโฟลเดอร์ `dist` ไปยังโฟลเดอร์ที่สร้างไว้

#### วิธีที่ 2: ใช้ FTP

1. ใช้โปรแกรม FTP เช่น FileZilla
2. เชื่อมต่อกับ Hostinger โดยใช้ข้อมูล FTP ที่ได้รับ
3. Upload ไฟล์ทั้งหมดจากโฟลเดอร์ `dist`

### ขั้นตอนที่ 3: ตั้งค่า Domain/Subdomain

#### สำหรับ Domain หลัก (dumpsc.com)

1. ไปที่ **Domains** ใน Hostinger Control Panel
2. เลือก domain `dumpsc.com`
3. ตั้งค่า **Document Root** ให้ชี้ไปที่โฟลเดอร์ที่ upload ไฟล์ไว้

#### สำหรับ Subdomain (เช่น lotto.dumpsc.com)

1. ไปที่ **Domains** > **Subdomains**
2. สร้าง subdomain ใหม่ เช่น `lotto`
3. ตั้งค่า **Document Root** ให้ชี้ไปที่โฟลเดอร์ที่ upload ไฟล์ไว้

### ขั้นตอนที่ 4: ตั้งค่า .htaccess (สำหรับ Single Page Application)

สร้างไฟล์ `.htaccess` ในโฟลเดอร์ที่ upload ไฟล์ไว้ และใส่โค้ดนี้:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### ขั้นตอนที่ 5: ตรวจสอบการทำงาน

1. เปิดเบราว์เซอร์และเข้าไปที่ `https://dumpsc.com` หรือ subdomain ที่ตั้งค่าไว้
2. ตรวจสอบว่าเว็บไซต์ทำงานได้ปกติ

## 📁 โครงสร้างโฟลเดอร์บน Hostinger

```
public_html/
├── lottery/              # โฟลเดอร์สำหรับแอพหวย
│   ├── index.html
│   ├── assets/
│   │   ├── index-xxx.js
│   │   └── index-xxx.css
│   └── .htaccess
└── [โฟลเดอร์อื่นๆ ที่มีอยู่แล้ว]
```

## 🔧 การอัพเดทเว็บไซต์

เมื่อต้องการอัพเดทเว็บไซต์:

1. แก้ไขโค้ดในเครื่อง
2. รัน `npm run build` อีกครั้ง
3. Upload ไฟล์ใหม่จากโฟลเดอร์ `dist` ไปแทนที่ไฟล์เก่าบน Hostinger

## 🎨 คุณสมบัติของเว็บไซต์

- ✅ รองรับทั้งมือถือและคอมพิวเตอร์ (Responsive Design)
- ✅ ปรับแต่งขนาดโปสเตอร์และตัวเลขได้
- ✅ มีธงประเทศสำหรับแต่ละประเภทหวย
- ✅ มีวอเตอร์มาร์ค DUMPSC.COM
- ✅ ดีไซน์สวยงามแบบ Luxury
- ✅ ดาวน์โหลดและแชร์รูปภาพได้
- ✅ เปลี่ยนพื้นหลังได้

## 🌐 Domain

- **Domain หลัก**: dumpsc.com
- **Subdomain แนะนำ**: 
  - lotto.dumpsc.com
  - lottery.dumpsc.com
  - huay.dumpsc.com

## 📞 การติดต่อ

หากมีปัญหาในการ deploy หรือต้องการความช่วยเหลือ กรุณาติดต่อทีมพัฒนา

---

**หมายเหตุ**: ไฟล์นี้ไม่ควร upload ไปยัง Hostinger เพราะเป็นเอกสารสำหรับนักพัฒนาเท่านั้น
