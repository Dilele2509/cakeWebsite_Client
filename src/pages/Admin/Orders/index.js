import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios';
import { Link } from 'react-router-dom';
import '../Users/User.css'; // Import CSS file
import '../Category/Cat.css';
import './Order.css'
import {MdCancel} from 'react-icons/md'

function Orders() {
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };

  const [orderList, setOrderList] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [orderData, setOrderData] = useState({
    id: '',
    user_id: '',
    receiver_phone: '',
    delivery_address: '',
    note: '',
    order_date: '',
    payment_method: '',
    status: '',
    total: '' 
  });

  useEffect(() => {
    axios.get('/orders')
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order data', error.message);
      })
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };  

  const handleEditClick = (catId, cat) => {
    setEditingOrderId(catId);
    setOrderData(() => ({
        id: cat.id,
        user_id: cat.user_id,
        receiver_phone: cat.receiver_phone,
        delivery_address: cat.delivery_address,
        note: cat.note,
        order_date: cat.order_date,
        payment_method: cat.payment_method,
        status: cat.status,
        total: cat.total 
    }));
  }

  const handleSaveClick = (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        id: orderData.id || undefined,
        user_id: orderData.user_id || undefined,
        receiver_phone: orderData.receiver_phone || undefined,
        delivery_address: orderData.delivery_address || undefined,
        note: orderData.note || undefined,
        payment_method: orderData.payment_method || undefined,
        order_date: orderData.order_date || undefined,
        status: parseInt(orderData.status,10) || undefined,
        total: orderData.total || undefined
      };

      console.log('update data: ',updatedData);

      axios.put(`/order/update/`, updatedData, config);

      setOrderList(prevorderList => {
        return prevorderList.map(order => {
          if (order.id === orderData.id) {
            return { ...order, ...updatedData };
          }
          return order;
        });
      });
    } catch (error) {
      console.error('update error:', error);
    }
    setEditingOrderId(null);
  }

  const handleCancelClick = () => {
    setEditingOrderId(null);
  }

  const handleDelOrder = (id) => {
    axios.put('/order/cancel/', { id: id })
      .then((response) => {
        console.log(`Order cancelled successfully:`, response.data);
  
        setOrderList(prevOrderList => {
          return prevOrderList.map(order => {
            if (order.id === id) {
              return { ...order, status: 0 }; 
            }
            return order;
          });
        });
      })
      .catch((error) => {
        console.error(`Error cancelling order:`, error);
      });
  };  

  return (
    <div className='user-list-container'>
      <div className='row-item'>
        <div className='user-list-item'>
          <div className='user-list-header'>
            <div className='user-list-title'>
              <h3>Order list</h3>
            </div>
          </div>
          <div className='user-list-content'>
            <div className='list-table-container'>
              <table className='table user-list-table cat-list'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th style={{minWidth:"5rem"}}>User ID</th>
                    <th style={{minWidth:"7rem"}}>Phone</th>
                    <th>Delivery Address</th>
                    <th style={{minWidth:"15rem"}}>Order Date</th>
                    <th style={{minWidth:"15rem"}}>Note</th>
                    <th>Payment Method</th>
                    <th style={{minWidth:"10rem"}}>Transport Fee</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over user list then display them */}
                  {orderList.map((order) => (
                      <tr key={order.id}>
                          <td>
                            <Link to={'/order/detail'} state={{order_id: order.id}}>
                              <b>{order.id}</b>
                            </Link>
                          </td>
                        <td>
                            <h4>{order.user_id}</h4>
                        </td>
                        <td>
                            <span>{order.receiver_phone}</span>
                        </td>
                        <td className='long-text-container'>
                            <span>{order.delivery_address}</span>
                        </td>
                        <td>
                            <span>{order.order_date}</span>
                        </td>
                        <td className='note long-text-container non-center'>
                            <span>{order.note}</span>
                        </td>
                        <td>
                            <span>{order.payment_method}</span>
                        </td>
                        <td>
                            <span>{order.transport_fee}</span>
                        </td>
                        <td>
                            {editingOrderId === order.id ? (
                            <>
                                <input
                                type='text'
                                value={orderData.status}
                                id='status'
                                onChange={handleInputChange}
                                />
                            </>
                            ) : (
                            <>
                                <h4>{order.status}</h4>
                            </>
                            )}
                        </td>
                        <td>
                            <h4>{order.total} VND</h4>
                        </td>
                        <td>
                          {editingOrderId === order.id ? (
                            <>
                              <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                              <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                            </>
                          ) : (
                            <button className='edit-list-btn' onClick={() => handleEditClick(order.id, order)}>Edit</button>
                          )}
                        </td>
                        <td>
                          <div
                            className='switch-icon disable-check'
                            onClick={() => handleDelOrder(order.id)}
                          >
                            <MdCancel />
                          </div>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
