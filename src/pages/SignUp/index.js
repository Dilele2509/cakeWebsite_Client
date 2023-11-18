import './SignUp.css';

import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsFillLockFill, BsShieldLockFill } from 'react-icons/bs';
import {PiWarningCircleFill} from 'react-icons/pi';
import {FaBug} from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import { GoHomeFill } from "react-icons/go";

import axios from '../../API/axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {render} from 'react-dom';
import {Link} from 'react-router-dom';



const main = document.getElementById("toast");

class Toasts {
  constructor(header, message, type, duration) {
    this.header = header;
    this.message = message;
    this.type = type;
    this.duration = duration;
  }

  toastMethod() {
    if (main) {
      let divToast = document.createElement("div");
      divToast.classList.add('toast', `toast--${this.type}`);
  
      const slideInTime = 500;
      const fadeTime = 1000;
  
      divToast.style.animation = `ease slideInLeft ${slideInTime}ms, linear fadeOut ${fadeTime}ms ${this.duration}ms forwards`;
  
      let icons = {
        warning: <PiWarningCircleFill />,
        error: <FaBug />,
      };
      let iconToast = icons[this.type];
  
      render(
        <>
          <div className="toast__icon">
            {iconToast}
          </div>
          <div className="toast__body">
            <h3 className="toast__header">{this.header}</h3>
            <p className="toast__message">{this.message}</p>
          </div>
          <div className="toast__closeBtn">
            <AiOutlineClose />
          </div>
        </>,
        divToast
      );
  
      main.appendChild(divToast);
  
      let autoRemove = setTimeout(() => {
        main.removeChild(divToast);
      }, this.duration + fadeTime);
  
      main.onclick = function () {
        main.removeChild(divToast);
        clearTimeout(autoRemove);
      };
    }
  }
}

function showToast(event, message_content) {
  switch (event) {
    case 'warning':
      let toastWarning = new Toasts(
        'Warning',
        message_content,
        'warning',
        3000
      );
      toastWarning.toastMethod();
      break;

    case 'error':
      let toastError = new Toasts(
        'Error',
        message_content,
        'error',
        3000
      );
      toastError.toastMethod();
      break;
  }
}

function SignUp() {
  //submit sign-up account
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const addUser = async () => {
    try {
        //check rỗng
        if(fullName === '' || email ==='' ||password===''||confirmPassword===''){
            showToast('warning', 'Need to fill them all out');
            return;
        }
        // check confirm password
        if (password !== confirmPassword) {
            // Hiển thị thông báo lỗi
            console.error('Password and Confirm Password does not match');
            showToast('warning', 'Password and Confirm Password do not match');
            return;
        }

        // Gọi API sign-up từ backend
        const response = await axios.post('/user/add', {
            fullname: fullName,
            email: email,
            password: password,
        });
        // Xử lý phản hồi từ API
        if (response.data.status !== 'Error') {
            //console.log('Registration successful');
            navigate('/login');
        } else {
            //console.error('Registration failed:', response.data.message);
            showToast('error', response.data.message);
        }
        } catch (error) {
        console.error('Registration failed:', error);
        }
    };

  return (
    <>
      <Link to='/' className='back-home-page'><GoHomeFill/></Link>
      <form className="signUp-form-main" action="">
        <p className="signUp-heading">Sign Up</p>
        <div className="signUp-input-contain">
        <FaRegUser className='signUp-input-icon'/>
        <input
            placeholder="Enter Your Full Name"
            id="username"
            className="signUp-input-field"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
        />
        </div>

        <div className="signUp-input-contain">
        <MdOutlineAlternateEmail className='signUp-input-icon'/>
        <input
            placeholder="Enter Your Email"
            id="email"
            className="signUp-input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div className="signUp-input-contain">
        <BsFillLockFill className='signUp-input-icon'/>
        <input
            placeholder="Enter Your Password"
            id="password"
            className="signUp-input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <div className="signUp-input-contain">
        <BsShieldLockFill className='signUp-input-icon'/>
        <input
            placeholder="Confirm Your Password"
            id="confirmPass"
            className="signUp-input-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
        </div>


        <button type='button' id="signUp-button" onClick={addUser}>Submit</button>
        <div className="login-container">
          <a href='/login'>Have an account</a>
        </div>
      </form>
      <div id="toast"></div>
    </>
  );
}

export default SignUp;
