import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// profile pages
const ViewProfilePage = Loadable(lazy(() => import('pages/profile/viewProfile')));
const EditProfilePage = Loadable(lazy(() => import('pages/profile/editProfile')));


// ==============================|| PROFILE ROUTING ||============================== //

const ProfileRoutes = {
  path: '/profile',
  element: <MainLayout />,
  children: [
    {
      path: 'view',
      element: <ViewProfilePage/>
    },
    {
      path: 'edit',
      element: <EditProfilePage/>
    }
    
  ]
};

export default ProfileRoutes;
