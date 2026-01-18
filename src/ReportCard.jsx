import React from 'react';
import { Trash2 } from 'lucide-react';

const ReportCard = ({ report, isAdmin, onDelete, onToggle }) => {
    return (
        <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col">
            {/* IMAGE DISPLAY */}
            {report.imageUrl && (
                <div className="relative h-44 w-full mb-4 overflow-hidden rounded-2xl">
                    <img src={report.imageUrl} className="object-cover w-full h-full" alt="evidence" />
                </div>
            )}

            <div className="flex justify-between items-start mb-2">
                <h4 className="font-extrabold text-slate-800 text-lg leading-tight">{report.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${report.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {report.status || 'Pending'}
                </span>
            </div>

            <p className="text-xs text-slate-500 mb-6 flex-grow line-clamp-2">{report.description}</p>

            {/* ADMIN CONTROL AGENT */}
            {isAdmin && (
                <div className="flex gap-2 pt-4 border-t border-slate-50">
                    <button
                        onClick={() => onToggle(report.id, report.status)}
                        className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase hover:bg-slate-800"
                    >
                        {report.status === 'Resolved' ? 'Re-open' : 'Mark Fixed'}
                    </button>
                    <button
                        onClick={() => onDelete(report.id)}
                        className="bg-rose-50 text-rose-600 p-3 rounded-xl hover:bg-rose-600 hover:text-white transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReportCard;
