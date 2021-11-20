import React from 'react'
import Styles from './ExploreItem.module.css';

interface Props {
    title: string;
    image: string;
    hover: boolean;
}
const ExploreItem = (props: Props) => {
    console.log(props.hover)
    return (
        <div className={Styles.ExploreItem}>
           <div className={Styles.imgWrapper}>
                <img src={props.image} alt=""/>
                {props.hover ? <div className={Styles.overlay}>
                    <button className={Styles.button}><a href="!#">Explore</a></button>
                </div>: null}
            </div>
            <h3>{props.title}</h3>
        </div>
    )
}

export default ExploreItem
