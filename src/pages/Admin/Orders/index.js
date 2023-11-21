import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios';
import '../Users/User.css'; // Import CSS file
import '../Category/Cat.css';
import {RiDeleteBinLine} from 'react-icons/ri'

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
    note: '',
    order_date: '',
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
        note: cat.note,
        order_date: cat.order_date,
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
        note: orderData.note || undefined,
        order_date: orderData.order_date || undefined,
        status: orderData.status || undefined,
        total: orderData.total || undefined
      };

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

  const handleDelOrder = (id, order) => {
    axios.put('/order/disable', { id: id })
      .then((response) => {
        console.log(`order deleted successfully:`, response.data);

        // Update the orderList state to reflect the change in order status
      })
      .catch((error) => {
        console.error(`Error deleted order:`, error);
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
                    <th>User ID</th>
                    <th>Note</th>
                    <th>Order Date</th>
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
                          <span>{order.id}</span>
                        </td>
                        <td>
                            <h4>{order.user_id}</h4>
                        </td>
                        <td>
                            <span>{order.note}</span>
                        </td>
                        <td>
                            <span>{order.order_date}</span>
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
                            onClick={() => handleDelOrder(order.id, order)}
                          >
                            <RiDeleteBinLine />
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
