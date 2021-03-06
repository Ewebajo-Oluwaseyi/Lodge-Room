import React, {useState, useContext} from 'react';
import Style from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MobileNav from '../MobileNav/MobileNav'
import AuthContext from '../../store/authContext';
import Profile from '../Profile/Profile';
import { useHistory } from 'react-router-dom';

interface Props {

}

const Header = (props: Props) => {
    const ctx = useContext(AuthContext);
    const [scroll, setScroll] = useState(false);
    const history = useHistory();

    window.addEventListener("scroll", () => {
        if (window.scrollY >= 80) {
            setScroll(true);
        } else setScroll(false)
    }); 

    return (
      <header>
        <nav className={scroll ? [Style.Header, Style.Scroll].join(" ") : [Style.Header].join(" ")}>
           {/* <div className={Style.logo}>
                <svg id="Line_cutting_cutting_Ex" color="#fff" width="124" height="45" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg" data-name="Line cutting cutting Ex"><g><path d="m216 320h16v16h-16z"/><path d="m248 320h16v16h-16z"/><path d="m280 320h16v16h-16z"/><path d="m216 352h16v16h-16z"/><path d="m248 352h16v16h-16z"/><path d="m280 352h16v16h-16z"/><path d="m216 384h16v16h-16z"/><path d="m248 384h16v16h-16z"/><path d="m280 384h16v16h-16z"/><path d="m216 256h16v16h-16z"/><path d="m248 256h16v16h-16z"/><path d="m280 256h16v16h-16z"/><path d="m216 288h16v16h-16z"/><path d="m248 288h16v16h-16z"/><path d="m280 288h16v16h-16z"/><path d="m177.869 82.44 33.264 32.424-7.853 45.783a8 8 0 0 0 11.608 8.434l41.112-21.616 41.116 21.616a8 8 0 0 0 11.608-8.434l-7.853-45.783 33.268-32.424a8 8 0 0 0 -4.434-13.646l-45.969-6.679-20.558-41.656a8 8 0 0 0 -14.348 0l-20.558 41.656-45.972 6.679a8 8 0 0 0 -4.434 13.646zm56.866-5.1a8 8 0 0 0 6.023-4.377l15.242-30.886 15.246 30.89a8 8 0 0 0 6.023 4.377l34.09 4.953-24.659 24.046a8 8 0 0 0 -2.3 7.081l5.823 33.952-30.491-16.03a8 8 0 0 0 -7.446 0l-30.491 16.03 5.823-33.952a8 8 0 0 0 -2.3-7.081l-24.673-24.043z"/><path d="m328.392 146.092a8 8 0 0 0 2.024 8.2l22.151 21.592-5.229 30.489a8 8 0 0 0 11.608 8.434l27.381-14.395 27.381 14.395a8 8 0 0 0 11.607-8.434l-5.23-30.489 22.152-21.592a8 8 0 0 0 -4.434-13.646l-30.612-4.446-13.691-27.741a8 8 0 0 0 -14.347 0l-13.691 27.741-30.612 4.448a8 8 0 0 0 -6.458 5.444zm43.533 5.336a8 8 0 0 0 6.024-4.376l8.378-16.976 8.378 16.976a8 8 0 0 0 6.023 4.376l18.733 2.722-13.555 13.214a8 8 0 0 0 -2.3 7.081l3.2 18.658-16.756-8.81a8 8 0 0 0 -7.445 0l-16.756 8.81 3.2-18.658a8 8 0 0 0 -2.3-7.081l-13.557-13.214z"/><path d="m417.822 233.159a8 8 0 0 0 -4.433 13.645l14.245 13.886-3.363 19.61a8 8 0 0 0 11.607 8.434l17.608-9.257 17.608 9.257a8 8 0 0 0 11.606-8.434l-3.363-19.606 14.247-13.894a8 8 0 0 0 -4.434-13.645l-19.686-2.855-8.8-17.839a8 8 0 0 0 -14.348 0l-8.8 17.839zm32.178 7.992 3.491-7.074 3.492 7.074a8 8 0 0 0 6.017 4.376l7.807 1.135-5.649 5.506a8 8 0 0 0 -2.3 7.082l1.334 7.775-6.983-3.671a8 8 0 0 0 -7.445 0l-6.983 3.671 1.333-7.775a8 8 0 0 0 -2.3-7.082l-5.648-5.506 7.807-1.135a8 8 0 0 0 6.027-4.376z"/><path d="m69.763 154.293 22.152 21.592-5.23 30.489a8 8 0 0 0 11.607 8.434l27.381-14.395 27.381 14.395a8 8 0 0 0 11.608-8.434l-5.229-30.489 22.151-21.592a8 8 0 0 0 -4.434-13.646l-30.612-4.447-13.691-27.74a8 8 0 0 0 -14.347 0l-13.691 27.74-30.609 4.447a8 8 0 0 0 -4.434 13.646zm41.509-2.865a8 8 0 0 0 6.023-4.376l8.378-16.976 8.378 16.976a8 8 0 0 0 6.024 4.376l18.733 2.722-13.555 13.214a8 8 0 0 0 -2.3 7.081l3.2 18.658-16.756-8.81a8.006 8.006 0 0 0 -7.445 0l-16.752 8.807 3.2-18.658a8 8 0 0 0 -2.3-7.081l-13.561-13.211z"/><path d="m18.416 246.8 14.245 13.89-3.361 19.61a8 8 0 0 0 11.608 8.434l17.608-9.257 17.608 9.257a8 8 0 0 0 11.605-8.434l-3.363-19.61 14.245-13.89a8 8 0 0 0 -4.433-13.645l-19.687-2.855-8.8-17.839a8 8 0 0 0 -14.348 0l-8.8 17.839-19.693 2.859a8 8 0 0 0 -4.434 13.641zm30.584-1.273a8 8 0 0 0 6.023-4.376l3.492-7.074 3.491 7.074a8 8 0 0 0 6.023 4.376l7.807 1.135-5.648 5.506a8 8 0 0 0 -2.3 7.082l1.333 7.775-6.983-3.671a8 8 0 0 0 -7.445 0l-6.983 3.671 1.334-7.775a8 8 0 0 0 -2.3-7.082l-5.649-5.506z"/><path d="m144 288h24v16h-24z"/><path d="m144 328h24v16h-24z"/><path d="m144 368h24v16h-24z"/><path d="m144 408h24v16h-24z"/><path d="m464 392h-16a32.036 32.036 0 0 0 -32 32v16.474a37.8 37.8 0 0 0 -16 6.558v-39.032h-16v40h-56v-184h56v128h16v-136a8 8 0 0 0 -8-8h-64v-40a8 8 0 0 0 -8-8h-24v-16a8 8 0 0 0 -8-8h-64a8 8 0 0 0 -8 8v16h-24a8 8 0 0 0 -8 8v40h-64a8 8 0 0 0 -8 8v48h16v-40h56v184h-56v-128h-16v127.032a37.8 37.8 0 0 0 -16-6.558v-16.474a32.036 32.036 0 0 0 -32-32h-16a32.036 32.036 0 0 0 -32 32v64a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-64a32.036 32.036 0 0 0 -32-32zm-232-200h48v32h-48zm-200 232a16.019 16.019 0 0 1 16-16h16a16.019 16.019 0 0 1 16 16v16.474a38.061 38.061 0 0 0 -32 37.526v2h-16zm32 56v-2a22.025 22.025 0 0 1 22-22h4a22.025 22.025 0 0 1 22 22v2zm64-16h56v16h-56zm72-248h16v16a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8v-16h16v264h-24v-56a8 8 0 0 0 -8-8h-48a8 8 0 0 0 -8 8v56h-24zm40 264v-48h32v48zm88-16h56v16h-56zm72 16v-2a22.025 22.025 0 0 1 22-22h4a22.025 22.025 0 0 1 22 22v2zm80 0h-16v-2a38.061 38.061 0 0 0 -32-37.526v-16.474a16.019 16.019 0 0 1 16-16h16a16.019 16.019 0 0 1 16 16z"/><path d="m344 368h24v16h-24z"/><path d="m344 408h24v16h-24z"/><path d="m344 288h24v16h-24z"/><path d="m344 328h24v16h-24z"/></g></svg>
            </div>
    <SearchBar placeholder="Find a room"/>*/}
            <h2 onClick={() => (history.push('/'))}>S-Lodging</h2>
            {ctx.loggedIn && <SearchBar placeholder="Find a room" handleSearch={ctx.handleSearchResults}/>}
            <div className={Style.Links}>
               {ctx.loggedIn ? (
                   <div>
                      <Profile route={ctx.route} name={ctx.userData.firstname} type={ctx.userData.type}{...props} logout={ctx.logout} loggedIn={ctx.loggedIn}/>
                   </div>
               ) : (<><button onClick={ctx.hostSignUp}>Host Sign up</button>
                <button onClick={ctx.guestSignUp}>Sign Up</button>
                <button onClick={ctx.signIn}>Login</button></>)}
            </div>
        </nav>
        <MobileNav signIn={ctx.signIn} hostSignUp={ctx.hostSignUp} guestSignUp={ctx.guestSignUp} name={ctx.userData.firstname} type={ctx.userData.type} logout={ctx.logout} loggedIn={ctx.loggedIn}/>
      </header>
    )
}

export default Header