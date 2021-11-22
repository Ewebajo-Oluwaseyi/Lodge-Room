import React, { useState } from 'react';
import { RoomList } from '../../store/authContext';
import Style from './Listing.module.css';
import Spinner from '../Spinner/Spinner';

interface Props {
  list: RoomList,
  deleteHandle?: (id: any) => {},
  view: (id: any) => void,
  loading?: Boolean,
  delete?: Boolean,
  type?: String,
  handleFavorites: (id: any) => void,
  favorites: string[]
}

const ListItem = (props: Props) => {

    const [state, setState] = useState(false)
    const deleteList = async (id: any) => {
        if(props.deleteHandle) {
            const res = await props.deleteHandle(id)
            if (res === "Delete Successful")
            prompt("Delete Successful");
            window.location.reload()
        }
    }

    const handFavorites= (id: any) => {
       props.handleFavorites(id);
       setState(!state)
    }

    return (
        <div className={Style.ListItem}>
            <div className={Style.Image}>
                {props.list.image && props.list.image.length > 0 && <div>
                    <img src={props.list.image} alt=""/>
                 </div>}
            </div>
            <div className={Style.details}>
                <h3>{props.list.title}</h3>
                {/*!props.delete ? <span>{state ? <i className="fas fa-heart"></i>: <i className="far fa-heart"></i>}</span> 
                : <i className="fas fa-trash" onClick={() => deleteList(props.list._id)}></i>*/}
                <span>{props.list.location}</span>
                <h5>{props.list.features}</h5>
                <div>
                    <span>&#8358;{props.list.price}</span>
                </div>
                {props.type === "guest" ? <>
                    <span onClick={() => handFavorites(props.list._id)}>{state || props.favorites.includes(props.list._id) ? <i style={{"color": "red"}} className="fas fa-heart"></i> : 
                    <i className="far fa-heart"></i>} Fav</span> 
                    <span onClick={() => props.view(props.list._id)}><i className="fas fa-eye"></i>View</span>
                </> : <span onClick={() => deleteList(props.list._id)}><i className="fas fa-trash"></i>Delete</span>}
            </div>
            {props.loading && <Spinner/> }
        </div>
    )
}

export default ListItem
