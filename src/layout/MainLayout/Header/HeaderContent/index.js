// material-ui
import { useMediaQuery, Box } from '@mui/material';

// project import
import MobileSection from './MobileSection';
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {matchesXs && <MobileSection />}

      <Box sx={{ ml: 'auto' }}>
        <Profile />
      </Box>
    </Box>
  );
};

export default HeaderContent;
