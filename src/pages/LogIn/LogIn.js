import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { cardContext } from '../../components/ContextAPI/ContextAPI';
// import { Link } from 'react-router-dom';
import './LogIn.scss';

const LogIn = () => {
  const { setLoginState } = useContext(cardContext);
  const [countryName, setCountryName] = useState({});
  // const [modal, setModal] = useState(false);
  const [countryCodesorting, setCountryCodeSorting] = useState({ flag: 'https://b.zmtcdn.com/images/flags_z10/in.png?output-format=webp', code: '+91' });
  const [mobileNumInput, setMobileNumInput] = useState(0);
  const [enterOtp, setEnterOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [inputErrorMsg, setInputErrorMsg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  localStorage.setItem('Ph.no', mobileNumInput);

  const handleInput = (event) => {
    event.preventDefault();
    mobileNumInput.length > 9 ? setEnterOtp(true) : setEnterOtp(false);
    mobileNumInput.length > 9 ? setInputErrorMsg(false) : setInputErrorMsg(true);
  };

  useEffect(() => {
    fetchApi('http://localhost:5000/countryDropdownForm', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setCountryName(resInJson);
          setError(false);
        } else {
          setCountryName({});
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='spinner-border text-success invisible' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  const handleConfirmBtn = () => {
    setInputErrorMsg(true);
    setLoginState(true);
  }

  return (
    <div
      className='modal fade'
      id='loginModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-content login-modal'>
        <div className='modal-header border-0 text-secondary'>
          <h1 className='modal-title fs-3' id='exampleModalLabel'>
            Login
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'></button>
        </div>
        <div className='modal-body'>
          {!enterOtp && (
            <form className='dropdown'>
              <div className='border rounded px-2 py-1'>
                <img
                  src={countryCodesorting.flag}
                  alt='flag'
                  height={20}
                />
                <button
                  className='btn btn-transparent border-0 dropdown-toggle text-secondary'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  {countryCodesorting.code}
                </button>
                <ul className='dropdown-menu drop'>
                  {countryName.countryName?.map((country) => {
                    return (
                      <li
                        key={country.id}
                        onClick={() => {
                          setCountryCodeSorting({ flag: country.flagUrl, code: country.callCode });
                        }}>
                        <a className='dropdown-item d-flex' href='#'>
                          <div>
                            <img
                              src={country.flagUrl}
                              alt={country.alt}
                              height={20}
                              className='me-2'
                            />
                            <span className='me-2'>{country.country}</span>
                          </div>
                          <div className='border-start'>
                            <span className='ms-2'>{country.callCode}</span>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <input
                  maxLength={10}
                  autoComplete='off'
                  className='border-0 text-secondary p-2 focus-out border-start border-2'
                  id='phoneNumber'
                  placeholder='Phone'
                  onChange={(e) => {
                    setMobileNumInput(e.target.value.replace(/\D/g, ''));
                    setInputErrorMsg(false);
                  }}
                />
              </div>
              <div className='d-block text-center'>
                {mobileNumInput.length < 10 && inputErrorMsg && (
                  <p className='text-danger m-0'>Incorrect Mobile number</p>
                )}
                <button
                  className='border-0 rounded py-2 px-5 mt-4 bg-danger text-white'
                  onClick={handleInput}>
                  Send One Time Password
                </button>
              </div>
            </form>
          )}
          {enterOtp && (
            <div className='text-center'>
              We have sent an OTP to the mobile number
              <p className='mt-3'>Enter Your OTP Below</p>
              <input
                type='text'
                maxLength={4}
                onChange={(e) => setOtp(e.target.value) || setInputErrorMsg(false)}
              />
              <button className='text-primary fw-bold ms-2 border-0' style={{ fontSize: 12 }}>
                Resend OTP
              </button>
              <div className='mt-3'>
                {otp.length <= 3 && inputErrorMsg && (
                  <p className='text-danger'>Please enter correct OTP</p>
                )}
                <button
                  className='btn btn-danger border-0 rounded text-white me-3'
                  onClick={() => setEnterOtp(false)}>
                  Reset Mobile Number
                </button>
                <button
                  // to={otp.length > 3 ? '/cuisines' : '#'}
                  className='border-0 rounded text-white btn btn-success'
                  onClick={handleConfirmBtn}>
                  Confirm
                </button>
              </div>
            </div>
          )}
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>or</div>
          <div className='mb-3'>
            {countryName.continueWithBtn?.map((btnName) => {
              return (
                <div
                  key={btnName.id}
                  id='message-text'
                  type='button'
                  className='text-center text-secondary border p-2 rounded my-3'>
                  <FontAwesomeIcon icon={btnName.icon} className='mx-2 text-danger' />
                  {btnName.btnText}
                </div>
              );
            })}
          </div>
        </div>
        <div className='text-secondary p-3 text-center border-top'>
          New to Zomato?
          <span
            type='button'
            className='ms-3 text-danger'
            data-bs-toggle='modal'
            data-bs-target='#signUpModal'>
            Create account
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
