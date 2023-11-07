/* import lib */
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios';

/* import css */
import '../Product_Details/Product_details.css'

import { AiOutlineRight } from 'react-icons/ai';

function Product_Details() {
  // State for quantity
  const [quantity, setQuantity] = useState(1);
  
 // State for product, selectedSize, and productPrice
 const [product, setProduct] = useState({});
 const [defaultSize, setDefaultSize] = useState(product.size); // Giá trị kích thước mặc định
 const [selectedSize, setSelectedSize] = useState(null);
 const [productPrice, setProductPrice] = useState(0);

 // Get productId from URL
 const { productId } = useParams();

 // Fetch product data from the API
 useEffect(() => {
   axios.post('/product/id/', { id: productId })
     .then((response) => {
       console.log('Product Data:', response.data);
       setProduct(response.data[0]);
       setDefaultSize(response.data[0].size); // Cập nhật giá trị kích thước mặc định
       setSelectedSize(response.data[0].size); // Cập nhật kích thước hiện tại
       setProductPrice(response.data[0].total);
     })
     .catch((error) => {
       console.error('Error fetching product details:', error);
     });
 }, [productId]);

 // Handle quantity increment and decrement
 const incrementQuantity = () => {
  setQuantity(parseInt(quantity,10) + 1);
};

 const decrementQuantity = () => {
  if (quantity > 1) {
    setQuantity(parseInt(quantity,10) - 1);
  }
 };

 // Handle size selection
 const handleSizeClick = (size) => {
   axios.put('/product/size/', {
     id: product.id,
     size: size
   })
     .then((response) => {
       setSelectedSize(size);
       setProductPrice(response.data[0].total);
       console.log('Size updated successfully:', response.data);
     })
     .catch((error) => {
       console.error('Error updating size:', error);
     });
 };

 //add cart
 const handleAddToCart = () => {
  axios.post('/order-detail/add/', {
    product_id: product.id,
    product_size: product.size,
    price: productPrice,
    quantity: quantity
  })
  .then((response) => {
    // Hiển thị thông báo thành công bằng alert
    window.alert('Order added successfully');

    // Xử lý phản hồi từ backend (nếu cần)
    console.log('Order detail added successfully:', response.data);
  })
  .catch((error) => {
    // Hiển thị thông báo lỗi bằng alert
    window.alert('Error adding order detail');

    console.error('Error adding order detail:', error);
  });
};

  return (
    <>
      <div className='main-nav'>
        <div className='nav-item'>
          <a href='/product/all'>Product <AiOutlineRight/></a>
          <div className='nav-pro-name'>{product.title}</div>
        </div>
      </div>
      <div className='container item-container'>
        <div className='_2-col-grid item-page'>
          <div className='img-detail-wrap'>
            <div className='item-img'>
              <img className='background-img set-img' src={product.thumbnail} alt={product.title}></img>
            </div>
            <div className='item-nutrition'>
              <div className='nutrition-header'>
                INGREDIENT
              </div>
            </div>
            <p className='menu-item-ingredient'>
              {product.ingredients}
            </p>
          </div>
          <div className='func-wrap'>
            <h1 className='func-item-name'>{product.title}</h1>
            <div className='space-div'></div>
            <h4 className='func-item-price'>${productPrice}</h4>
            <div className='detail-content'>
              {product.quantity > 0 ? (
                <div className='status-detail'>
                  Status: Available
                </div>
              ) : (
                <div className='status-detail'>
                  Status: Sold Out
                </div>
              )}
              <div className='menu-item-ingredient'>
                {product.description}
              </div>
            </div>
            <div className='space-div'></div>
            <div className='func-choosing _2-col-grid'>
              <div className='choosing-form'>
                <form id='product-form' action='' method='get' className='quant-num-cart'>
                <button 
                  className='quant-minus'
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút
                    decrementQuantity();
                  }}
                >
                  <span>-</span>
                </button>

                <input type='text' value={quantity} name='quantity' className='quantity' readOnly></input>

                <button
                  className='quant-plus'
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút
                    incrementQuantity();
                  }}
                >
                  <span>+</span>
                </button>

                  <div className='choose-size'>
                    <div className='selection-form'>
                      <h4 className='func-choose-title'>Size</h4>
                      <div className='func-item-size'>
                      <div className='size-option'>
                          {['16cm', '18cm', '24cm'].map((size, index) => (
                            <div key={index}>
                              <input
                                className='option'
                                id={`op-${size}`}
                                type='radio'
                                name={`option${index + 1}`}
                                value={size}
                                checked={selectedSize === size}
                                onChange={() => handleSizeClick(size)}
                              />
                              <label htmlFor={`op-${size}`}>
                                {size}
                                {selectedSize === size && (
                                  <img
                                    className='img-check'
                                    src='https://theme.hstatic.net/1000348721/1000449307/14/select-pro.png?v=566'
                                    style={{ display: selectedSize === size ? 'block' : 'none' }}
                                    onClick={() => handleSizeClick(size)}
                                  />
                                )}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className='add-cart-func' onClick={handleAddToCart}>
                <button className='add-cart-btn'>
                  <span>ADD TO CART</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product_Details;
