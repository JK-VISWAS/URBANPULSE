import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Roads',
        description: '',
        image: null,
        location: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Send the data to your Firebase addDoc function
            await onSubmit(formData);

            // 2. THE FIX: Call onClose right after the submission is successful
            onClose();

            // 3. Optional: Reset form state so it's fresh for next time
            setFormData({ title: '', category: 'Roads', description: '', image: null, location: null });

            alert("Report submitted successfully!");
        } catch (error) {
            console.error("Submission failed:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
                    <X size={24} />
                </button>
                <h2 className="text-3xl font-black mb-8 tracking-tight">New Report</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Issue Title</label>
                        <input
                            required
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-indigo-100 transition-all font-bold"
                            placeholder="e.g., Water Leak on High St"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Category</label>
                        <select
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-indigo-100 transition-all font-bold"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>Roads</option>
                            <option>Sanitation</option>
                            <option>Utilities</option>
                            <option>Vandalism</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wide">Description</label>
                        <textarea
                            required
                            rows="4"
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-indigo-100 transition-all font-bold"
                            placeholder="Tell us what's happening..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                        <Send size={20} />
                        SUBMIT REPORT
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
