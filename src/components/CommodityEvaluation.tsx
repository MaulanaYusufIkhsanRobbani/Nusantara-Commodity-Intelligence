import { useState, useRef, ChangeEvent } from 'react';
import { Camera, Image as ImageIcon, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function CommodityEvaluation() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Reset result when new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const evaluateCommodity = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      // Extract base64 data
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: 'You are a commodity evaluation expert. Analyze this image of a commodity (e.g., coffee beans, spices, textiles). Determine its quality level (standard, high, premium) based on visual cues. Provide a brief description of its characteristics and an estimated market value range per kg/ton. Please provide the evaluation in Indonesian.',
            },
          ],
        },
      });

      setResult(response.text || 'Evaluasi gagal. Silakan coba lagi.');
    } catch (error) {
      console.error(error);
      setResult('Terjadi kesalahan saat menghubungi model visi. Pastikan kunci API Anda valid dan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4 overflow-y-auto pb-24">
      <h2 className="text-xl font-bold text-gray-800">Evaluasi Komoditas</h2>
      <p className="text-sm text-gray-500">Unggah gambar komoditas Anda untuk penilaian kualitas dan valuasi berbasis AI.</p>
      
      <div 
        className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        {image ? (
          <img src={image} alt="Commodity" className="w-full h-full object-cover" />
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-600">Ketuk untuk mengunggah gambar</span>
            <span className="text-xs text-gray-400 mt-1">JPG, PNG hingga 5MB</span>
          </>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ImageIcon className="w-4 h-4 mr-2 text-gray-500" /> Galeri
        </button>
        <button 
          className="flex-1 flex items-center justify-center py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Camera className="w-4 h-4 mr-2 text-gray-500" /> Kamera
        </button>
      </div>

      <button 
        onClick={evaluateCommodity}
        disabled={!image || loading}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Mengevaluasi...</>
        ) : (
          'Evaluasi Komoditas'
        )}
      </button>

      {result && (
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mt-4">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="font-semibold text-gray-800">Hasil Evaluasi</h3>
          </div>
          <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
      
      {!result && !loading && image && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start mt-4">
          <AlertCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            Model visi kami akan menganalisis tekstur, warna, dan konsistensi komoditas untuk memperkirakan kelas dan nilai pasar saat ini.
          </p>
        </div>
      )}
    </div>
  );
}
