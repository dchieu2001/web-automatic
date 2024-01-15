import { FC, ReactElement, useEffect, useState } from 'react';
import { RouteProps, Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useIntl } from 'react-intl';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  titleId: string;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, ...props }) => {
  const { formatMessage } = useIntl();
  const { loading, currentUser } = useAuth();

  const { pathname } = useLocation();

  if (titleId) {
    document.title = formatMessage({
      id: titleId,
    });
  }

  // isLoggedIn = false ===> /login
  // isLoggedIn = true   ==> /home
  // isAdmin && isLoggedIn => vào đc /admin/....
  const isAdmin = currentUser?.role === 'admin';

  // console.log('🚀 ~ file: config.tsx ~ line 27 ~ isAdmin', isAdmin);

  // console.log(currentUser);

  if (loading) {
    return <> loading Server please wait a minute </>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }


  return props.element as ReactElement;
};

export default WrapperRouteComponent;
