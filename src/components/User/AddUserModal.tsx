import { Button, Classes, Dialog } from '@blueprintjs/core';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AddUserModal = ({ visible, onClose }: Props) => {
  return (
    <Dialog title="Add user" isOpen={visible} onClose={onClose}>
      <div className={Classes.DIALOG_BODY}>Form here</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddUserModal;
