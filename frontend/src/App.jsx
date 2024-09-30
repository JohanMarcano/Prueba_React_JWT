import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import NotFound from './pages/NotFound';
import MyNavbar from './components/MyNavbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';
import UserContext from './components/UserContext'; // Importar UserContext
import { UserProvider } from './components/UserProvider'; // Importar UserProvider
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <MyNavbar />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route 
              path='/profile' 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/login' 
              element={
                <UserContext.Consumer>
                  {({ token }) => (token ? <Navigate to="/" /> : <LoginPage />)}
                </UserContext.Consumer>
              }
            />
            <Route 
              path='/register' 
              element={
                <UserContext.Consumer>
                  {({ token }) => (token ? <Navigate to="/" /> : <RegisterPage />)}
                </UserContext.Consumer>
              }
            />
            <Route path='/cart' element={<Cart />} />
            <Route path='/pizza/:id' element={<Pizza />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </UserProvider>
  );
};

export default App;
