// project import
import auth from './auth';
import albums from './albums';
import pages from './pages';

// temp TODO - remove after testing
import 'client/client'
console.log("process.env.REACT_APP_API_URL =", process.env.REACT_APP_API_URL);


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [albums, auth, pages]
};

export default menuItems;
