'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading, role,setLoading } = useAuth();
    const router = useRouter();


    if (loading) {
        return <div className="text-center mt-20 text-lg">Loading...</div>;
    }

useEffect(() => {
    // Wait for loading to finish
    if (!loading) {
      const timer = setTimeout(() => {
        if (role !== 'admin') {
          router.push('/login');
        }
        setLoading(false); // stop loading screen
      }, 1000); // 1 second delay

      return () => clearTimeout(timer); // cleanup
    }
  }, [loading, role,role, router]);



    if (role !== 'admin') {
        return <div className="text-center mt-20 text-lg">Loading...</div>;
    }

    return children;
};

export default PrivateRoute;
