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
  tableContainer: (rowsPerPage) => ({
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: rowsPerPage > 10 ? 'auto' : 'hidden',
  }),
  table: (rowsPerPage) => ({
    width: '100%',
    height: rowsPerPage > 10 ? 'auto' : '100%',
    tableLayout: 'fixed',
  }),
  tableHeader: {
    bgcolor: '#F8FAFC',
    '& th': { bgcolor: '#F8FAFC', color: '#1C2B46', fontWeight: 700, py: 1 },
  },
  tableHeaderCell: {
    position: 'relative',
  },
  tableBody: (rowsPerPage) => ({
    height: rowsPerPage > 10 ? 'auto' : '100%',
  }),
  tableRow: (rowsPerPage) => ({
    height: rowsPerPage > 10 ? 44 : '10%',
    '& td': { py: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
    '&:hover': { bgcolor: '#F8FAFC' },
  }),
  stockChip: (isPositive) => ({
    bgcolor: isPositive ? '#E6F4EA' : '#FCE8E6',
    color: isPositive ? '#137333' : '#C5221F',
    fontWeight: 700,
    fontSize: '0.75rem',
    height: 24,
  }),
  categoryChip: {
    bgcolor: '#F1F5F9',
    color: '#334155',
    fontWeight: 500,
    fontSize: '0.75rem',
    height: 24,
  },
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