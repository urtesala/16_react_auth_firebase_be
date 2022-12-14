import { Route } from 'react-router-dom';
import NotAuthorised from '../pages/NotAuthorised';
import { useAuthCtx } from './../store/AuthContext';

function ProtectedRoute({ children, ...restOfProps }) {
  const { isUserLoggedIn } = useAuthCtx();
  return (
    <Route {...restOfProps}>
      {isUserLoggedIn ? children : <NotAuthorised />}
    </Route>
  );
}
export default ProtectedRoute;
