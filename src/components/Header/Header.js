import PrimaryHeader from '../PrimaryHeader/PrimaryHeader';
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader';
import StickyOptions from '../StickyOptions/StickyOptions';
// import PropTypes from 'prop-types';

const Header = () => {
  const liveUrl = window.location.pathname;
  const homePath = '/';
  const cuisinePath = '/cuisines';
  const cuisineDetailPath = '/cuisine-details';
  // const dineOutPath = '/cuisines/dine-out';
  // const nightLifePath = '/cuisines/drinks-and-nightlife';
  console.log(liveUrl);

  return (
    <div>
      {liveUrl !== homePath && (
        <div>
          <PrimaryHeader />
        </div>
      )}
      {liveUrl !== cuisineDetailPath && liveUrl !== homePath && (
        <div>
          <SecondaryHeader />
        </div>
      )}
      {liveUrl === cuisinePath && (
        <div>
          <StickyOptions />
        </div>
      )}
    </div>
  );
};

// Header.propTypes = {
//   handleSearch: PropTypes.func
// };
export default Header;
