/* import lib */
import React, { useState, useEffect } from 'react';

/* import css */
import '../Product_Details/Product_details.css'

import {AiOutlineRight} from 'react-icons/ai';

function Product_Details() {
    const initialQuantity = localStorage.getItem('quantity') || '1';
    const [quantity, setQuantity] = useState(initialQuantity);
  
    const incrementQuantity = () => {
      setQuantity(parseInt(quantity, 10) + 1);
    };
  
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(parseInt(quantity, 10) - 1);
      }
    };
  
    // Save the quantity state to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem('quantity', quantity);
    }, [quantity]);


    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
      
    return ( 
        <>
            <div className='main-nav'>
                <div className='nav-item'>
                    <a href='/product'>Product <AiOutlineRight/></a>
                    <div className='nav-pro-name'>item</div>
                </div>
            </div>
            <div className='container item-container'>
                <div className='_2-col-grid item-page'>
                    <div className='img-detail-wrap'>
                        <div className='item-img'>
                            <div className='background-img set-img'></div>
                        </div>
                        <div className='item-nutrition'>
                            <div className='nutrition-header'>
                                INGREDIENT
                            </div>
                        </div>
                        <p className='menu-item-ingredient'>
                        Bread dough(wheat flour, water, margarine, whole egg, sugar, mixed skim milk powder, yeast, whipping cream, sea salt, bread improver, yeast, skimmed milk powder), Butter cream, Egg wash(egg, water)Bread dough(wheat flour, water, margarine, whole egg, sugar, mixed skim milk powder, yeast, whipping cream, sea salt, bread improver, yeast, skimmed milk powder), Butter cream, Egg wash(egg, water)
                        </p>
                    </div>
                    <div className='func-wrap'>
                        <h1 className='func-item-name'>Item's Name</h1>
                        <div className='space-div'></div>
                        <h4 className='func-item-price'>$150</h4>
                        <div className='detail-content'>
                            <div className='status-detail'>
                                Status: Available
                            </div>
                            <div className='menu-item-ingredient'>
                            2,000 Calories a day is used for general nutrition advice, but calorie needs may vary. Additional nutritional information available upon request. Customization of your order may impact the accuracy and/or completeness of the available nutritional information. Allergen and Nutrition Information
                            </div>
                        </div>
                        <div className='space-div'></div>
                        <div className='func-choosing _2-col-grid'>
                            <div className='choosing-form'>
                                <form id='product-form' action='' method='get' className='quant-num-cart'>
                                    <button className='quant-minus' onClick={decrementQuantity}>
                                        <span>-</span>
                                    </button>
                                    <input type='text' value={quantity} name='quantity' className='quantity' readOnly></input>
                                    <button className='quant-plus' onClick={incrementQuantity}>
                                        <span>+</span>
                                    </button>

                                    <div className='choose-size'>
      <div className='selection-form'>
        <h4 className='func-choose-title'>Size</h4>
        <div className='func-item-size'>
          <div className='size-option'>
            <input
              className='option'
              id='op-16'
              type='radio'
              name='option1'
              value='16cm'
              checked={selectedSize === '16cm'}
              onChange={() => handleSizeClick('16cm')}
            />
            <label htmlFor='op-16'>
              16cm
              <img
                className='img-check'
                src='https://theme.hstatic.net/1000348721/1000449307/14/select-pro.png?v=566'
                style={{ display: selectedSize === '16cm' ? 'block' : 'none' }}
                onClick={() => handleSizeClick('16cm')}
              />
            </label>
          </div>
          <div className='size-option'>
            <input
              className='option'
              id='op-18'
              type='radio'
              name='option2'
              value='18cm'
              checked={selectedSize === '18cm'}
              onChange={() => handleSizeClick('18cm')}
            />
            <label htmlFor='op-18'>
              18cm
              <img
                className='img-check'
                src='https://theme.hstatic.net/1000348721/1000449307/14/select-pro.png?v=566'
                style={{ display: selectedSize === '18cm' ? 'block' : 'none' }}
                onClick={() => handleSizeClick('18cm')}
              />
            </label>
          </div>
          <div className='size-option'>
            <input
              className='option'
              id='op-24'
              type='radio'
              name='option3'
              value='24cm'
              checked={selectedSize === '24cm'}
              onChange={() => handleSizeClick('24cm')}
            />
            <label htmlFor='op-24'>
              24cm
              <img
                className='img-check'
                src='https://theme.hstatic.net/1000348721/1000449307/14/select-pro.png?v=566'
                style={{ display: selectedSize === '24cm' ? 'block' : 'none' }}
                onClick={() => handleSizeClick('24cm')}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
                                </form>

                            </div>
                            <div className='add-cart-func'>
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