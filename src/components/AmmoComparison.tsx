import React, { useState, useEffect } from 'react';
import { AmmoType, getAmmoByCalibrer, penetrationColorClass, penetrationLevelText, HELMET_ARMOR_LEVELS, BODY_ARMOR_LEVELS } from '../data/ammoData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ComparisonData {
  name: string;
  velocity: number;
  dispersion: number;
}

interface AmmoComparisonProps {
  caliber: string;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const AmmoComparison: React.FC<AmmoComparisonProps> = ({ caliber, selectedTypes, setSelectedTypes }) => {
  const [ammoOptions, setAmmoOptions] = useState<AmmoType[]>([]);
  const [activeTab, setActiveTab] = useState<'charts' | 'penetration' | 'details'>('charts');

  // Update ammo options when caliber changes
  useEffect(() => {
    if (caliber) {
      const options = getAmmoByCalibrer(caliber);
      setAmmoOptions(options);
    }
  }, [caliber]);

  const handleAmmoToggle = (id: string) => {
    setSelectedTypes(
      selectedTypes.includes(id)
        ? selectedTypes.filter(item => item !== id)
        : [...selectedTypes, id]
    );
  };

  const selectedAmmoData = ammoOptions.filter(ammo => selectedTypes.includes(ammo.id));

  const chartData: ComparisonData[] = selectedAmmoData.map(ammo => ({
    name: ammo.name,
    velocity: ammo.velocity,
    dispersion: ammo.dispersion,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary border border-gray-700 rounded-md shadow-xl p-4" style={{ backgroundColor: 'rgb(32, 32, 35)', opacity: 1 }}>
          <p className="font-medium text-text text-base">{label}</p>
          <div className="mt-2 space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center">
                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <p className="text-sm text-text">
                  <span className="font-medium">{entry.name}:</span>{' '}
                  <span className="text-text">{entry.value.toLocaleString()}</span>
                  {entry.unit && <span className="text-muted ml-1">{entry.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Generate a unique color for each ammo type
  const getAmmoColor = (index: number) => {
    const colors = [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // green
      '#f59e0b', // amber
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
      '#f97316', // orange
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="overflow-hidden">
      <div className="p-2 sm:p-4">
        <div className="bg-primary/50 rounded-lg p-4 shadow-inner mb-6">
          <label className="block text-sm font-medium text-muted mb-2">
            Select Ammunition Types to Compare
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {ammoOptions.map(ammo => (
              <div key={ammo.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`ammo-${ammo.id}`}
                  className="h-4 w-4 rounded border-gray-700 text-accent focus:ring-accent"
                  checked={selectedTypes.includes(ammo.id)}
                  onChange={() => handleAmmoToggle(ammo.id)}
                />
                <label htmlFor={`ammo-${ammo.id}`} className="ml-2 text-sm text-text truncate">
                  {ammo.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {selectedAmmoData.length > 0 ? (
          <>
            <div className="mb-6">
              <div className="flex border-b border-gray-700">
                <button
                  className={`px-4 py-2 font-medium text-sm focus:outline-none ${activeTab === 'charts'
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-muted hover:text-text'
                    }`}
                  onClick={() => setActiveTab('charts')}
                >
                  Performance Charts
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm focus:outline-none ${activeTab === 'penetration'
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-muted hover:text-text'
                    }`}
                  onClick={() => setActiveTab('penetration')}
                >
                  Penetration Data
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm focus:outline-none ${activeTab === 'details'
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-muted hover:text-text'
                    }`}
                  onClick={() => setActiveTab('details')}
                >
                  Ammo Details
                </button>
              </div>
            </div>

            {activeTab === 'charts' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary/30 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      Velocity Comparison (m/s)
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="name" tick={{ fill: '#e5e7eb' }} />
                          <YAxis tick={{ fill: '#e5e7eb' }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                          <Bar dataKey="velocity" name="Velocity (m/s)" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-primary/30 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                      Dispersion Comparison (%)
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="name" tick={{ fill: '#e5e7eb' }} />
                          <YAxis tick={{ fill: '#e5e7eb' }} domain={[-50, 50]} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                          <Bar dataKey="dispersion" name="Dispersion (%)" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'penetration' && (
              <div className="bg-primary/30 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  Penetration Comparison
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700 border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider border-b border-gray-700">
                          Ammo Type
                        </th>
                        <th colSpan={3} className="px-4 py-2 text-center text-xs font-medium text-muted uppercase tracking-wider border-b border-gray-700 border-l border-gray-700">
                          Helmet Armor
                        </th>
                        <th colSpan={4} className="px-4 py-2 text-center text-xs font-medium text-muted uppercase tracking-wider border-b border-gray-700 border-l border-gray-700">
                          Body Armor
                        </th>
                      </tr>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted uppercase tracking-wider border-b border-gray-700">

                        </th>
                        {HELMET_ARMOR_LEVELS.map(level => (
                          <th key={level} className="px-3 py-2 text-center text-xs font-medium text-muted uppercase tracking-wider border-b border-gray-700 border-l border-gray-700">
                            {level}
                          </th>
                        ))}
                        {BODY_ARMOR_LEVELS.map(level => (
                          <th key={level} className="px-3 py-2 text-center text-xs font-medium text-muted uppercase tracking-wider border-b border-gray-700 border-l border-gray-700">
                            {level}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-primary/30 divide-y divide-gray-700">
                      {selectedAmmoData.map(ammo => (
                        <tr key={ammo.id} className="hover:bg-secondary/50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-text border-r border-gray-700">
                            {ammo.name}
                          </td>
                          {HELMET_ARMOR_LEVELS.map(level => (
                            <td key={`${ammo.id}-${level}`} className="px-3 py-3 whitespace-nowrap text-sm text-text text-center border-r border-gray-700">
                              <div className="flex flex-col items-center">
                                <div className={`h-6 w-6 rounded-full ${penetrationColorClass(ammo.helmPenetration[level])} shadow-lg`}></div>
                                <span className="text-xs text-muted mt-1">{penetrationLevelText(ammo.helmPenetration[level])}</span>
                              </div>
                            </td>
                          ))}
                          {BODY_ARMOR_LEVELS.map(level => (
                            <td key={`${ammo.id}-${level}`} className="px-3 py-3 whitespace-nowrap text-sm text-text text-center border-r border-gray-700">
                              <div className="flex flex-col items-center">
                                <div className={`h-6 w-6 rounded-full ${penetrationColorClass(ammo.bodyPenetration[level])} shadow-lg`}></div>
                                <span className="text-xs text-muted mt-1">{penetrationLevelText(ammo.bodyPenetration[level])}</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedAmmoData.map((ammo, index) => (
                  <div
                    key={ammo.id}
                    className="bg-primary/30 rounded-lg p-4 border-l-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
                    style={{ borderLeftColor: getAmmoColor(index) }}
                  >
                    <h4 className="font-medium text-lg mb-3 flex items-center">
                      <span className="mr-2">{ammo.name}</span>
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded text-muted">{ammo.caliber}</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <span className="text-muted mr-1">Velocity:</span>
                        <span className="text-text font-medium">{ammo.velocity} m/s</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                        <span className="text-muted mr-1">Dispersion:</span>
                        <span className={`font-medium ${ammo.dispersion <= 0 ? 'text-green-500' : 'text-yellow-500'}`}>
                          {ammo.dispersion}%
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span className="text-muted mr-1">Trader:</span>
                        <span className="text-text">{ammo.traderUnlock}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span className="text-muted mr-1">Price:</span>
                        <span className="text-text">{ammo.price ? `$${ammo.price}` : 'N/A'}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <div className="text-xs text-muted mb-1">Penetration Effectiveness</div>
                      <div className="flex space-x-1">
                        {[...HELMET_ARMOR_LEVELS, ...BODY_ARMOR_LEVELS].map((level) => {
                          const penValue = HELMET_ARMOR_LEVELS.includes(level as any)
                            ? ammo.helmPenetration[level as 'I' | 'IIA' | 'IIA+']
                            : ammo.bodyPenetration[level as 'IIIA' | 'IIIA+' | 'III' | 'III+'];

                          return (
                            <div key={`${ammo.id}-${level}`} className="flex-1">
                              <div className="flex flex-col items-center">
                                <div className={`h-2 w-full ${penetrationColorClass(penValue)}`}></div>
                                <span className="text-xs mt-1">{level}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(31, 41, 55, 0.5);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(75, 85, 99, 0.8);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(107, 114, 128, 0.8);
  }
  
  /* Remove the default recharts tooltip background */
  .recharts-tooltip-wrapper .recharts-default-tooltip {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }
  
  /* Ensure the tooltip cursor doesn't show the default background */
  .recharts-tooltip-cursor {
    fill: rgba(0, 0, 0, 0.1) !important;
  }
`}</style>

    </div>
  );
};

export default AmmoComparison;
