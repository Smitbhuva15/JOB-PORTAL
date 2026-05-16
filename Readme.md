<div align="center">
  <img src="https://img.icons8.com/color/96/000000/briefcase.png" alt="Job Linker Logo" />
  
  # JobLinker - Modern Job Portal Platform
  
  **A full-stack, enterprise-grade job portal connecting talented professionals with top companies.**
  
  [![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-20.x-43853D?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
</div>

<br />

## 📖 Project Overview

**JobLinker** is a sophisticated, responsive, and scalable job portal built with the modern MERN stack. Designed to streamline the recruitment lifecycle, it provides an intuitive platform for **Job Seekers** to find roles, save favorites, and track applications, while giving **Recruiters & Admins** a powerful dashboard to manage job postings, review resumes, and process candidates.

The application features a stunning SaaS-style UI, utilizing modern design tokens, smooth animations, dynamic empty states, and built-in dark mode support.

---

## ✨ Features

### 🔐 Authentication & Security
- **Role-Based Access Control:** Distinct authentication flows and guarded routes for Students vs. Recruiters.
- **JWT Security:** Secure token-based API authentication.
- **OTP Forgot Password:** Integrated with the **Resend API** for secure, reliable password recovery via email.

### 👨‍🎓 Job Seeker Experience
- **Advanced Job Search & Filter:** Instantly filter jobs by location, job type (Full-time, Part-time, Remote), salary range, and experience level.
- **Save Jobs Feature:** Seamlessly bookmark jobs you love. Your saved jobs are persisted across sessions.
- **Profile & Resume Management:** Upload and manage your professional bio, skills, and resume via Cloudinary.
- **One-Click Apply:** Instantly submit your application and track your status (Pending, Accepted, Rejected).

### 🏢 Recruiter & Admin Dashboard Features
- **Company Management:** Register multiple company profiles, upload company logos, and update organization details.
- **Job Posting Panel:** Create, edit, and delete job listings with rich criteria (positions, salary, location, requirements).
- **Applicant Tracking System (ATS):** A dedicated table view to review all applicants per job, download their resumes, and update their application status in real-time.

### 🎨 Modern UI/UX & Responsive Design Details
- **Responsive Architecture:** Fluid layouts that perfectly adapt to Mobile, Tablet, and Desktop screens using Tailwind CSS.
- **Dark/Light Theme:** Built-in system-aware theme toggle that instantly switches the entire app's color palette.
- **Sonner Notifications:** Beautiful, animated, and theme-aware toast notifications for success, error, and info states.
- **Empty State System:** Custom-designed, illustration-backed fallback UI for empty search results, empty dashboards, or logged-out views.
- **Shadcn/UI Integration:** Accessible, unstyled, and highly customizable radix UI components (Cards, Avatars, Modals, Tables, Forms).

---

## 🛠️ Tech Stack

### Frontend Architecture
- **React.js & Vite:** Lightning-fast development and optimized production builds.
- **Tailwind CSS & Shadcn/UI:** Utility-first styling with accessible, modern component primitives.
- **Redux Toolkit & Context API:** Predictable global state management.
- **Lucide React:** Beautiful, consistent iconography.
- **Sonner:** Modern, highly customizable toast notifications.

### Backend Infrastructure
- **Node.js & Express.js:** Fast, non-blocking RESTful API architecture.
- **MongoDB & Mongoose:** Flexible NoSQL database with robust schema validation.
- **Resend API:** Next-generation transactional email sending for OTPs.
- **Cloudinary:** Secure cloud storage for image assets and resumes.
- **Bcrypt.js & JSONWebToken:** Secure password hashing and stateless session management.

---

## 📸 Screenshots


| **Home Page & Latest Jobs** | **Advanced Search & Filters** |
| :---: | :---: |
| ![Home Page](https://via.placeholder.com/600x350.png?text=Home+Page+Screenshot) | ![Jobs Page](https://via.placeholder.com/600x350.png?text=Jobs+Search+Screenshot) |

| **Recruiter Dashboard** | **Applicant Tracking System** |
| :---: | :---: |
| ![Dashboard](https://via.placeholder.com/600x350.png?text=Admin+Dashboard+Screenshot) | ![ATS](https://via.placeholder.com/600x350.png?text=Applicants+Table+Screenshot) |

| **Dark Mode Theme** | **Modern Empty States** |
| :---: | :---: |
| ![Dark Mode](https://via.placeholder.com/600x350.png?text=Dark+Mode+Screenshot) | ![Empty State](https://via.placeholder.com/600x350.png?text=Empty+State+UI) |

---

## 🚀 Installation Steps

Follow these instructions to set up the project locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [Git](https://git-scm.com/) installed. You will also need a MongoDB database cluster (like MongoDB Atlas).

### 1. Clone the Repository
```bash
git clone https://github.com/Smitbhuva15/JOB-PORTAL.git
cd "JOB PORTAL"
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd backend
npm install
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies.
```bash
cd ../frontend
npm install
```
---

## 💻 Run Commands

To start the application locally in development mode:

**Start the Backend Server:**
```bash
cd backend
npm start

```

**Start the Frontend Development Server:**
```bash
cd frontend
npm run dev

```
---


## 📄 License Section

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br />

<div align="center">
  <h3>Designed, Developed & Maintained By ❤️ Smit Bhuva</h3>
  <p>Thank you for exploring JobLinker!</p>
</div>
