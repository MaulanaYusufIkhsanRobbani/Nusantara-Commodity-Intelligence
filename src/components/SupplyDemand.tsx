import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', supply: 4000, demand: 2400 },
  { name: 'Feb', supply: 3000, demand: 1398 },
  { name: 'Mar', supply: 2000, demand: 9800 },
  { name: 'Apr', supply: 2780, demand: 3908 },
  { name: 'May', supply: 1890, demand: 4800 },
  { name: 'Jun', supply: 2390, demand: 3800 },
  { name: 'Jul', supply: 3490, demand: 4300 },
];

export default function SupplyDemand() {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Prakiraan Pasokan & Permintaan</h2>
      <p className="text-sm text-gray-500">Kendala pasokan real-time vs permintaan pasar.</p>
      
      <div className="flex-1 min-h-[300px] bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              cursor={{ fill: '#F3F4F6' }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="supply" name="Pasokan (Ton)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="demand" name="Permintaan (Ton)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
        <h3 className="font-semibold text-amber-800 text-sm mb-2">Peringatan Pasar</h3>
        <p className="text-sm text-amber-700">
          Permintaan diproyeksikan melampaui pasokan pada bulan Maret, berpotensi menaikkan harga spot. Pertimbangkan untuk mengamankan kontrak lebih awal.
        </p>
      </div>
    </div>
  );
}
