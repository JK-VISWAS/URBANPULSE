import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import LandingPage from './LandingPage';
import ReportCard from './ReportCard';
import ReportModal from './ReportModal';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import AuthPage from './AuthPage';
import AdminLogin from './AdminLogin';
import FreeMap from './FreeMap';
import { auth, db } from './firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  // 1. STATE TO CONTROL THE VIEW
  const [hasEntered, setHasEntered] = useState(false);
  const [view, setView] = useState('user');
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminAccess, setAdminAccess] = useState(false);

 

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setAdminAccess(false);
      setHasEntered(true);
      setView('login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Report submission handled inside ReportModal

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Force login page for unauthenticated users
        setView('login');
        setLoading(false);
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!user && !adminAccess) return;

    // Query reports based on user role
    let q;
    if (view === 'admin' || adminAccess) {
      // Admin sees all reports
      q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    } else {
      // Regular users see only their own reports
      q = query(collection(db, "reports"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReports(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  }, [user, view, adminAccess]);

  // 2. CONDITIONAL RENDERING: Show Landing Page first until user enters
  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in: show AuthPage or AdminLogin (separate admin page)
  if (!user && !adminAccess) {
    if (view === 'admin-login') {
      return <AdminLogin onAuthorized={() => { setAdminAccess(true); setView('admin'); }} />;
    }
    return <AuthPage onAdminLogin={() => setView('admin-login')} />;
  }

  // 3. THE ACTUAL DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex justify-between items-center p-4 md:p-8 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="text-2xl font-black italic uppercase tracking-tighter">URBAN<span className="text-indigo-600">PULSE</span></div>
        <div className="flex items-center gap-3">
          {view === 'user' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase shadow-lg hover:bg-indigo-700 transition-colors"
            >
              + NEW REPORT
            </button>
          )}
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase hover:bg-slate-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="p-4 md:p-8">
        {view === 'admin' ? (
          <AdminDashboard reports={reports} />
        ) : (
          <UserDashboard onOpenModal={() => setIsModalOpen(true)} reports={reports} user={user} />
        )}

        <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
