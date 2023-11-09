import './Login.css';
import {MdOutlineAlternateEmail} from 'react-icons/md'
import {BsFillLockFill} from 'react-icons/bs'

function LoginPage() {
    return ( 
        <>
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
                    
                
            <button type='button' id="login-button">Submit</button>
            <div className="signUp-container">
                <a href='/sign-up'>Don't have any account?</a>
            </div>
        </form>

        </>
     );
}

export default LoginPage;