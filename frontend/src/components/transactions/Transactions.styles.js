import { visuallyHidden } from '@mui/utils';

export const styles = {
  paperContainer: {
    p: 1.75,
    borderRadius: 2,
    width: '98%',
    margin: '0 auto',
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 0.75,
  },
  headerSpacer: {
    width: 40,
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
    fontSize: '1.3rem',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '65vh', // Restricts container height to enable internal scroll
    overflowY: 'auto',
  },
  tableHeader: {
    '& th': {
      backgroundColor: (theme) => theme.palette.background.paper, // Keeps sticky header background opaque
    },
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    position: 'relative',
    userSelect: 'none',
    py: 0.65,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
    '& td, & th': {
      py: 0.4,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
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
      backgroundColor: 'primary.main',
    },
  },
  visuallyHidden: visuallyHidden,
};