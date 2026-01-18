import React, { useState } from 'react';
import { BrainCircuit, X, Send } from 'lucide-react';

const AIChatBot = ({ reports }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hello! I am the UrbanPulse AI. How can I help you improve your city today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);

        // AI Logic: Awareness of live data
        setTimeout(() => {
            let aiResponse = "I'm analyzing that. Would you like to see the live map data?";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('status') || lowerInput.includes('reports')) {
                aiResponse = `We currently have ${reports.length} active reports. ${reports.filter(r => r.status === 'pending').length} are still pending action.`;
            } else if (lowerInput.includes('score')) {
                aiResponse = `The community has earned ${reports.length * 150} points so far!`;
            }

            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        }, 600);
        setInput('');
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            {isOpen ? (
                <div className="bg-slate-900 w-80 h-96 rounded-[32px] shadow-2xl border border-indigo-500/30 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
                    <div className="bg-indigo-600 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <BrainCircuit size={20} className="text-white" />
                            <span className="text-white font-bold text-sm">Urban AI Agent</span>
                        </div>
                        <button onClick={() => setIsOpen(false)}><X size={20} className="text-white" /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask AI about the city..."
                            className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                        <button onClick={handleSend} className="bg-indigo-600 p-2 rounded-xl text-white hover:bg-indigo-500">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 p-5 rounded-full shadow-2xl shadow-indigo-500/40 hover:scale-110 transition-all group"
                >
                    <BrainCircuit className="text-white w-8 h-8 group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse"></div>
                </button>
            )}
        </div>
    );
};

export default AIChatBot;
