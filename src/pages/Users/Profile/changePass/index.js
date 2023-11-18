import { useState } from 'react';
import {PiWarningCircleFill} from 'react-icons/pi';
import {FaBug} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import '../changeInfo/changeInfo.css';
import '../Profile.css';
import axios from '../../../../API/axios';
import { Link, useNavigate } from 'react-router-dom';
import { render } from 'react-dom';



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
function ChangePass() {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.get('/user/id/', config);

            //console.log('User data response:', response.data.user[0].password);
    
            const current = response.data.user[0].password;
            // Check if 'current' is defined before comparing passwords
            if (current === undefined) {
                console.error('Error: Unable to get current password from response');
                return;
            }
    
            // Check current password
            if (currentPass.trim() !== current.trim()) {
                showToast('warning', 'Current password incorrect');
                //console.error('Current password incorrect');
                return;
            } else if (newPass !== confirmPass) {
                showToast('warning', 'Password and Confirm Password do not match')
                //console.error('Password and Confirm Password do not match');
                return;
            }
    
            // Update user password using the API
            const updateResponse = await axios.put('/user/security/', { password: newPass }, config);
            //console.log('Password update response:', updateResponse.data);
            // Redirect to user-profile after successful password update
            navigate('/user-profile');
        } catch (error) {
            showToast('error', `Error updating password: ${error.message}`)
            //console.error('Error updating password:', error.message);
        }
    };
    

    return (
        <>
            <div className="content-profile-area">
                <form action="" className="form-user-edit">
                    <div className="edit-input-contain">
                        <span>Current Password</span>
                        <input
                            placeholder="Enter your current password"
                            id="currentPass"
                            className="user-pass"
                            type="password"
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                        />
                    </div>
                    <div className="edit-input-contain">
                        <span>New Password</span>
                        <input
                            placeholder="Enter your new password"
                            id="newPass"
                            className="user-new-pass"
                            type="password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                    </div>
                    <div className="edit-input-contain">
                        <span>Confirm New Password</span>
                        <input
                            placeholder="Confirm your new password"
                            id="confirmPass"
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>
                </form>
                <div className="action-edit-btn">
                    <div className="change-user-info">
                        <Link to="/user-profile/">
                            <button className="change-info-btn edit-info-btn">Cancel</button>
                        </Link>
                    </div>
                    <div className="change-user-info">
                        <button className="change-info-btn edit-info-btn save-change-btn" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <div style={{top:'110px'}} id="toast"></div>
        </>
    );
}

export default ChangePass;
