import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// profile pages
const ViewProfilePage = Loadable(lazy(() => import('pages/profile/viewProfile')));


// ==============================|| PROFILE ROUTING ||============================== //

const ProfileRoutes = {
  path: '/profile',
  element: <MainLayout />,
  children: [
    {
      path: 'view',
      element: <ViewProfilePage/>
    },
    
  ]
};

export default ProfileRoutes;
