import React from "react";

import styles from './DropdownMenu.module.scss';

export const DropdownMenu = ({name, data, action}) => {

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropbtn}>{name}</button>
            <div className={styles.content}>
                {
                    Object.keys(data).map((_name, id)=>(<a onClick={()=>action(_name)} key={id} href="#">{_name}</a>))
                }                
            </div>
        </div>
    );
}
