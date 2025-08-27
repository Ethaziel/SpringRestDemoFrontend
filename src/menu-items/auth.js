// assets
import { LoginOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined, 
  LogoutOutlined
};

const isLoginEnabled = localStorage.getItem('token');

const caseLogin = [{
  id: 'logout1',
  title: 'Logout',
  type: 'item',
  url: '/logout',
  icon: icons.LogoutOutlined,
}]

const caseLogout = [{
  id: 'login',
  title: 'Login',
  type: 'item',
  url: '/login',
  icon: icons.LoginOutlined,
},
{
  id: 'register1',
  title: 'Register',
  type: 'item',
  url: '/register',
  icon: icons.ProfileOutlined,
}
]

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const auth = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [

    isLoginEnabled
    && caseLogin[0],
    !isLoginEnabled
    && caseLogout[0],
    !isLoginEnabled
    && caseLogout[1]
  ].filter(Boolean)
};

export default auth;
