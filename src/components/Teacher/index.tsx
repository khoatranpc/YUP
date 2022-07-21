import { getTeachers } from '@apis/teacher';
import { Button, Classes, Icon, InputGroup, Intent, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import Avatar from '@components/shared/Avatar';
import layoutStyles from '@sharedStyling/layout.module.scss';
import sizeStyles from '@sharedStyling/size.module.scss';
import spacingStyles from '@sharedStyling/spacing.module.scss';
import classNames from 'classnames';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { OptionSearchTeacher, Teacher, TeacherStatus } from 'types/teacher';

import CreateTeacherModal from './AddTeacherModal';
import styles from './index.module.scss';
const TeacherPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [createTeacherModalVisible, setCreateTeacherModalVisible] = useState(false);

  const handleSearchChange = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    const res = await getTeachers();
    setTeachers(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <div>
      <Helmet>
        <title>Teachers | MindX Teaching Manager</title>
      </Helmet>
      <div className={layoutStyles.between}>
        <form onSubmit={handleSearchChange}>
          <InputGroup
            type="text"
            leftIcon={IconNames.SEARCH}
            style={{ width: 300 }}
            placeholder="Search ..."
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            rightElement={<Button type="submit" icon={IconNames.ARROW_RIGHT} />}
          />
          <ul
            className="listOptions"
            style={{ float: 'left', listStyle: 'none', padding: '0', margin: '0' }}
          >
            <input type="button" value="rateSalary" />
            <input type="button" value="centre" />
          </ul>
          <button style={{ float: 'right' }}>...</button>
        </form>
        <Button
          icon={IconNames.PLUS}
          intent={Intent.PRIMARY}
          onClick={() => {
            setCreateTeacherModalVisible(true);
          }}
        >
          Create teacher
        </Button>
      </div>
      {loading && <Spinner />}
      {!loading && (
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
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => {
                return (
                  <tr key={t._id}>
                    <td>
                      <Avatar src={t.imageUrl} />
                    </td>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>{t.phone}</td>
                    <td>
                      <TeacherStatusElm status={t.status} />
                    </td>
                    <td>
                      <Button icon={IconNames.INFO_SIGN}>View Detail</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <CreateTeacherModal
        visible={createTeacherModalVisible}
        onClose={() => {
          setCreateTeacherModalVisible(false);
        }}
      />
    </div>
  );
};

const TeacherStatusElm = ({ status }: { status: TeacherStatus }) => {
  const intent = useMemo(() => {
    switch (status) {
      case TeacherStatus.ACTIVE:
        return Intent.SUCCESS;
      case TeacherStatus.DEACTIVE:
        return Intent.DANGER;
      case TeacherStatus.PENDING:
        return Intent.WARNING;

      default:
        return undefined;
    }
  }, [status]);

  return (
    <>
      <Icon icon={IconNames.FULL_CIRCLE} intent={intent} className={spacingStyles.mr2} />
      <span>{status}</span>
    </>
  );
};

export default TeacherPage;
