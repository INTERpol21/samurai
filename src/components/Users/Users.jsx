import styles from "./users.module.css"
import Avatar from "../../assets/images/avatar.png"
import axios from "axios";
import React from "react";

// let Users = (props) => {
//
//     let getUsers = () => {
//         if (props.users.length === 0) {
//             //Запрос на сервер, получение данных
//             axios.get("https://social-network.samuraijs.com/api/1.0/users")
//                 .then(response => {
//                     props.setUsers(response.data.items)
//                 })
//
//             // props.setUsers([
//             //     {
//             //         id: 1,
//             //         photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
//             //         followed: true,
//             //         fullName: "Антон",
//             //         status: "I am a boss",
//             //         location: {city: "Omsk", country: "Russia"}
//             //     },
//             //     {
//             //         id: 2,
//             //         photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
//             //         followed: false,
//             //         fullName: "Владимир",
//             //         status: "I am a boss",
//             //         location: {city: "Omsk", country: "Russia"}
//             //     },
//             //     {
//             //         id: 3,
//             //         photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
//             //         followed: true,
//             //         fullName: "Екатерина",
//             //         status: "I am a boss",
//             //         location: {city: "Omsk", country: "Russia"}
//             //     },
//             //     {
//             //         id: 4,
//             //         photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
//             //         followed: false,
//             //         fullName: "Вася",
//             //         status: "I am a boss",
//             //         location: {city: "Omsk", country: "Russia"}
//             //     },
//             //
//             // ])
//         }
//     }
//
//
//     return (<div>
//         <button onClick={getUsers}>Get Users</button>
//         {props.users.map(user => <div key={user.id}>
//                     <span>
//                         <div>
//                             <img className={styles.userPhoto}
//                                  src={user.photos.small != null ? user.photos.small : Avatar} alt=""/>
//                         </div>
//                         <div>
//                             {user.followed ? <button onClick={() => {
//                                 props.unfollow(user.id)
//                             }}>Unfollow</button> : <button onClick={() => {
//                                 props.follow(user.id)
//                             }}>Follow</button>}
//
//                         </div>
//                     </span>
//                      <span>
//                         <span>
//                             <div>{user.name}</div>
//                             <div>{user.status}</div>
//                         </span>
//                         <span>
//                             <div>{"user.location.country"}</div>
//                             <div>{"user.location.city"}</div>
//                         </span>
//                     </span>
//         </div>)}
//     </div>)
// }


class Users extends React.Component {


    componentDidMount() {
        //Запрос на сервер, получение данных
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage} &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }


    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber} &count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {


        let pagesCount = Math.ceil(this.props.totalUserCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        let curP = this.props.currentPage;
        let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
        let curPL = curP + 5;
        let slicedPages = pages.slice(curPF, curPL);


        return (
            <div>
                <div className={styles.container}> {slicedPages.map((page, id) => {
                    return (
                        <span key={id}
                              className={this.props.currentPage === page ? styles.selectedPage : styles.noSelectedPage}
                              onClick={() => {
                                  this.onPageChange(page)
                              }}>{page}</span>)
                })}
                </div>


                {
                    this.props.users.map(user =>
                        <div key={user.id}>
                            <div>
                                <img className={styles.userPhoto}
                                     src={user.photos.small != null ? user.photos.small : Avatar} alt=""/>
                            </div>
                            <div>
                                {user.followed ? <button onClick={() => {
                                    this.props.unfollow(user.id)
                                }}>Unfollow</button> : <button onClick={() => {
                                    this.props.follow(user.id)
                                }}>Follow</button>}
                            </div>

                            <div>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                                <div>{"user.location.country"}</div>
                                <div>{"user.location.city"}</div>
                            </div>
                        </div>)
                }
            </div>
        )
    }
}


export default Users