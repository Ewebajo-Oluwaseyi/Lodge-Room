import React from 'react'
import Style from './Footer.module.css';
import twitter from "../../assests/twitter.svg"
import linkedin from "../../assests/linkedin.svg";
import instagram from "../../assests/instagram.svg";
import facebook from "../../assests/facebook.svg";

const Footer = () => {
    return (
        <div className={Style.footerWrapper}>
            <footer>
                <div className={Style.text}>
                    &copy; COPYRIGHT 2021 -HotelLoging ALL RIGHT RESERVE
                </div>
                <div className={Style.icons}>
                    <img src={twitter} alt=""/>
                    <img src={linkedin} alt=""/>
                    <img src={instagram} alt=""/>
                    <img src={facebook} alt=""/>
                </div>
            </footer>
        </div>
    )
}

export default Footer
