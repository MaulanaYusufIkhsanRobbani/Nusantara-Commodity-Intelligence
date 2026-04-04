import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', price: 4000, forecast: 4000 },
  { name: 'Feb', price: 3000, forecast: 3000 },
  { name: 'Mar', price: 2000, forecast: 2000 },
  { name: 'Apr', price: 2780, forecast: 2780 },
  { name: 'May', price: 1890, forecast: 1890 },
  { name: 'Jun', price: 2390, forecast: 2390 },
  { name: 'Jul', price: 3490, forecast: 3490 },
  { name: 'Aug', forecast: 3800 },
  { name: 'Sep', forecast: 4100 },
  { name: 'Oct', forecast: 4300 },
  { name: 'Nov', forecast: 4000 },
  { name: 'Dec', forecast: 4500 },
];

export default function PricingAnalytics() {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Analitik Harga Real-time</h2>
      <p className="text-sm text-gray-500">Data historis dan prakiraan harga komoditas berbasis AI.</p>
      
      <div className="flex-1 min-h-[300px] bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="price" name="Harga Aktual ($)" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="forecast" name="Prakiraan AI ($)" stroke="#10B981" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <h3 className="font-semibold text-blue-800 text-sm mb-2">Wawasan Agen AI</h3>
        <ul className="text-sm text-blue-700 space-y-2 list-disc pl-4">
          <li>Harga diperkirakan naik 15% pada Q4 karena permintaan musiman.</li>
          <li>Pola cuaca baru-baru ini di wilayah produsen utama menunjukkan sedikit kendala pasokan.</li>
        </ul>
      </div>
    </div>
  );
}
