import React, { useState, useEffect } from 'react';
import { getAllCalibers, getAmmoByCalibrer, AmmoType } from '../data/ammoData';
import AmmoCard from '../components/AmmoCard';

const Ammunition: React.FC = () => {
  const [calibers, setCalibers] = useState<string[]>([]);
  const [selectedCaliber, setSelectedCaliber] = useState<string>('');
  const [ammoList, setAmmoList] = useState<AmmoType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    const allCalibers = getAllCalibers();
    setCalibers(allCalibers);
    if (allCalibers.length > 0) {
      setSelectedCaliber(allCalibers[0]);
    }
  }, []);
  
  useEffect(() => {
    if (selectedCaliber) {
      let ammoOptions = getAmmoByCalibrer(selectedCaliber);
      
      // Apply search filter if query exists
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        ammoOptions = ammoOptions.filter(ammo => 
          ammo.name.toLowerCase().includes(query) || 
          ammo.traderUnlock.toLowerCase().includes(query)
        );
      }
      
      // Apply sorting
      ammoOptions = [...ammoOptions].sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
          case 'name':
            valueA = a.name;
            valueB = b.name;
            break;
          case 'velocity':
            valueA = a.velocity;
            valueB = b.velocity;
            break;
          case 'dispersion':
            valueA = a.dispersion;
            valueB = b.dispersion;
            break;
          case 'price':
            valueA = a.price || 0;
            valueB = b.price || 0;
            break;
          default:
            valueA = a.name;
            valueB = b.name;
        }
        
        if (sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      setAmmoList(ammoOptions);
    }
  }, [selectedCaliber, searchQuery, sortBy, sortDirection]);
  
  const handleCaliberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCaliber(e.target.value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Ammunition Database</h1>
        <p className="text-muted">
          Browse all ammunition types available in Gray Zone Warfare
        </p>
      </div>
      
      <div className="bg-secondary rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="caliber-select" className="block text-sm font-medium text-muted mb-1">
              Caliber
            </label>
            <select
              id="caliber-select"
              className="w-full px-3 py-2 bg-primary border border-gray-700 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-accent"
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
            <label htmlFor="ammo-search" className="block text-sm font-medium text-muted mb-1">
              Search
            </label>
            <input
              id="ammo-search"
              type="text"
              className="w-full px-3 py-2 bg-primary border border-gray-700 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Search by name or trader..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-muted mb-1">
              Sort By
            </label>
            <div className="flex">
              <select
                id="sort-by"
                className="flex-grow px-3 py-2 bg-primary border border-gray-700 rounded-l-md text-text focus:outline-none focus:ring-2 focus:ring-accent"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="name">Name</option>
                <option value="velocity">Velocity</option>
                <option value="dispersion">Dispersion</option>
                <option value="price">Price</option>
              </select>
              <button
                onClick={toggleSortDirection}
                className="px-3 py-2 bg-primary border border-l-0 border-gray-700 rounded-r-md text-text"
              >
                {sortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ammoList.length > 0 ? (
          ammoList.map(ammo => (
            <AmmoCard key={ammo.id} ammo={ammo} />
          ))
        ) : (
          <div className="col-span-full bg-secondary rounded-lg p-8 text-center">
            <p className="text-lg text-muted">No ammunition types found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ammunition;