import React from "react";

import styles from './SearchField.module.scss';

export const SearchField = ({searchValue, setSearchValue}) => {
    const searchRef = React.useRef();

    const debounce = (func, timeout = 300) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    };

    const onChangeInput = e => {
        searchRef.current.value = e.target.value;
        updateSearchValue(e.target.value);        
    };
    
    const updateSearchValue = React.useCallback(
        debounce(s => {
            setSearchValue(s);
        }, 500),
        [],
    );

    return (
        <input ref={searchRef} className={styles.input}
        onChange={onChangeInput} type="search" placeholder="введите текст" />
    );
}