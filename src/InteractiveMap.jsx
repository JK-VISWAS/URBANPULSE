import React from 'react';

const InteractiveMap = ({ reports }) => {
    return (
        <div className="relative w-full h-[400px] bg-slate-900 rounded-[40px] overflow-hidden mb-12 border border-slate-800 group">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Simulated Map Markers from Real Data */}
            {reports.map((report, index) => (
                <div
                    key={report.id}
                    className="absolute flex flex-col items-center group/marker"
                    style={{
                        top: `${20 + (index * 15) % 60}%`,
                        left: `${15 + (index * 22) % 70}%`
                    }}
                >
                    <div className={`w-4 h-4 rounded-full animate-ping absolute ${report.status === 'Resolved' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <div className={`w-3 h-3 rounded-full relative ${report.status === 'Resolved' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                    {/* Tooltip on Hover */}
                    <div className="hidden group-hover/marker:block absolute bottom-6 bg-white text-slate-900 p-3 rounded-2xl text-[10px] font-black whitespace-nowrap shadow-2xl border border-slate-100 z-50">
                        {report.title.toUpperCase()}
                    </div>
                </div>
            ))}

            <div className="absolute bottom-8 left-8">
                <h5 className="text-white font-black text-lg">Live Civic Geospatial Data</h5>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Mapping {reports.length} active nodes worldwide</p>
            </div>
        </div>
    );
};

export default InteractiveMap;
