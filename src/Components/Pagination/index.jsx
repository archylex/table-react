import React from "react";

import styles from './Pagination.module.scss';

export const Pagination = ({ currentPage, numPages, action }) => {    
    const onChangePage = (idx) => {
        action(idx);
    }

    const onPagePrev = () => {
        if (Number(currentPage) - 1 > 0) {
            action(currentPage - 1);
        }
    }

    const onPageNext = () => {
        if (Number(currentPage) + 1 <= Number(numPages)) {
            action(currentPage + 1);
        }
    }

    return (
        <div className={styles.pagination}>
            <div onClick={()=>onPagePrev()} className={styles.pageBtn}>{'<'}</div>
            {
                Array.from({length: numPages}, (_, index) => index + 1).map((e) => (
                    <div key={e} onClick={()=>onChangePage(e)} className={Number(currentPage) === Number(e) ? styles.pageBtn + ' ' + styles.active : styles.pageBtn}>{e}</div>
                ))
            }            
            <div onClick={()=>onPageNext()} className={styles.pageBtn}>{'>'}</div>
        </div>
    );
}