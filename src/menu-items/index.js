// project import
import auth from './auth';
import albums from './albums';
import pages from './pages';
import adminPages from './admin';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [albums, auth, adminPages, pages]
};

export default menuItems;
