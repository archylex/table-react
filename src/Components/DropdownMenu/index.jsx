import React from "react";

import styles from './DropdownMenu.module.scss';

export const DropdownMenu = ({name, data, action}) => {

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropbtn}>{name}</button>
            <div className={styles.content}>
                {
                    data.map((name, id)=>(<a onClick={()=>action(name)} key={id} href="#">{name}</a>))
                }                
            </div>
        </div>
    );
}