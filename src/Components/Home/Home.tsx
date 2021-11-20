import React, { useContext } from 'react'
import Styles from './Home.module.css';
import bg1 from '../../assests/homeBg1.svg';
import hostBg from '../../assests/hostBg.svg'
import bg2 from '../../assests/chelsea-gates-0653_wY0nRc-unsplash.jpg';
import bg3 from '../../assests/henrique-ferreira-RKsLQoSnuTc-unsplash.jpg';
import bg4 from '../../assests/jolene-hardy-uuApNXxgcRM-unsplash.jpg';
import ExploreItem from '../ExploreItem/ExploreItem';
import AuthContext from '../../store/authContext';

const Home = () => {
  const ctx = useContext(AuthContext);

    return (
        <div className={Styles.Home}>
            <section className={Styles.Hero}>
                <div className={Styles.HeroDark}>
                  <div className={Styles.HeroText}>
                    <h1>Explore hotels in Nigeria</h1>
                    <button>Get Started</button>
                  </div>
                </div>
            </section>
            <section>
                <div className={Styles.About}>
                   <h2>About Hotel Lodging</h2>
                   <div className={Styles.Main}>
                    <div>
                      <i className="fas fa-clipboard"></i>
                      <h2>Browse throghh our listing</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque ea est modi laborum minima ratione voluptates. Amet quam aut nesciunt?</p>
                       <a href="!#">Browse</a>
                    </div>
                    <div>
                      <i className="fas fa-check-square"></i>
                      <h2>Book your visits</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque ea est modi laborum minima ratione voluptates. Amet quam aut nesciunt?</p>
                      <a href="!#">Book</a>
                    </div>
                    <div>
                      <i className="fas fa-globe-africa"></i>
                      <h2>Explore the world!</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque ea est modi laborum minima ratione voluptates. Amet quam aut nesciunt?</p>
                      <a href="!#">Explore</a>
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
                    <ExploreItem title="Ibandan" image={bg4} hover={true}/>
                </div>
            </section>
        </div>
    )
}

export default Home
