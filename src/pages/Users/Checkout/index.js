import './checkout.css'
import '../Product_Details/Product_details.css'
import '../Cart/Cart.css'

import {SelectCityDistrict} from '../../../components/Method'

import { AiOutlineRight} from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../API/axios';
import React, { useState, useEffect } from 'react';

function Checkout() {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };
    const navigate = useNavigate();

    //for main content
    const [userData, setUserData] = useState({
        fullname: '',
        phone_num: '',
        address: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/user/id/', config);
                const user = response.data.user[0];

                setUserData({
                    ...user
                })
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    //for bill content
    const transportFee = 3;
    const location = useLocation();
    const note = location.state ? location.state.note : null;
    const total = location.state ? location.state.total : null;
    const totalBill = total + transportFee;
    
    const [billItem, setBillItem] = useState([]);
    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm trong giỏ hàng và gán vào cartItem
        axios.get('/order-detail/id/', config)
            .then((response) => {
                setBillItem(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    //payment func
    const handlePay = ()=>{
        try {
            axios.post('/order/add/',{
                note: note,
                total: totalBill
            }, config)
                .then((response) => {
                    navigate('/pay-noti')
                    console.log(response.data);
                })
        } catch (error) {
            console.log('Error pay: ', error.message);
        }
    }
      
    return ( 
        <>
            <div className='body-container-checkout'>
                <div className='checkout-container'>
                    <div className='main-contain'>
                        <div className='main-nav'>
                            <h1>Checkout</h1>
                            <div className='nav-item'>
                            <a href='/cart'>Cart <AiOutlineRight/></a>
                            <div className='nav-pro-name'>Checkout</div>
                            </div>
                        </div>
                        <div className='main-content'>
                            <div className='content-main-checkout fill-checkout'>
                                <div className='main-checkout-content-header'>
                                    <h2>Shipment Detail</h2>
                                </div>
                                <div className='main-checkout-content'>
                                    <Link to='/user-profile' className='user-info-content'>
                                        <div className='user-img-content'>
                                            <img src='/assets/images/default_user_ava.png' alt='user-ava'></img>
                                        </div>
                                        <div className='user-detail-content'>
                                            <span>({userData.email})</span>
                                        </div>
                                    </Link>
                                    <div className='fill-info-shipment'>
                                        <form /*</div>onSubmit={handleSubmit}*/ className="form-user-edit">
                                            <div className="edit-input-contain">
                                                <input
                                                    style={{color: '#777', pointerEvents: 'none'}}
                                                    placeholder='Full Name'
                                                    id="fullname"
                                                    className="edit-user-name"
                                                    type="text"
                                                    value={userData.fullname}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="edit-input-contain">
                                                <input
                                                    placeholder='Phone Number'
                                                    id="phone_num"
                                                    className="edit-user-phone"
                                                    type="phone"
                                                    value={userData.phone_num}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="edit-input-contain">
                                                <input
                                                    placeholder='Address'
                                                    id="address"
                                                    className="edit-user-address"
                                                    type="text"
                                                    value={userData.address || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <SelectCityDistrict/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='pay-method fill-checkout'>
                                <div className='main-checkout-content-header'>
                                    <h2>Payment Methods</h2>
                                </div>
                                <div className='main-checkout-content'>
                                    <div className='fill-info-shipment'>
                                        <div className="radio-input-checkout">
                                            <input type="radio" id="value-1" name="value-radio" value="cod"/>
                                            <label htmlFor="value-1">Payment on delivery (COD)</label>
                                            <input type="radio" id="value-2" name="value-radio" value="momo"/>
                                            <label htmlFor="value-2">MoMo wallet</label>
                                            <input type="radio" id="value-3" name="value-radio" value="vnpay"/>
                                            <label htmlFor="value-3">VNPAY</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='access-pay-button'>
                                <button className="pay-btn" onClick={handlePay}>
                                    Pay
                                    <svg className="pay-svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='bill-content'>
                        <div className='bill-summary'>
                            <div className='bill-product'>
                                {/* map over items and display them */}
                                {billItem.map((item, index) =>(
                                    <Link to={`/product/detail/${item.product_id}`} key={index} className="bill-pro-item">
                                        <div className="bill-pro-img">
                                            <img src={item.thumbnail} alt="product img"></img>
                                        </div>
                                        <div className="cart-pro-info">
                                            <h3 className="cart-pro-title">{item.title}</h3>
                                            <p className="cart-pro-size">{item.size}</p>
                                        </div>
                                        <div className='cart-pro-info'>
                                            <p className="bill-pro-quant">{item.quantity}</p>
                                        </div>
                                        <div className='cart-pro-price'>
                                            <p className="bill-pro-unit-price">${item.total}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className='pre-total'>
                                <div>
                                    Total of all: 
                                    <span>${total}</span>
                                </div>
                                <div>
                                    Transport fee: 
                                    <span>${transportFee}</span>
                                </div>
                            </div>
                            <div className='total-bill'>
                                <div>
                                    Total:
                                    <span>${totalBill}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Checkout;