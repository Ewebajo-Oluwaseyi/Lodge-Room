import React, { ChangeEvent } from 'react'
import Style from './SearchBar.module.css';

interface Props {
    placeholder: string,
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = (props: Props) => {
    return (
        <div className={Style.Search}>
            <input type="text" placeholder={props.placeholder} onChange={props.handleSearch}/>
        </div>
    )
}

export default SearchBar;
