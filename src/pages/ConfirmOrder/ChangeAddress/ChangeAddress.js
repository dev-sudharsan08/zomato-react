import { useState, useEffect, useContext } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import { cardContext } from '../../../components/ContextAPI/ContextAPI';
// import ConfirmOrder from '../ConfirmOrder';

const ChangeAddress = () => {
  // const [inputAddress, setInputAddress] = useState('');
  const { setInputAddress, inputAddress } = useContext(cardContext);
  // console.log(inputAddress);
  const [addressType, setAddressType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  localStorage.setItem('userAddress', inputAddress);

  useEffect(() => {
    fetchApi('http://localhost:5000/chnageAddress', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setAddressType(resInJson);
          setError(false);
        } else {
          setAddressType({});
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

  // const handleInput = (e) => {
  //   setInputAddress(e);
  // }

  return (
    <>
      <div
        className='modal fade'
        id='ChangeAddressModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-content'>
          <div className='modal-header border-0'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Enter complete address
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <p>Save address as *</p>
            <div className='d-flex'>
              {addressType?.map((address) => {
                return (
                  <div key={address.id}>
                    <button className='btn border border-dark text-secondary me-3'>
                      {address.type}
                    </button>
                  </div>
                );
              })}
            </div>
            <form className='d-grid my-4'>
              <input
                type='text'
                placeholder='Current address *'
                className='p-2 rounded border border-secondary'
                onChange={(e) => setInputAddress(e.target.value)}
              />
              <input
                type='text'
                placeholder='Floor (optional)'
                className='my-3 p-2 rounded border border-secondary'
              />
              <input
                type='text'
                placeholder='Nearby landmark (optional)'
                className='p-2 rounded border border-secondary'
              />
              <button
                className='btn btn-danger mt-4'
                data-bs-toggle={inputAddress !== '' && 'modal'}
                data-bs-target={inputAddress !== '' && '#ConfirmOrderModal'}
                onClick={(e) => e.preventDefault()}>
                Save address
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <ConfirmOrder /> */}
    </>
  );
};

export default ChangeAddress;
