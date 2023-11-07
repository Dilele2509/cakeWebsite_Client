import './Cart.css'
import {RiDeleteBinLine} from 'react-icons/ri'


import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../../../API/axios'; // Import your Axios instance

function Cart() {
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm trong giỏ hàng và gán vào cartItem
        axios.get('/order-details')
            .then((response) => {
                setCartItem(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    // Hàm xóa sản phẩm và cập nhật danh sách
    const handleDeleteProduct = (id) => {
        // Gọi API để xóa sản phẩm dựa trên item.id
        axios.delete('/order-detail/', { data: { id } })
        .then((response) => {
            console.log('Product deleted successfully:', response.data);

            // Cập nhật danh sách sản phẩm bằng cách loại bỏ sản phẩm đã xóa
            const updatedcartItem = cartItem.filter(item => item.id !== id);
            setCartItem(updatedcartItem);
        })
        .catch((error) => {
            console.error('Error deleting product:', error);
        });
    };

    //tăng giảm số lượng sản phẩm
    const incrementQuantity = (id, quantity) => {
        const updatedCartItem = cartItem.map(async item => {
          if (item.id === id) {
            item.quantity = quantity + 1;
      
            // Gọi API để cập nhật quantity trên máy chủ
            await axios.put('/order-detail/quantity/', { id, quantity: item.quantity })
              .then((response) => {
                // Cập nhật quantity thành công
                console.log('Update quantity successfully: ', response.data);
      
                // Cập nhật lại cartItem.total dựa trên thông tin từ database
                item.total = response.data[0].total;
              })
              .catch((error) => {
                console.log('Error updating product:', error);
              });
          }
          return item;
        });
      
        // Cập nhật lại danh sách sản phẩm sau khi cập nhật quantity và total
        Promise.all(updatedCartItem).then(updatedItems => {
          setCartItem(updatedItems);
        });
      }; 
    const decrementQuantity = (id, quantity) => {
        if (quantity > 1) {
          const updatedCartItem = cartItem.map(async item => {
            if (item.id === id) {
              item.quantity = quantity - 1;
      
              // Gọi API để cập nhật quantity trên máy chủ
              await axios.put('/order-detail/quantity/', { id, quantity: item.quantity })
                .then((response) => {
                  // Cập nhật quantity thành công
                  console.log('Update quantity successfully: ', response.data);
      
                  // Cập nhật lại cartItem.total dựa trên thông tin từ database
                  item.total = response.data[0].total;
                })
                .catch((error) => {
                  console.log('Error updating product:', error);
                });
            }
            return item;
          });
      
          // Cập nhật lại danh sách sản phẩm sau khi cập nhật quantity và total
          Promise.all(updatedCartItem).then(updatedItems => {
            setCartItem(updatedItems);
          });
        } else {
          // Xử lý trường hợp quantity bằng 0 (hoặc bất kỳ hành động nào bạn muốn thực hiện)
          handleDeleteProduct(id);
        }
    };
      
    //tính total đơn hàng
    function calculateTotal(cartItem) {
        return cartItem.reduce((total, item) => total + item.total, 0);
      }
    const totalHere = calculateTotal(cartItem);
      
      
    return (
        <>
            <div className="cart-page">
                <div className="cart-page-container">
                    <div className="cart-heading">
                        <h1 className="cart-title">UrCart</h1>
                    </div>
                    <div className="row-cart">
                        <div className="col-md-8">
                            <table className="table table-cart scrollable-table">
                                <tbody>
                                    <tr>
                                        <th className="cart-product">Product</th>
                                        <th className="cart-quant">Quantity</th>
                                        <th className="cart-price">Price</th>
                                        <th className="cart-delete">Delete</th>
                                    </tr>
                                    {/* map over items and display them */}
                                    {cartItem.map((item, index) => (
                                        <tr key={index} className="cart-item" data-id={item.id}>
                                            <td className="cart-product">
                                                <a href="/product/detail/" className="cart-pro-item">
                                                    <div className="cart-pro-img">
                                                        <img src={item.thumbnail} alt="product img"></img>
                                                    </div>
                                                    <div className="cart-pro-info">
                                                        <h3 className="cart-pro-title">{item.title}</h3>
                                                        <p className="cart-pro-size">{item.product_size}</p>
                                                        <p className="cart-pro-unit-price">${item.price}</p>
                                                    </div>
                                                </a>
                                            </td>
                                            <td className="cart-quant">
                                                <div>
                                                <button className='quant-minus' onClick={() => {decrementQuantity(item.id, item.quantity);}}>
                                                    <span>-</span>
                                                    </button>

                                                    <input type='text' value={item.quantity} name='quantity' className='quantity' readOnly></input>

                                                    <button className='quant-plus' onClick={() => {incrementQuantity(item.id, item.quantity);}}>
                                                    <span>+</span>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="cart-price">
                                                <h4 className="line-price"><div>${item.total}</div></h4>
                                            </td>
                                            <td className="cart-delete">
                                                <div className="del-icon" onClick={() => handleDeleteProduct(item.id)}>
                                                    <RiDeleteBinLine />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <a href='/product/all' className="action-btn">
                                <button className="continue-btn">Continue Shopping</button>
                            </a>
                        </div>
                        <div className="col-md-4 list-info">
                            <div className='cal-total-area'>
                                <div className='cal-container'>
                                    <div className='total-cart'>
                                        <div className='subtotal'>
                                            Total:
                                            <b>${totalHere}</b>
                                        </div>
                                        <div className='next-checkout'>
                                            <a href='/cart/checkout'>Checkout</a>
                                        </div>
                                    </div>
                                    <div className='take-note-cart'>
                                        <label className='control-label' htmlFor='cartInstruction'>Take your note</label>
                                        <textarea spellCheck='false' className='from-control' name='note' id='cartInstruction' placeholder='Please leave a note if there is anything you need to note about your order'>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;