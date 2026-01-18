import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, X, Send, BarChart3, MapPin, Trophy } from 'lucide-react';

const AIChatBot = ({ reports }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hello! I am the UrbanPulse AI. I can analyze city data, calculate community scores, or help you find reports. What is on your mind?' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    // Auto-scroll to bottom whenever messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (forcedInput) => {
        const textToSend = forcedInput || input;
        if (!textToSend.trim()) return;

        const userMsg = { role: 'user', text: textToSend };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI Thought Process
        setTimeout(() => {
            let aiResponse = "I'm analyzing the urban grid for that. Would you like a specific data breakdown?";
            const lowerInput = textToSend.toLowerCase();

            if (lowerInput.includes('status') || lowerInput.includes('reports')) {
                const pending = reports.filter(r => r.status?.toLowerCase() === 'pending').length;
                aiResponse = `Analysis Complete: We have ${reports.length} active pulse points. ${pending} issues require urgent attention from city officials.`;
            } else if (lowerInput.includes('score') || lowerInput.includes('points')) {
                const totalPoints = reports.length * 150;
                aiResponse = `Community Impact: Citizens have generated ${totalPoints.toLocaleString()} impact points! This contributes to 12% of this month's urban optimization goal.`;
            } else if (lowerInput.includes('map') || lowerInput.includes('where')) {
                aiResponse = "Geospatial Data: I've highlighted the report clusters on your main dashboard. Most reports are concentrated in the central district.";
            }

            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            {isOpen ? (
                <div className="bg-slate-900 w-80 md:w-96 h-[500px] rounded-[32px] shadow-2xl border border-indigo-500/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-indigo-600 p-5 flex justify-between items-center shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <BrainCircuit size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm leading-none">Urban AI Agent</h3>
                                <span className="text-indigo-200 text-[10px] font-medium uppercase tracking-wider">Systems Online</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                            <X size={20} className="text-white/70" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 scroll-smooth">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${m.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Suggestions */}
                    <div className="px-4 py-2 bg-slate-950 flex gap-2 overflow-x-auto no-scrollbar">
                        <button onClick={() => handleSend("Report Status")} className="flex-shrink-0 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700 transition-colors">
                            <BarChart3 size={12} /> Status
                        </button>
                        <button onClick={() => handleSend("Community Score")} className="flex-shrink-0 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700 transition-colors">
                            <Trophy size={12} /> Scores
                        </button>
                        <button onClick={() => handleSend("Map Insights")} className="flex-shrink-0 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700 transition-colors">
                            <MapPin size={12} /> Map
                        </button>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-slate-900 border-t border-slate-800/50 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about city health..."
                            className="flex-1 bg-slate-800 border-none rounded-2xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                        />
                        <button onClick={() => handleSend()} className="bg-indigo-600 p-3 rounded-2xl text-white hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative bg-indigo-600 p-5 rounded-[24px] shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-90 transition-all group border-2 border-white/10"
                >
                    <BrainCircuit className="text-white w-8 h-8 group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-500 border-2 border-slate-900 text-[10px] font-black text-white items-center justify-center">!</span>
                    </div>
                </button>
            )}
        </div>
    );
};

export default AIChatBot;