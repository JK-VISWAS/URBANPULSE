import React, { useState } from 'react';
import { X, Send, MapPin, Camera, Loader2, CheckCircle } from 'lucide-react';
import { auth, db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const ReportModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Roads',
        description: '',
        imageUrl: '', // We'll store the URL string
        location: null // Stores { lat, lng }
    });

    // 1. GEOLOCATION LOGIC
    const handleGetLocation = () => {
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setFormData({
                    ...formData,
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
                setLocationLoading(false);
            },
            (error) => {
                console.error(error);
                setLocationLoading(false);
                alert("Could not get location. Please enable GPS.");
            }
        );
    };

    // 2. IMAGE UPLOAD LOGIC
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Create preview URL for display
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        }
    };

    // 3. UPLOAD handled inline in handleSubmit

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = "";
            if (file) {
                const form = new FormData();
                form.append("file", file);
                form.append("upload_preset", "urbanpulse");
                const res = await fetch("https://api.cloudinary.com/v1_1/dx97l3k4d/image/upload", {
                    method: "POST",
                    body: form
                });
                if (!res.ok) {
                    throw new Error("Cloudinary upload failed");
                }
                const data = await res.json();
                imageUrl = data?.secure_url || "";
            }

            // Save the report details with imageUrl to Firestore
            await addDoc(collection(db, "reports"), {
                title: formData.title,
                category: formData.category,
                description: formData.description,
                imageUrl,
                location: formData.location,
                userId: auth.currentUser.uid,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            // Reset form and close the modal
            setFormData({ title: '', category: 'Roads', description: '', imageUrl: '', location: null });
            setPreviewUrl(null);
            setFile(null);
            onClose();
        } catch (error) {
            console.error("The actual error is:", error);
            alert("Upload failed! See the browser console (F12) for the real error.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-xl rounded-[48px] p-8 md:p-12 shadow-2xl relative my-auto animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="mb-10">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Report Issue</h2>
                    <p className="text-slate-500 font-bold mt-2">Help optimize our urban grid.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Title & Category Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Title</label>
                            <input
                                required
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-3xl p-5 outline-none transition-all font-bold text-slate-900 shadow-inner"
                                placeholder="Issue name..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Category</label>
                            <select
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-3xl p-5 outline-none transition-all font-bold text-slate-900 shadow-inner appearance-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Roads</option>
                                <option>Sanitation</option>
                                <option>Utilities</option>
                                <option>Vandalism</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Description</label>
                        <textarea
                            required
                            rows="3"
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-3xl p-5 outline-none transition-all font-bold text-slate-900 shadow-inner"
                            placeholder="Provide details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Visual Evidence & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all overflow-hidden"
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <>
                                        <Camera className="text-slate-400 mb-2" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase">Attach Photo</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <button
                            type="button"
                            onClick={handleGetLocation}
                            className={`flex flex-col items-center justify-center w-full h-32 rounded-[32px] transition-all border-2 ${formData.location
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-indigo-400'
                                }`}
                        >
                            {locationLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : formData.location ? (
                                <>
                                    <CheckCircle className="mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Pinned</span>
                                </>
                            ) : (
                                <>
                                    <MapPin className="mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Pin Location</span>
                                </>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white p-6 rounded-[32px] font-black text-xl shadow-2xl shadow-slate-200 hover:bg-indigo-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                        {loading ? 'UPLOADING...' : 'SUBMIT DATA'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
