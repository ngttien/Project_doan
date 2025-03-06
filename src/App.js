import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./defaultlayout";
import Config from "./routes";
import Sidebar from "./layout/sidebar/sidebar";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  

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
        {/* Sidebar nằm ngoài Routes, không bị render lại khi chuyển trang */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

        {/* Nội dung trang */}
        <Routes>
          {Config.map((route, idx) => {
            const Page = route.component;
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <DefaultLayout>
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
