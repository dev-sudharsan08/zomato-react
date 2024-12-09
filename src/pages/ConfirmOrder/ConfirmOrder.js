import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ChangeAddress from './ChangeAddress/ChangeAddress';
import OrderInfo from './OrderInfo/OrderInfo';
import PropTypes from 'prop-types';
// import { cardContext } from '../../components/ContextAPI/ContextAPI';

const ConfirmOrder = ({ orderedItem, totalAmount, foodQuantity }) => {
  // const { inputAddress } = useContext(cardContext);
  const [feedDonationStatus, setFeedDonationStatus] = useState(0);
  const [toggleDonation, setToggleDonation] = useState(false);
  const [useZomatoCode, setUseZomatoCode] = useState(false);
  const feedingDonation = 2;
  const deliveryPartnerFee = 14;
  const zomatoCoupon = 50.0;
  const SubTotal = totalAmount + feedDonationStatus;
  const gstAmount = (SubTotal * 7) / 100; // (originalAmount * gst%) / 100
  const grandTotal = gstAmount + SubTotal + deliveryPartnerFee;
  const netPayable = (grandTotal - zomatoCoupon).toFixed(2); // toFixed(no.of.decimals) to fix the numbers after decimal point
  // console.log(feedDonationStatus);
  const [payMethod, setPayMethod] = useState({ icon: 'fa-brands fa-google-pay', method: 'G Pay' });
  const [btnLable, setBtnLable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const userAddress = localStorage.getItem('userAddress');
  // console.log(userAddress);

  useEffect(() => {
    fetchApi('http://localhost:5000/confirmOrder', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setBtnLable(resInJson);
          setError(false);
        } else {
          setBtnLable({});
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

  const handleDonation = () => {
    setToggleDonation(!toggleDonation);
    toggleDonation ? setFeedDonationStatus(0) : setFeedDonationStatus(feedingDonation);
  };

  return (
    <>
      <div
        className='modal fade'
        id='ConfirmOrderModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-content'>
          <div className='modal-header border-0'>
            <div className='modal-title' id='exampleModalLabel'>
              <span className='fs-5 text-dark fw-bold'>Mr/Mr.s someone</span>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body bg-light rounded'>
            <p className='border border-secondary-subtle p-2 rounded bg-white shadow-sm'>
              <FontAwesomeIcon icon='fa-solid fa-motorcycle' className='text-success me-2' />
              Delivery in <b>41 min</b>
            </p>
            <div className='hr-text label-l mt-3 mb-4 text-secondary'>ITEM(S) ADDED</div>
            <div className='d-flex justify-content-between border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
              <div>
                <FontAwesomeIcon icon='fa-regular fa-square-plus' />
                <span className='ms-2'>{orderedItem.cuisineName}</span>
                <div className='ms-4'>
                  <p className='m-0'>₹{totalAmount}</p>
                  <p className='m-0'>{foodQuantity}</p>
                  <button className='btn btn-sm p-0 text-danger'>+ Edit -</button>
                </div>
              </div>
              <div className='text-end'>
                <div className='border border-danger rounded shadow-sm'>
                  <button className='fs-4'>-</button>
                  <span className='mx-3'>1</span>
                  <button className='fs-4'>+</button>
                </div>
                <p className='m-0 mt-2'>₹{totalAmount}</p>
              </div>
            </div>
            {btnLable.addBtn?.map((lable) => {
              return (
                <div
                  key={lable.id}
                  className='border border-secondary-subtle p-2 rounded bg-white shadow-sm mt-2'>
                  <FontAwesomeIcon icon={lable.icon} />
                  <span className='ms-2'>{lable.btnLable}</span>
                  <FontAwesomeIcon icon='fa-solid fa-angle-right' className='float-end pt-1' />
                </div>
              );
            })}
            <div className='hr-text label-l mt-3 mb-4 text-secondary'>SAVINGS CORNER</div>
            <div className='border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
              <div className='d-flex justify-content-between'>
                <div>
                  <FontAwesomeIcon
                    icon='fa-solid fa-hand-holding-dollar'
                    className='text-primary me-2'
                  />
                  <span>Save ₹50 more on this order</span>
                </div>
                <div>
                  <button className='text-danger' onClick={() => setUseZomatoCode(!useZomatoCode)}>
                    Apply
                  </button>
                </div>
              </div>
              <p className='ms-4 border-bottom pb-2'>Code: ZOMATO</p>
              <p className='m-0 text-center'>
                View off coupons <FontAwesomeIcon icon='fa-solid fa-angle-right' />
              </p>
            </div>
            <div className='hr-text label-l mt-3 mb-4 text-secondary'>BILL SUMMARY</div>
            <div className='d-flex justify-content-between border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
              <div>
                <p className='m-0 mb-2'>Feeding India donation</p>
                <p>working towards a malnutrition free India</p>
              </div>
              <div>
                <input
                  type='checkbox'
                  value='price'
                  onClick={handleDonation}
                />
                <p className='m-0 mt-2 me-2'>₹2</p>
              </div>
            </div>
            <div className='border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
              {/* {btnLable.billSummaryData?.map((data) => {
                return (
                  <div
                    key={data.id}
                    className={
                      data.id === 3
                        ? ' border-bottom d-flex justify-content-between my-1 mb-3'
                        : 'd-flex justify-content-between my-1'
                    }>
                    <div>
                      <p className='m-0'>{data.lable}</p>
                      {data.id === 1 && (
                        <p className='m-0 text-secondary mb-2'>
                          Includes ₹2 Feeding India donation
                        </p>
                      )}
                      {data.id === 3 && (
                        <p className='m-0 text-secondary mb-2'>
                          Fully goes to them for their efforts
                        </p>
                      )}
                    </div>
                    <p>
                      {data.id === 1 && `₹ ${total + 2}`}
                      {data.id !== 1 && data.price}
                      {data.id === 4 && data.price}
                    </p>
                  </div>
                );
              })} */}
              <div className='d-flex justify-content-between'>
                <div>
                  <h5>Subtotal</h5>
                  <p className=''>Includes ₹2 Feeding Indian donation</p>
                </div>
                <p>₹{SubTotal}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <div>
                  <h6>GST</h6>
                </div>
                <p className=''>₹{gstAmount}</p>
              </div>
              <div className='d-flex justify-content-between border-bottom'>
                <div>
                  <h6>Delivery partner fee</h6>
                  <p className='m-0 pb-2'>Fully goes to them for their time and effort</p>
                </div>
                <p>₹{deliveryPartnerFee}</p>
              </div>
              <div className='d-flex justify-content-between mt-3'>
                <div>
                  <h6>Grand Total</h6>
                </div>
                <p>₹{grandTotal}</p>
              </div>
              {useZomatoCode && (
                <>
                  <div className='d-flex justify-content-between mt-3'>
                    <div>
                      <h6>Coupon - (ZOMATO)</h6>
                    </div>
                    <p>-₹{zomatoCoupon}</p>
                  </div>
                  <div className='d-flex justify-content-between mt-3'>
                    <div>
                      <h6>Net Payable</h6>
                    </div>
                    <p>₹{netPayable}</p>
                  </div>
                </>
              )}
            </div>
            <div className='d-flex justify-content-between border border-secondary-subtle rounded p-2 bg-white shadow-sm mb-3'>
              <div className='ms-2'>
                <FontAwesomeIcon icon='fa-solid fa-location-dot' className=' text-danger me-2' />
                <span>Delivery at Home</span>
                <p id='address' className='m-0 mt-3'>
                  Address :
                </p>
                <span className='m-0'>{userAddress}</span>
                {/* <span className='m-0'>19/1, Type 1 Block, Hcf quarters, Aavadi, Chennai - 62</span> */}
              </div>
              <div>
                <button
                  className='btn text-danger'
                  type='button'
                  data-bs-toggle='modal'
                  data-bs-target='#ChangeAddressModal'>
                  Change
                </button>
              </div>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <div className='btn-group ms-2 sortby'>
                {/* <div> */}
                <FontAwesomeIcon icon={payMethod.icon} className='mt-3 text-primary' />
                <button
                  className='btn btn-transparent dropdown-toggle mt-1'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  {payMethod.method}
                </button>
                {/* </div> */}
                <ul className='dropdown-menu shadow'>
                  {btnLable.paymentMethod?.map((method) => {
                    return (
                      <li className='p-1' key={method.id}>
                        <Link
                          className='dropdown-item text-secondary'
                          to='#'
                          onClick={() =>
                            setPayMethod({ icon: method.icon, method: method.method })
                          }>
                          <FontAwesomeIcon icon={method.icon} height={18} className='me-2' />
                          {method.method}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <button
                  className='btn btn-danger'
                  type='button'
                  data-bs-toggle='modal'
                  data-bs-target='#OrderInfoModal'>
                  <span>Total: ₹{useZomatoCode ? netPayable : grandTotal}</span>
                  <span className='ms-2 me-2'>Place Order</span>
                  <FontAwesomeIcon icon='fa-solid fa-caret-right' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangeAddress />
      <OrderInfo />
    </>
  );
};

ConfirmOrder.propTypes = {
  orderedItem: PropTypes.array,
  totalAmount: PropTypes.number,
  foodQuantity: PropTypes.string
};

export default ConfirmOrder;
