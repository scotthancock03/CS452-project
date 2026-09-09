import { visuallyHidden } from '@mui/utils';

export const styles = {
  paperContainer: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    overflow: 'hidden',
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: '#EDF4FC',
    color: '#1C2B46',
    py: 1,
    px: 3,
    borderBottom: '1px solid #D0E1F9',
    flexShrink: 0,
  },
  tableContainer: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
  },
  table: {
    width: '100%',
    height: '100%',
    tableLayout: 'fixed',
  },
  tableHeader: {
    bgcolor: '#F8FAFC',
    '& th': { bgcolor: '#F8FAFC', color: '#1C2B46', fontWeight: 700, py: 1 },
  },
  tableBody: {
    height: '100%',
  },
  tableRow: {
    height: '10%',
    '& td': { py: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
    '&:hover': { bgcolor: '#F8FAFC' },
  },
  stockChip: (isPositive) => ({
    bgcolor: isPositive ? '#E6F4EA' : '#FCE8E6',
    color: isPositive ? '#137333' : '#C5221F',
    fontWeight: 700,
    height: 24,
  }),
  paginationBar: {
    bgcolor: '#EDF4FC',
    borderTop: '1px solid #D0E1F9',
    color: '#1C2B46',
    flexShrink: 0,
  },
  resizer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 5,
    cursor: 'col-resize',
    '&:hover, &:active': { bgcolor: '#1877F2' },
  },
  visuallyHidden,
};