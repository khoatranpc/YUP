import { Classes, H1, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import layout from '@sharedStyling/layout.module.scss';
import size from '@sharedStyling/size.module.scss';
import spacing from '@sharedStyling/spacing.module.scss';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 | Page not found</title>
      </Helmet>
      <div className={classNames(layout.center, layout.flexCol, size.hFull)}>
        <Icon
          size={36}
          className={classNames(Classes.TEXT_MUTED, spacing.mb2)}
          icon={IconNames.ERROR}
        />
        <H1 className={classNames(Classes.TEXT_MUTED, spacing.mb3)}>Page not found</H1>
        <Link to="/">Go to home</Link>
      </div>
    </>
  );
};

export default NotFoundPage;
