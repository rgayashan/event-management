import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './redux/store';
import AppRoutes from './routes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

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
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
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
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;