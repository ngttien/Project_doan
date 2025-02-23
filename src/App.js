import Default from '~/user/defaultlayout';
import Config from './routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
function App() {
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
                        if (route.Layout === null) {
                            Layout = Fragment;
                        } else if (route.Layout) {
                            Layout = route.Layout;
                        }
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
