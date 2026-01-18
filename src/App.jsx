import React, { useState, useEffect } from 'react';
import { LayoutGrid, MapPin, PlusCircle, Bell, User, X, Send, AlertTriangle, CheckCircle2, Shield, Droplets, Globe } from 'lucide-react';
import AIAssistant from './AIAssistant';
// import InteractiveMap from './InteractiveMap'; // Replaced by Google Maps
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'; // Moved to DemoMap
import DemoMap from './DemoMap';
import ReportCard from './ReportCard';
import ReportModal from './ReportModal';
import AIChatBot from './AIChatBot';
import { db } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const Sidebar = ({ view, setView, reports, className }) => (
  <aside className={`bg-slate-900 p-8 flex flex-col text-white h-full ${className}`}>
    <div className="flex items-center gap-3 mb-12">
      <div className="bg-rose-600 p-2 rounded-xl shadow-lg shadow-rose-900/50">
        <Globe className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-xl font-black tracking-tighter uppercase italic">UrbanPulse</h1>
    </div>
    <nav className="flex-1 space-y-4">
      <button onClick={() => setView('user')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${view === 'user' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
        <User size={18} /> Citizen Portal
      </button>
      <button onClick={() => setView('admin')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${view === 'admin' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
        <Shield size={18} /> Admin Command
      </button>
    </nav>
    <div className="p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl">
      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Global Community Score</p>
      <p className="text-3xl font-black text-white leading-none">
        {reports.length * 150} <span className="text-xs text-indigo-400">pts</span>
      </p>
    </div>
  </aside>
);



const Hyperspeed = ({ effectOptions = {} }) => {
  const {
    colors = {},
    speedUp = 2,
    movingAwaySpeed = [60, 80],
    length = 24,
    totalSideLightSticks = 24,
    lightPairsPerRoadWay = 14,
    lanesPerRoad = 3,
    fov = 90,
    background = colors.background || '#000000',
  } = effectOptions;
  const leftColor = colors.leftCarsColor || '#4F46E5';
  const rightColor = colors.rightCarsColor || '#F43F5E';
  const sticksColor = colors.sticksColor || '#ffffff';
  const bars = Array.from({ length: Math.max(totalSideLightSticks, Math.floor(length / 10)) });
  const laneCount = Math.max(1, lanesPerRoad);
  const translateMax = `${Math.round(60 * (fov / 90))}%`;
  const baseStickDur = 6;
  const speedFactor = Math.max(0.2, 1 / Math.max(1, speedUp));
  const speedToDuration = (s) => Math.max(1.2, 12 - (s / 18));
  const leftDur = speedToDuration(movingAwaySpeed[0] || 60) * speedFactor;
  const rightDur = speedToDuration(movingAwaySpeed[1] || 80) * speedFactor;
  const stickDur = baseStickDur * speedFactor;
  const pairs = Math.max(8, lightPairsPerRoadWay);
  return (
    <div className="absolute inset-0" style={{ background }}>
      <style>{`
        @keyframes hypMove {
          0% { transform: translate3d(-20%, 0, 0); opacity: 0.2; }
          50% { transform: translate3d(20%, 0, 0); opacity: 0.6; }
          100% { transform: translate3d(${translateMax}, 0, 0); opacity: 0.1; }
        }
      `}</style>
      <div className="absolute inset-0">
        ${''}
        ${''}
      </div>
      <div className="absolute inset-0">
        {bars.map((_, i) => (
          <div
            key={`stick-${i}`}
            className="absolute"
            style={{
              left: `${(i * 100) / bars.length}%`,
              top: `${8 + (i % (laneCount * 3)) * 6}%`,
              width: '2px',
              height: `${18 + (i % 5) * 4}vh`,
              background: sticksColor,
              opacity: 0.3,
              animation: `hypMove ${stickDur + (i % 2)}s linear ${i * 0.1}s infinite`,
            }}
          />
        ))}
        {Array.from({ length: pairs }).map((_, i) => (
          <div
            key={`left-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${(i * 100) / pairs}%`,
              top: `${18 + (i % laneCount) * 16}%`,
              width: '6px',
              height: '6px',
              background: leftColor,
              boxShadow: `0 0 24px ${leftColor}`,
              opacity: 0.85,
              animation: `hypMove ${leftDur + (i % 2)}s linear ${i * 0.18}s infinite`,
            }}
          />
        ))}
        {Array.from({ length: pairs }).map((_, i) => (
          <div
            key={`right-${i}`}
            className="absolute rounded-full"
            style={{
              right: `${(i * 100) / pairs}%`,
              top: `${28 + (i % laneCount) * 16}%`,
              width: '6px',
              height: '6px',
              background: rightColor,
              boxShadow: `0 0 24px ${rightColor}`,
              opacity: 0.85,
              animation: `hypMove ${rightDur + (i % 2)}s linear ${i * 0.22}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const LandingPage = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Hyperspeed
          effectOptions={{
            distortion: 'turbulentDistortion',
            speedUp: 15,
            length: 600,
            totalSideLightSticks: 50,
            lightPairsPerRoadWay: 70,
            lanesPerRoad: 3,
            fov: 100,
            movingAwaySpeed: [150, 250],
            colors: {
              roadColor: '#080808',
              islandColor: '#0a0a0a',
              background: '#000000',
              leftCarsColor: '#4F46E5',
              rightCarsColor: '#F43F5E',
              sticksColor: '#ffffff',
            },
          }}
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center p-6">
        <div className="bg-rose-600/20 backdrop-blur-xl p-4 rounded-3xl mb-8 border border-rose-500/30">
          <Globe className="w-10 h-10 text-white animate-pulse" />
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
          Urban<span className="text-rose-500 italic">Pulse</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 font-bold max-w-2xl leading-relaxed mb-12 drop-shadow-lg">
          The global command center for community-driven urban improvement.
        </p>
        <button
          onClick={onEnter}
          className="px-12 py-6 bg-white text-slate-900 rounded-2xl font-black text-2xl shadow-2xl hover:bg-indigo-50 hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          Enter Dashboard <Send size={28} />
        </button>
      </div>
    </div>
  );
};
export default function App() {
  const [reports, setReports] = useState([]);
  const [view, setView] = useState('landing'); // 'landing', 'user', 'admin'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Real-time Data Fetching
  useEffect(() => {
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setReports(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Resolved' ? 'pending' : 'Resolved';
    await updateDoc(doc(db, "reports", id), { status: nextStatus });
  };

  const deleteReport = async (id) => {
    await deleteDoc(doc(db, "reports", id));
  };
  const handleReportSubmit = async (data) => {
    await addDoc(collection(db, "reports"), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  };

  // Google Maps Loader moved to DemoMap component

  if (view === 'landing') return <LandingPage onEnter={() => setView('user')} />;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden font-sans">
      {/* SIDEBAR: Hidden on small screens, flex on desktop */}
      <Sidebar view={view} setView={setView} reports={reports} className="hidden md:flex w-72" />

      {/* CONTENT AREA: Scrollable and responsive */}
      <main className="flex-1 overflow-y-auto p-4 md:p-12">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {view === 'admin' ? 'Admin Control' : 'Citizen Portal'}
          </h2>
          {view === 'user' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} />
              REPORT ISSUE
            </button>
          )}
        </header>

        {/* AI INSIGHT BANNER */}
        <AIAssistant reports={reports} />

        {/* GOOGLE MAPS INTEGRATION: Live Data Markers */}
        <div className="w-full h-[450px] bg-slate-900 rounded-[48px] overflow-hidden relative border border-slate-800 mb-10 shadow-2xl">
          <DemoMap reports={reports} />

          {/* Overlaying labels for the demo */}
          <div className="absolute bottom-8 left-8 pointer-events-none">
            <h5 className="text-white font-black text-lg">Live Civic Geospatial Data</h5>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Mapping {reports.length} active nodes
            </p>
          </div>
        </div>

        {/* RESPONSIVE REPORT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              isAdmin={view === 'admin'}
              onDelete={deleteReport}
              onToggle={toggleStatus}
            />
          ))}
        </div>
      </main>

      {/* FLOATING AI CHATBOT */}
      <AIChatBot reports={reports} />

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
