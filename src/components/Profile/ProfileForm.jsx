import classes from './ProfileForm.module.css';
import { useState, useEffect } from 'react';
import { sendRequest } from '../../hepers';
import { useAuthCtx } from '../../store/AuthContext';

const ProfileForm = () => {
  const { token } = useAuthCtx();
  // susikurti state passwordui
  const [passwordValue, setPasswordValue] = useState('');
  // prijungti password su 2 way binding

  // sukurti handleSubmit funkicja
  const handleSubmit = async (e) => {
    // sutabdyti perkrovima
    e.preventDefault();

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
      import.meta.env.VITE_API_KEY
    }`;

    const sendObj = {
      idToken: token,
      password: passwordValue,
    };

    const [ats, err] = await sendRequest(sendObj, url);

    if (err) {
      console.log('err sendRequest ===', err);
      return;
    }
    // nera klaidos
    console.log('ats nera klaidos ===', ats);
  };

  useEffect(() => {
    // getUserInfo()
  }, []);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      new password - {passwordValue}
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          type='password'
          id='new-password'
        />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
