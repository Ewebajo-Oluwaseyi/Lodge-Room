import React, { useContext, useState, useEffect } from 'react'
import Style from './RoomDetails.module.css';
import AuthContext from '../../store/authContext';
import { RoomList } from '../../store/authContext';
import { useParams } from "react-router-dom"
import bg2 from '../../assests/chelsea-gates-0653_wY0nRc-unsplash.jpg';

const RoomDetails = () => {
    const ctx = useContext(AuthContext);
    const [data, setData] = useState({} as RoomList);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("");
    const [show, setShow] = useState(false)

    const handleFirstNameInput = (e: any) => {
        setFirstName(e.target.value)
    }
    const handleLastNameInput = (e: any) => {
        setLastName(e.target.value)
    }
    const handlePhoneInput = (e: any) => {
        setPhone(e.target.value)
    }

    const { id } = useParams() as {
        id: string
    }

    useEffect(() => {
        const room = ctx.roomList.find(room => room._id === id);
        console.log(room)
        if (room) setData(room)
    }, [ctx.roomList, data, id]);

    const handleSubmit= async(e: any) => {
        e.preventDefault();
        ctx.handleBooked(data._id);
        const body = {
            name: `${firstName} ${lastName}`,
            phone: phone,
            hostid: data.hostid,
            roomId: data._id,
            userEmail: ctx.userData.email
        }
        const res = await ctx.submitBooking(body);
        if (res && res.status === 200) setShow(true);
        setTimeout(() => setShow(false), 2000)
        window.location.reload();
    }

    return (
        <div className={Style.Main}>
          <div className={Style.Contents}>
            <div className={Style.Image}>
                <img src={bg2} alt="!#"/>
            </div>
            <div className={Style.Content}>
              <h2>{data.title} {/*ctx.favorites && ctx.favorites.includes(data._id) ? <i style={{"color": "red"}} className="fas fa-heart"></i> : 
                    <i className="far fa-heart"></i>*/}</h2>
              <div className={Style.Info}>
              <p>
                {data.location}
              </p>
                <span>
                    {data.price}
                    {data.booked ? <span style={{ "color": "red", "marginLeft": "1rem" }}>Not available</span> : <span style={{ "marginLeft": "1rem" }}>Available</span>}
                </span>
              </div>
              <p className={Style.description}>{data.desc}</p>
              <p className={Style.features}>{data.features}</p>
            </div>
          </div>
          <div className={Style.FormWrapper}>
            <h3>Book this room</h3>
            <form>
                <div className={Style.Form}>
                    <div className={Style.Col}>
                        <label>First Name:</label>
                        <input type="text" placeholder="Enter first name" value={firstName} onChange={handleFirstNameInput}/>
                    </div>
                    <div className={Style.Col}>
                        <label>Last Name:</label>
                        <input type="text" placeholder="Enter last name" value={lastName} onChange={handleLastNameInput}/>
                    </div>  
                    <div className={Style.Col}>     
                       <label>Phone:</label>
                       <input type="email" placeholder="Enter email" value={phone} onChange={handlePhoneInput}/>
                    </div>
                    {show && <h5 style={{ "letterSpacing": "1px", "textAlign": "center", "lineHeight": "1.7" }}>{data.title} has been booked successfully!</h5>}
                    <button onClick={handleSubmit} disabled={data.booked || firstName === "" || lastName === "" || phone === ""} type="submit">
                        {ctx.loading ? "Booking..." : data.booked ? "Booked" : "Book Now"}
                    </button>
                   
                </div>
            </form>
          </div>
        </div>
    )
}

export default RoomDetails
