import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoreFilters.scss';

const MoreFilters = () => {
  return (
    <form className='border border-secondary-subtle rounded mt-1'>
      <div>
        <span className='d-flex'>
          <button className='btn bg-white text-secondary focus-out' type='button'>
            <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
          </button>
          <input
            className='border-0 text-secondary p-2 rounded focus-out'
            type='search'
            style={{ width: 388 }}
            placeholder='Search for restaurant, cuisine or a dish'
            id='example-search-input'
          />
        </span>
      </div>
    </form>
  );
};

export default MoreFilters;
