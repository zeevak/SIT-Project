# SIT-Project: Fuel Pass – Fuel Management System

**Fuel Pass** is a digital solution for modernizing fuel distribution and tracking. It connects vehicle owners, fuel stations, and administrators via technology, ensuring transparency, preventing misuse, and streamlining operations.

---

## 📋 Overview

- **Digital-first approach** for fuel allocation.
- **QR codes, mobile apps, and web dashboards** for seamless, transparent fuel distribution.
- **Real-time monitoring** and automated processes.

---

## ✨ Core Features

### For Vehicle Owners
- **Digital Onboarding:** Register vehicles with government verification.
- **QR Codes:** Unique vehicle IDs for quick verification.
- **Quota Management:** Weekly fuel limits (motorcycles: 4L, cars: 6L).
- **Fleet Dashboard:** Manage multiple vehicles and track usage.
- **Transaction History:** View purchases and quota status.
- **Profile Management:** Update personal info and upload photos.

### For Fuel Stations
- **Registration:** License verification via government API.
- **Mobile App:** Secure login with facility codes.
- **QR Scanning:** Camera or manual code entry.
- **Transaction Processing:** Real-time dispensing and quota deduction.

### For Administrators
- **Central Dashboard:** Monitor all activities, registrations, and transactions.
- **Data Management:** Approve/manage vehicle and station registrations.
- **Analytics:** Platform-wide insights and reports.

### Platform-Wide
- **Security:** JWT-based authentication, role-based access.
- **Account Recovery:** OTP-based password reset via email.
- **Sync:** Real-time data across web and mobile.

---

## 🛠 Technical Stack

- **Frontend:** React (web), React Native 0.72+ (mobile), Tailwind CSS 3+
- **Backend:** Spring Boot 3+, Hibernate 6+, MySQL 8+
- **Security:** JWT authentication
- **Tools:** Postman, MySQL Workbench
- **Integrations:** Twilio for SMS/notifications

---

## 🚀 Quick Setup

1. **Clone Repository**
   ```
   git clone [repository-url]
   cd fuel-pass-system
   ```

2. **Backend**
   ```
   cd backend
   # Configure database and Twilio in application.properties
   # Import SQL schema
   # Launch Spring Boot
   ```

3. **Web App**
   ```
   cd frontend/web
   npm install
   npm run dev
   ```

4. **Mobile App**
   ```
   cd frontend/mobile
   npm install
   # Android: npx react-native run-android
   # iOS: npx react-native run-ios
   ```

---

## 👥 Team

- **Kavinu Senanayake** ([zeevak](https://github.com/zeevak))
- **Sharukkan Imanuval** ([SharukkanN](https://github.com/SharukkanN))
- **Thulini Premasinghe** ([thulinipremasinghe](https://github.com/thulinipremasinghe))
- **Kushani Apsara** ([kushaniapsara](https://github.com/kushaniapsara))
- **Sumaiya Ziyard** ([sumaiya-z](https://github.com/sumaiya-z)

---

**Fuel Pass** is a secure, scalable, and user-friendly platform for modern fuel management.
