import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios';
import '../Users/User.css'; // Import CSS file
import './Product.css'
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

function Product() {
    const src = 'http://localhost:3001/';
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };
    const [productImg, setProductImg] = useState(src+'public/assets/images/default_pro_img.jpeg');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [proList, setProList] = useState([]);
    const [editingProId, setEditingProId] = useState(null);
    const [addData, setAddData] =useState({
        category_id: '',
        title: '',
        price: '',
        size: '',
        ingredients: '',
        discount_price: '',
        thumbnail: '',
        description: '',
        quantity: '',
    })
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

  const handleAddChange = (e) => {
    const { id, value, type } = e.target;

    if(type === 'file'){
      const file = e.target.files[0];
      previewFile(file);
      setAddData({
        ...addData,
        thumbnail: file
      })
    }else{
      setAddData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  
    // Always update the size in proData
    if (id === 'size') {
      setProData((prevData) => ({
        ...prevData,
        size: value === 'null' ? null : value,
      }));
    }
  };
  
  
  const handleSizeChange = (e) => {
    const { value } = e.target;
    setProData((prevData) => ({
      ...prevData,
      size: value === 'null' ? null : value,
    }));
  };  

  const handleSizeAdd = (e) => {
    const { value } = e.target;
    setProData((prevData) => ({
      ...prevData,
      size: value === 'null' ? null : value,
    }));
    // Update the addData state as well
    setAddData((prevData) => ({
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

  const handleSaveClick = async (e) => {
    e.preventDefault();
  
    try {
      const updatedData = {
        id: proData.id,
        category_id: proData.category_id,
        title: proData.title,
        price: proData.price,
        size: proData.size,
        size_price: proData.size_price !== '' ? proData.size_price : null,
        ingredients: proData.ingredients,
        discount_price: proData.discount_price !== '' ? proData.discount_price : null,
        thumbnail: proData.thumbnail,
        description: proData.description,
        quantity: proData.quantity,
        total: proData.total,
        deleted: proData.deleted,
      };
  
      console.log("update: ",updatedData);
  
      const response = await axios.put('/product/update/', updatedData, config);
      console.log('response: ', response.data[0]);
  
      if (response.status === 200) {
        setProList((prevProList) => {
          return prevProList.map((pro) => {
            if (pro.id === proData.id) {
              return { ...pro, ...response.data[0] };
            }
            return pro;
          });
        });
      } else {
        console.error('Update request failed:', response);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
    setEditingProId(null);
  };

  const handleCancelClick = () => {
    setEditingProId(null);
  }

  const handleAddClick = async (e) =>{
    e.preventDefault();
    const addedData = new FormData();

    addedData.append('category_id', addData.category_id);
    addedData.append('title', addData.title);
    addedData.append('price', addData.price);
    addedData.append('size', addData.size);
    addedData.append('ingredients', addData.ingredients);
    addedData.append('discount_price', addData.discount_price);
    addedData.append('thumbnail', addData.thumbnail);
    console.log(addData.thumbnail);
    addedData.append('description', addData.description);
    addedData.append('quantity', addData.quantity);
    //console.log('add data: ',addedData);
  
    try {
      const response = await axios.post('/add-product', addedData, {
        headers :{
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('response: ', response);

      // Fetch the updated product list after successful addition
      const updatedResponse = await axios.get('/products');
      setProList(updatedResponse.data);

    } catch (error) {
      console.error('Update error:', error);
    }
    setModalVisible(false);
  }
  
  const handleCancelModal = () => {
    setProductImg(src+'public/assets/images/default_pro_img.jpeg')
    setModalVisible(false);
  }

  const handleOpenModal = () =>{
    setModalVisible(true);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductImg(reader.result);
    };
  };

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
    <>
        <div className='user-list-container'>
          <div className='row-item'>
            <div className='user-list-item'>
              <div className='user-list-header'>
                <div className='user-list-title'>
                  <h3>Product list</h3>
                </div>
              </div>
              <div className='user-list-content'>
                <div className='add-product-btn' onClick={handleOpenModal}>
                    <IoAdd/>Add more product
                </div>
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
                            <td className='info-long-text'>
                              <div className='td-contain-info'>
                                <div className='user-img-list pro-img-list'>
                                  <img src={src+pro.thumbnail} alt='pro-img' />
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
        {/* modal add */}
        <div className={`modal-add ${isModalVisible ? 'modal-visible' : 'modal-hidden'}`}>
            <div className='modal-container'>
                <div className='modal-header'>
                    <h3>ADD PRODUCT</h3>
                </div>
                <div className='modal-content'>
                    <div className='modal-input-area'>
                        <div className='upload-product-img change-ava-area'>
                            <div className='default-img'>
                              <img src={productImg} alt='default-product-img'/>
                            </div>
                            <div className='upload-file-container'>
                                <label htmlFor='file-upload'>Input File <MdOutlineFileUpload className='upload-icon'/></label>
                                <input id='thumbnail' type="file" accept=".png, .jpg, .jpeg" onChange={handleAddChange} />
                            </div>
                        </div>
                        <input
                            type='text'
                            placeholder='Product title'
                            id='title'
                            onChange={handleAddChange} 
                        />
                        <input
                            type='text'
                            placeholder='Category ID'
                            id='category_id'
                            onChange={handleAddChange} 
                        />
                        <input
                            type='text'
                            placeholder='Price'
                            id='price'
                            onChange={handleAddChange} 
                        />
                        <select
                            value={proData.size !== null ? proData.size : 'null'}
                            onChange={(e) => {
                            handleSizeAdd(e);
                            handleAddChange(e);
                            }}
                        >
                            <option value='null'>Select Size</option>
                            <option value='16cm'>16cm</option>
                            <option value='18cm'>18cm</option>
                            <option value='24cm'>24cm</option>
                        </select>
                        <input
                            type='text'
                            placeholder='Description'
                            id='description'
                            onChange={handleAddChange} 
                        />
                        <input
                            type='text'
                            placeholder='Ingredients'
                            id='ingredients'
                            onChange={handleAddChange} 
                        />
                        <input
                            type='text'
                            placeholder='Discount'
                            id='discount_price'
                            onChange={handleAddChange} 
                        />
                        <input
                            type='text'
                            placeholder='Quantity in stock'
                            id='quantity'
                            onChange={handleAddChange} 
                        />
                    </div>
                    <div className='access-modal-button'>
                        <button className='submit-modal-btn' onClick={handleAddClick}>ADD</button>
                    </div>
                    <div className='cancel-modal-button'>
                        <button className='submit-modal-btn modal-cancel' onClick={handleCancelModal}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  );
}

export default Product;
