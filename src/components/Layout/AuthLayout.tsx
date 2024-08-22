import { useAppSelector } from '@/redux/redux-hooks';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthLayout() {

  const { user } = useAppSelector(s=> s.authState);
  const navigate = useNavigate();
  useEffect(() => {
      if( user ) {
          navigate('/');
      }
  }, [])
  return (
    <div className="auth-mainS bg-super-admin-auth-background h-screen bg-[#f0f0f0]">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
