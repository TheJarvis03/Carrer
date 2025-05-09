import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation';
import Footer from './components/footer';
import { publicRoutes, privateRoutes } from './routes/index';
import { UserProvider } from './contexts/UserContext';

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="app-container">
                    <Navigation />
                    <main className="main-wrapper">
                        <Routes>
                            {publicRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                            {privateRoutes.map((route, index) => (
                                <Route
                                    key={`private-${index}`}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                            <Route path="*" element={<div>Page not found</div>} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
