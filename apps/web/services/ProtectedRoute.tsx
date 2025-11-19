"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in
        router.push('/pageLogin');
      } else if (requireAdmin && !user.isAdmin) {
        // Logged in but not admin
        router.push('/pageUser');
      }
    }
  }, [user, loading, requireAdmin, router]);

  if (loading) {
    return <Loading text="Verificando autenticação..." subtext = "Aguarde um momento..." />;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  if (requireAdmin && !user.isAdmin) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
};
