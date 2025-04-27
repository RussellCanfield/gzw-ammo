import React from 'react';
import { Link } from 'react-router-dom';
import { AmmoType, penetrationColorClass } from '../data/ammoData';

interface AmmoCardProps {
  ammo: AmmoType;
  detailed?: boolean;
}

const AmmoCard: React.FC<AmmoCardProps> = ({ ammo, detailed = false }) => {
  const helmArmorLevels: ('IIA' | 'IIA+' | 'IIIA' | 'IIIA+')[] = ['IIA', 'IIA+', 'IIIA', 'IIIA+'];
  const bodyArmorLevels: ('III' | 'III+')[] = ['III', 'III+'];

  const cardContent = (
    <div className="bg-gray-800/40 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] h-full flex flex-col">
      <div className="px-4 py-4 flex-grow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-text flex items-center">
            <span className="mr-2">{ammo.name}</span>
            <span className="text-xs font-normal text-muted">{ammo.caliber}</span>
          </h3>
          {/* Removed the explicit Details link */}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
          <div>
            <span className="text-xs text-muted">Dispersion</span>
            <p className={`text-sm ${ammo.dispersion < 0 ? 'text-green-500' : ammo.dispersion > 0 ? 'text-yellow-500' : 'text-text'}`}>
              {ammo.dispersion > 0 ? `+${ammo.dispersion}%` : `${ammo.dispersion}%`}
            </p>
          </div>
          <div>
            <span className="text-xs text-muted">Velocity</span>
            <p className="text-sm text-text">{ammo.velocity} m/s</p>
          </div>
          <div>
            <span className="text-xs text-muted">Trader</span>
            <p className="text-sm text-text">{ammo.traderUnlock}</p>
          </div>
          <div>
            <span className="text-xs text-muted">Price</span>
            <p className="text-sm text-text">{ammo.price ? `$${ammo.price}` : 'N/A'}</p>
          </div>
        </div>

        {detailed && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-muted mb-2">Penetration Values</h4>

            <div className="mb-3">
              <h5 className="text-xs text-muted mb-1">Helmet Armor</h5>
              <div className="grid grid-cols-4 gap-1">
                {helmArmorLevels.map((level) => (
                  <div key={level} className="text-center">
                    <div className="text-xs text-muted mb-1">{level}</div>
                    <div className={`h-4 w-full rounded ${penetrationColorClass(ammo.helmPenetration[level])}`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs text-muted mb-1">Body Armor</h5>
              <div className="grid grid-cols-2 gap-1">
                {bodyArmorLevels.map((level) => (
                  <div key={level} className="text-center">
                    <div className="text-xs text-muted mb-1">{level}</div>
                    <div className={`h-4 w-full rounded ${penetrationColorClass(ammo.bodyPenetration[level])}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!detailed && (
          <div className="mt-3">
            <h4 className="text-xs text-muted mb-1">Penetration</h4>
            <div className="grid grid-cols-6 gap-1">
              {helmArmorLevels.map((level) => (
                <div key={level} className="text-center">
                  <div className="text-xs text-muted mb-1">{level}</div>
                  <div className={`h-3 w-full rounded ${penetrationColorClass(ammo.helmPenetration[level])}`}></div>
                </div>
              ))}
              {bodyArmorLevels.map((level) => (
                <div key={level} className="text-center">
                  <div className="text-xs text-muted mb-1">{level}</div>
                  <div className={`h-3 w-full rounded ${penetrationColorClass(ammo.bodyPenetration[level])}`}></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // If detailed view, don't wrap in a link
  if (detailed) {
    return cardContent;
  }

  // Wrap the entire card content in a Link for non-detailed view
  return (
    <Link to={`/ammunition/${ammo.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
};

export default AmmoCard;
