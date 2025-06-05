import { useState, useRef } from 'react';
import style from '../Auth.module.css';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axiosConfig from '../../../API/axiosConfig';
import { PuffLoader } from 'react-spinners';

const CreateAccount = ({ toggleAuth }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axiosConfig.post('/users/register', {
        email: emailRef.current.value.trim(),
        first_name: firstNameRef.current.value.trim(),
        last_name: lastNameRef.current.value.trim(),
        username: userNameRef.current.value.trim(),
        password: passwordRef.current.value,
      });
      console.log(response)

      // Optionally navigate or toggle to login page
      toggleAuth(); // or use navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${style.form__container} ${style.create}`}>
      <form className={style.form} onSubmit={handleCreateAccount}>
        <h1>Create Your Account</h1>
        <p>
          Already have an account?{' '}
          <Link to="/" onClick={toggleAuth} className={style.create__account}>
            Sign in
          </Link>
        </p>

        {error && (
          <div className={style.errorMessage}>
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        )}

        <div className={style.input__group}>
          <input ref={emailRef} type="email" placeholder="Email" required />
        </div>

        <div className={style.name__group}>
          <div className={style.input__group}>
            <input ref={firstNameRef} type="text" placeholder="First Name" required />
          </div>
          <div className={style.input__group}>
            <input ref={lastNameRef} type="text" placeholder="Last Name" required />
          </div>
        </div>

        <div className={style.input__group}>
          <input ref={userNameRef} type="text" placeholder="Username" required />
        </div>

        <div className={style.input__group}>
          <div className={style.password__wrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <span
              className={style.password__toggle}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        <button type="submit" className={style.join__button} disabled={isLoading}>
          {isLoading ? <PuffLoader color="#fff" size={20} /> : 'Agree and Join'}
        </button>

        <p className={style.terms}>
          I agree to the{' '}
          <Link to="/" className={style.create__account}>
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/" className={style.create__account}>
            Terms of Service
          </Link>.
        </p>

        <p>
          Already have an account?{' '}
          <Link to="/" onClick={toggleAuth} className={style.create__account}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
