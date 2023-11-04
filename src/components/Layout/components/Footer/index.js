/* import css */
import './Footer.css';

/* import icons */
import {BsFacebook, BsInstagram} from 'react-icons/bs';
function Footer() {
    return(
        <>
        <footer>
         <div class="footer">
            <div class="container footer-container">
               <div class="row">
                  <div class="col-md-3">
                     <div class="infoma text_align_left">
                        <h3>About</h3>
                        <p class="ipsum">Thanks for visited our website, please get more information in other social medias </p>
                        <ul class="social_icon">
                           <li><a href="https://www.facebook.com/vyle2509/"><BsFacebook/></a></li>
                           <li><a href="https://www.instagram.com/imvylee_/"><BsInstagram/></a></li>
                        </ul>
                     </div>
                  </div>
                  <div class="col-md-3">
                     <div class="infoma">
                        <h3>Address</h3>
                        <ul class="conta">
                           <li>1 Vo Van Ngan street, Linh Chieu ward, Thu Duc district, Ho Chi Minh city <br/>
                           </li>
                           <li>(+84) 966480829 <br/>(+84) 848047469</li>
                           <li> <a href=""> levy3443@gmail.com</a></li>
                        </ul>
                     </div>
                  </div>
                  <div class="col-md-3 pad_lrft">
                     <div class="infoma">
                        <h3>Links</h3>
                        <ul class="fullink">
                           <li><a href="/">Home</a></li>
                           <li><a href="/about-us">About</a></li>
                           <li><a href="/product">Product</a></li>
                            <li><a href="/contact-us">Contact</a></li>
                        </ul>
                     </div>
                  </div>
                  <div class="col-md-3">
                     <div class="infoma">
                        <h3>Newsletter</h3>
                        <form class="form_subscri">
                           <div class="row">
                              <div class="col-md-12">
                                 <input class="newsl" placeholder="Your Name" type="text" name="Your Name"/>
                              </div>
                              <div class="col-md-12">
                                 <input class="newsl" placeholder="Email" type="text" name="Email"/>
                              </div>
                              <div class="col-md-12">
                                 <button class="subsci_btn">Subscribe</button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
            <div class="copyright">
               <div class="row">
                  <div class="col-md-12">
                     <p>© 2023 All Rights Reserved.  <a href="https://www.facebook.com/vyle2509/"> Vy Le's Template</a></p>
                  </div>
               </div>
            </div>
         </div>
      </footer>
        </>
    );
}

export default Footer;