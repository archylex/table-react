import React from 'react';

import styles from './Table.module.scss';

export const Table = ({columns, data, action}) => {
    return (
    <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
        {            
            columns.map((name, id)=> 
                name !== 'Дата' 
                ? (<div onClick={()=>action(id)} key={id} className={styles.col}>{name}</div>)
                : (<div key={id} className={styles.col}>{name}</div>)
            )
        }  
        </div>
        {
            data.map((row) => (   
                <div key={row.name} className={styles.row}>
                  <div className={styles.col}>{row.date}</div>
                  <div className={styles.col}>{row.name}</div>
                  <div className={styles.col}>{row.count}</div>
                  <div className={styles.col}>{row.distance}</div>
                </div>))
        }

       

      </div>)    
}