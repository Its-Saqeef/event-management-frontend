// src/components/PublicRoute.tsx
import { useAuth } from '../Auth/AuthContext';
import { Redirect } from 'wouter';
import { Spinner } from '../ui/spinner';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return(
       <div className="h-screen flex items-center justify-center">
     <Spinner className='h-10 w-10'/>
  </div>
    )
  }

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
};