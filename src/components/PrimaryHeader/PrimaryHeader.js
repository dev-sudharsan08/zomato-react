import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import LogIn from '../../pages/LogIn/LogIn';
import SignUp from '../../pages/SignUp/SignUp';
// import PropTypes from 'prop-types';
import { cardContext } from '../ContextAPI/ContextAPI';
import './PrimaryHeader.scss';

const PrimaryHeader = () => {
  const {
    loginState,
    userInfoParsed,
    foodCardDetail,
    setFilteredFood,
    restaurantFoodCardDetail,
    setFilteredRestaurant,
    NightRestaurantCardDetail,
    setFilteredNightRestaurant
  } = useContext(cardContext);
  // console.log(foodCardDetail);
  // console.log(restaurantFoodCardDetail);

  const [primaryMenuBtn, setPrimaryMenuBtn] = useState([]);
  console.log(primaryMenuBtn);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/primaryHeader', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setPrimaryMenuBtn(resInJson);
          setError(false);
        } else {
          setPrimaryMenuBtn([]);
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

  const handleSearch = (e) => {
    const searchText = e.target.value;
    const searchFilter = foodCardDetail.foodItems?.filter((word) => {
      return word.cuisineName.toLowerCase().includes(searchText.toLowerCase());
    });
    // console.log(searchFilter);
    setFilteredFood(searchFilter);
    const searchRestaurantFilter = restaurantFoodCardDetail.trendingDinings?.filter((word) => {
      return word.diningName.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredRestaurant(searchRestaurantFilter);
    const searchNightRestaurantFilter = NightRestaurantCardDetail.nightTimeRestaurants?.filter(
      (word) => {
        return word.diningName.toLowerCase().includes(searchText.toLowerCase());
      }
    );
    setFilteredNightRestaurant(searchNightRestaurantFilter);
  };

  return (
    <>
      <nav className='navbar navbar-expand-md bg-body-tertiary'>
        <div className='container'>
          {/* <div className='container'> */}
          <a className='navbar-brand' href='#'>
            <img
              src='https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png'
              alt='Bootstrap'
              width='125'
              height='30'
            />
          </a>
          <button
            className='navbar-toggler shadow-none'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <FontAwesomeIcon icon='fa-solid fa-circle-user' className='fs-2' />
          </button>
          <div
            className='collapse navbar-collapse mt-2 mt-md-0 nav-container'
            id='navbarSupportedContent'>
            <ul className='navbar-nav mb-2 mb-md-0 ms-md-2 location-search-input'>
              <li className='nav-item rounded-start py-md-1 list-styles'>
                <a
                  className='nav-link dropdown-toggle pe-md-3 ms-3 ms-md-3'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-location-dot'
                    className='me-2 fs-5 text-danger'
                  />
                  Chennai
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <a className='dropdown-item' href='#'>
                      <FontAwesomeIcon
                        icon='fa-solid fa-location-crosshairs'
                        className='me-2 text-danger'
                      />
                      Detect current location
                      <br />
                      <div className='ms-4'>using GPS</div>
                    </a>
                  </li>
                </ul>
              </li>
              <form className='d-flex form-styles mt-2 mt-md-0' role='search'>
                <button
                  className='btn bg-white text-secondary rounded-0 focus-out ps-3 ps-md-4'
                  type='button'>
                  <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
                </button>
                <input
                  className='border-0 text-secondary p-2 focus-out form-input-styles'
                  type='search'
                  style={{ width: 450 }}
                  placeholder='Search for restaurant, cuisine or a dish'
                  onKeyUp={(e) => handleSearch(e)}
                />
              </form>
            </ul>
            <ul className='d-block d-md-flex mb-0 list-unstyled ms-auto' style={{ fontSize: 18 }}>
              {!loginState &&
                primaryMenuBtn?.map((btn) => {
                  return (
                    <li
                      key={btn.id}
                      className={btn.id === 1 ? 'nav-item ms-md-2' : 'nav-item ms-md-3'}
                      type='button'
                      // className='btn btn-transparent'
                      data-bs-toggle='modal'
                      data-bs-target={btn.id === 1 ? '#loginModal' : '#signUpModal'}>
                      <a className='nav-link text-secondary' href='#' role='button'>
                        {btn.btnText}
                      </a>
                    </li>
                  );
                })}
              {loginState && (
                <li className='nav-item p-1 ms-4 text-secondary'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-circle-user'
                    className='fs-2 me-2'
                    style={{ verticalAlign: -10 }}
                  />
                  <span>{userInfoParsed.userName}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <LogIn />
      <SignUp />
    </>
  );
};

// PrimaryHeader.propTypes = {
//   handleSearch: PropTypes.func
// };

export default PrimaryHeader;
