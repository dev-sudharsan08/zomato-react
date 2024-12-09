import { useState, useEffect } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OurSponsors = () => {
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/overview', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setRestaurant(resInJson);
          setError(false);
        } else {
          setRestaurant({});
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

  return (
    <>
      <div className='d-flex flex-wrap my-3'>
        {restaurant.ourSponsors?.map((sponsor) => {
          return (
            <div key={sponsor.id} className='me-3 mb-3'>
              <img
                src={sponsor.sponserImgUrl}
                alt={sponsor.sponserName}
                height={180}
                className='rounded mb-2'
              />
              <h4>{sponsor.sponserName}</h4>
              <span
                className='bg-success rounded text-light px-1 me-1 mt-2'
                style={{ width: 42, height: 26, fontSize: 16 }}>
                {sponsor.diningRating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light'
                  style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                />
              </span>
              <span>DINING</span>
              <span className='border-end border-dark ms-3 me-3'></span>
              <span
                className='bg-success rounded text-light px-1 me-1 mt-2'
                style={{ width: 42, height: 26, fontSize: 16 }}>
                {sponsor.deliveryRating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light'
                  style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                />
              </span>
              <span>DELIVERY</span>
              <p className='text-secondary mb-3'>{sponsor.foodVarieties}</p>
            </div>
          );
        })}
      </div>
      <p className='fs-5'>Similar restaurants</p>
      <div className='d-flex flex-wrap my-3'>
        {restaurant.similarRestaurants?.map((restro) => {
          return (
            <div key={restro.id} className='me-2'>
              <img
                src={restro.sponserUrl}
                alt={restro.restaurantName}
                height={200}
                className='rounded mb-2'
              />
              <h4>{restro.restaurantName}</h4>
              <span
                className='bg-success rounded text-light px-1 me-1 mt-2'
                style={{ width: 42, height: 26, fontSize: 16 }}>
                {restro.restroDiningRating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light'
                  style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                />
              </span>
              <span>DINING</span>
              <span className='border-end border-dark ms-1 me-1'></span>
              <span
                className='bg-success rounded text-light px-1 me-1 mt-2'
                style={{ width: 42, height: 26, fontSize: 16 }}>
                {restro.restroDeliveryRating}
                <FontAwesomeIcon
                  icon='fa-solid fa-star'
                  className='fs-n1 text-light'
                  style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                />
              </span>
              <span>DELIVERY</span>
              <p className='text-secondary mb-0'>{restro.foodTypes}</p>
              <p className='text-secondary mb-3'>{restro.location}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OurSponsors;
