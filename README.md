# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# UrbanPulse - Smart City Management Platform

## 🚀 Features Implemented

### ✅ Unified "+ NEW REPORT" Button
- Clean header design with user email display
- Single central "+ GET STARTED" button for new users
- Simplified navigation and logout functionality

### ✅ Edit & Delete Logic (User Dashboard)
- Hover-to-reveal edit and delete buttons on report cards
- Inline editing modal for updating pending reports
- Confirmation dialogs for safe deletion
- Real-time updates across admin and user views

### ✅ Persistent Login & Data Retrieval
- User-specific report filtering using Firebase queries
- Automatic data persistence across login sessions
- Secure data isolation between users

### ✅ Enhanced Mobile Responsiveness
- Responsive grid layouts (1 column mobile → 2 tablet → 3 desktop)
- Mobile-optimized typography and button sizes
- Touch-friendly interface elements
- Adaptive video background scaling

### ✅ Firebase Storage Integration
- Photo upload functionality for reports
- Admin resolution photo proof uploads
- Secure cloud storage with Firebase Storage
- Automatic URL generation and storage

### ✅ Admin Resolution with Photo Proof
- Photo upload for completed work verification
- Detailed resolution notes with timestamps
- Visual proof display in user resolution cards
- Professional admin workflow management

## 📁 File Structure
```
src/
├── App.jsx              # Main app with authentication & routing
├── AdminDashboard.jsx   # Admin interface with resolution tools
├── UserDashboard.jsx    # User reports with edit/delete functionality
├── LandingPage.jsx      # Responsive video background landing page
├── AuthSystem.jsx       # Authentication component
├── ReportModal.jsx      # Photo upload report submission form
├── FreeMap.jsx          # Interactive map component
├── firebase.js          # Firebase config with Storage
└── App.css             # Animations and responsive styles
```

## 🎬 Video Background Setup

**Important:** Add your hero video file to `public/assets/hero.webm`

The landing page expects a WEBM video file at `/assets/hero.webm`. You can:
1. Create or obtain a suitable hero video
2. Convert it to WEBM format (recommended for web performance)
3. Place it in `public/assets/hero.webm`

If you don't have a video, the page will show a black background.

## 🔧 Firebase Configuration

Update `src/firebase.js` with your Firebase project credentials and ensure Storage is enabled:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com", // Required for photo uploads
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5175` to see the app.

## 👨‍💼 Admin Access

Use passcode: `ADMIN_INDIA_2026` to access admin features.

## 📱 Features

- **User Authentication:** Secure login/signup with email/password
- **Photo Uploads:** Firebase Storage integration for report images
- **Edit & Delete:** Full CRUD operations for user reports
- **Admin Resolution:** Photo proof uploads for completed work
- **Real-time Updates:** Live synchronization between admin and user views
- **Mobile Responsive:** Optimized for all device sizes
- **Persistent Sessions:** User data maintained across login sessions
- **Professional UI:** Modern design with smooth animations

## 🏢 Company Information

**UrbanPulse Systems**
- Email: support@urbanpulse.ai
- Phone: +91 40 2988 7766
- Address: Level 7, T-Hub Phase 2, Madhapur, Hyderabad, Telangana 500081

---

Built with React, Firebase, and Tailwind CSS.
