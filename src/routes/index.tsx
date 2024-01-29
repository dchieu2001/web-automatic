import { FC, lazy } from 'react';
// import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import { Navigate, RouteObject } from 'react-router';
import WrapperRouteComponent from './config';
import { useRoutes } from 'react-router-dom';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/doucumentation'));
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route'));
const BusinessBasicPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/business/basic'));
const BusinessWithSearchPage = lazy(() => import(/* webpackChunkName: "with-search" */ '@/pages/business/with-search'));
const BusinessWithAsidePage = lazy(() => import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-aside'));
const BusinessWithRadioCardsPage = lazy(
  () => import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-radio-cards'),
);
const BusinessWithTabsPage = lazy(() => import(/* webpackChunkName: "with-tabs" */ '@/pages/business/with-tabs'));

import Register from './../pages/register/Register';
import Admin_page from '../pages/admin/class-management/Admin_page';
import Account from './../pages/profile/Account';
import PersonalAvatar from './../pages/profile/PersonalAvatar';
import LoginPage from './../pages/login/index';
import ForgotPassword from './../pages/forgot-password/ForgotPassword';
import BusinessAdminBasicPage from '@/pages/admin/BusinessAdminBasic';
import Student_page from './../pages/admin/student-management/Student_page';
import Result_page_admin from './../pages/admin/result-page/Result_page_admin';
import Account_manager_page from './../pages/admin/account-management/Account_manager_page';
import NotFoundPage from './../pages/404';

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <WrapperRouteComponent element={<NotFoundPage/>} titleId="title.notFount" />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <Navigate to="documentation" />,
      },
      {
        path: 'profile',
        element: <PersonalAvatar/>,
      },
      {
        path: 'documentation',
        element: <WrapperRouteComponent element={<Documentation />} titleId="title.documentation" />,
      },
      {
        path: 'permission/route',
        element: <WrapperRouteComponent element={<RoutePermission />} titleId="title.permission.route" />,
      },
      {
        path: 'business/basic',
        element: <WrapperRouteComponent element={<BusinessBasicPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-search',
        element: <WrapperRouteComponent element={<BusinessWithSearchPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-aside',
        element: <WrapperRouteComponent element={<BusinessWithAsidePage />} titleId="title.account" />,
      },
      {
        path: 'business/with-radio-cards',
        element: <WrapperRouteComponent element={<BusinessWithRadioCardsPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-tabs',
        element: <WrapperRouteComponent element={<BusinessWithTabsPage />} titleId="title.account" />,
      },

    ],
  },
  {
    path: '/admin',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <Admin_page />,
      },
      {
        path: '/admin/basic',
        element:  <BusinessAdminBasicPage /> ,
      },
      {
        path: 'profile',
        element: <PersonalAvatar/>,
      },
      {
        path: '/admin/student_management',
        element:  <Student_page /> ,
      },
      {
        path: '/admin/account_management',
        element:  <Account_manager_page/> ,
      } 
    ],
  },
  {
    path: '*',
    element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
