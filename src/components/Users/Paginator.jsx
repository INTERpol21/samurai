import styles from "./users.module.css";
import React from "react";


let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div className={styles.container}> {slicedPages.map((page, id) => {
            return <span
                key={id} className={currentPage === page ? styles.selectedPage : styles.noSelectedPage}
                onClick={() => {
                    onPageChanged(page)
                }}>{page}
                </span>
        })}
        </div>
    )
}

export default Paginator