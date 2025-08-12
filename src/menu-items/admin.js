import { TeamOutlined } from '@ant-design/icons';

const icons = {
    TeamOutlined,
}

const adminPages = {
    id: 'adminPages',
    title: 'Admin Pages',
    type: 'group',
    children: [
    {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/users',
        icon: icons.TeamOutlined
    },
    ]
};

export default adminPages;