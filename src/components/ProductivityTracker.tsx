import { useState } from 'react';
import { Trophy, TrendingUp, DollarSign, Activity, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'W1', score: 65 },
  { name: 'W2', score: 70 },
  { name: 'W3', score: 68 },
  { name: 'W4', score: 75 },
  { name: 'W5', score: 82 },
  { name: 'W6', score: 88 },
];

export default function ProductivityTracker() {
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [credit, setCredit] = useState('');
  const [score, setScore] = useState(88);

  const calculateScore = () => {
    const inc = parseFloat(income) || 0;
    const exp = parseFloat(expense) || 0;
    const cred = parseFloat(credit) || 0;
    
    // Dummy calculation for credit scoring
    let newScore = 50 + (inc - exp) / 100 - (cred / 50);
    newScore = Math.max(0, Math.min(100, newScore));
    setScore(Math.round(newScore));
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4 overflow-y-auto pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Produktivitas & Kredit</h2>
          <p className="text-sm text-gray-500">Pelacakan gamifikasi untuk penilaian kredit yang lebih baik.</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center shadow-sm border border-yellow-200">
          <Trophy className="w-4 h-4 mr-1 text-yellow-600" />
          <span className="font-bold">Tingkat Emas</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Skor Kredit Saat Ini</p>
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold tracking-tight">{score}</span>
              <span className="text-indigo-200 ml-1 text-sm">/100</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Star className="w-8 h-8 text-yellow-300 fill-current" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
          <span className="text-indigo-100 flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> +5 poin bulan ini</span>
          <span className="text-indigo-100 font-medium">15% Teratas</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <Activity className="w-4 h-4 mr-2 text-indigo-500" /> Perbarui Keuangan
        </h3>
        <div className="space-y-3">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="number" 
              placeholder="Pendapatan Bulanan" 
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="number" 
              placeholder="Pengeluaran Bulanan" 
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="number" 
              placeholder="Kredit/Hutang Saat Ini" 
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <button 
            onClick={calculateScore}
            className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium text-sm hover:bg-indigo-100 transition-colors"
          >
            Hitung & Perbarui Skor
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[200px] bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm">Riwayat Performa</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData} margin={{ top: 5, right: 0, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
            <Area type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
