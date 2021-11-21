import React, { useContext, useState, useEffect } from 'react'
import Style from '../Listing/Listing.module.css';
import ListItem from '../Listing/ListItem';
import AuthContext from '../../store/authContext';

const Booking = () => {
    const ctx = useContext(AuthContext);
    const [ bookings, setBookings ] = useState(ctx.booked);
    
    useEffect(() => {
      setBookings(ctx.booked);
      }, [ctx.booked, ctx.handleBooked]);

      const books = bookings.map((id) => ctx.roomList.find((room) => room._id === id));

     /* const handleDelete = async (id: any) => {
        try{
            const res = await axios.delete(`https://polar-ridge-98480.herokuapp.com/api/listing/${id}`);
            //console.log(res)
            return res;
        } catch(e) {
            return e
        }
    }*/

    return (
        <> 
          <div className={Style.Listing}>
             <h3>Your Bookings</h3>
             {books.length === 0 ? <h4 style={{ textAlign: 'center' }}>List is currently empty</h4> : books.map((room) => room && <ListItem type={ctx.userData.type} handleFavorites={ctx.handleFavorites} favorites={ctx.favorites} view={ctx.handleRoomView} list={room} />)}
          </div>
        </>
    )
}

export default Booking
