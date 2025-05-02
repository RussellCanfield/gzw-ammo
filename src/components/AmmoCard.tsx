import type React from "react";
import { Link } from "react-router-dom";
import {
	type AmmoType,
	type ArmorLevel,
	BODY_ARMOR_LEVELS,
	HELMET_ARMOR_LEVELS,
	type PenetrationValue,
	penetrationColorClass,
} from "../data/ammoData";

interface AmmoCardProps {
	ammo: AmmoType;
	detailed?: boolean;
}

const AmmoCard: React.FC<AmmoCardProps> = ({ ammo, detailed = false }) => {
	// Render helmet penetration grid (3 columns)
	const renderHelmetPenetrationGrid = (
		penetrationData: { [key in ArmorLevel]?: PenetrationValue },
	) => (
		<div className="mb-3">
			<h5 className="text-xs text-muted mb-1 font-semibold">Helmet</h5>
			<div className="grid grid-cols-3 gap-1">
				{HELMET_ARMOR_LEVELS.map((level) => (
					<div key={level} className="text-center">
						<div className="text-[10px] text-muted mb-0.5">{level}</div>
						<div
							className={`h-3 w-full rounded ${penetrationColorClass(penetrationData[level] ?? 0)}`}
						/>
					</div>
				))}
			</div>
		</div>
	);

	// Render body penetration grid (4 columns)
	const renderBodyPenetrationGrid = (
		penetrationData: { [key in ArmorLevel]?: PenetrationValue },
	) => (
		<div className="mb-3">
			<h5 className="text-xs text-muted mb-1 font-semibold">Body</h5>
			<div className="grid grid-cols-4 gap-1">
				{BODY_ARMOR_LEVELS.map((level) => (
					<div key={level} className="text-center">
						<div className="text-[10px] text-muted mb-0.5">{level}</div>
						<div
							className={`h-3 w-full rounded ${penetrationColorClass(penetrationData[level] ?? 0)}`}
						/>
					</div>
				))}
			</div>
		</div>
	);

	const cardContent = (
		<div className="bg-[var(--color-secondary)] rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] h-full flex flex-col bg-[url(https://www.grayzonewarfare.net/data/assets/style_properties/fake-brick.png)] border-black border-[1px] shadow-[var(--card-shadow)]">
			<div className="px-4 py-4 flex-grow">
				<div className="flex justify-between items-center mb-3">
					<h3 className="text-lg font-bold text-text flex items-center">
						<span className="mr-2">{ammo.name}</span>
						<span className="text-xs font-normal text-muted">
							{ammo.caliber}
						</span>
					</h3>
				</div>

				<div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
					<div>
						<span className="text-xs text-muted">Dispersion</span>
						<p
							className={`text-sm ${ammo.dispersion < 0 ? "text-green-500" : ammo.dispersion > 0 ? "text-yellow-500" : "text-text"}`}
						>
							{ammo.dispersion > 0
								? `+${ammo.dispersion}%`
								: `${ammo.dispersion}%`}
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
						<p className="text-sm text-text">
							{ammo.price ? `$${ammo.price}` : "N/A"}
						</p>
					</div>
				</div>

				{/* Penetration Section */}
				<div className="mt-3">
					<h3 className="text-md font-medium text-muted mb-4">Penetration</h3>
					{renderHelmetPenetrationGrid(ammo.helmPenetration)}
					{renderBodyPenetrationGrid(ammo.bodyPenetration)}
				</div>
			</div>
		</div>
	);

	// If detailed view, don't wrap in a link (assuming detailed view might exist later)
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
