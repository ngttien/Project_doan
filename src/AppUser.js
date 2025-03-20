import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "../src/layout/user/defaultlayout";
import userRoutes from "../src/routes/userRoutes";

function AppUser() {
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
                    {userRoutes.map(({ path, component: Page, hideLayout }, idx) => {
                        const Layout = hideLayout ? ({ children }) => <>{children}</> : DefaultLayout;
                        return (
                            <Route
                                key={idx}
                                path={path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default AppUser;
