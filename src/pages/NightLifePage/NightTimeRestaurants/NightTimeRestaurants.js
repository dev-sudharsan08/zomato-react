import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import { cardContext } from '../../../components/ContextAPI/ContextAPI';

const NightTimeRestaurants = () => {
  const {
    setNightRestaurantFoodCardDetail,
    filteredNightRestaurant,
    sortByDistanceNightLife,
    sortByRestroTypeNightLife,
    sortByRatingNightLife,
    sortByPubsNightLife
  } = useContext(cardContext);
  const [nightRestaurants, setNightRestaurants] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/NightLife', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setNightRestaurants(resInJson);
          setNightRestaurantFoodCardDetail(resInJson);
          setError(false);
        } else {
          setNightRestaurants({});
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

  const nightTimeRestro = (restaurants) => {
    return (
      <div className='ol-lg-4 col-md-4 col-sm-6 col-12' key={restaurants.id}>
        <div className='card p-2 shadow mb-4 bg-body-tertiary rounded'>
          <div className='position-relative'>
            <a href='/cuisine-details'>
              <img
                src={restaurants.diningImg}
                className='card-img-top rounded-4'
                alt={restaurants.diningName}
                height={225}
              />
            </a>
            <div className='d-flex bg-dark text-center rounded-1 ms-2 text-light p-1 py-sm-0 p-md-1 text-center position-absolute bottom-0 start-0'>
              <img
                src='https://b.zmtcdn.com/data/o2_assets/9b1ff9e19b7fadea6c6a57e081a1f5ac1687776279.png'
                alt='offer-logo'
                height={18}
              />
              <p className='m-0 ms-2' style={{ fontSize: 12 }}>
                Flat{restaurants.offerInfo}% OFF
              </p>
            </div>
          </div>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <p className='card-title m-0 fs-5 product-title text-decoration-none text-start'>
                {restaurants.diningName}
              </p>
              <div className='d-flex bg-success rounded text-light px-1 text-end'>
                {restaurants.rating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light mt-2 ms-1'
                  style={{ fontSize: 9 }}
                />
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center mb-2'>
            <p className='text-secondary m-0 text-start'>{restaurants.cuisineName}</p>
            <p className='card-text text-secondary m-0 text-end'>₹{restaurants.price} for two</p>
            </div>
            <div className='d-flex justify-content-between align-items-center mb-2'>
            <p className='text-secondary m-0 text-start'>{restaurants.location}</p>
            <p className='text-secondary m-0 text-end'>{restaurants.distance} km</p>
            </div>
            <div>
              <p className='text-secondary m-0 text-danger'>{restaurants.opensAt}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='ms-2 row product-cards'>
      {filteredNightRestaurant.length > 0
        ? filteredNightRestaurant &&
          filteredNightRestaurant?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
        : sortByDistanceNightLife.length > 0
          ? sortByDistanceNightLife &&
          sortByDistanceNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
          : sortByRestroTypeNightLife.length > 0
            ? sortByRestroTypeNightLife &&
          sortByRestroTypeNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
            : sortByRatingNightLife.length > 0
              ? sortByRatingNightLife &&
          sortByRatingNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
              : sortByPubsNightLife.length > 0
                ? sortByPubsNightLife &&
          sortByPubsNightLife?.map((restaurants) => {
            return nightTimeRestro(restaurants);
          })
                : nightRestaurants.nightTimeRestaurants?.map((restaurants) => {
                  return nightTimeRestro(restaurants);
                })}
    </div>
  );
};

export default NightTimeRestaurants;
