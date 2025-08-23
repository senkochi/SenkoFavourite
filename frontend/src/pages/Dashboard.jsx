import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardTab from '../components/DashboardTab';
import OrdersTab from '../components/OrdersTab';



const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutPattern(props) {
  const { tab } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);


  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
      <AppProvider
        navigation={[{
            segment: 'admin/dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
          },
          {
            segment: 'admin/orders',
            title: 'Orders',
            icon: <ShoppingCartIcon />,
            pattern: 'orders{/:orderId}*',
          },
          {
            segment: 'admin/blog-request',
            title: 'Blog Requests',
            icon: <ShoppingCartIcon />,
            pattern: 'blog-request{/:requestId}*',
          },
        ]}
          theme={demoTheme}
      >
        <DashboardLayout>
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'orders' && <OrdersTab />}
          {tab === 'blog-request' && <div>Blog Requests Tab</div>}
        </DashboardLayout>
      </AppProvider>
  );
}


export default DashboardLayoutPattern;
