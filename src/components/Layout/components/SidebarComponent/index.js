/* import css */
import '../SidebarComponent/Sidebar.css';
/* import icon */
import { GiCakeSlice, GiBreadSlice, GiCupcake } from 'react-icons/gi';
/* import img */
import about_page2 from '../../../../assets/images/about_page2.jpg';

function SliderComponent() {
    return ( 
        <>
        <div className='product-container'>
            {/* section */}
            <section className="section-area">
                <div className="section-background section-product-bg">
                    <img className="img-background img-product-bg" src={about_page2} alt="section-background"></img>
                </div>
                <div className="section-content">
                    <h1 className="section-title">Product</h1>
                </div>
            </section>
            {/* end section */}
            {/* sidebar header */}
            <header className="sidebar-header">
                <div className="nav-sidebar">
                    <ul className="nav-list">
                        <li className="list-item transform-sizeUp">
                            <p>Bread</p>
                            <div className='icon-item'><GiBreadSlice/></div>
                        </li>
                        <li className="list-item transform-sizeUp">
                            <p>Cake</p>
                            <div className='icon-item'><GiCakeSlice/></div>
                        </li>
                        <li className="list-item transform-sizeUp">
                            <p>Pastry</p>
                            <div className='icon-item'><GiCupcake/></div>
                        </li>
                    </ul>
                </div>
            </header>
            {/* end sidebar header */}
        </div>
        </>
    );
}

export default SliderComponent;