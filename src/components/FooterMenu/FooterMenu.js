import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import './FooterMenu.scss';
const FooterMenu = () => {
  const [footer, setFooter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/footerItems', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFooter(resInJson);
          setError(false);
        } else {
          setFooter([]);
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

  const footerMenu = (value) => {
    return (
      <ul className='nav flex-column' key={value.id}>
        <li className='nav-item mb-2'>
          <a href='#' className='nav-link p-0 text-body-secondary'>
            {value.menu}
          </a>
        </li>
      </ul>
    );
  };

  return (
    <div className='d-flex flex-wrap justify-content-sm-between footer-menu'>
      <div className=''>
        <h6>ABOUT ZOMATO</h6>
        {footer.aboutZomato.map((value) => {
          return footerMenu(value);
        })}
      </div>
      <div className=''>
        <h6>ZOMAVERSE</h6>
        {footer.zomaverse.map((value) => {
          return footerMenu(value);
        })}
      </div>
      <div className=''>
        <h6>FOR RESTAURANTS</h6>
        {footer.forRestaurants.map((value) => {
          return footerMenu(value);
        })}
        <ul className='nav flex-column'>
          <h6 className='mt-4'>FOR RESTAURANTS</h6>
          <ul className='nav flex-column'>
            <li className='nav-item mb-2'>
              <a href='#' className='nav-link p-0 text-body-secondary'>
                Zomato For Enterprise
              </a>
            </li>
          </ul>
        </ul>
      </div>
      <div className=''>
        <h6>LEARN MORE</h6>
        {footer.learnMore.map((value) => {
          return footerMenu(value);
        })}
      </div>
      <div className='d-none d-sm-block my-lg-0 my-sm-3'>
        <h6>SOCIAL LINKS</h6>
        <div className='d-flex'>
          {footer.socialMediaIcons?.map((icon) => {
            return (
              <ul className='nav' key={icon.id}>
                <li className='nav-item  me-2 mb-3'>
                  <a href='#' className='nav-link p-0 text-body-secondary'>
                    <FontAwesomeIcon icon={icon.icon} className='fs-4 text-dark' />
                  </a>
                </li>
              </ul>
            );
          })}
        </div>
        <ul className='nav flex-row'>
          {footer.socialMediaImg.map((socialMedia) => {
            return (
              <li className='nav-item mb-2 me-2' key={socialMedia.id}>
                <a href='#' className='nav-link p-0 text-body-secondary'>
                  <img src={socialMedia.imgUrl} alt={socialMedia.alt} width={120} height={35} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FooterMenu;
