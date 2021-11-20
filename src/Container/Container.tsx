import React, {Suspense, useContext} from 'react';
import Style from './Container.module.css';
import {Switch, Route } from 'react-router-dom';
import {Home, Signup, HostForm, Listing, Booking, RoomDetails} from '../Routes/routes';
import Header from '../Components//Header/Header';
import Footer from '../Components/Footer/Footer';
import SearchResults from "../Components/SearchResults/SearchResults"
import Spinner from '../Components/Spinner/Spinner';
import AuthContext from '../store/authContext'

interface Props {

}

const Container = (prop: Props) => {
    const ctx = useContext(AuthContext);

    return (
        <div className={Style.Wrapper}>
            <Header/>
            <div>
                <Switch>
                    <Route
                      path="/room/:id"
                      render={() => (
                          <Suspense fallback={<Spinner/>}>
                            <RoomDetails/>
                          </Suspense>
                      )}
                    />
                    {ctx.loggedIn &&  <Route
                      path="/:name/bookings"
                      render={() => (
                          <Suspense fallback={<Spinner/>}>
                            <Booking/>
                          </Suspense>
                      )}
                    />}
                    {ctx.loggedIn &&  <Route
                      path="/:name/list"
                      render={() => (
                          <Suspense fallback={<Spinner/>}>
                            <Listing/>
                          </Suspense>
                      )}
                      />}
                    <Route
                      path="/host/hostform"
                      render={() => (
                          <Suspense fallback={<Spinner/>}>
                            <HostForm/>
                          </Suspense>
                      )}
                    />
                    <Route
                      path="/"
                      render={() => (
                          <Suspense fallback={<Spinner/>}>
                            <Home/>
                          </Suspense>
                      )}
                    />
                </Switch>
            </div>
            <Suspense fallback={<Spinner/>}>
                <Signup/>
            </Suspense>
            {ctx.showResults ? <SearchResults results={ctx.searchResults} /> : null}
            <Footer/>
        </div>
    )
}

export default Container;