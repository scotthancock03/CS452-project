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
    cursor: 'pointer',
    '& td': { py: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
    '&:hover': { bgcolor: '#F8FAFC' },
  },
  quantityChip: (qty) => ({
    bgcolor: qty <= 5 ? '#FCE8E6' : qty <= 15 ? '#FEF3D6' : '#E6F4EA',
    color: qty <= 5 ? '#C5221F' : qty <= 15 ? '#8F4B00' : '#137333',
    fontWeight: 700,
    height: 24,
  }),
  paginationBar: {
    bgcolor: '#EDF4FC',
    borderTop: '1px solid #D0E1F9',
    color: '#1C2B46',
    flexShrink: 0,
  },
  visuallyHidden,
};