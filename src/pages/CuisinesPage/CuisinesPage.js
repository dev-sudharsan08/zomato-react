import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FoodItems from '../FoodItems/FoodItems';
import Accordian from '../../components/Accordian/Accordian';
import './CuisinesPage.scss';

const CuisinesPage = () => {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/cuisine', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFood(resInJson);
          setError(false);
        } else {
          setFood({});
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

  const handleCarousel = (items) => {
    return (
      <div key={items.id} className='carousal-width text-center'>
        <img
          src={items.foodImgUrl}
          alt={items.foodName}
          width={150}
          height={150}
          className='rounded-circle'
        />
        <h6 className='fs-5 text-secondary mt-3'>{items.foodName}</h6>
      </div>
    );
  };

  return (
    <div className='container mb-4'>
      <div className='mb-5 mt-4 bg-light px-2 py-1'>
        <div className='position-relative'>
          <h3 className='my-4 ms-3'>Inspiration for your first order</h3>
          <div id='favItemsCarousel' className='carousel carousel-dark slide'>
            <div className='carousel-inner'>
              <div className='carousel-item active'>
                <div className='d-flex justify-content-between mx-2'>
                  {food.sampleFood?.map((items) => {
                    return items.id <= 6 && handleCarousel(items);
                  })}
                </div>
              </div>
              <div className='carousel-item'>
                <div className='d-flex justify-content-between mx-2'>
                  {food.sampleFood?.map((items) => {
                    return items.id > 6 && handleCarousel(items);
                  })}
                </div>
              </div>
            </div>
            <button
              className='carousel-control-prev'
              type='button'
              data-bs-target='#favItemsCarousel'
              data-bs-slide='prev'>
              <span className='carousel-control-prev-icon' aria-hidden='true'></span>
              <span className='visually-hidden'>Previous</span>
            </button>
            <button
              className='carousel-control-next'
              type='button'
              data-bs-target='#favItemsCarousel'
              data-bs-slide='next'>
              <span className='carousel-control-next-icon' aria-hidden='true'></span>
              <span className='visually-hidden'>Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className='position-relative'>
        <h3 className='my-4 ms-3'>Top brands for you</h3>
        <FontAwesomeIcon
          icon='fa-solid fa-angle-left'
          className='bg-white p-3 text-center rounded-pill position-absolute top-50 start-0'
        />
        <div className='row-poster px-3'>
          {food.brands?.map((name) => {
            return (
              <div key={name.id} className='me-5 ms-3 text-center'>
                <span className='rounded-circle border border-light-subtle shadow py-5 px-1'>
                  <img
                    src={name.brandImgUrl}
                    alt={name.brandName}
                    height={100}
                    className='m-3 py-2'
                  />
                </span>
                <p className='text-center m-0 mt-2'>{name.brandName}</p>
                <p className='text-center text-secondary m-0 mt-1'>{name.deliveryTimePeriod}</p>
              </div>
            );
          })}
        </div>
        <FontAwesomeIcon
          icon='fa-solid fa-angle-right'
          className='bg-white p-3 text-center rounded-pill position-absolute top-50 end-0'
        />
      </div>
      <h3 className='my-4 ms-3'>Best Food in Chennai</h3>
      <FoodItems />
      <h3 className='ms-3 mt-5'>Popular localities in and around Chennai</h3>
      <div className='d-flex flex-wrap container mb-4 mt-3'>
        {food.popularLocalities?.map((area) => {
          return (
            <div key={area.id} className='col-lg-4 col-md-4 col-sm-6 col-12 px-2 py-3'>
              <div className='card rounded-3 card-content'>
                <div className='card-body d-flex justify-content-between'>
                  <div>
                    <p className='m-0' style={{ fontSize: 19 }}>
                      {area.area}
                    </p>
                    <p className='m-0 text-secondary'>{area.noOfRestaurants}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon='fa-solid fa-chevron-right'
                      className='ms-3 mt-3'
                      style={{ fontSize: 12 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className='ms-3 mb-4'>Explore options near me</h3>
      <Accordian />
    </div>
  );
};

export default CuisinesPage;
