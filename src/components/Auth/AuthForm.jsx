import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendRequest } from '../../hepers';
import { useAuthCtx } from '../../store/AuthContext';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  // contexto contextValues gavimas i ctx reiksme
  const ctx = useAuthCtx();
  const history = useHistory();

  // pridedame formik pie projekto
  // AuthForm pradedame valdyti su formik
  // pateikiant forma ispausdiname email ir password
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      email: 'mike@mike.com',
      password: '123456',
    },
    onSubmit: async (values) => {
      // register or login
      const regOrLogin = isLogin ? 'login' : 'register';
      console.log('values ===', values, 'mode', regOrLogin);

      // jei regOrLogin === register
      // tai url = https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        import.meta.env.VITE_API_KEY
      }`;

      if (regOrLogin === 'login') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          import.meta.env.VITE_API_KEY
        }`;
      }

      const [sendResult, postError] = await sendRequest(values, url);

      // jei turim klaidu
      if (postError) {
        console.warn('postError ===', postError);
        // if errro === '"EMAIL_EXISTS"' tai msg "toks email egzistuoja"
        formik.setErrors({
          password: postError.error.message,
        });
        return;
      }
      // nera klaidu gauti duomenys yra sendResult
      console.log('sendResult ===', sendResult);
      ctx.login(sendResult);
      // jei nera klaidu naviguojam i /profile puslapi
      history.push('/profile');
    },
  });
  // console.log('formik.errors ===', formik.errors);
  // console.log('VITE_API_KEY ===', import.meta.env);
  return (
    <section className={classes.auth}>
      <h2 style={{ color: 'white' }}>
        debug {formik.values.email} - {formik.values.password}
      </h2>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            type='email'
            id='email'
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            type='password'
            id='password'
            required
          />
          {formik.errors.password && (
            <p className={classes.errorP}>{formik.errors.password}</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
