import React, { useContext } from 'react'
import Styles from './Home.module.css';
import bg1 from '../../assests/lagos.jpg';
import hostBg from '../../assests/hostBg.svg'
import bg2 from '../../assests/abuja.jpg';
import bg3 from '../../assests/calabar.jpeg';
import bg4 from '../../assests/ib.jpg';
import ExploreItem from '../ExploreItem/ExploreItem';
import AuthContext from '../../store/authContext';
import { useHistory } from 'react-router-dom'

const Home = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();

    return (
        <div className={Styles.Home}>
            <section className={Styles.Hero}>
                <div className={Styles.HeroDark}>
                  <div className={Styles.HeroText}>
                    <h1>Explore hotels in Nigeria</h1>
                    {ctx.loggedIn ? <button onClick={() => history.push(`/${ctx.userData.firstname}/list`)}>Explore</button> : 
                    <button onClick={ctx.guestSignUp}>Get Started</button>}
                  </div>
                </div>
            </section>
            <section>
                <div className={Styles.About}>
                   <h2>About S-lodge</h2>
                   <div className={Styles.Main}>
                    <div>
                      <i className="fas fa-clipboard"></i>
                      <h2>Browse throgh room list</h2>
                      <p>At Slodge, there is diverse list of rooms and apartments in every major city in Nigeria 
                        to match our guest taste and budget.</p>
                       {/*<a href="!#">Browse</a>*/}
                    </div>
                    <div>
                      <i className="fas fa-check-square"></i>
                      <h2>Book your visits</h2>
                      <p>Travelling out of town and need a place to stay. Simply select select any available rooms and book them, our hosts will contact you.</p>
                      {/*<a href="!#">Book</a>*/}
                    </div>
                    <div>
                      <i className="fas fa-globe-africa"></i>
                      <h2>Explore the world!</h2>
                      <p>Come explore the beautiful cities in Nigeria. Book a room, Get connected with the host, Pack your bags and begin your adventure in any Nigerian city today.</p>
                      {/*<a href="!#">Explore</a>*/}
                    </div>
                   </div>
                </div>
            </section>
            
            <section className={Styles.hostBg}>
                <img src={hostBg} alt=""/>
                <div>
                    <h1>Looking to host for an extra income</h1>
                    <button onClick={ctx.hostSignUp}>Become a host</button>
                </div>
            </section>
            <section className={Styles.Explore}>
                <h2>Explore popular locations</h2>
                <div className={Styles.ExploreItems}>
                    <ExploreItem title="Lagos" image={bg1} hover={true}/>
                    <ExploreItem title="Abuja" image={bg2} hover={true}/>
                    <ExploreItem title="Calabar" image={bg3} hover={true}/>
                    <ExploreItem title="Ibadan" image={bg4} hover={true}/>
                </div>
            </section>
        </div>
    )
}

export default Home
