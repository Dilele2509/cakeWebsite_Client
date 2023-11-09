/* import css */
import './Header.css'

/* import icons */
import {GiCakeSlice} from 'react-icons/gi';
import {BiSearchAlt} from 'react-icons/bi';
import {MdOutlineAccountCircle} from 'react-icons/md';
import {MdShoppingCart} from 'react-icons/md';
import {MdOutlineExpandMore} from 'react-icons/md';

import React, { useState } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = async () => {
      try {
          // Thực hiện xử lý đăng nhập, nếu đăng nhập thành công:
          setIsLoggedIn(true);
      } catch (error) {
          // Xử lý lỗi đăng nhập
          console.error('Login failed:', error);
      }
  };

    return (
        <header>
        <div className="menu_sidebar">
          <div className="logo">
            <a href="/">
            <GiCakeSlice className="iconLogo"/> UrCake
            </a>
          </div>
          <nav className="navigation navbar navbar-dark">
            {/* <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample05"
              aria-controls="navbarsExample05"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="" id="">
              <ul className="navbar-nav">
                <li className="nav-item transform-shift">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item transform-shift">
                  <a className="nav-link" href="/about-us">
                    About Us
                  </a>
                </li>
                <li className="nav-item transform-shift nav-subnav">
                  <a className="nav-link" href="/product/all">
                    Product<MdOutlineExpandMore/>
                  </a>
                  <div className='subnav-product'>
                    <ul className='category-ls'>
                        <li className='subnav-item'>
                            <a className='subnav-link' href='/product/2'>
                                Bread
                            </a>
                        </li>
                        <li className='subnav-item'>
                            <a className='subnav-link' href='/product/1'>
                                Cake
                            </a>
                        </li>
                        <li className='subnav-item'>
                            <a className='subnav-link' href='/product/3'>
                                Pastry
                            </a>
                        </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item transform-shift">
                  <a className="nav-link" href="/contact-us">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="sub-nav-header">
              <div className="pre-search-header">
                  <BiSearchAlt className="iconHeader pre-search-btn" />
                  <input className="pre-searchInput" placeholder="Search" type="text" name="pre-searchHeader" />
              </div>
              <a className="icon-link" href="/cart"><MdShoppingCart className="iconHeader" /></a>
              {isLoggedIn ? (
                  // Hiển thị hình ảnh người dùng khi đã đăng nhập
                  <a className="icon-link" href="/user-profile">
                      <img src="url_of_user_image.jpg" alt="User" className="user-avatar" />
                  </a>
              ) : (
                  // Hiển thị icon thông thường khi chưa đăng nhập
                  <a className="icon-link" href="/login"><MdOutlineAccountCircle className="iconHeader" /></a>
              )}
          </div>
        </div>
        </header>
    );
}

export default Header;