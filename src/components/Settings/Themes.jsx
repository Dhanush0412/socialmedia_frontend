import React from 'react';
import styles from "../../pages/Settings/Settings.module.css";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useTheme, useUpdateTheme } from '../../hooks/useSettings';

function Themes({ showSnackbar }) {
  const { data: themeData, isLoading } = useTheme();
  const updateThemeMutation = useUpdateTheme();

  const currentTheme = themeData?.theme || 'light';

  const handleThemeChange = async (theme) => {
    try {
      await updateThemeMutation.mutateAsync(theme);
      showSnackbar(`Theme changed to ${theme} mode`, 'success');
    } catch (error) {
      showSnackbar(error.message || 'Failed to update theme', 'error');
    }
  };

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
          Loading theme...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.contentWrapper}>
      <Typography variant="h6" className={styles.contentTitle}>
        Themes
      </Typography>
      <Typography variant="body2" color="textSecondary" className={styles.contentSubtitle}>
        Choose your preferred theme
      </Typography>

      <Box className={styles.themesContainer}>
        <Box className={styles.themeOption}>
          <Box className={styles.themePreview}>
            <Box className={`${styles.themeCard} ${currentTheme === 'light' ? styles.activeTheme : ''}`}>
              <Typography variant="body2">Light Mode</Typography>
              <Box className={styles.themeColors}>
                <Box className={styles.colorDot} style={{ backgroundColor: '#1976d2' }} />
                <Box className={styles.colorDot} style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }} />
                <Box className={styles.colorDot} style={{ backgroundColor: '#f5f5f5' }} />
              </Box>
            </Box>
            <Button
              variant={currentTheme === 'light' ? "contained" : "outlined"}
              onClick={() => handleThemeChange('light')}
              size="small"
              className={styles.themeSelectBtn}
              disabled={updateThemeMutation.isLoading}
            >
              {currentTheme === 'light' ? 'Active' : 'Select'}
            </Button>
          </Box>
        </Box>
        
        <Box className={styles.themeOption}>
          <Box className={styles.themePreview}>
            <Box className={`${styles.themeCard} ${currentTheme === 'dark' ? styles.activeTheme : ''}`} style={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
              <Typography variant="body2">Dark Mode</Typography>
              <Box className={styles.themeColors}>
                <Box className={styles.colorDot} style={{ backgroundColor: '#90caf9' }} />
                <Box className={styles.colorDot} style={{ backgroundColor: '#1e1e1e' }} />
                <Box className={styles.colorDot} style={{ backgroundColor: '#2d2d2d' }} />
              </Box>
            </Box>
            <Button
              variant={currentTheme === 'dark' ? "contained" : "outlined"}
              onClick={() => handleThemeChange('dark')}
              size="small"
              className={styles.themeSelectBtn}
              disabled={updateThemeMutation.isLoading}
            >
              {currentTheme === 'dark' ? 'Active' : 'Select'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Themes;