import React from 'react';
import AmmoComparison from '../components/AmmoComparison';

const Compare: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Compare Ammunition</h1>
        <p className="text-muted">
          Select ammunition types to compare their performance and penetration capabilities
        </p>
      </div>
      
      <AmmoComparison />
      
      <div className="mt-10 bg-secondary rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Understanding Ammunition Stats</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-text mb-2">Penetration Values</h3>
            <p className="text-muted mb-3">
              The penetration value indicates how well an ammunition type can penetrate different armor classes:
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded bg-red-600"></div>
                <span className="ml-2 text-text">No penetration</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded bg-yellow-500"></div>
                <span className="ml-2 text-text">Low penetration</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded bg-green-500"></div>
                <span className="ml-2 text-text">Medium penetration</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded bg-blue-600"></div>
                <span className="ml-2 text-text">High penetration</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-text mb-2">Key Stats Explained</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-muted">Dispersion</dt>
                <dd className="text-text ml-2">
                  Lower is better. Negative values mean improved accuracy while positive values indicate reduced accuracy.
                </dd>
              </div>
              <div>
                <dt className="text-muted">Velocity</dt>
                <dd className="text-text ml-2">
                  Higher values mean faster bullets, resulting in less bullet drop and travel time.
                </dd>
              </div>
              <div>
                <dt className="text-muted">Armor Classes</dt>
                <dd className="text-text ml-2">
                  IIA, IIA+, IIIA, IIIA+ for helmets; III, III+ for body armor. Higher class means better protection.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium text-text mb-2">Choosing the Right Ammunition</h3>
          <p className="text-muted">
            When selecting ammunition, consider these factors:
          </p>
          <ul className="list-disc pl-5 mt-2 text-muted space-y-1">
            <li>Match the ammunition to your expected enemy's armor level</li>
            <li>Balance between penetration power and damage output</li>
            <li>Consider availability and cost when planning loadouts</li>
            <li>Tracer rounds are visible to all players, potentially revealing your position</li>
            <li>Low dispersion ammunition is critical for long-range engagements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Compare;