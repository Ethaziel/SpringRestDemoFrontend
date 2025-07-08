// assets
import { PictureOutlined, FileImageOutlined } from '@ant-design/icons';

// icons
const icons = {
  PictureOutlined, 
  FileImageOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const albums = {
  id: 'albums',
  title: 'Albums',
  type: 'group',
  children: [
    {
      id: 'album',
      title: 'Albums',
      type: 'item',
      url: '/',
      icon: icons.PictureOutlined
    },
    {
      id: 'add-album',
      title: 'Add Album',
      type: 'item',
      url: '/add-album',
      icon: icons.FileImageOutlined
    }
  ]
};

export default albums;
