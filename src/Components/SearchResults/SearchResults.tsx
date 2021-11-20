import React, { useContext } from 'react';
import styles from "./SearchResults.module.css"
import AuthContext from "../../store/authContext"

interface Props {
    results: Record<string, any>[]
}

const SearchResult = (props: Props) => {
    const ctx = useContext(AuthContext);
    return (
        <div className={styles.Wrapper}>
            {props.results.length > 0 ? props.results.map(room => (
              <div className={styles.Result} onClick={() => ctx.handleRoomView(room._id)}>
                <img src={room.image} alt="" />
                <div>
                    <h3>{room.title}</h3>
                    <p>{room.location}</p>
                </div>
              </div>
            )) : <h4>No Rooms available in this location...</h4>}
        </div>
    )
}

export default SearchResult;
