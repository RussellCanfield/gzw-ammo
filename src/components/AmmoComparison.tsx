import React, { useState, useEffect } from 'react';
import { AmmoType, getAllCalibers, getAmmoByCalibrer, penetrationColorClass, penetrationLevelText } from '../data/ammoData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  // RadarChart,
  // PolarGrid,
  // PolarAngleAxis,
  // PolarRadiusAxis,
  // Radar,
  // LineChart,
  // Line
} from 'recharts';

interface ComparisonData {
  name: string;
  velocity: number;
  dispersion: number;
}

const AmmoComparison: React.FC = () => {
  const [selectedCaliber, setSelectedCaliber] = useState<string>('');
  const [selectedAmmo, setSelectedAmmo] = useState<string[]>([]);
  const [calibers, setCalibers] = useState<string[]>([]);
  const [ammoOptions, setAmmoOptions] = useState<AmmoType[]>([]);
  const [activeTab, setActiveTab] = useState<'charts' | 'penetration' | 'details'>('charts');

  // Initialize with available calibers
  useEffect(() => {
    const allCalibers = getAllCalibers();
    setCalibers(allCalibers);
    if (allCalibers.length > 0) {
      setSelectedCaliber(allCalibers[0]);
    }
  }, []);

  // Update ammo options when caliber changes
  useEffect(() => {
    if (selectedCaliber) {
      const options = getAmmoByCalibrer(selectedCaliber);
      setAmmoOptions(options);
      setSelectedAmmo([]); // Reset selected ammo when caliber changes
    }
  }, [selectedCaliber]);

  const handleCaliberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCaliber(e.target.value);
  };

  const handleAmmoToggle = (id: string) => {
    setSelectedAmmo(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectedAmmoData = ammoOptions.filter(ammo => selectedAmmo.includes(ammo.id));

  const chartData: ComparisonData[] = selectedAmmoData.map(ammo => ({
    name: ammo.name,
    velocity: ammo.velocity,
    dispersion: ammo.dispersion,
  }));

  // Prepare radar chart data
  // const radarData = selectedAmmoData.map(ammo => {
  //   // Normalize dispersion to a positive scale for radar chart
  //   // Convert from range (-50 to 50) to (0 to 100)
  //   const normalizedDispersion = 50 - ammo.dispersion;

  //   return {
  //     name: ammo.name,
  //     // Scale values to be visually comparable
  //     velocity: ammo.velocity / 10, // Scale down velocity
  //     accuracy: normalizedDispersion, // Higher is better
  //     penetration: calculatePenetrationScore(ammo),
  //     price: ammo.price ? Math.min(100, (100 - ammo.price)) : 50, // Invert price (lower is better)
  //   };
  // });

  // Calculate a penetration score based on armor penetration values
  // function calculatePenetrationScore(ammo: AmmoType): number {
  //   const helmValues = Object.values(ammo.helmPenetration);
  //   const bodyValues = Object.values(ammo.bodyPenetration);
  //   const totalValues = [...helmValues, ...bodyValues];
  //   const sum = totalValues.reduce((acc, val) => acc + val, 0);
  //   // Scale to 0-100
  //   return (sum / (totalValues.length * 3)) * 100;
  // }

  const helmArmorLevels: ('I' | 'IIA' | 'IIA+')[] = ['I', 'IIA', 'IIA+'];
  const bodyArmorLevels: ('IIIA' | 'IIIA+' | 'III' | 'III+')[] = ['IIIA', 'IIIA+', 'III', 'III+'];

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
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-primary/50 rounded-lg p-4 shadow-inner">
            <label htmlFor="caliber-select" className="block text-sm font-medium text-muted mb-2">
              Select Caliber
            </label>
            <div className="relative">
              <select
                id="caliber-select"
                className="w-full px-4 py-2.5 bg-secondary text-text border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
                value={selectedCaliber}
                onChange={handleCaliberChange}
              >
                {calibers.map(caliber => (
                  <option key={caliber} value={caliber}>
                    {caliber}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-primary/50 rounded-lg p-4 shadow-inner">
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
                    checked={selectedAmmo.includes(ammo.id)}
                    onChange={() => handleAmmoToggle(ammo.id)}
                  />
                  <label htmlFor={`ammo-${ammo.id}`} className="ml-2 text-sm text-text truncate">
                    {ammo.name}
                  </label>
                </div>
              ))}
            </div>
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
                {/* <div className="bg-primary/30 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Overall Performance Comparison
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#444" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#e5e7eb' }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#e5e7eb' }} />
                        {selectedAmmoData.map((ammo, index) => (
                          <Radar
                            key={ammo.id}
                            name={ammo.name}
                            dataKey="velocity"
                            stroke={getAmmoColor(index)}
                            fill={getAmmoColor(index)}
                            fillOpacity={0.2}
                          />
                        ))}
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div> */}

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
                        {helmArmorLevels.map(level => (
                          <th key={level} className="px-3 py-2 text-center text-xs font-medium text-muted uppercase tracking-wider border-b border-gray-700 border-l border-gray-700">
                            {level}
                          </th>
                        ))}
                        {bodyArmorLevels.map(level => (
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
                          {helmArmorLevels.map(level => (
                            <td key={`${ammo.id}-${level}`} className="px-3 py-3 whitespace-nowrap text-sm text-text text-center border-r border-gray-700">
                              <div className="flex flex-col items-center">
                                <div className={`h-6 w-6 rounded-full ${penetrationColorClass(ammo.helmPenetration[level])} shadow-lg`}></div>
                                <span className="text-xs text-muted mt-1">{penetrationLevelText(ammo.helmPenetration[level])}</span>
                              </div>
                            </td>
                          ))}
                          {bodyArmorLevels.map(level => (
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
                        {[...helmArmorLevels, ...bodyArmorLevels].map((level) => {
                          const penValue = helmArmorLevels.includes(level as any)
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
        ) : (
          <div className="bg-secondary rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-muted text-lg">Select ammunition types to compare</p>
            <p className="text-sm text-muted mt-2">Choose a caliber and select at least one ammunition type</p>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      // Add this to your style section at the bottom of the component
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