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
  // If 10 or less: exactly your original 'hidden'. If > 10: switches to 'auto' to scroll
  tableContainer: (rowsPerPage) => ({
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: rowsPerPage > 10 ? 'auto' : 'hidden',
  }),
  // If 10 or less: exactly your original '100%'. If > 10: 'auto' so rows can expand down
  table: (rowsPerPage) => ({
    width: '100%',
    height: rowsPerPage > 10 ? 'auto' : '100%',
    tableLayout: 'fixed',
  }),
  tableHeader: {
    bgcolor: '#F8FAFC',
    '& th': { bgcolor: '#F8FAFC', color: '#1C2B46', fontWeight: 700, py: 1 },
  },
  // If 10 or less: exactly your original '100%'. If > 10: 'auto'
  tableBody: (rowsPerPage) => ({
    height: rowsPerPage > 10 ? 'auto' : '100%',
  }),
  // If 10 or less: exactly your original '10%'. If > 10: fixed 44px
  tableRow: (rowsPerPage) => ({
    height: rowsPerPage > 10 ? 44 : '10%',
    cursor: 'pointer',
    '& td': { py: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
    '&:hover': { bgcolor: '#F8FAFC' },
  }),
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