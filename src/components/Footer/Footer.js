import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import FooterMenu from '../FooterMenu/FooterMenu';
import './Footer.scss';

const Footer = () => {
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

  return (
    <div className='footer-wrapper'>
      <footer className='pt-5 pb-1 container'>
        <div className='d-lg-flex d-md-flex d-sm-flex justify-content-between'>
          <div>
            <img
              src='https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png?fit=around|198:42&crop=198:42;*,*'
              alt='logo'
              className='footer-logo'
            />
          </div>
          <div className='d-flex ms-lg-auto ms-md-auto'>
            <div className='dropup-center dropup mb-sm-2 me-sm-3 footer-dropdown'>
              <button
                className='btn btn-transparent border-dark dropdown-toggle'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <img
                  src='https://b.zmtcdn.com/images/flags_z10/in.png?output-format=webp'
                  alt='india'
                  width={30}
                  height={23}
                />
                <span className='ms-2'>India</span>
              </button>
              <ul className='dropdown-menu'>
                {footer.footerCountryDropdown.map((country) => {
                  return (
                    <li className='' key={country.id}>
                      <a className='dropdown-item' href='#'>
                        <img
                          src={country.countryFlagImgUrl}
                          alt='hi'
                          width={30}
                          height={23}
                          className='me-2'
                        />
                        {country.countryNames}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='dropup-center dropup mb-sm-5'>
              <button
                className='btn btn-transparent border-dark dropdown-toggle'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                English
              </button>
              <ul className='dropdown-menu'>
                {footer.languageDropdown.map((language) => {
                  return (
                    <li key={language.id}>
                      <a className='dropdown-item' href='#'>
                        {language.language}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <FooterMenu />
        <div className='border-top py-3 text-secondary'>
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy
          Policy and Content Policies. All trademarks are properties of their respective owners.
          2008-2023 © Zomato™ Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
