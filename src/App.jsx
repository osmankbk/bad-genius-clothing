import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { checkUserSession } from './store/user/user.action';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import CheckOutPage from './routes/checkout-page/checkout-page.component';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(checkUserSession())
    }, []);
  
  return (
    <Routes>
        <Route path='/' element={<Navigation />}> 
          <Route index element={<Home /> } />
          <Route path='auth' element={<Authentication /> } />
          <Route path='shop/*' element={<Shop />} />
          <Route path='checkout' element={<CheckOutPage />} />
        </Route>
    </Routes>
  );
}

export default App
