import React from 'react';

const AdminChatBot = ({ reports }) => {
  const getInsights = () => {
    const categories = reports.map(r => r.category);
    const mostCommon = categories.sort((a,b) =>
          categories.filter(v => v===a).length - categories.filter(v => v===b).length
    ).pop();
    return `Sir, most reports are about ${mostCommon || 'General Issues'}. I suggest deploying a repair crew to the central zone immediately.`;
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-slate-900 rounded-3xl p-6 shadow-2xl border border-indigo-500/30 animate-bounce-in">
      <h4 className="text-indigo-400 font-bold mb-2 text-xs uppercase tracking-widest">System Rectifier</h4>
      <p className="text-white text-sm italic">"{getInsights()}"</p>
    </div>
  );
};

export default AdminChatBot;