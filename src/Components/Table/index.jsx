import React from 'react';

import styles from './Table.module.scss';

export const Table = ({columns, data, action}) => {
    return (
    <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
        {            
            Object.keys(columns).map((name, id)=>
                name !== 'Дата' 
                ? (<div onClick={()=>action(name)} key={id} className={styles.col}>{name}</div>)
                : (<div key={id} className={styles.col}>{name}</div>)
            )
        }  
        </div>
        {
            data.map((row) => (   
                <div key={row.name} className={styles.row}>
                  <div className={styles.col}>{row._date}</div>
                  <div className={styles.col}>{row._name}</div>
                  <div className={styles.col}>{row._count}</div>
                  <div className={styles.col}>{row._distance}</div>
                </div>))
        }

       

      </div>)    
}
