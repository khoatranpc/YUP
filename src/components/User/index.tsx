import { Button, Classes, Icon, InputGroup, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import Pagination from '@components/shared/Pagination';
import layoutStyles from '@sharedStyling/layout.module.scss';
import sizeStyles from '@sharedStyling/size.module.scss';
import spacingStyles from '@sharedStyling/spacing.module.scss';
import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import AddUserModal from './AddUserModal';
import styles from './index.module.scss';

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    q: '',
    page: '1',
    pageSize: '10',
  });
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);

  const page = +(searchParams.get('page') || '1');
  const pageSize = +(searchParams.get('pageSize') || '1');

  const handlePageChange = (page: number) => {
    setSearchParams({
      q: searchParams.get('q') || '',
      page: page.toString(),
      pageSize: searchParams.get('pageSize') || '10',
    });
  };

  const handleSearchChange = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSearchParams({
      q: searchText,
      page: '1',
      pageSize: searchParams.get('pageSize') || '10',
    });
  };

  return (
    <>
      <div className={layoutStyles.between}>
        <form onSubmit={handleSearchChange}>
          <InputGroup
            type="text"
            leftIcon={IconNames.SEARCH}
            style={{ width: 300 }}
            placeholder="Search ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            rightElement={<Button type="submit" icon={IconNames.ARROW_RIGHT} />}
          />
        </form>
        <Button
          icon={IconNames.PLUS}
          intent={Intent.PRIMARY}
          onClick={() => {
            setAddUserModalVisible(true);
          }}
        >
          Create user
        </Button>
      </div>
      <div>
        <table
          className={classNames(
            Classes.HTML_TABLE,
            Classes.HTML_TABLE_BORDERED,
            Classes.HTML_TABLE_STRIPED,
            styles.userTable,
            sizeStyles.wFull,
            spacingStyles.mt3,
          )}
        >
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>Admin</td>
              <td></td>
              <td>
                <Icon
                  icon={IconNames.FULL_CIRCLE}
                  intent={Intent.SUCCESS}
                  className={spacingStyles.mr2}
                />
                <span>Activated</span>
              </td>
              <td>
                <Button
                  intent={Intent.WARNING}
                  className={spacingStyles.mr2}
                  icon={IconNames.REFRESH}
                >
                  Reset password
                </Button>
                <Button intent={Intent.DANGER} icon={IconNames.DELETE}>
                  Deactivate
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={classNames(spacingStyles.mt3, layoutStyles.center)}>
          <Pagination
            page={page}
            pageSize={pageSize}
            totalEntries={88}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <AddUserModal
        visible={addUserModalVisible}
        onClose={() => {
          setAddUserModalVisible(false);
        }}
      />
    </>
  );
};

export default Users;
