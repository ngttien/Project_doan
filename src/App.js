import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./defaultlayout";
import Config from "./routes";

function App() {
    useEffect(() => {
        const metaTag = document.createElement("meta");
        metaTag.name = "viewport";
        metaTag.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(metaTag);
        return () => document.head.removeChild(metaTag);
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {Config.map((route, idx) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={idx}
                                path={route.path}
                                element={
                                    <DefaultLayout hideLayout={route.hideLayout}>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
