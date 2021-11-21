import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store/authContext';
import { RoomList } from '../../store/authContext';
import Style from './Listing.module.css';
import ListItem from './ListItem';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Listing = () => {
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const [listing, setListing] = useState([] as RoomList[])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(ctx.userData.type === 'host') {
            const list = ctx.roomList.filter(room => room.hostid === ctx.userData._id);
            setListing(list);
        }
        if(ctx.userData.type === 'guest') {
            setListing(ctx.roomList)
        }

    }, [ctx.roomList, ctx.userData._id, ctx.userData.type]);

    const handleDelete = async (id: any) => {
        try{
            setLoading(true);
            const res = await axios.delete(`https://polar-ridge-98480.herokuapp.com/api/listing/${id}`);
            //console.log(res)
            setLoading(false) 
            return res;
        } catch(e) {
            return e
        }
       
    }
    
    return (
        <div className={Style.Listing}>
           <h3>LIST OF ROOMS</h3> 
           {listing.length === 0 ? <>
            <h4>You currently have no list</h4>{ctx.userData.type === 'host'  && <span style={{"cursor": "pointer"}} onClick={() => history.push('/host/hostform')}>Add here..</span>}
           </>: listing.map(list => list && <ListItem type={ctx.userData.type} view={ctx.handleRoomView} loading={loading} list={list} delete={true} deleteHandle={handleDelete} handleFavorites={ctx.handleFavorites} favorites={ctx.favorites}/>)
             }
        </div>
    )
}

export default Listing
