import '../Profile.css'

import {Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../API/axios'

function Profile() {
    const [userData, setUserData] = useState('');
    const config = {
        headers: {
          "Content-Type": "application/json"
          },
          withCredentials: true
    }

    useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/id/', config);
        //console.log(response.data.user[0]);
        setUserData(response.data.user[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    }, []);  

    const navigate = useNavigate();
    const handleLogout = async ()=>{
        try {
            const response = await axios.get('/logout', config);
            console.log(response);
            window.location.href = '/';
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div className='content-profile-area'>
                <div className='profile-img-area'>
                    <div className='profile-img-func'>
                        <img className='profile-img' src={userData.avatar}></img>
                        <div className='change-user-ava'>
                            <button className='change-ava-btn'>Change</button>
                        </div>
                    </div>
                    <div className='logout'>
                        <button className="logout-btn" onClick={handleLogout}>
                            <div className="logout-sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                            <div className="logout-text">Logout</div>
                        </button>
                    </div>
                </div>
                <div className='user-info-contain'>
                    <div className='welcome-user'>
                        <h3>Hi, {userData.fullname}</h3>
                        <p>In this page you can manage your information</p>
                    </div>
                    <div className='user-info'>
                        <div className='user-info-title'>
                            <h3>Account Information</h3>
                            <div className='change-user-info'>
                                <Link to='/user-profile/edit'>
                                    <button className='change-info-btn'>Change</button>
                                </Link>
                            </div>
                        </div>
                        <div className='user-info-detail'>
                            <span>Name: {userData.fullname}</span>
                            <span typeof='email'>Email: {userData.email}</span>
                            <span typeof='phone'>Phone: {userData.phone_num}</span>
                            <span>Address: {userData.address}</span>
                            <span>Gender: {userData.gender}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;