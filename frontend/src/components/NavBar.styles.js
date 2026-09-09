export const styles = {
  appBar: {
    bgcolor: '#1877F2',
    width: '100%',
    height: 64,
    borderRadius: 0,
    boxShadow: 'none',
    mb: 0,
    flexShrink: 0,
  },
  toolbar: {
    justifyContent: 'space-between',
    px: '3%',
    minHeight: '100%',
    height: '100%',
    py: 0,
  },
  logo: {
    fontWeight: 700,
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.25rem',
    whiteSpace: 'nowrap',
  },
  navLinksContainer: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
    flexShrink: 0,
  },
  navButton: (isActive) => ({
    color: '#fff',
    fontWeight: isActive ? 700 : 500,
    textTransform: 'none',
    whiteSpace: 'nowrap',
    px: 3,
    height: '100%',
    borderRadius: 0,
    bgcolor: isActive ? '#1465CC' : 'transparent',
    '&:hover': {
      bgcolor: '#0E56B3',
    },
  }),
};