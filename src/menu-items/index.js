// project import
import auth from './auth';
import albums from './albums';
import pages from './pages';

// temp TODO - remove after testing
import 'client/client'


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [albums, auth, pages]
};

export default menuItems;
