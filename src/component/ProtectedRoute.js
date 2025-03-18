import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ routes }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const tokenResult = await currentUser.getIdTokenResult();
                    console.log('User role:', tokenResult.claims.role);
                    setIsAuthenticated(true);
                    setIsAdmin(tokenResult.claims.role === 'admin');
                } catch (error) {
                    console.error('Error verifying token:', error);
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                }
            } else {
                setIsAuthenticated(false);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return <Outlet context={{ routes }} />;
};

export default ProtectedRoute;