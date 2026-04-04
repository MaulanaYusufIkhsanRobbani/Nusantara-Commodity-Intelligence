import { useState } from 'react';
import { Send, Bot, User, FileText, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function RegulationExplainer() {
  const [messages, setMessages] = useState([
    { role: 'agent', text: 'Halo! Saya adalah Spesialis Bisnis Ekspor AI Anda. Regulasi ekspor/impor negara mana yang ingin Anda ketahui hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Initialize Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an AI Export Business Specialist. The user is asking about export/import regulations. Summarize the regulations for the requested country or topic concisely, focusing on key tariffs, required documents, and restricted items. Please answer in Indonesian. User query: ${userMsg}`,
      });

      setMessages(prev => [...prev, { role: 'agent', text: response.text || 'Maaf, saya tidak dapat mengambil informasi tersebut.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'agent', text: 'Terjadi kesalahan saat menghubungi agen AI. Silakan periksa kunci API Anda atau coba lagi nanti.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-100 shadow-sm z-10">
        <h2 className="text-xl font-bold text-gray-800">Penjelasan Regulasi</h2>
        <p className="text-sm text-gray-500">Agen AI Spesialis Bisnis Ekspor</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center shadow-sm">
            <FileText className="w-3 h-3 mr-1" /> Scraper & OCR Aktif
          </div>
        </div>
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-500 ml-2' : 'bg-indigo-600 mr-2'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={`p-3 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex flex-row max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-indigo-600 mr-2 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm flex items-center">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600 mr-2" />
                <span className="text-sm text-gray-500">Menganalisis dokumen...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanya regulasi (misal: pajak impor Jepang)" 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
