import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';
import { cardContext } from '../../components/ContextAPI/ContextAPI';
import './HomePage.scss';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { loginState, PhoneNumber, userInfoParsed } = useContext(cardContext);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/branchs', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setLocation(resInJson);
          setError(false);
        } else {
          setLocation([]);
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
    return (
      <div
        className='spinner-border text-success position-absolute top-50 start-50 translate-middle'
        data-test-id='spinner'></div>
    );
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  const handleStorage = () => {
    localStorage.removeItem('signUpDetails');
    const userDetails = localStorage.getItem('signUpDetails');
    if (userDetails == null) {
      userInfoParsed.userName = '';
    }
    // window.location.reload(false);
  };

  return (
    <>
      <div className='zomato-header'>
        <nav className='navbar navbar-expand-md nav-container w-100'>
          <button
            className='navbar-toggler border-0 shadow-none'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <FontAwesomeIcon icon='fa-solid fa-bars' className='fs-3 text-white' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mb-2 mb-md-0 ms-auto text-white' style={{ fontSize: 18 }}>
              <li className='nav-item p-0 px-4 py-2'>Add restaurant</li>
              {!loginState && (
                <>
                  <li
                    type='button'
                    className='nav-item header-menu p-0 px-4 py-2'
                    data-bs-toggle='modal'
                    data-bs-target='#loginModal'>
                    Log in
                  </li>
                  <li
                    type='button'
                    className='nav-item p-0 px-4 py-2'
                    data-bs-toggle='modal'
                    data-bs-target='#signUpModal'>
                    Sign up
                  </li>
                </>
              )}
              {loginState && PhoneNumber.length > 0 && (
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle text-white  ms-3 me-md-5 pe-md-5'
                    to=''
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-circle-user'
                      className='fs-2 me-2'
                      style={{ verticalAlign: -10 }}
                    />
                    <span>{userInfoParsed.userName}</span>
                  </Link>
                  <ul className='dropdown-menu bg-transparent border-light ms-md-2 p-0'>
                    <li
                      className='dropdown-item text-white bg-transparent item-list p-0 py-2 ms-md-2'
                      type='button'
                      onClick={handleStorage}>
                      Log Out
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div className='text-wrapper'>
          <img
            src='https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png'
            alt='zomato-logo'
            className='zomato-logo'
          />
          <h1 className='text-white'>
            Find the best restaurants, cafes <br />
            and bars in india
          </h1>
        </div>
      </div>
      <div className='text-center location-para'>
        <h2 className='location-header'>
          Popular locations in &nbsp;
          <img
            src='https://b.zmtcdn.com/images/flags_z10/in.png?output-format=webp'
            alt='flag'
            style={{ width: 55, height: 35 }}
          />
          &nbsp; India
        </h2>
        <p className='fs-5 col-lg-9 mx-lg-auto location-description'>
          From swanky upscale restaurants to the cosiest hidden gems serving the most incredible
          food, Zomato covers it all. Explore menus, and millions of restaurant photos and reviews
          from users just like you, to find your next great meal.
        </p>
      </div>
      <div className='d-flex flex-wrap container mb-5 mt-5 states-container'>
        {location.states?.map((state) => {
          return (
            <div
              key={state.id}
              className='col-lg-4 col-md-4 col-sm-6 col-12 px-lg-2 px-md-2 px-sm-2 py-3'
              data-testid='keyId'>
              <div className='card rounded-3 shadow-sm'>
                <div className='card-body text-center d-flex justify-content-between'>
                  <a href='/cuisines' className='text-decoration-none text-dark'>
                    <span data-testid='stateId'>{state.stateName}</span>
                  </a>
                  <FontAwesomeIcon icon='fa-solid fa-chevron-down' className='mt-2' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className='container'>All Countries</h2>
      <div className='d-flex flex-wrap container mb-4 mt-3'>
        {location.countries?.map((countryName) => {
          return (
            <div key={countryName.id} className='col-lg-4 col-md-4 col-sm-6 col-12 px-2 py-3'>
              <div className='card rounded-3 card-content'>
                <div className='card-body d-flex justify-content-between'>
                  <div>
                    <img
                      src={countryName.flagImgUrl}
                      alt='flag'
                      width={42}
                      height={32}
                      className='me-2'
                    />
                    <span>{countryName.countryName}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <LogIn />
      <SignUp />
    </>
  );
};

export default HomePage;
