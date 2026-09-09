import { Box, Paper, Typography, Divider } from '@mui/material';
import { styles } from './AboutUs.styles';

function AboutUs() {
  return (
    <Box sx={styles.container}>
      <Paper elevation={2} sx={styles.paper}>
        <Typography variant="h4" sx={styles.title}>
          About Us
        </Typography>

        <Typography variant="body1" sx={styles.subtitle}>
          We are a team focused on making inventory management simple, organized, and efficient for businesses and organizations.
        </Typography>

        <Divider sx={styles.divider} />

        <Typography variant="h6" sx={styles.sectionTitle}>
          What We Offer
        </Typography>
        <Typography variant="body1" sx={styles.sectionBody}>
          Our platform allows users to easily add, update, delete, search, and filter products while keeping track of current stock levels.
        </Typography>

        <Typography variant="h6" sx={styles.sectionTitle}>
          Built for Flexibility and Reliability
        </Typography>
        <Typography variant="body1" sx={styles.sectionBody}>
          Built with the MERN stack, our application provides a responsive and user-friendly experience with reliable data management and error handling.
        </Typography>

        <Typography variant="h6" sx={styles.sectionTitle}>
          Our Vision
        </Typography>
        <Typography variant="body1" sx={styles.sectionBody}>
          Our goal is to create a simple and effective inventory management solution that can grow and adapt to the needs of different businesses.
        </Typography>
      </Paper>
    </Box>
  );
}

export default AboutUs;