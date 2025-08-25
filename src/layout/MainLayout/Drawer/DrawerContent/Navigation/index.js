// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItems from 'menu-items';

import { useAuth } from 'context/AuthContext';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {

  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  // take the array inside menuItems
  const items = menuItems.items;

  // filter out admin pages if user is not admin
  const filteredItems = items.filter(
    (item) => item.id !== 'adminPages' || user?.authority?.includes('ADMIN')
  );

  const navGroups = filteredItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
