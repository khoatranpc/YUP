import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const NavBar = () => {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>MindX Teaching Manager</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon={IconNames.HOME} text="Home" />
        <Button className={Classes.MINIMAL} icon={IconNames.Document} text="Files" />
      </NavbarGroup>
    </Navbar>
  );
};

export default NavBar;
