import { MapPin, TrendingUp, DollarSign } from 'lucide-react';

const countries = [
  { id: 1, name: 'Amerika Serikat', demand: 'Tinggi', price: '$4,200/ton', trend: '+5%', color: 'bg-red-100 text-red-700' },
  { id: 2, name: 'Tiongkok', demand: 'Sangat Tinggi', price: '$4,500/ton', trend: '+8%', color: 'bg-orange-100 text-orange-700' },
  { id: 3, name: 'Jerman', demand: 'Sedang', price: '$3,900/ton', trend: '-2%', color: 'bg-yellow-100 text-yellow-700' },
  { id: 4, name: 'Jepang', demand: 'Tinggi', price: '$4,100/ton', trend: '+3%', color: 'bg-blue-100 text-blue-700' },
  { id: 5, name: 'India', demand: 'Sedang', price: '$3,800/ton', trend: '+1%', color: 'bg-green-100 text-green-700' },
];

export default function CommodityMap() {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Peta Komoditas Global</h2>
      <p className="text-sm text-gray-500">Lihat permintaan dan harga di berbagai negara.</p>
      
      <div className="relative w-full h-48 bg-blue-50 rounded-xl overflow-hidden border border-blue-100 flex items-center justify-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png" alt="World Map" className="absolute inset-0 w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-blue-900/10"></div>
        <MapPin className="w-10 h-10 text-blue-600 z-10 drop-shadow-md" />
        <span className="z-10 ml-2 font-bold text-blue-800 drop-shadow-md bg-white/80 px-3 py-1.5 rounded-lg">Tampilan Peta Interaktif</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-20">
        {countries.map((country) => (
          <div key={country.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{country.name}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                <span className="flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Permintaan: {country.demand}</span>
                <span className="flex items-center"><DollarSign className="w-3 h-3 mr-1" /> {country.price}</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${country.color}`}>
              {country.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
