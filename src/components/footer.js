import React from 'react';
import './footer.css';

const Footer = () => {
    return(
        <footer>
            <div className="container">
                <div className="row">
                    <div className="left col-md-4 mb-md-0 mb-3">
                        <h2 className="mb-4">About Company</h2>
                        <p>NeoSOFT Technologies is here at your quick and easy service</p>
                        <p>for shopping</p>
                        <p>contact information</p>
                        <p>Email:contact@neosofttech.com</p>
                        <p>Phone: +91 0000000000</p>
                        <p>MUMBAI,INDIA</p>
                    </div>
                    <div className="mid col-md-4 mb-md-0 mb-3">
                        <h2 className="mb-4">Information</h2>
                        <p>Terms and Conditions</p>
                        <p>Gurrantee and Return policy</p>
                        <p>contact us</p>
                        <p>Privacy policy</p>
                        <p>Locate us</p>
                    </div>
                    <div className="right col-md-4">
                        <h2 className="mb-4">Newsletter</h2>
                        <p>Signup to get exclusive offer from our favorite brands and to</p>
                        <p>be well up in the news</p>
                        <input className="newsletter" type="email" placeholder="your email..." />
                        <br/>
                        <button className="subscribe" type="submit">Subscribe</button>
                    </div>
                </div>
                <div className="bottom">
                    <p>copyright 2017 NeoSOFT Technologies.All rights reserved|Design by Dinesh kumar</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
