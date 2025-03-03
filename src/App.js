import { Fragment, useEffect } from 'react';
import Default from './defaultlayout';
import Config from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

    useEffect(() => {
        const metaTag = document.createElement('meta');
        metaTag.name = "viewport";
        metaTag.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(metaTag);

        return () => {
            document.head.removeChild(metaTag); // Xóa thẻ khi component unmount (nếu cần)
        };
    }, []);

    return (
        // <Defaultlayout>
        //     <Home />
        // </Defaultlayout>
        //<

        <Router>
            <div>
                <Routes>
                    {Config.map((route, idx) => {
                        let Layout = Default;
                        const Page = route.component;
                        if (route.Lg === null) Layout = Fragment;
                        return (
                            <Route
                                key={idx}
                                path={route.path}
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

export default App;
