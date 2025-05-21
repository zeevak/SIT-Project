# Fuel Pass - Fuel Management System
This project is a fuel management system that was developed to simplify and enhance the process of fuel allocation and usage tracking. This system is designed to streamline fuel distribution by integrating vehicle registration, QR code-based tracking, and station management. Vehicles are assigned weekly fuel quotas, and stations use an app to scan QR codes, log fuel transactions, and update quotas in real time. An admin panel ensures that all transactions and registrations are monitored and approved as necessary.

## 📑 Table of Contents
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Acknowledgements](#-acknowledgements)


## 🚀 Features

### Vehicle Owners
- **Vehicle Registration**: Vehicle Owners can register vehicles by verifying details like Vehicle Number, Chassis Number, Vehicle Type, and Fuel Type, which is verified against a government mock database. Upon successful verification, vehicles receive a unique QR code that can be scanned at fuel stations.
- **Download QR code**: Vehicle owners can download the QR code for their vehicles any number of times, by accessing their vehicle details
- **Fuel Allocation**: Each vehicle type has a maximum weekly fuel capacity (e.g., 6L for cars, 4L for bikes), which auto-resets weekly. This helps in regulating fuel distribution and preventing misuse.
- **Multi-Vehicle Support**: Vehicle Owners can register multiple vehicles and manage them via their dashboard, where they can view QR codes, vehicle details, and fuel consumption history.
- **View vehicle details**: Owners have the option to view the vehicle details as registered, along with the available fuel quota.
- **Profile Management**: Users can update personal details, change profile pictures, and manage account settings.

### Fuel Station Owners
- **Fuel Station Registration**: Station Owners can register their stations with the License Number, Station ID, Dealer Name, and Address. License numbers are verified against a government mock database. Verified stations receive a unique login code for the mobile application, enabling station workers to manage fueling operations.
- **Mobile App Functionality**: Fuel station workers can log in using the unique station code, scan vehicle QR codes to view details and available fuel capacity, and manually enter QR data if needed. The app supports both camera scanning and manual input of an 8-digit alphanumeric QR code.
  
### Admin
- **Admin Panel**: Admins can view registered/unregistered vehicle details, monitor fuel station activities, and update station information. The admin dashboard provides comprehensive insights into the platform's operations.'

### General
- **Role-Based Authentication & Authorization**: Secure login and role management using JWT, ensuring that only authorized users can access specific functionalities.
- **Password Recovery**: OTP-based email verification for password resets ensures secure recovery of user accounts.
- **Real-Time Data Sync**: Both the web and mobile applications are synchronized in real-time, ensuring that any updates made on one platform are reflected across all devices.



## ⚙ Technologies Used

### Front-end 
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)  ![React Native](https://img.shields.io/badge/Mobile-React%20Native-61DAFB?logo=react)  ![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwindcss) 
- **React (v18.x.x)**: For building the responsive and interactive web application, providing a seamless user experience.
- **React Native (v0.72.x)**: For developing the cross-platform mobile application, ensuring compatibility with both Android and iOS devices.
- **Tailwind CSS (v3.x.x)**: For efficient and scalable styling, enabling rapid UI development with a utility-first approach.
  
### Back-end

![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-orange?logo=spring)  ![Hibernate](https://img.shields.io/badge/ORM-Hibernate-red)  ![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql)  ![JWT](https://img.shields.io/badge/Auth-JWT-yellow)  ![Twilio](https://img.shields.io/badge/SMS-Twilio-ff0000)  

- **Spring Boot (v3.x.x)**: Provides a robust framework for building the backend RESTful APIs, ensuring high performance and scalability.
- **Hibernate (v6.x.x)**: ORM tool for managing database interactions, simplifying data manipulation and retrieval.
- **MySQL Workbench (v8.x.x)**: For database design, development, and administration, supporting complex queries and data relationships.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization, protecting sensitive user data.
- **Twilio API**: For mobile verification and sending SMS notifications, enhancing communication and security.
  
  
### Tools

![Postman](https://img.shields.io/badge/API-Postman-orange)    ![MySQL Workbench](https://img.shields.io/badge/DB%20Tool-MySQL%20Workbench-4479A1?logo=mysql)

- **Postman**: For API testing and debugging, ensuring the reliability and functionality of the backend services.
- **MySQL Workbench**: For managing the database schema and queries, supporting efficient data management.

  

## 📂 Getting Started
**1. Clone the repository:**  
- Clone the repository using Git to get a local copy on your machine.

**2. Backend setup**  
- Navigate to the backend directory
- Configure the `application.properties` file with your MySQL database credentials and Twilio API keys.
- Build and run the Spring Boot application.
- Setup the database by importing the provided SQL files

**3. Frontend setup**
- Navigate to the react app directory: `cd reactapp`
- Install dependencies: `npm install`
- Start the React application: `npm run dev`

**4. Mobile Setup**
- Navigate to the mobile app directory: `cd mobile`
- Install dependencies: `npm install`
- Run the app on an emulator or physical device:
```sh
npx react-native run-android  
# or  
npx react-native run-ios
```



## 🤝 Acknowledgements
We acknowledge the contributions of all team members in the successful completion of this project:
- Jeyaruban Jenushan: https://github.com/jeyjenushan
- Mohanathas Holins: https://github.com/holibhai
- Kenuja Sivakumar: https://github.com/Kenu-05
- Danindu Ransika: https://github.com/danindu2024
- Tharindu Thejan: https://github.com/TharinduThejan
- Zaiena R.: https://github.com/zaina-r









