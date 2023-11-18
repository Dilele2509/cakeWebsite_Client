import './Login.css';
import '../SignUp/SignUp.css';
import {MdOutlineAlternateEmail} from 'react-icons/md'
import {BsFillLockFill} from 'react-icons/bs'
import {PiWarningCircleFill} from 'react-icons/pi';
import {FaBug} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import { GoHomeFill } from "react-icons/go";

import axios from '../../API/axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';


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
  
      ReactDOM.render(
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

function LoginPage() {
    const navigate = useNavigate();
    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
    }

    const handleLogin = async () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        //check rỗng
        if(email ==='' ||password===''){
            showToast('warning', 'Need to fill them all out');
            return;
        }

        //gọi API login từ backend
        const response = await axios.post('/login', { email: email, password: password },config);
        
        //xử lí phản hồi từ API
        if(response.data.status !== 'Error'){
            const userInfo = response.data;
            // Redirect to home page
            console.log('login successful');
            window.location.href = '/';
        }else if(response.data.problem === 'Email'){
            console.error('Registration failed:', response.data.message);
            showToast('error', response.data.message);
        }else if(response.data.problem === 'Password'){
            console.error('Registration failed:', response.data.message);
            showToast('error', response.data.message);
        }else {
            console.error('Registration failed:', response.data.message);
            showToast('error', response.data.message);
        }
      } catch (error) {
        // Handle login error, show error message, etc.
        console.error('Login failed:', error);
      }
    };
    return ( 
        <>
        <Link to='/' className='back-home-page'><GoHomeFill/></Link>
        <form className="login-form-main" action="">
            <p className="login-heading">Login</p>
            <div className="log-input-contain">
                <MdOutlineAlternateEmail className='log-input-icon'/>
                <input
                    placeholder="Your Email"
                    id="email"
                    className="log-input-field"
                    type="text"
                ></input>
            </div>
            
        <div className="log-input-contain">
            <BsFillLockFill className='log-input-icon'/>
            <input
                    placeholder="Your Password"
                    id="password"
                    className="log-input-field"
                    type="password"
                ></input>
        </div>
                    
                
            <button type='button' id="login-button" onClick={handleLogin}>Submit</button>
            <div className="signUp-container">
                <a href='/sign-up'>Don't have any account?</a>
            </div>
        </form>
        <div id="toast"></div>
        </>
     );
}

export default LoginPage;