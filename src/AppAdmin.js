import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/admin/adminLayout"; // Nếu là export default
import AdminRoutes from "./routes/adminRoutes";

function AppAdmin() {
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
                    {AdminRoutes.map((route, idx) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={idx}
                                path={route.path}
                                element={
                                    <AdminLayout hideLayout={route.hideLayout}>
                                        <Page />
                                    </AdminLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default AppAdmin;
