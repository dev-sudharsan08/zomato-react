import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import DiningOutSubHeader from '../../components/DiningOutSubHeader/DiningOutSubHeader';
import TrendingDinings from './TrendingDinings/TrendingDinings';
import Accordian from '../../components/Accordian/Accordian';
import './DiningOutPage.scss';

const DiningOutPage = () => {
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/diningOut', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setCollections(resInJson);
          setError(false);
        } else {
          setCollections({});
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

  // const maxLength = 20;
  // const str = 'Need to raise a PR, Before that take a pull';
  // const truncate = (str, maxLength) => {
  //   return str.length > maxLength ? str.slice(0, maxLength - 1) + '…' : str;
  // }
  // console.log(truncate(str, maxLength));

  const handleCollections = (items) => {
    return (
      <div key={items.id} className='col-lg-3 col-md-4 col-sm-6 col-12 px-2 pb-3'>
        <div className='card text-white position-relative'>
          <img
            src={items.bgImageUrl}
            className='card-img'
            alt={items.highlightedText}
            height={320}
          />
          <div className='position-absolute bottom-0 px-3 py-2 card-wrapper'>
            <h5 className='card-title fw-normal'>{items.highlightedText}</h5>
            <p className='card-text'>
              <small>
                {items.totalPlaces} Places{' '}
                <FontAwesomeIcon icon='fa-solid fa-caret-right' className='ms-1' />
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container my-3'>
      <h3 className='ms-2'>Collections</h3>
      <div className='d-flex justify-content-between mt-4'>
        <p className='ms-2'>
          Explore curated lists of top restaurants, cafes, pubs, and bars in Chennai, based on
          trends
        </p>
        <button className='pb-3'>
          <Link to='#' className='text-decoration-none text-danger'>
            All collections in Chennai
            <FontAwesomeIcon icon='fa-solid fa-caret-right' className='ms-2' />
          </Link>
        </button>
      </div>
      <div id='collectionsCarousel' className='carousel carousel-dark slide'>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='d-flex row-poster'>
              {collections.zomatoCollections?.map((items) => {
                return items.id <= 4 && handleCollections(items);
              })}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='d-flex row-poster'>
              {collections.zomatoCollections?.map((items) => {
                return items.id > 4 && handleCollections(items);
              })}
            </div>
          </div>
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#collectionsCarousel'
          data-bs-slide='prev'>
          <span className='carousel-control-prev-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#collectionsCarousel'
          data-bs-slide='next'>
          <span className='carousel-control-next-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
      <DiningOutSubHeader />
      <div className='card border-0'>
        <img
          src='https://b.zmtcdn.com/data/o2_assets/da94405b04f6ae6bf64a4e2a01b1b5c11686563732.png'
          className='card-img'
          alt='offerBanner'
        />
      </div>
      <h3 className='mt-4 mb-5 ms-3'>Trending dining restaurants in Chennai</h3>
      <TrendingDinings />
      <h3 className='my-4 ms-3'>Explore options near me</h3>
      <Accordian />
    </div>
  );
};

export default DiningOutPage;
