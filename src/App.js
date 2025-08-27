// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import { AuthProvider } from 'context/AuthContext';


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <AuthProvider>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </AuthProvider>
  </ThemeCustomization>
);

export default App;
