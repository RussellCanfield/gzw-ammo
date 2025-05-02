import { useEffect } from "react";
import {
	Route,
	HashRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";
import logo from "./assets/GZW-Text-logo.webp";
import Navigation from "./components/Navigation";
import AmmoDetail from "./pages/AmmoDetail";
import Ammunition from "./pages/Ammunition";
import Compare from "./pages/Compare";
import "./index.css";

// ScrollToTop component to ensure page scrolls to top on route change
function ScrollToTop() {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

// Main content wrapper with page transitions
function PageContainer({ children }: { children: React.ReactNode }) {
	return <div className="page-transition">{children}</div>;
}

function App() {
	return (
		<Router>
			<ScrollToTop />
			<div className="min-h-screen bg-primary flex flex-col bg-[url(https://www.grayzonewarfare.net/data/assets/style_properties/cartographer.png)] bg-center) bg-[#151515] text-[#cbcccc]">
				<Navigation />
				<main className="flex-grow">
					<Routes>
						<Route
							path="/"
							element={
								<PageContainer>
									<Ammunition />
								</PageContainer>
							}
						/>
						<Route
							path="/ammunition/:id"
							element={
								<PageContainer>
									<AmmoDetail />
								</PageContainer>
							}
						/>
						<Route
							path="/compare"
							element={
								<PageContainer>
									<Compare />
								</PageContainer>
							}
						/>
						<Route
							path="*"
							element={
								<PageContainer>
									<Ammunition />
								</PageContainer>
							}
						/>
					</Routes>
				</main>
				<footer className="mt-12 py-8 bg-secondary shadow-inner">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<div className="flex items-center">
								<img src={logo} alt="Logo" className="h-auto mr-2" />
							</div>
						</div>
					</div>
				</footer>
			</div>

			{/* Add page transition styles */}
			<style>
				{`
        .page-transition {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
			</style>
		</Router>
	);
}

export default App;
