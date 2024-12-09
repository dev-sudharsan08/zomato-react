import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { Outlet, useLocation } from 'react-router-dom';
import { cardContext } from '../ContextAPI/ContextAPI';
import './SecondaryHeader.scss';

const SecondaryHeader = () => {
  const { cart } = useContext(cardContext);
  const location = useLocation();
  const [nav, setNav] = useState(location.pathname);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/secondaryHeader', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setMenu(resInJson);
          setError(false);
        } else {
          setMenu([]);
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
  // console.log(nav);

  return (
    <>
      <nav className='navbar navbar-expand-md bg-light'>
        <div className='container'>
          <button
            className='navbar-toggler shadow-none'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse position-relative mt-2 mt-md-0' id='navbarNav'>
            <ul className='navbar-nav'>
              {menu?.map((items) => {
                return (
                  <li key={items.id} className='nav-item ms-2 mb-md-2 mb-md-0'>
                    <a
                      className={
                        items.link === nav
                          ? 'nav-link active fs-5 text-danger border-2 border-bottom border-danger menu-styles'
                          : 'nav-link text-secondary fs-5'
                      }
                      aria-current='page'
                      href={items.link}
                      onClick={() => {
                        // setMenuName(items.toolTip);
                        setNav(items.link);
                      }}>
                      <span
                        className={
                          // menuName === items.toolTip
                          items.link === nav
                            ? 'bg-warning-subtle rounded-circle py-4 px-1 me-2'
                            : 'bg-body-secondary rounded-circle py-4 px-1 me-2'
                        }>
                        <img
                          src={items.imgUrl}
                          alt={items.toolTip}
                          // width='80'
                          height='70'
                          className='p-3'
                        />
                      </span>
                      {items.toolTip}
                    </a>
                  </li>
                );
              })}
            </ul>
            <Outlet />
            <div className='position-absolute top-0 end-0 mt-4'>
              <button className='btn btn-secondary' type='button'>
                Food Cart ({cart.cartState?.length})
              </button>
            </div>
          </div>
        </div>
      </nav>
      <hr className='text-secondary m-0' />
    </>
  );
};

export default SecondaryHeader;
