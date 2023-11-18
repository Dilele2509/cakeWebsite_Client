/* import css */
import './AdminHeader.css'

/* import icons */
import {MdOutlineAccountCircle} from 'react-icons/md';
import { IoNotifications } from "react-icons/io5";

import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from '../../../../API/axios';

function AdminHeader() {
  return (
      <header>
      <div className="admin-header">
        <div className='admin-page-title'>
            <h1>Title Page</h1>
        </div>
        <div className="admin-header-func">
            <Link to='/notification' className='admin-noti-icon'><IoNotifications className='icon-admin-header'/></Link>
            <Link to='/admin-profile' className="icon-link-admin">
                <MdOutlineAccountCircle className="icon-admin-header icon-admin-account" />
                <span className='admin-name'>Admin name</span>
            </Link>     
        </div>
      </div>
      </header>
  );
}

export default AdminHeader;