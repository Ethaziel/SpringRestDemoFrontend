//import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, UserOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({onClose}) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (location.pathname.startsWith('/profile/view')) {
      setSelectedIndex(0);
    } else if (location.pathname.startsWith('/profile/edit')) {
      setSelectedIndex(1);
    }
  }, [location.pathname]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 0) {
      navigate('/profile/view');
    } else if (index === 1){
      navigate('/profile/edit');
    }
    if (onClose) {
      setTimeout(() => onClose(), 150); 
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      
    </List>
  );
};

export default ProfileTab;
