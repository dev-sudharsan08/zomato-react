import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './SignUp.scss';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [accInfo, setAccInfo] = useState(false);
  // const [inputErrorMsg, setInputErrorMsg] = useState(false);
  const [nameInputErrorMsg, setNameInputErrorMsg] = useState(false);
  const [emailInputErrorMsg, setEmailInputErrorMsg] = useState(false);
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  // post userData to db
  const [isError, setIsError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: ''
  });
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (event) => {
    // posting use data
    signUpData.name = event.fullName;
    signUpData.email = event.email;
    setSignUpData({ ...signUpData });

    fetch('http://localhost:5000/signUpData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData)
    })
      .then((res) => {
        return res.json();
      })
      .then((resInJson) => {
        // capturing converted JSON res.
        console.log(resInJson);
        if (resInJson.statuscode !== 404) {
          setIsSaved(true);
          console.log(isSaved);
          setTimeout(() => setIsSaved(false), 2000);
          setIsError(false);
        } else {
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      })
      .finally(() => {});

    // resetting the input field values
    reset({ fullName: '', email: '' });
    console.log(isSaved);
    // name and email validation
    // event.preventDefault();
    nameInput === '' || emailInput === '' || !isValidEmail ? setAccInfo(false) : setAccInfo(true);
    // console.log(isValidEmail);
    nameInput === '' ? setNameInputErrorMsg(true) : setNameInputErrorMsg(false);
    emailInput === '' || !isValidEmail ? setEmailInputErrorMsg(true) : setEmailInputErrorMsg(false);
    // console.log(nameInput, emailInput, accInfo);
    // console.log(inputErrorMsg)
  };

  const getData = {
    userName: nameInput,
    userEmail: emailInput
  };
  localStorage.setItem('signUpDetails', JSON.stringify(getData));
  // if (localStorage.getItem('signUpDetails') === null) {
  //   localStorage.setItem('signUpDetails', JSON.stringify(getData));
  // }
  // if (localStorage.getItem('signUpDetails') === null || JSON.parse(localStorage.getItem('signUpDetails')).length === 0) {
  //   localStorage.setItem('signUpDetails', JSON.stringify(getData));
  // }

  function validateEmail(emailInput) {
    return emailRegex.test(emailInput);
  }
  const isValidEmail = validateEmail(emailInput);

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   nameInput === '' || emailInput === '' || !isValidEmail ? setAccInfo(false) : setAccInfo(true);
  //   // console.log(isValidEmail);
  //   nameInput === '' ? setNameInputErrorMsg(true) : setNameInputErrorMsg(false);
  //   emailInput === '' || !isValidEmail ? setEmailInputErrorMsg(true) : setEmailInputErrorMsg(false);
  //   // console.log(nameInput, emailInput, accInfo);
  //   // console.log(inputErrorMsg)
  // };

  const handleGoBackBtn = () => {
    setNameInput('');
    setEmailInput('');
    setAccInfo(false);
  };

  return (
    <div
      className='modal fade'
      id='signUpModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-content'>
        <div className='modal-header border-0 text-secondary'>
          <h1 className='modal-title fs-3' id='exampleModalLabel'>
            Sign up
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'></button>
        </div>
        <div className='modal-body'>
          {!accInfo && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type='text'
                  {...register('fullName')}
                  name='fullName'
                  className='form-control rounded mb-3 p-2 focus-out'
                  id='phoneNumber'
                  placeholder='Full Name'
                  required
                  onChange={(e) => setNameInput(e.target.value)}
                />
                {nameInput === '' && nameInputErrorMsg && (
                  <p className='text-danger'>Please Enter your Name</p>
                )}
                <input
                  type='text'
                  {...register('email')}
                  name='email'
                  className='form-control rounded mb-3 p-2 focus-out'
                  id='phoneNumber'
                  placeholder='Email'
                  required
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                {emailInput === '' && emailInputErrorMsg && (
                  <p className='text-danger'>Please Enter your Email</p>
                )}
                {emailInput !== '' && !isValidEmail && emailInputErrorMsg && (
                  <p className='text-danger'>Please Enter Valid Email</p>
                )}
                <div className='d-flex text-secondary'>
                  <div>
                    <input type='checkbox' id='check' className='ms-2 me-2' />
                  </div>
                  <div>
                    I agree to Zomatos
                    <span className='text-danger'> Terms of Service, Privacy Policy </span>and
                    <span className='text-danger'> Content Policies.</span>
                  </div>
                </div>
              </div>
              <div className='text-center my-3'>
                <button
                  className='border-0 bg-danger text-white rounded py-2 px-5'
                  // onClick={handleFormSubmit}
                >
                  Create account
                </button>
              </div>
              {isSaved
                ? (
                <div className='alert alert-success' data-testid='saveText'>
                  Saved Successfully!
                </div>
                  )
                : (
                    ''
                  )}
              {isError
                ? (
                <div className='alert alert-danger'>Some Error Occurred. Try again Later!</div>
                  )
                : (
                    ''
                  )}
            </form>
          )}
          {accInfo && (
            <div className='text-center'>
              <p className='text-success fw-bold'>Account Created Successfully</p>
              <p>
                You can continue to{' '}
                <span
                  type='button'
                  className='ms-1 text-danger'
                  data-bs-toggle='modal'
                  data-bs-target='#loginModal'>
                  Log in
                </span>
              </p>
              <button
                className='bg-warning border-0 rounded text-dark p-1 px-2'
                onClick={handleGoBackBtn}>
                Go back
              </button>
            </div>
          )}
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>or</div>
          <p
            id='message-text'
            type='button'
            className='text-center text-secondary border p-2 rounded my-3'>
            <FontAwesomeIcon icon='fa-brands fa-google' className='mx-2' /> Continue with Google
          </p>
          <p className='ms-2 fs-5 text-center m-0 mb-3'>
            Already have an account?
            <span
              type='button'
              className='text-danger ms-3'
              data-bs-toggle='modal'
              data-bs-target='#loginModal'>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
