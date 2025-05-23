# SIT-Project

# Fuel Pass - Fuel Management System
An innovative digital solution designed to modernize fuel distribution and tracking processes. This comprehensive platform bridges the gap between vehicle owners, fuel stations, and administrative oversight through technology-driven automation and real-time monitoring.

## 📋 Project Overview
Our fuel management ecosystem addresses traditional challenges in fuel allocation by implementing a digital-first approach. The system integrates QR code technology, mobile applications, and web-based dashboards to create a seamless fuel distribution network that ensures transparency, prevents misuse, and streamlines operations.

## ✨ Core Functionality
### For Vehicle Owners
Digital Vehicle Onboarding: Complete vehicle registration process with government database integration for verification of vehicle credentials including registration numbers, chassis details, and fuel specifications
QR Code Generation: Automated creation of unique QR identifiers for registered vehicles, enabling quick station-side verification
Quota Management: Automated weekly fuel allowance system with type-specific limits (motorcycles: 4L, automobiles: 6L) and automatic renewal cycles
Fleet Management: Dashboard interface for managing multiple registered vehicles with comprehensive tracking capabilities
Transaction History: Detailed logging of all fuel purchases and remaining quota visibility
Account Customization: Personal profile management with photo upload and information update capabilities

### For Fuel Station Operators
Station Authorization: Comprehensive registration workflow with license verification through government API integration
Mobile Application Access: Dedicated station management app with secure authentication via unique facility codes
QR Scanning Technology: Dual-mode QR processing supporting both camera-based scanning and manual 8-character code entry
Transaction Processing: Real-time fuel dispensing workflow with automatic quota deduction and transaction logging

### Administrative Controls
Centralized Monitoring: Comprehensive oversight dashboard displaying all platform activities, registrations, and transactions
Data Management: Tools for reviewing, approving, and managing both vehicle and station registrations
System Analytics: Platform-wide insights and reporting capabilities for operational optimization

### Platform-Wide Features
Multi-Layer Security: JWT-based authentication with role-specific access controls ensuring data protection
Account Recovery: Secure OTP-based password reset system using email verification
Cross-Platform Synchronization: Real-time data consistency across web and mobile applications

## 🛠 Technical Architecture
Client-Side Development
![React](https://img.shields.io/badge/Web-React-61DAFB?io/badge/Mobile-React%20Native-61DAFB?logo=react.io/badge/Styling-Tailwind-38B2AC?logo=tail-based architecture for optimal user experience
React Native 0.72+: Cross-platform mobile development ensuring iOS and Android compatibility
Tailwind CSS 3+: Utility-first styling framework for consistent and responsive design implementation

Server-Side Infrastructure
![Spring Boot](https://img.shields.io/badge/ields.ioimg.shields.io/badge/Security 3+**: Enterprise-grade Java framework providing RESTful API development with built-in security features
Hibernate 6+: Object-relational mapping solution for efficient database operations and query optimization
MySQL 8+: Relational database management with advanced indexing and transaction support
JWT Authentication: Stateless security implementation for scalable user session management
Twilio Integration: SMS and communication services for verification and notification workflows

Development Tools
![Postman](https://imgench](https://img.shields.io/ development and testing environment for endpoint validation
MySQL Workbench: Database design and administration interface for schema management

### 🚀 Installation Guide

#### 1. Initial Setup
Repository Access

git clone [repository-url]
cd fuel-pass-system



#### 2. Backend Configuration
Environment Setup

cd backend
Configure database credentials in application.properties
Add Twilio API configuration for SMS services
Import database schema from provided SQL scripts
Launch Spring Boot application



#### 3. Web Application Setup
React Development Server

cd frontend/web
npm install
npm run dev



#### 4. Mobile Application Setup
React Native Environment

cd frontend/mobile
npm install

##### For Android
npx react-native run-android

##### For iOS
npx react-native run-ios


### 👥 Development Team
This project represents collaborative effort from our development team, with each member contributing specialized expertise in different aspects of the platform's architecture and implementation.

This platform demonstrates modern approaches to digitizing traditional fuel distribution systems while maintaining security, scalability, and user experience as core priorities.

