import { Button, ButtonGroup, Intent, Position } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Classes, Tooltip2 } from '@blueprintjs/popover2';
import layoutStyles from '@sharedStyling/layout.module.scss';
import spacingStyles from '@sharedStyling/spacing.module.scss';
import classnames from 'classnames';

interface Props {
  page: number;
  pageSize: number;
  totalEntries: number;
  onPageChange: (page: number) => void;
  handlePageSizeChange?: (pageSize: number) => void;
}

const Pagination = ({
  page = 0,
  pageSize = 0,
  totalEntries = 0,
  onPageChange,
}: Props) => {
  const totalPage = Math.ceil(totalEntries / pageSize);
  const pageList = [...Array(totalPage).keys()].map((_, i) => i + 1);

  const visiblePageList = [page - 2, page - 1, page, page + 1, page + 2].filter((p) =>
    pageList.includes(p),
  );

  const hasHeadEllipsis = page - 2 > 1;
  const hasTailEllipsis = page + 2 < totalPage;

  return (
    <div className={classnames(layoutStyles.row)}>
      <ButtonGroup className={spacingStyles.mr3}>
        <Tooltip2
          content="Jump to first page"
          position={Position.TOP}
          disabled={page === 1}
        >
          <Button
            icon={IconNames.DOUBLE_CHEVRON_LEFT}
            disabled={page === 1}
            onClick={() => onPageChange(1)}
          />
        </Tooltip2>
        <Tooltip2
          position={Position.TOP}
          content="Jump to previous page"
          disabled={page === 1}
        >
          <Button
            icon={IconNames.CHEVRON_LEFT}
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          />
        </Tooltip2>
        {hasHeadEllipsis && (
          <Button disabled minimal>
            ...
          </Button>
        )}
        {visiblePageList.map((i) => {
          return (
            <Button
              key={i}
              intent={page === i ? Intent.PRIMARY : Intent.NONE}
              onClick={() => {
                onPageChange(i);
              }}
            >
              {i}
            </Button>
          );
        })}
        {hasTailEllipsis && (
          <Button disabled minimal>
            ...
          </Button>
        )}
        <Tooltip2
          position={Position.TOP}
          content="Jump to next page"
          disabled={page === totalPage}
        >
          <Button
            disabled={page === totalPage}
            icon={IconNames.CHEVRON_RIGHT}
            onClick={() => {
              onPageChange(page + 1);
            }}
          />
        </Tooltip2>
        <Tooltip2
          content="Jump to last page"
          position={Position.TOP}
          disabled={page === totalPage}
        >
          <Button
            disabled={page === totalPage}
            icon={IconNames.DOUBLE_CHEVRON_RIGHT}
            onClick={() => {
              onPageChange(totalPage);
            }}
          />
        </Tooltip2>
      </ButtonGroup>
      <div>Total: {totalEntries}</div>
    </div>
  );
};
export default Pagination;
