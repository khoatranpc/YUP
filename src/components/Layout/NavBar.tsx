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
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>MindX Teaching Manager</NavbarHeading>
        <NavbarDivider />
        <NavLink to="/" className={getNavLinkClassNames}>
          <Icon icon={IconNames.HOME} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/teacher" className={getNavLinkClassNames}>
          <Icon icon={IconNames.CLIPBOARD} />
          <span>Teachers</span>
        </NavLink>
        <NavLink to="/stats" className={getNavLinkClassNames}>
          <Icon icon={IconNames.CHART} />
          <span>Statistic</span>
        </NavLink>
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
