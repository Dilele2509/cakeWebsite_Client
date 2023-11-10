/* import css */
import './Header.css'

/* import icons */
import {GiCakeSlice} from 'react-icons/gi';
import {BiSearchAlt} from 'react-icons/bi';
import {MdOutlineAccountCircle} from 'react-icons/md';
import {MdShoppingCart} from 'react-icons/md';
import {MdOutlineExpandMore} from 'react-icons/md';

import React, { useState, useEffect } from 'react';
import axios from '../../../../API/axios';

function Header() {
  const [userAvatar, setUserAvatar] = useState(null);

  // Function to set the user avatar
  const setUserAvatarUrl = (avatarUrl) => {
    setUserAvatar(avatarUrl);
  };

  useEffect(() => {
    // check user login status when the component mounts
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/login/check-status/');
        const { status } = response.data;

        console.log(status);
  
        if (status) {
          const avatarUrl = await axios.get('user/id/');
          setUserAvatarUrl(avatarUrl.avatar); // Fix: Update the user avatar URL using the function

        }else{
          console.log('no logged in yet');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
  
    checkLoginStatus();
  }, []);
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
            {userAvatar ? (
              <a className='icon-link' href='/user-profile'>
                <img id="userAvatar" className="iconHeader" src={userAvatar} alt="User Avatar" />
              </a>
            ) : (
              <a className="icon-link" href="/login"><MdOutlineAccountCircle className="iconHeader" /></a>
            )}
        </div>
      </div>
      </header>
  );
}

export default Header;