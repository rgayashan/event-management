import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './redux/store';
import AppRoutes from './routes';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import SplashScreen from './components/common/SplashScreen';
import useSplashScreen from './hooks/useSplashScreen';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App: React.FC = () => {
  const isLoading = useSplashScreen(2000); // Shows splash screen for minimum 2 seconds

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={<SplashScreen />}>
            <div className="app" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh' 
            }}>
              <Header />
              <main style={{ flex: 1, padding: '24px 0' }}>
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;