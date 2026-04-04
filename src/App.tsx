/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LineChart, Map, Truck, Bot, Award } from 'lucide-react';
import PricingAnalytics from './components/PricingAnalytics';
import SupplyDemand from './components/SupplyDemand';
import CommodityMap from './components/CommodityMap';
import MarketLogistics from './components/MarketLogistics';
import RegulationExplainer from './components/RegulationExplainer';
import CommodityEvaluation from './components/CommodityEvaluation';
import ProductivityTracker from './components/ProductivityTracker';
import { cn } from './utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [aiSubTab, setAiSubTab] = useState('explainer');

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <div className="flex flex-col h-full overflow-y-auto pb-24 space-y-4 bg-gray-50">
            <PricingAnalytics />
            <div className="px-4"><hr className="border-gray-200" /></div>
            <SupplyDemand />
          </div>
        );
      case 'map':
        return <CommodityMap />;
      case 'logistics':
        return <MarketLogistics />;
      case 'ai':
        return (
          <div className="flex flex-col h-full bg-gray-50">
            <div className="flex p-2 bg-white border-b border-gray-100 shadow-sm z-10">
              <button 
                onClick={() => setAiSubTab('explainer')}
                className={cn("flex-1 py-2 text-sm font-medium rounded-lg transition-colors", aiSubTab === 'explainer' ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-50")}
              >
                Penjelasan Regulasi
              </button>
              <button 
                onClick={() => setAiSubTab('evaluation')}
                className={cn("flex-1 py-2 text-sm font-medium rounded-lg transition-colors ml-2", aiSubTab === 'evaluation' ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-50")}
              >
                Evaluasi Komoditas
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {aiSubTab === 'explainer' ? <RegulationExplainer /> : <CommodityEvaluation />}
            </div>
          </div>
        );
      case 'score':
        return <ProductivityTracker />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'analytics', icon: LineChart, label: 'Analitik' },
    { id: 'map', icon: Map, label: 'Peta' },
    { id: 'logistics', icon: Truck, label: 'Logistik' },
    { id: 'ai', icon: Bot, label: 'Agen AI' },
    { id: 'score', icon: Award, label: 'Skor' },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 sm:p-4">
      <div className="w-full max-w-md h-[100dvh] sm:h-[850px] bg-white sm:rounded-[2.5rem] sm:shadow-2xl sm:border-[8px] border-gray-900 overflow-hidden relative flex flex-col">
        
        {/* Status Bar Mockup */}
        <div className="h-7 w-full bg-white flex justify-between items-center px-6 text-[10px] font-medium text-gray-800 z-50">
          <span>9:41</span>
          <div className="flex space-x-1.5 items-center">
            <div className="w-3 h-3 rounded-full border border-gray-800 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div></div>
            <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-50 relative">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex justify-around items-center px-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center w-16 h-full space-y-1"
              >
                <div className={cn("p-1.5 rounded-xl transition-all duration-300", isActive ? "bg-indigo-100 text-indigo-600 scale-110" : "text-gray-400 hover:text-gray-600")}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn("text-[10px] font-medium transition-colors duration-300", isActive ? "text-indigo-600" : "text-gray-400")}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
