import { FC, useState, useEffect } from 'react';
import { Menu } from 'antd';
import { MenuList } from '../../interface/layout/menu.interface';
import { useNavigate } from 'react-router-dom';
import { CustomIcon } from './customIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setUserItem } from '@/stores/user.store';
import { RouteProps, Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from './../../config/supabase';

const { SubMenu, Item } = Menu;

interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
  const { loading, currentUser} = useAuth();
  const { pathname } = useLocation();


  
  const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device, locale } = useSelector(state => state.user);

  const [menuListFilted, setMenuListFilted] = useState([]);

  useEffect(async () => {
    const idUser = currentUser?.id;
    const test =await supabase.from('profiles').select('is_admin').eq('id',idUser);
    
    setMenuListFilted(
      [...menuList
        .filter(e => e.code !== (test?.data?.[0]?.is_admin ?  'business':'businessAdmin' ))]
    )
     
  }, [menuList])
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.icon!} />
        
        <span>{menu.label[locale]}</span>
      </span>
    );
  };


  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
    if (device !== 'DESKTOP') {
      dispatch(setUserItem({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

 



  const renderItem=()=>{

    return menuListFilted.map(menu =>
      menu.children ? (
        <SubMenu key={menu.code} title={getTitie(menu)}>
          {menu.children.map(child => (
            <Item key={child.path}>{child.label[locale]}</Item>
          ))}
        </SubMenu>
      ) : (
        <Item key={menu.path}>{getTitie(menu)}</Item>
      ),
    )
  }

  return (
    <>
      {loading ? (
        'loading'
      ) : (
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[selectedKey]}
          openKeys={openKey ? [openKey] : []}
          onOpenChange={onOpenChange}
          onSelect={k => onMenuClick(k.key)}
          className="layout-page-sider-menu text-2"
        >
          {renderItem()}
        </Menu>
      )}
    </>
  );
};

export default MenuComponent;
