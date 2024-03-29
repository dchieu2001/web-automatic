import { MenuList } from '@/interface/layout/menu.interface';
import { mock, intercepter } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'documentation',
    label: {
      zh_CN: 'Hướng dẫn',
      en_US: 'Documentation',
    },
    icon: 'documentation',
    path: '/documentation',
  },
  {
    code: 'business',
    label: {
      zh_CN: 'Chức Năng',
      en_US: 'Business',
    },
    icon: 'permission',
    path: '/business',
    children: [
      {
        code: 'withSearch',
        label: {
          zh_CN: 'Quản lý lớp',
          en_US: 'Classes Management',
        },
        path: '/business/with-search',
      },
      {
        code: 'withSearch',
        label: {
          zh_CN: 'Quản lý sinh viên',
          en_US: 'Students Management',
        },
        path: '/business/with-aside',
      },
      {
        code: 'basic',
        label: {
          zh_CN: 'Kết quả',
          en_US: 'Result',
        },
        path: '/business/basic',
      },
    ],
  },
  {
    code: 'businessAdmin',
    label: {
      zh_CN: 'Chức Năng',
      en_US: 'BusinessAdmin',
    },
    icon: 'permission',
    path: '/business',
    children: [
      {
        code: 'withSearch',
        label: {
          zh_CN: 'Quản lý lớp',
          en_US: 'Classes Management',
        },
        path: '/admin',
      },
      {
        code: 'withSearch',
        label: {
          zh_CN: 'Quản lý sinh viên',
          en_US: 'Students Management',
        },
        path: '/admin/student_management',
      },
      {
        code: 'basic',
        label: {
          zh_CN: 'Kết quả',
          en_US: 'Result',
        },
        path: '/admin/basic',
      },
      {
        code: 'account',
        label: {
          zh_CN: 'Người dùng',
          en_US: 'User Account',
        },
        path: '/admin/account_management',
      },
    ],
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
