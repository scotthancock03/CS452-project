import { visuallyHidden } from '@mui/utils';

export const styles = {
  paperContainer: {
    p: 0, // Removes outer inner whitespace completely
    borderRadius: 2,
    width: '100%',
    margin: '0 auto',
    overflow: 'hidden', // Keeps header/footer rounded corners matching the container
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 0,
    backgroundColor: '#1877F2', // Facebook Primary Blue
    color: '#ffffff',
    py: 1.25,
    px: 2, // Matches internal padding so text aligns flush with table bounds
    borderRadius: 0, // Border radius handled by paperContainer overflow:hidden
  },
  headerSpacer: {
    width: 40,
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
    fontSize: '1.3rem',
    color: '#ffffff',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto', // Lets container grow dynamically with rows
    overflowY: 'auto', // Scrollbar will only appear if rows exceed outer layout height
  },
  tableHeader: {
    backgroundColor: '#EDF4FC', // Soft slate ice-blue header
    '& th': {
      backgroundColor: '#EDF4FC',
      color: '#1C2B46',          // Dark contrast text for readability
    },
    '& .MuiTableSortLabel-root': {
      color: '#1C2B46 !important',
      '&:hover': {
        color: '#1877F2 !important',
      },
      '&.Mui-active': {
        color: '#1877F2 !important',
        '& .MuiTableSortLabel-icon': {
          color: '#1877F2 !important',
        },
      },
    },
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    position: 'relative',
    userSelect: 'none',
    py: 0.85,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderBottom: '2px solid #D0E1F9',
  },
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
    '& td, & th': {
      py: 0.55,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '&:hover': {
      backgroundColor: '#F7FAFC',
    },
  },
  paginationBar: {
    backgroundColor: '#EDF4FC', // Seamlessly matches the table header
    borderTop: '2px solid #D0E1F9',
    color: '#1C2B46',
    borderRadius: '0 0 8px 8px',
    mb: 0,
    pb: 0.75, // Tiny amount of bottom padding for visual balance
    '& .MuiTablePagination-root': {
      p: 0,
      m: 0,
    },
    '& .MuiTablePagination-toolbar': {
      minHeight: '44px',
      py: 0,
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select, & .MuiTablePagination-selectIcon': {
      color: '#1C2B46',
    },
    '& .MuiIconButton-root': {
      color: '#1877F2',
      p: 0.5,
      '&.Mui-disabled': {
        color: '#A0B2C6',
      },
    },
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '30vh',
  },
  emptyCell: {
    py: 2.5,
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
  },
  resizer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '5px',
    cursor: 'col-resize',
    userSelect: 'none',
    touchAction: 'none',
    '&:hover, &:active': {
      backgroundColor: '#1877F2',
    },
  },
  visuallyHidden: visuallyHidden,
};