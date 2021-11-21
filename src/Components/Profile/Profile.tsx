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
                <span onClick={() => history.push('/host/hostform')}>Become a Host</span>
                <span onClick={() => history.push(`/${props.name}/list`)}>List</span>
                <span onClick={() => history.push(`/${props.name}/bookings`)}>My Bookings</span>
            </>}
            {props.type === 'host' && <>
                <span onClick={() => history.push('/host/hostform')}>Add a Room</span>
                <span onClick={() => history.push(`/${props.name}/list`)}>List</span>
            </>}
            <div className={Styles.ProfileUser} onClick={changeDropdown}>
                <div className={Styles.ProfileLogo}>
                  <i className="fas fa-user"></i>
                </div>
               <div className={Styles.ProfileName}>{props.name}</div>
            {dropdown &&
              <ul className={Styles.Dropdown}>
                <li onClick={props.logout}><i className="fas fa-sign-out-alt"></i>Logout</li>
              </ul>}
            </div>
        </div>
    )
}

export default Profile
