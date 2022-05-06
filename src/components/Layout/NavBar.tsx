import {
  Alignment,
  Classes,
  Icon,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.scss';

const getNavLinkClassNames = ({ isActive }: { isActive: boolean }) => {
  return classNames(Classes.TEXT_MUTED, styles.navLink, { [styles.active]: isActive });
};

const NavBar = () => {
  const navLinks = [
    { icon: IconNames.HOME, title: 'Home', link: '/' },
    { icon: IconNames.CLIPBOARD, title: 'Teachers', link: '/teachers' },
    { icon: IconNames.CHART, title: 'Statistic', link: '/stats' },
    { icon: IconNames.USER, title: 'Users', link: '/users' },
  ];
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>MindX Teaching Manager</NavbarHeading>
        <NavbarDivider />
        {navLinks.map(({ icon, title, link }) => {
          return (
            <NavLink key={title} to={link} className={getNavLinkClassNames}>
              <Icon icon={icon} />
              <span>{title}</span>
            </NavLink>
          );
        })}
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
