import React, { useState } from 'react'
import Style from './MobileNav.module.css';
import { useHistory } from 'react-router-dom'

interface Props {
    name: String,
    type?: String,
    loggedIn: Boolean,
    logout: () => void,
    hostSignUp: () => void,
    guestSignUp: () => void,
    signIn: () => void
}

const MobileNav = (props: Props) => {
    const history = useHistory();
    const [openNav, setOpenNav] = useState(false);

    const Host = () => {
      history.push('/host/hostform')
      setOpenNav(!openNav)
    }

    const List = () => {
        history.push('/host/hostform')
        setOpenNav(!openNav)
      }

    const Listing = () => {
        history.push(`/${props.name}/list`)
        setOpenNav(!openNav)
    }

    /*const Booking = () => {
        history.push(`/${props.name}/bookings)`)
        setOpenNav(!openNav)
    }*/

    return (
        <nav className={Style.MobileNav}>
            {openNav && props.loggedIn && <>
                <div className={Style.ProfileLogo}>
                    <i className="fas fa-user"></i>
                </div>
               <div className={Style.ProfileName}>{props.name}</div>
            </>}
            <ul className={openNav  ? [Style.UlNav, Style.OpenNav].join(" "): [Style.UlNav].join(" ")}>
                {props.loggedIn ? (<>
                  {props.type === 'guest' && <>
                    <li onClick={() => Host()}><span>Become a Host</span></li>
                    <li onClick={() => setOpenNav(!openNav)}><span onClick={() => history.push(`/${props.name}/list`)}>List</span></li>
                    <li onClick={() => setOpenNav(!openNav)}><span onClick={() => history.push(`/${props.name}/bookings`)}>My Bookings</span></li>
                  </>}
                  {props.type === 'host' && <>
                  <li onClick={() => List()}><span>Add a Room</span></li>
                  <li onClick={() => Listing()}><span>List</span></li>
                  </>}
                  <li onClick={() => setOpenNav(!openNav)}><span onClick={props.logout} style={{color: "#fff"}} className={Style.Active}>Log Out</span></li>
                  </>) :( <>
                  <li onClick={() => setOpenNav(!openNav)}><span onClick={props.hostSignUp}>Host Sign up</span></li>
                  <li onClick={() => setOpenNav(!openNav)}><span onClick={props.guestSignUp}>Sign Up</span></li>
                  <li onClick={() => setOpenNav(!openNav)}><span style={{color: "#fff"}} className={Style.Active} onClick={props.signIn}>Login</span></li>
                </>)}
            </ul>
            <div className={Style.MenuIcon} onClick={() => setOpenNav(!openNav)}>
                <span className={openNav  ? [Style.FirstSpan, Style.OpenFirst].join(" "): [Style.FirstSpan].join(" ")}></span>
                <span className={openNav  ? [Style.SecondSpan, Style.OpenSecond].join(" "): [Style.SecondSpan].join(" ")}></span>
                <span className={openNav  ? [Style.ThirdSpan, Style.OpenThird].join(" "): [Style.ThirdSpan].join(" ")}></span>
            </div>
        </nav>
    )
}

export default MobileNav
