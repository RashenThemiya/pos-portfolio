import { useLang } from '../../i18n/LangContext';
import { tableDefinitions } from '../../data/screens';
import { DataTable } from './DataTable';
import { ScreenBox } from './ScreenBox';

export function TablePane({ kind }) {
  const { t } = useLang();
  const { title, headers, rows } = t.screens[kind];
  const { columnClasses, statuses } = tableDefinitions[kind];
  return (
    <ScreenBox title={title}>
      <DataTable headers={headers} rows={rows} columnClasses={columnClasses} minWidth="620px"
        renderCell={(value, column, row) => column === headers.length - 1
          ? <span className={'chip' + (statuses[row] ? ' ' + statuses[row] : '')}>{value}</span> : value} />
    </ScreenBox>
  );
}
