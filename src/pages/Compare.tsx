import type React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AmmoComparison from "../components/AmmoComparison";
import {
	type PenetrationValue,
	penetrationColorClass,
	penetrationLevelText,
} from "../data/ammoData";
import { getAllCalibers } from "../data/ammoData";

const Compare: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialCaliber = searchParams.get("caliber") || "";
	const initialSelectedTypes = searchParams.get("types")
		? searchParams.get("types")?.split(",")
		: [];

	const [calibers, setCalibers] = useState<string[]>([]);
	const [selectedCaliber, setSelectedCaliber] =
		useState<string>(initialCaliber);
	const [selectedTypes, setSelectedTypes] = useState<string[]>(
		initialSelectedTypes ?? [],
	);

	useEffect(() => {
		const allCalibers = getAllCalibers();
		setCalibers(allCalibers);
		if (allCalibers.length > 0 && !selectedCaliber) {
			setSelectedCaliber(allCalibers[0]);
		}
	}, [selectedCaliber]);

	useEffect(() => {
		setSearchParams({
			caliber: selectedCaliber,
			types: selectedTypes.join(","),
		});
	}, [selectedCaliber, selectedTypes, setSearchParams]);

	const handleCaliberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCaliber(e.target.value);
		setSelectedTypes([]);
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="overflow-hidden mb-4 p-2 md:p-4">
				<div className="mb-4">
					<label
						htmlFor="caliber-select"
						className="block text-sm font-medium text-muted mb-1"
					>
						Caliber
					</label>
					<select
						id="caliber-select"
						className="w-full px-3 py-2 bg-primary border border-gray-700 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-accent"
						value={selectedCaliber}
						onChange={handleCaliberChange}
					>
						{calibers.map((caliber) => (
							<option key={caliber} value={caliber}>
								{caliber}
							</option>
						))}
					</select>
				</div>
				<AmmoComparison
					caliber={selectedCaliber}
					selectedTypes={selectedTypes}
					setSelectedTypes={setSelectedTypes}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
				<div className="bg-secondary rounded-lg p-2 sm:p-4 transform transition-all duration-300 hover:scale-[1.02] bg-[var(--color-secondary)] bg-[url(https://www.grayzonewarfare.net/data/assets/style_properties/fake-brick.png)] border-black border-[1px] shadow-[var(--card-shadow)]">
					<div className="flex items-center mb-4">
						<div className="p-3 bg-accent/20 rounded-full mr-3">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-accent"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 2L2 7l10 5 10-5-10-5z" />
								<path d="M2 17l10 5 10-5" />
								<path d="M2 12l10 5 10-5" />
							</svg>
						</div>
						<h3 className="text-xl font-bold text-text">Penetration Values</h3>
					</div>
					<p className="text-muted mb-4">
						Penetration indicates how well ammunition can defeat different armor
						classes
					</p>
					<div className="space-y-3">
						{[0, 1, 2, 3].map((value) => (
							<div
								key={value}
								className="flex items-center p-2 rounded-lg transition-colors hover:bg-primary/50"
							>
								<div
									className={`h-5 w-5 rounded-full ${penetrationColorClass(value as PenetrationValue)} shadow-lg`}
								/>
								<div className="ml-3">
									<span className="text-text font-medium">
										{penetrationLevelText(value as PenetrationValue)}
									</span>
									<p className="text-xs text-muted mt-0.5">
										{value === 0 && "No damage through armor"}
										{value === 1 && "Light bruise/bleed through armor"}
										{value === 2 && "Medium bruise/bleed through armor"}
										{value === 3 && "One-tap kill through armor"}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-secondary rounded-lg p-2 sm:p-4 transform transition-all duration-300 hover:scale-[1.02] bg-[var(--color-secondary)] bg-[url(https://www.grayzonewarfare.net/data/assets/style_properties/fake-brick.png)] border-black border-[1px] shadow-[var(--card-shadow)]">
					<div className="flex items-center mb-4">
						<div className="p-3 bg-accent/20 rounded-full mr-3">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-accent"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" y1="8" x2="12" y2="12" />
								<line x1="12" y1="16" x2="12.01" y2="16" />
							</svg>
						</div>
						<h3 className="text-xl font-bold text-text">Key Stats Explained</h3>
					</div>
					<div className="space-y-4">
						<div className="p-3 rounded-lg bg-primary/50">
							<div className="flex items-center">
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-accent mr-2"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="10" />
									<path d="M8 14s1.5 2 4 2 4-2 4-2" />
									<line x1="9" y1="9" x2="9.01" y2="9" />
									<line x1="15" y1="9" x2="15.01" y2="9" />
								</svg>
								<span className="font-medium text-text">Dispersion</span>
							</div>
							<p className="text-muted text-sm mt-1 ml-7">
								Lower is better. Negative values mean improved accuracy while
								positive values indicate reduced accuracy.
							</p>
						</div>

						<div className="p-3 rounded-lg bg-primary/50">
							<div className="flex items-center">
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-accent mr-2"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="22" y1="2" x2="11" y2="13" />
									<polygon points="22 2 15 22 11 13 2 9 22 2" />
								</svg>
								<span className="font-medium text-text">Velocity</span>
							</div>
							<p className="text-muted text-sm mt-1 ml-7">
								Higher values mean faster bullets, resulting in less bullet drop
								and travel time.
							</p>
						</div>

						<div className="p-3 rounded-lg bg-primary/50">
							<div className="flex items-center">
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-accent mr-2"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
									<path d="M7 11V7a5 5 0 0 1 10 0v4" />
								</svg>
								<span className="font-medium text-text">Armor Classes</span>
							</div>
							<p className="text-muted text-sm mt-1 ml-7">
								Helmet: I, IIA, IIA+
								<br />
								Body: IIIA, IIIA+, III, III+
								<br />
								Higher class means better protection.
							</p>
						</div>
					</div>
				</div>

				<div className="bg-secondary rounded-lg p-2 sm:p-4 transform transition-all duration-300 hover:scale-[1.02] bg-[var(--color-secondary)] bg-[url(https://www.grayzonewarfare.net/data/assets/style_properties/fake-brick.png)] border-black border-[1px] shadow-[var(--card-shadow)]">
					<div className="flex items-center mb-4">
						<div className="p-3 bg-accent/20 rounded-full mr-3">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-accent"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
								<polyline points="22 4 12 14.01 9 11.01" />
							</svg>
						</div>
						<h3 className="text-xl font-bold text-text">Choosing Ammunition</h3>
					</div>
					<div className="space-y-2">
						{[
							"Match ammo to expected enemy armor level",
							"Balance penetration power and damage output",
							"Consider availability and cost for loadouts",
							"Tracer rounds reveal your position",
							"Low dispersion is critical for long-range",
						].map((tip, index) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className="flex items-start p-2 rounded-lg transition-colors hover:bg-primary/50"
							>
								<div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent mt-0.5 mr-2">
									{index + 1}
								</div>
								<p className="text-muted">{tip}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="bg-secondary rounded-lg p-2 sm:p-4 shadow-lg">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-primary/50 rounded-lg p-4 bg-[var(--color-secondary)] bg-[url(https://www.grayzonewarfare.net/data/assets/style_properties/fake-brick.png)] border-black border-[1px] shadow-[var(--card-shadow)]">
						<h3 className="text-lg font-medium text-text mb-3 flex items-center">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-accent mr-2"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 2L2 7l10 5 10-5-10-5z" />
							</svg>
							Helmet Protection Levels
						</h3>
						<div className="space-y-2">
							{["I", "IIA", "IIA+"].map((level) => (
								<div
									key={level}
									className="flex items-center p-2 rounded bg-secondary/50"
								>
									<div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-accent">
										{level}
									</div>
									<div className="ml-3">
										<span className="text-text font-medium">Level {level}</span>
										<p className="text-xs text-muted">
											{level === "I" &&
												"Basic protection against low-caliber rounds"}
											{level === "IIA" &&
												"Improved protection against common pistol rounds"}
											{level === "IIA+" &&
												"Enhanced protection against high-velocity pistol rounds"}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-primary/50 rounded-lg p-4 bg-[var(--color-secondary)] bg-[url(https://www.grayzonewarfare.net/data/assets/style_properties/fake-brick.png)] border-black border-[1px] shadow-[var(--card-shadow)]">
						<h3 className="text-lg font-medium text-text mb-3 flex items-center">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-accent mr-2"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
							</svg>
							Body Armor Protection Levels
						</h3>
						<div className="space-y-2">
							{["IIIA", "IIIA+", "III", "III+"].map((level) => (
								<div
									key={level}
									className="flex items-center p-2 rounded bg-secondary/50"
								>
									<div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-accent text-xs">
										{level}
									</div>
									<div className="ml-3">
										<span className="text-text font-medium">Level {level}</span>
										<p className="text-xs text-muted">
											{level === "IIIA" &&
												"Protection against most handgun rounds"}
											{level === "IIIA+" &&
												"Enhanced protection against high-velocity handgun rounds"}
											{level === "III" && "Protection against rifle rounds"}
											{level === "III+" &&
												"Enhanced protection against armor-piercing rifle rounds"}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Compare;
