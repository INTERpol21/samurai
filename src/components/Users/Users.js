import styles from "./users.module.css";
import Avatar from "../../assets/images/avatar.png";
import React from "react";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/API";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div>
            <div className={styles.container}> {slicedPages.map((page, id) => {
                return <span
                    key={id} className={props.currentPage === page ? styles.selectedPage : styles.noSelectedPage}
                    onClick={() => {
                        props.onPageChanged(page)
                    }}>{page}
                </span>
            })}
            </div>


            {
                props.users.map(user =>
                    <div key={user.id}>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                                <img className={styles.userPhoto}
                                     src={user.photos.small != null ? user.photos.small : Avatar} alt=""/>
                            </NavLink>

                        </div>
                        {/*withCredentials: true Параметр настроек, разрешение кукис, API-KEY ключ взятые с сервера, в настройках профиля*/}
                        <div>
                            {user.followed
                                ? <button disabled={props.followingInProgress.includes(user.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, user.id)

                                    usersAPI.unFollowedButton(user)
                                        .then(data => {
                                            if (data.resultCode === 0) {
                                                props.unfollow(user.id)
                                            }
                                        })

                                    props.toggleFollowingProgress(false, user.id)
                                }}>Unfollow</button>

                                : <button disabled={props.followingInProgress.includes(user.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, user.id)

                                    usersAPI.followedButton(user)
                                        .then(data => {
                                            if (data.resultCode === 0) {
                                                props.follow(user.id)
                                            }
                                        })

                                    props.toggleFollowingProgress(false, user.id)

                                }}>Follow</button>}
                        </div>

                        <div>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Users