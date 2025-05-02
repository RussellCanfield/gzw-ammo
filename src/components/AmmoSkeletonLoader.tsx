import type React from "react";

const AmmoSkeletonLoader: React.FC = () => {
	// Create an array of 8 items for the skeleton cards
	const skeletonCards = Array(8).fill(null);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
			{/* Header skeleton */}
			<div className="mb-4 bg-gradient-to-r from-secondary to-secondary/50 p-6 rounded-lg shadow-lg">
				<div className="h-10 w-3/4 bg-gray-700 rounded mb-2" />
				<div className="h-6 w-1/2 bg-gray-700 rounded" />
			</div>

			{/* Filter controls skeleton */}
			<div className="bg-secondary rounded-lg shadow-lg p-6 mb-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Caliber select skeleton */}
					<div>
						<div className="h-4 w-16 bg-gray-700 rounded mb-1" />
						<div className="h-10 w-full bg-gray-700 rounded" />
					</div>

					{/* Search input skeleton */}
					<div>
						<div className="h-4 w-16 bg-gray-700 rounded mb-1" />
						<div className="h-10 w-full bg-gray-700 rounded" />
					</div>

					{/* Sort controls skeleton */}
					<div>
						<div className="h-4 w-16 bg-gray-700 rounded mb-1" />
						<div className="flex">
							<div className="h-10 flex-grow bg-gray-700 rounded-l" />
							<div className="h-10 w-10 bg-gray-700 rounded-r" />
						</div>
					</div>
				</div>
			</div>

			{/* Ammo cards grid skeleton */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{skeletonCards.map((_, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="bg-secondary rounded-lg shadow-lg overflow-hidden"
					>
						{/* Card header */}
						<div className="p-4 border-b border-gray-700">
							<div className="flex justify-between items-center">
								<div className="h-6 w-24 bg-gray-700 rounded" />
								<div className="h-5 w-16 bg-gray-700 rounded" />
							</div>
						</div>

						{/* Card body */}
						<div className="p-4">
							{/* Stats section */}
							<div className="grid grid-cols-2 gap-3 mb-4">
								<div>
									<div className="h-4 w-16 bg-gray-700 rounded mb-1" />
									<div className="h-5 w-12 bg-gray-700 rounded" />
								</div>
								<div>
									<div className="h-4 w-16 bg-gray-700 rounded mb-1" />
									<div className="h-5 w-20 bg-gray-700 rounded" />
								</div>
								<div>
									<div className="h-4 w-16 bg-gray-700 rounded mb-1" />
									<div className="h-5 w-24 bg-gray-700 rounded" />
								</div>
								<div>
									<div className="h-4 w-16 bg-gray-700 rounded mb-1" />
									<div className="h-5 w-12 bg-gray-700 rounded" />
								</div>
							</div>

							{/* Penetration section */}
							<div>
								<div className="h-5 w-24 bg-gray-700 rounded mb-2" />

								{/* Helmet penetration */}
								<div className="mb-3">
									<div className="h-4 w-14 bg-gray-700 rounded mb-1" />
									<div className="flex space-x-1 mb-2">
										{[1, 2, 3].map((i) => (
											<div
												key={`helmet-${i}`}
												className="h-4 flex-1 bg-gray-700 rounded"
											/>
										))}
									</div>
								</div>

								{/* Body penetration */}
								<div>
									<div className="h-4 w-10 bg-gray-700 rounded mb-1" />
									<div className="flex space-x-1">
										{[1, 2, 3, 4].map((i) => (
											<div
												key={`body-${i}`}
												className="h-4 flex-1 bg-gray-700 rounded"
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AmmoSkeletonLoader;
