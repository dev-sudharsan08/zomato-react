import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NightLifeSubHeader from '../../components/NightLifeSubHeader/NightLifeSubHeader';
import NightTimeRestaurants from './NightTimeRestaurants/NightTimeRestaurants';
import Accordian from '../../components/Accordian/Accordian';

const NightLifePage = () => {
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
      <div className='col-lg-3 col-md-4 col-sm-6 col-12 px-2 pb-3'>
        <div className='card text-white position-relative'>
          <img
            src='https://b.zmtcdn.com/data/collections/f141889a9c1564098ee6a9763a941d78_1675232834.jpg'
            className='card-img'
            alt='29 Best Bars & Pubs'
            height={320}
          />
          <div className='position-absolute bottom-0 px-3 py-2 card-wrapper'>
            <h5 className='card-title fw-normal'>29 Best Bars & Pubs</h5>
            <p className='card-text'>
              <small>
                27 Places
                <FontAwesomeIcon icon='fa-solid fa-caret-right' className='ms-1' />
              </small>
            </p>
          </div>
        </div>
      </div>
      <NightLifeSubHeader />
      <div className='card border-0'>
        <img
          src='https://b.zmtcdn.com/data/o2_assets/da94405b04f6ae6bf64a4e2a01b1b5c11686563732.png'
          className='card-img'
          alt='offerBanner'
        />
      </div>
      <h3 className='mt-4 mb-5 ms-3'>Nightlife Restaurants in Chennai</h3>
      <NightTimeRestaurants />
      <h3 className='my-4 ms-3'>Explore options near me</h3>
      <Accordian />
    </div>
  );
};

export default NightLifePage;
