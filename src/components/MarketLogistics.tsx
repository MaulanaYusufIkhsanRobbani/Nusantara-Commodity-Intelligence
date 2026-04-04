import { Search, MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react';

const logistics = [
  { id: 1, company: 'Global Freight Solutions', region: 'Amerika Utara', type: 'Laut & Udara', contact: '+1-800-555-0199', email: 'contact@gfs.com' },
  { id: 2, company: 'EuroTrans Logistics', region: 'Eropa', type: 'Kereta & Jalan Raya', contact: '+49-30-123456', email: 'info@eurotrans.eu' },
  { id: 3, company: 'Asia Pacific Cargo', region: 'Asia', type: 'Kargo Laut', contact: '+65-6789-0123', email: 'sales@apcargo.sg' },
];

export default function MarketLogistics() {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Agen Scraper: Pasar & Logistik</h2>
      <p className="text-sm text-gray-500">Alur kerja otomatis untuk menemukan wilayah dengan permintaan tinggi dan kontak logistik lokal.</p>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Cari negara atau wilayah..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex items-start space-x-3">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Globe className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-indigo-900 text-sm">Pasar Potensial Teratas Ditemukan</h3>
          <p className="text-xs text-indigo-700 mt-1">
            <strong>Vietnam</strong> menunjukkan lonjakan permintaan bahan baku sebesar 25%. Kedekatan dengan pelabuhan utama menjadikannya target ideal.
          </p>
          <button className="mt-2 text-xs font-medium text-indigo-600 flex items-center hover:text-indigo-800 transition-colors">
            Lihat Analisis Pasar <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-gray-800 mt-4">Mitra Logistik yang Direkomendasikan</h3>
      <div className="flex-1 overflow-y-auto space-y-3 pb-20">
        {logistics.map((partner) => (
          <div key={partner.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">{partner.company}</h4>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> {partner.region} • {partner.type}
                </div>
              </div>
              <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors">
                Hubungi
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 flex flex-col space-y-2">
              <div className="flex items-center text-xs text-gray-600">
                <Phone className="w-3 h-3 mr-2 text-gray-400" /> {partner.contact}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Mail className="w-3 h-3 mr-2 text-gray-400" /> {partner.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
