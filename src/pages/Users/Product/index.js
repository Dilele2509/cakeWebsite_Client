/* import css */
import "./Product.css";
/* import img */
import bread_category from "../../../assets/images/bread_category.webp";
/* import icon */

function Product() {
    return (  
        <>
        {/* product menu */}
        <div className='product-menu-container'>
                <div className='main-contain-menu'>
                    <div className='max-width-1280px'>
                        <div className='menu-products'>
                            <div role='list' className='_3-col-grid _3-col-grid_menu'>
                                {/* product1 */}
                                <div role="listItem" className="menu-item transform-shift">
                                    <a href="/product/detail" className="item-product">
                                        <div className='img-wrap'>
                                            <img className='img-item' src={bread_category}></img>
                                        </div>
                                        <div className='title-name-type'>
                                            <h3 className='name-title'>Cái này là tên sản phẩm</h3>
                                        </div>
                                    </a>
                                </div>
                                {/* product2 */}
                                <div role="listItem" className="menu-item transform-shift">
                                    <a href="/product/detail" className="item-product">
                                        <div className='img-wrap'>
                                            <img className='img-item' src={bread_category}></img>
                                        </div>
                                        <div className='title-name-type'>
                                            <h3 className='name-title'>Cái này là tên sản phẩm</h3>
                                        </div>
                                    </a>
                                </div>
                                {/* product3 */}
                                <div role="listItem" className="menu-item transform-shift">
                                    <a href="/product/detail" className="item-product">
                                        <div className='img-wrap'>
                                            <img className='img-item' src={bread_category}></img>
                                        </div>
                                        <div className='title-name-type'>
                                            <h3 className='name-title'>Cái này là tên sản phẩm</h3>
                                        </div>
                                    </a>
                                </div>
                                {/* product4 */}
                                <div role="listItem" className="menu-item transform-shift">
                                    <a href="/product/detail" className="item-product">
                                        <div className='img-wrap'>
                                            <img className='img-item' src={bread_category}></img>
                                        </div>
                                        <div className='title-name-type'>
                                            <h3 className='name-title'>Cái này là tên sản phẩm</h3>
                                        </div>
                                    </a>
                                </div>
                                {/* product5 */}
                                <div role="listItem" className="menu-item transform-shift">
                                    <a href="/product/detail" className="item-product">
                                        <div className='img-wrap'>
                                            <img className='img-item' src={bread_category}></img>
                                        </div>
                                        <div className='title-name-type'>
                                            <h3 className='name-title'>Cái này là tên sản phẩm</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end product menu */}
        </>
    );
}

export default Product;