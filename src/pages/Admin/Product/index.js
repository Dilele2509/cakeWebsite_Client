import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios';
import '../Users/User.css'; // Import CSS file
import './Product.css'
import { FaPowerOff } from "react-icons/fa6";

function Product() {

  const [proList, setProList] = useState([]);
  const [editingProId, setEditingProId] = useState(null);
  const [proData, setProData] = useState({
    id: '',
    category_id: '',
    title: '',
    price: '',
    size: '',
    size_price: '',
    ingredients: '',
    discount_price: '',
    thumbnail: '',
    description: '',
    quantity: '',
    total: '',
    deleted: '',
  });

  useEffect(() => {
    axios.get('/products')
      .then((response) => {
        setProList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data', error.message);
      })
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
  const handleSizeChange = (e) => {
    const { value } = e.target;
    setProData((prevData) => ({
      ...prevData,
      size: value === 'null' ? null : value,
    }));
  };  

  const handleEditClick = (proId, pro) => {
    setEditingProId(proId);
    setProData(() => ({
        id: pro.id,
        category_id: pro.category_id,
        title: pro.title,
        price: pro.price,
        size: pro.size,
        size_price: pro.size_price,
        ingredients: pro.ingredients,
        discount_price: pro.discount_price,
        thumbnail: pro.thumbnail,
        description: pro.description,
        quantity: pro.quantity,
        total: pro.total,
        deleted: pro.deleted,
    }));
  }

  const handleSaveClick = (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        id: proData.id || undefined,
        category_id: proData.category_id || undefined,
        title: proData.title || undefined,
        price: proData.price || undefined,
        size: proData.size || undefined,
        size_price: proData.size_price || undefined,
        ingredients: proData.ingredients || undefined,
        discount_price: proData.discount_price || undefined,
        thumbnail: proData.thumbnail || undefined,
        description: proData.description || undefined,
        quantity: proData.quantity || undefined,
        total: proData.total || undefined,
        deleted: proData.deleted || undefined,
      };

        axios.put(`/product/update/`, updatedData);

        setProList(prevProList => {
            return prevProList.map(pro => {
              if (pro.id === proData.id) {
                return { ...pro, ...updatedData };
              }
              return pro;
            });
          });
    } catch (error) {
      console.error('update error:', error);
    }
    setEditingProId(null);
  }

  const handleCancelClick = () => {
    setEditingProId(null);
  }

  // thực hiện vô hiệu hoá/tiếp tục hoạt động product
  const handleToggleProStatus = (id, pro) => {
    let axiosMethod;
    let statusDel;

    if (pro.deleted !== 1) {
      axiosMethod = axios.put('/product/disable/', { id: id });
      statusDel = 'disable';
    } else {
      axiosMethod = axios.put('/product/enable/', { id: id });
      statusDel = 'enable';
    }

    axiosMethod
      .then((response) => {
        //console.log(`Product ${statusDel} successfully:`, response.data);

        setProList(prevproList => {
          return prevproList.map(p => {
            if (p.id === id) {
              return { ...p, deleted: pro.deleted === 1 ? 0 : 1 };
            }
            return p;
          });
        });
      })
      .catch((error) => {
        console.error(`Error ${statusDel} Product:`, error);
      });
  };

  return (
    <div className='user-list-container'>
      <div className='row-item'>
        <div className='user-list-item'>
          <div className='user-list-header'>
            <div className='user-list-title'>
              <h3>Product list</h3>
            </div>
          </div>
          <div className='user-list-content'>
            <div className='list-table-container'>
              <table className='table user-list-table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Information</th>
                    <th>Description</th>
                    <th>Size</th>
                    <th>Ingredients</th>
                    <th>Discount</th>
                    <th>Thumbnail</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {proList.map((pro) => (
                    pro.role_id !== 2 ? (
                      <tr key={pro.id}>
                        <td>
                          <span>{pro.id}</span>
                        </td>
                        <td>
                          <div className='td-contain-info'>
                            <div className='user-img-list'>
                              <img src={pro.thumbnail} alt='pro-img' />
                            </div>
                            <div className='user-info-list'>
                              {editingProId === pro.id ? (
                                <>
                                  <input
                                    type='text'
                                    value={proData.title}
                                    id='title'
                                    onChange={handleInputChange}
                                  /><br />
                                  <input
                                    type='text'
                                    value={proData.category_id}
                                    id='category_id'
                                    onChange={handleInputChange}
                                  /><br />
                                  <input
                                    type='text'
                                    id='price'
                                    value={proData.price}
                                    onChange={handleInputChange}
                                  />
                                </>
                              ) : (
                                <>
                                  <h4>{pro.title}</h4>
                                  <span>CatID: {pro.category_id}</span><br/>
                                  <span>{pro.price} VND</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='long-text-container'>
                          {editingProId === pro.id ? (
                            <>
                              <input
                                type='text'
                                value={proData.description}
                                id='description'
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                              <span>{pro.description}</span>
                            </>
                          )}
                        </td>
                        <td>
                            <div className='user-info-list'>
                                {editingProId === pro.id ? (
                                    <>
                                    <select
                                        value={proData.size !== null ? proData.size : 'null'}
                                        onChange={(e) => {
                                        handleSizeChange(e);
                                        handleInputChange(e);
                                        }}
                                    >
                                        <option value='null'>Select Size</option>
                                        <option value='16cm'>16cm</option>
                                        <option value='18cm'>18cm</option>
                                        <option value='24cm'>24cm</option>
                                    </select>
                                    </>
                                ) : (
                                    <>
                                    <h4>{pro.size || ''}</h4>
                                    <span>{pro.size_price} VND</span>
                                    </>
                                )}
                            </div>
                        </td>
                        <td className='long-text-container'>
                            {editingProId === pro.id ? (
                                <>
                                <input
                                    type='text'
                                    value={proData.ingredients}
                                    id='ingredients'
                                    onChange={handleInputChange}
                                />
                                </>
                            ) : (
                                <>
                                <span>{pro.ingredients}</span>
                                </>
                            )}
                        </td>
                        <td>
                          {editingProId === pro.id ? (
                            <>
                              <input
                                type='text'
                                value={proData.discount_price}
                                id='discount_price'
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                              <span>{pro.discount_price}</span>
                            </>
                          )}
                        </td>
                        <td className='long-text-container'>
                          {editingProId === pro.id ? (
                            <>
                              <input
                                type='text'
                                value={proData.thumbnail}
                                id='thumbnail'
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                              <span>{pro.thumbnail}</span>
                            </>
                          )}
                        </td>
                        <td>
                          {editingProId === pro.id ? (
                            <>
                              <input
                                type='text'
                                value={proData.quantity}
                                id='quantity'
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                              <span>{pro.quantity}</span>
                            </>
                          )}
                        </td>
                        <td>
                          {editingProId === pro.id ? (
                            <>
                              <input
                                type='text'
                                value={proData.total}
                                id='total'
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                              <span>{pro.total}</span>
                            </>
                          )}
                        </td>
                        <td>
                          {editingProId === pro.id ? (
                            <>
                              <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                              <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                            </>
                          ) : (
                            <button className='edit-list-btn' onClick={() => handleEditClick(pro.id, pro)}>Edit</button>
                          )}
                        </td>
                        <td>
                          <div
                            className={`switch-icon ${pro.deleted === 1 ? 'disable-check' : ''}`}
                            onClick={() => handleToggleProStatus(pro.id, pro)}
                          >
                            <FaPowerOff />
                          </div>
                        </td>
                      </tr>
                    ) : null
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

export default Product;
