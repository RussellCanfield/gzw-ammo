import React, { useState, useEffect } from 'react';
import { AmmoType, getAllCalibers, getAmmoByCalibrer, penetrationColorClass } from '../data/ammoData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
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

  const helmArmorLevels: ('IIA' | 'IIA+' | 'IIIA' | 'IIIA+')[] = ['IIA', 'IIA+', 'IIIA', 'IIIA+'];
  const bodyArmorLevels: ('III' | 'III+')[] = ['III', 'III+'];
  
  return (
    <div className="bg-primary rounded-lg p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Ammunition Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="caliber-select" className="block text-sm font-medium text-muted mb-1">
              Select Caliber
            </label>
            <select
              id="caliber-select"
              className="w-full px-3 py-2 bg-secondary text-text border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={selectedCaliber}
              onChange={handleCaliberChange}
            >
              {calibers.map(caliber => (
                <option key={caliber} value={caliber}>
                  {caliber}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted mb-1">
              Select Ammunition Types to Compare
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ammoOptions.map(ammo => (
                <div key={ammo.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`ammo-${ammo.id}`}
                    className="h-4 w-4 rounded border-gray-700 text-accent focus:ring-accent"
                    checked={selectedAmmo.includes(ammo.id)}
                    onChange={() => handleAmmoToggle(ammo.id)}
                  />
                  <label htmlFor={`ammo-${ammo.id}`} className="ml-2 text-sm text-text">
                    {ammo.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {selectedAmmoData.length > 0 ? (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Performance Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" tick={{ fill: '#e5e7eb' }} />
                  <YAxis tick={{ fill: '#e5e7eb' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#272729', borderColor: '#444', color: '#e5e7eb' }}
                    labelStyle={{ color: '#e5e7eb' }}
                  />
                  <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                  <Bar dataKey="velocity" name="Velocity (m/s)" fill="#3b82f6" />
                  <Bar dataKey="dispersion" name="Dispersion (%)" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Penetration Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-muted uppercase tracking-wider">
                      Ammo Type
                    </th>
                    {helmArmorLevels.map(level => (
                      <th key={level} className="px-3 py-2 text-center text-xs font-medium text-muted uppercase tracking-wider">
                        {level}
                      </th>
                    ))}
                    {bodyArmorLevels.map(level => (
                      <th key={level} className="px-3 py-2 text-center text-xs font-medium text-muted uppercase tracking-wider">
                        {level}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {selectedAmmoData.map(ammo => (
                    <tr key={ammo.id}>
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-text">
                        {ammo.name}
                      </td>
                      {helmArmorLevels.map(level => (
                        <td key={`${ammo.id}-${level}`} className="px-3 py-3 whitespace-nowrap text-sm text-text text-center">
                          <div className={`mx-auto h-4 w-4 rounded-full ${penetrationColorClass(ammo.helmPenetration[level])}`}></div>
                        </td>
                      ))}
                      {bodyArmorLevels.map(level => (
                        <td key={`${ammo.id}-${level}`} className="px-3 py-3 whitespace-nowrap text-sm text-text text-center">
                          <div className={`mx-auto h-4 w-4 rounded-full ${penetrationColorClass(ammo.bodyPenetration[level])}`}></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedAmmoData.map(ammo => (
              <div key={ammo.id} className="bg-secondary rounded-lg p-4">
                <h4 className="font-medium text-lg mb-2">{ammo.name}</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-muted">Velocity:</span> {ammo.velocity} m/s
                  </div>
                  <div>
                    <span className="text-muted">Dispersion:</span> {ammo.dispersion}%
                  </div>
                  <div>
                    <span className="text-muted">Trader:</span> {ammo.traderUnlock}
                  </div>
                  <div>
                    <span className="text-muted">Price:</span> {ammo.price ? `$${ammo.price}` : 'N/A'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-secondary rounded-lg p-6 text-center">
          <p className="text-muted">Select ammunition types to compare</p>
        </div>
      )}
    </div>
  );
};

export default AmmoComparison;