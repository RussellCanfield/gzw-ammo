import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Bootstrap from "./Bootstrap";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("ammo-root")!).render(
	<React.StrictMode>
		<Bootstrap />
	</React.StrictMode>,
);
