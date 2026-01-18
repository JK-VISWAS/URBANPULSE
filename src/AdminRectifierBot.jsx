import React from 'react';

const AdminRectifierBot = ({ reports }) => {
  const topIssue = reports.length > 0 ? reports[0].category : "General";

  return (
    <div className="fixed bottom-10 right-10 w-80 bg-slate-900 text-white p-6 rounded-[32px] border border-indigo-500/30 shadow-2xl">
      <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">System Rectifier</h3>
      <p className="text-sm italic">"Admin, I have detected a surge in {topIssue} reports. I recommend allocating the repair team to North Delhi."</p>
    </div>
  );
};

export default AdminRectifierBot;