import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import helmetIcon from "../assets/helmet.webp";
import plateIcon from "../assets/plate.webp";
import {
	type AmmoType,
	type ArmorLevel,
	BODY_ARMOR_LEVELS,
	HELMET_ARMOR_LEVELS,
	type PenetrationValue,
	getAmmoByCalibrer,
	getAmmoById,
	penetrationColorClass,
} from "../data/ammoData";

const AmmoDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [ammo, setAmmo] = useState<AmmoType | null>(null);
	const [similarAmmo, setSimilarAmmo] = useState<AmmoType[]>([]);
	const [effectivenessScores, setEffectivenessScores] = useState({
		unArmoredScore: 0,
		lightArmorScore: 0,
		heavyArmorScore: 0,
	});

	useEffect(() => {
		if (id) {
			const ammoData = getAmmoById(id);
			if (ammoData) {
				setAmmo(ammoData);
				const similar = getAmmoByCalibrer(ammoData.caliber)
					.filter((a) => a.id !== id)
					.slice(0, 3);
				setSimilarAmmo(similar);
				const scores = calculateScores(ammoData);
				setEffectivenessScores(scores);
			} else {
				navigate("/ammunition");
			}
		}
	}, [id, navigate]);

	const calculateScores = (ammoData: AmmoType) => {
		const caliberAmmo = getAmmoByCalibrer(ammoData.caliber);
		const velocities = caliberAmmo.map((a) => a.velocity).filter((v) => v > 0);
		const maxVelocity = velocities.length > 0 ? Math.max(...velocities) : 1;

		const velocityFactor =
			maxVelocity > 0 ? ammoData.velocity / maxVelocity : 0;

		// Base unarmored score - Check if Helmet IIA or Body IIIA penetration is high (value of 3)
		let unArmoredScore: number;
		if (
			ammoData.helmPenetration.IIA === 3 ||
			ammoData.bodyPenetration.IIIA === 3
		) {
			unArmoredScore = 100; // 100% effective against unarmored if high penetration on base armor levels
		} else {
			unArmoredScore = Math.round(velocityFactor * 100);
		}

		// Calculate penetration factors (0 to 1)
		const lightArmorPen =
			ammoData.helmPenetration.IIA +
			ammoData.helmPenetration.IIIA +
			ammoData.helmPenetration["IIIA+"];
		const maxLightArmorPen = 9; // 3 levels * 3 max pen value
		const penetrationFactorLight = lightArmorPen / maxLightArmorPen;

		const heavyArmorPen =
			ammoData.bodyPenetration.IIIA +
			ammoData.bodyPenetration["IIIA+"] +
			ammoData.bodyPenetration.III +
			ammoData.bodyPenetration["III+"];
		const maxHeavyArmorPen = 12; // 4 levels * 3 max pen value
		const penetrationFactorHeavy = heavyArmorPen / maxHeavyArmorPen;

		// Armored scores are the unarmored score modified by the penetration factor.
		const lightArmorScore = Math.round(unArmoredScore * penetrationFactorLight);
		const heavyArmorScore = Math.round(unArmoredScore * penetrationFactorHeavy);

		return { unArmoredScore, lightArmorScore, heavyArmorScore };
	};

	const getAmmoProfile = (ammoData: AmmoType) => {
		const scores = [
			{ type: "unarmored targets", score: effectivenessScores.unArmoredScore },
			// Updated description to reflect actual helmet levels
			{
				type: "lightly armored targets (Helmet IIA, IIIA, IIIA+)",
				score: effectivenessScores.lightArmorScore,
			},
			{
				type: "heavily armored targets (Body IIIA, IIIA+, III, III+)",
				score: effectivenessScores.heavyArmorScore,
			},
		];
		scores.sort((a, b) => b.score - a.score);
		let description = `This ${ammoData.name} ammunition excels against ${scores[0].type}.`;
		if (ammoData.velocity > 500) {
			description += ` Its high velocity (${ammoData.velocity} m/s) ensures significant impact at range.`;
		} else if (ammoData.velocity > 0 && ammoData.velocity < 350) {
			description += ` Its lower velocity (${ammoData.velocity} m/s) might reduce effectiveness at extended distances.`;
		} else if (ammoData.velocity === 0) {
			description +=
				" Its velocity is unknown, affecting range performance predictability.";
		}
		if (ammoData.dispersion < 0) {
			description += ` The reduced dispersion (${ammoData.dispersion}%) significantly enhances accuracy.`;
		} else if (ammoData.dispersion > 2) {
			description += ` Be mindful of its increased dispersion (${ammoData.dispersion > 0 ? "+" : ""}${ammoData.dispersion}%) which can affect precision.`;
		}
		return description;
	};

	const getEffectivenessColor = (score: number) => {
		if (score >= 70) return "bg-gradient-to-r from-rose-600 to-red-600";
		if (score >= 40) return "bg-gradient-to-r from-amber-500 to-yellow-500";
		return "bg-gradient-to-r from-emerald-500 to-green-500";
	};

	if (!ammo) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="animate-pulse space-y-8">
					<div className="h-8 bg-secondary/30 rounded w-1/3" />
					<div className="h-4 bg-secondary/30 rounded w-1/2" />
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="h-96 bg-secondary/30 rounded-lg" />
						<div className="h-96 bg-secondary/30 rounded-lg" />
					</div>
				</div>
			</div>
		);
	}

	// Create a unique, sorted list of all armor levels
	const uniqueArmorLevels = [
		...new Set([...HELMET_ARMOR_LEVELS, ...BODY_ARMOR_LEVELS]),
	].sort((a, b) => {
		// Custom sort logic for armor levels (IIA < IIIA < IIIA+ < III < III+)
		const order: ArmorLevel[] = ["IIA", "IIIA", "IIIA+", "III", "III+"];
		return order.indexOf(a) - order.indexOf(b);
	}) as ArmorLevel[];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-6">
				<Link
					to="/ammunition"
					className="text-accent hover:text-accent/80 transition-colors duration-200 flex items-center text-sm group"
				>
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform duration-200"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					Back to Ammunition
				</Link>
				<Link
					to={`/compare?caliber=${encodeURIComponent(ammo.caliber)}&selected=${encodeURIComponent(ammo.id)}`}
					className="inline-flex items-center px-4 py-2 bg-accent/80 hover:bg-accent text-white text-sm font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
				>
					Compare {ammo.caliber} Rounds
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 ml-1.5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
			</div>

			<div className="bg-secondary/70 backdrop-blur-sm rounded-xl overflow-hidden mb-8 shadow-[3px_3px_3px_#000]">
				<div className="p-6 md:p-8 bg-[#111]">
					<div className="flex flex-wrap items-baseline mb-6 pb-2">
						<h1 className="text-4xl font-bold text-text tracking-tight mr-3">
							{ammo.name}
						</h1>
						<p className="text-xl text-muted font-light">{ammo.caliber}</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						{/* Left Column: Stats & Legend */}
						<div className="space-y-8">
							<div>
								<h2 className="text-2xl font-semibold mb-4 text-text/90">
									Ammunition Stats
								</h2>
								<div className="grid grid-cols-2 gap-4">
									{[
										{
											key: "velocity",
											label: "Velocity",
											value: `${ammo.velocity}`,
											unit: "m/s",
											colorClass: "text-sky-300",
										},
										{
											key: "dispersion",
											label: "Dispersion",
											value: `${ammo.dispersion > 0 ? "+" : ""}${ammo.dispersion}`,
											unit: "%",
											colorClass:
												ammo.dispersion < 0
													? "text-emerald-400"
													: ammo.dispersion > 0
														? "text-amber-400"
														: "text-text/80",
										},
										{
											key: "trader",
											label: "Trader",
											value: ammo.traderUnlock,
											unit: "",
											colorClass: "text-text/80",
										},
										{
											key: "price",
											label: "Price",
											value: ammo.price ? `$${ammo.price}` : "N/A",
											unit: "",
											colorClass: "text-teal-300",
										},
									].map((stat) => (
										<div
											key={stat.key}
											className="gzwbrown rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
										>
											<p className="text-muted text-xs uppercase tracking-wider mb-1 font-medium">
												{stat.label}
											</p>
											<p
												className={`text-2xl font-semibold ${stat.colorClass}`}
											>
												{stat.value}
												{stat.unit && (
													<span className="text-sm text-muted/70 font-light ml-1">
														{stat.unit}
													</span>
												)}
											</p>
										</div>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-3 text-text/90">
									Penetration Legend
								</h3>
								<div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-primary/30 rounded-lg p-4">
									{[
										{ color: "bg-green-500", label: "No penetration" },
										{ color: "bg-yellow-500", label: "Low penetration" },
										{ color: "bg-orange-500", label: "Medium penetration" },
										{ color: "bg-red-600", label: "High penetration" },
									].map((item) => (
										<div key={item.label} className="flex items-center">
											<div
												className={`h-3 w-3 rounded-sm ${item.color} mr-2 shadow-sm`}
											/>
											<span className="text-sm text-muted/80 font-light">
												{item.label}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Right Column: Performance Profile */}
						<div className="space-y-8">
							<h2 className="text-2xl font-semibold mb-4 text-text/90">
								Performance Profile
							</h2>

							<div className="rounded-lg shadow-md space-y-6">
								{/* Combat Effectiveness */}
								<div className="gzwbrown rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
									<h3 className="text-lg font-semibold mb-3 text-text/90">
										Combat Effectiveness
									</h3>
									<div className="grid grid-cols-3 gap-3">
										{[
											{
												label: "vs. Unarmored",
												score: effectivenessScores.unArmoredScore,
											},
											{
												label: "vs. Light Armor",
												score: effectivenessScores.lightArmorScore,
											},
											{
												label: "vs. Heavy Armor",
												score: effectivenessScores.heavyArmorScore,
											},
										].map((eff) => (
											<div
												key={eff.label}
												className="bg-secondary/50 rounded-lg p-3 transition-shadow"
											>
												<h4 className="font-medium text-xs mb-2 text-text/80 text-center uppercase tracking-wider">
													{eff.label}
												</h4>
												<div className="relative h-4 bg-black/20 rounded-full overflow-hidden shadow-inner mb-1">
													<div
														className={`absolute h-4 rounded-full ${getEffectivenessColor(eff.score)} transition-all duration-700 ease-out`}
														style={{ width: `${eff.score}%` }}
													/>
												</div>
												<p className="text-xs text-muted text-center">
													{eff.score}%
												</p>
											</div>
										))}
									</div>
								</div>

								{/* Unified Penetration Grid - Updated */}
								<div className="gzwbrown rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
									<h3 className="text-lg font-semibold mb-3 text-text/90">
										Armor Penetration Profile
									</h3>
									{/* Updated grid columns to match unique armor levels */}
									<div className="grid grid-cols-[auto_repeat(5,_minmax(0,_1fr))] gap-1 bg-secondary/50 p-2 rounded-lg">
										{/* Header Row - Icon Placeholder */}
										<div className="text-center text-xs font-medium text-muted" />
										{/* Header Row - Unique Armor Levels */}
										{uniqueArmorLevels.map((level) => (
											<div
												key={level}
												className="text-center text-xs font-medium text-muted/70 py-1"
											>
												{level}
											</div>
										))}

										{/* Helmet Row - Icon */}
										<div className="flex items-center justify-center">
											<img
												src={helmetIcon}
												alt="Helmet"
												className="w-12 h-12 object-contain"
												title="Helmet"
											/>
										</div>
										{/* Helmet Row - Penetration Cells */}
										{uniqueArmorLevels.map((level) => {
											const isHelmetLevel = HELMET_ARMOR_LEVELS.includes(
												//@ts-expect-error
												level,
											);
											const penetrationValue = isHelmetLevel
												? ammo.helmPenetration[
														level as keyof typeof ammo.helmPenetration
													]
												: undefined;
											const title = isHelmetLevel
												? `Helmet ${level}: ${
														// biome-ignore lint/style/noNonNullAssertion: <explanation>
														penetrationLevelText(penetrationValue!)
													}`
												: `Helmet ${level}: N/A`;
											return (
												<div
													key={`helm-${level}`}
													title={title}
													className={`h-full min-h-[32px] rounded ${
														isHelmetLevel
															? // biome-ignore lint/style/noNonNullAssertion: <explanation>
																penetrationColorClass(penetrationValue!)
															: "bg-black/10 opacity-50"
													} border border-black/10 shadow-inner transition-transform duration-150 ${isHelmetLevel ? "hover:scale-110 hover:z-10" : ""} relative`}
												/>
											);
										})}

										{/* Body Armor Row - Icon */}
										<div className="flex items-center justify-center">
											<img
												src={plateIcon}
												alt="Body Armor"
												className="w-12 h-12 object-contain"
												title="Body Armor"
											/>
										</div>
										{/* Body Armor Row - Penetration Cells */}
										{uniqueArmorLevels.map((level) => {
											const isBodyLevel = BODY_ARMOR_LEVELS.includes(
												//@ts-expect-error
												level,
											);
											const penetrationValue = isBodyLevel
												? ammo.bodyPenetration[
														level as keyof typeof ammo.bodyPenetration
													]
												: undefined;
											const title = isBodyLevel
												? `Body ${level}: ${
														// biome-ignore lint/style/noNonNullAssertion: <explanation>
														penetrationLevelText(penetrationValue!)
													}`
												: `Body ${level}: N/A`;
											return (
												<div
													key={`body-${level}`}
													title={title}
													className={`h-full min-h-[32px] rounded ${
														isBodyLevel
															? // biome-ignore lint/style/noNonNullAssertion: <explanation>
																penetrationColorClass(penetrationValue!)
															: "bg-black/10 opacity-50"
													} border border-black/10 shadow-inner transition-transform duration-150 ${isBodyLevel ? "hover:scale-110 hover:z-10" : ""} relative`}
												/>
											);
										})}
									</div>
									<div className="mt-1.5 text-xs text-muted/70 text-right">
										<p className="flex items-center justify-end gap-1">
											* Grayed cells indicate armor types not applicable to this
											row (
											<img
												src={helmetIcon}
												alt="Helmet"
												className="w-3 h-3 inline object-contain"
											/>
											/
											<img
												src={plateIcon}
												alt="Body Armor"
												className="w-3 h-3 inline object-contain"
											/>
											)
										</p>
									</div>
								</div>

								{/* Ammunition Profile Text */}
								<div className="gzwbrown rounded-lg p-4 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
									<h4 className="font-semibold text-sm mb-2 text-text/90">
										Summary
									</h4>
									<p className="text-sm text-muted/90 leading-relaxed">
										{getAmmoProfile(ammo)}
									</p>
								</div>
							</div>

							{/* Similar Ammunition */}
							<div className="mt-6">
								<h3 className="text-lg font-semibold mb-3 text-text/90">
									Similar Ammunition ({ammo.caliber})
								</h3>
								{similarAmmo.length > 0 ? (
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
										{similarAmmo.map((item) => (
											<Link
												key={item.id}
												to={`/ammunition/${item.id}`}
												className="gzwbrown block bg-primary/40 hover:bg-primary/60 rounded-lg p-3 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03]"
											>
												<h4 className="font-semibold text-text/90 truncate text-sm mb-0.5">
													{item.name}
												</h4>
												<p className="text-xs text-sky-300">
													Velocity: {item.velocity} m/s
												</p>
												<p
													className={`text-xs ${item.dispersion < 0 ? "text-emerald-400" : item.dispersion > 0 ? "text-amber-400" : "text-muted/70"}`}
												>
													Dispersion:{" "}
													{item.dispersion > 0
														? `+${item.dispersion}`
														: item.dispersion}
													%
												</p>
											</Link>
										))}
									</div>
								) : (
									<p className="text-muted/70 italic text-sm">
										No other ammunition of this caliber found.
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Helper function to convert penetration values to readable text (moved outside component for clarity)
const penetrationLevelText = (value: PenetrationValue): string => {
	switch (value) {
		case 0:
			return "No penetration";
		case 1:
			return "Low penetration";
		case 2:
			return "Medium penetration";
		case 3:
			return "High penetration";
		default:
			return "Unknown";
	}
};

export default AmmoDetail;
