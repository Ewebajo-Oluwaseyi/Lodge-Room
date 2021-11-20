import React, { useState } from 'react'
import Styles from './Profile.module.css';
import { useHistory } from 'react-router-dom';

interface Props {
    name: String,
    type?: String,
    loggedIn: Boolean,
    logout: () => void,
    route?: String
}

const Profile = (props: Props) => {
    const history = useHistory();
    const [dropdown, setDropdown] = useState(false)
    const changeDropdown = () => {
        setDropdown(!dropdown)
    }
    return (
        <div className={Styles.Profile}>
            {props.type === 'guest' && <>
                <a href="!#" onClick={() => history.push('/host/hostform')}>Become a Host</a>
                <a href="!#" onClick={() => history.push(`/${props.name}/list`)}>List</a>
                <a href="!#" onClick={() => history.push(`/${props.name}/bookings`)}>My Bookings</a>
            </>}
            {props.type === 'host' && <>
                <a href="!#" onClick={() => history.push('/host/hostform')}>Add a Room</a>
                <a href="!#" onClick={() => history.push(`/${props.name}/list`)}>List</a>
            </>}
            <div className={Styles.ProfileUser} onClick={changeDropdown}>
                <div className={Styles.ProfileLogo}>
                  <i className="fas fa-user"></i>
                </div>
               <div className={Styles.ProfileName}>{props.name}</div>
            {dropdown &&
              <ul className={Styles.Dropdown}>
                <li onClick={props.logout}><i className="fas fa-sign-out-alt"></i><span>Logout</span></li>
              </ul>}
            </div>
        </div>
    )
}

export default Profile
