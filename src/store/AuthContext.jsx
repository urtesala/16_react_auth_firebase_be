import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({
  login({ token, email }) {},
  logout() {},
  isUserLoggedIn: false,
  token: '',
});

AuthContext.displayName = 'Auth-context';

const tokenName = 'firebaseToken';

function AuthContextProvider(props) {
  // localStorage yra sinchroninis
  const tokenFromStorage = localStorage.getItem(tokenName);
  const emailFromStorage = localStorage.getItem('email');
  const [token, setToken] = useState(tokenFromStorage);
  const [emailValue, setEmailValue] = useState(emailFromStorage);
  const isUserLoggedIn = !!token;

  const login = ({ token, email }) => {
    setToken(token);
    localStorage.setItem(tokenName, token);
    setEmailValue(email);
    localStorage.setItem('email', email);
  };
  const logout = () => {
    setToken('');
    localStorage.removeItem(tokenName);
    localStorage.removeItem('email');
  };

  const contextValue = {
    login,
    logout,
    isUserLoggedIn,
    token,
    email: emailValue,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

// custon useAuthCtx hook 2 lvl burtas
export function useAuthCtx() {
  return useContext(AuthContext);
}
