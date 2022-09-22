import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../UX/Preloader/Preloader";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollow
} from "../../redux/Reducer/UsersReducer";
import {usersAPI} from "../../api/API";


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

class UsersContainer extends React.Component {


    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onPageChanged = (pageNumber) => {
        //Когда получаем запрос
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                // Когда получаем ответ
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

//Компонета перерисовывается если, что то изменяется в ее state
let mapStateToProps = (state) => {
    return {
        //информация приходит через props из initialState=>UsersReducer.js=>state.usersPage
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

//Функция служит для передачи callback через кнопки/input и тд
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching:(IsFetching)=>{
//             dispatch(toggleIsFetchingAC(IsFetching))
//         }
//
//     }
// }


//Все пропсы приходят от connect по 2 функциям в файл Users
export default connect(mapStateToProps,
    {
        follow, unfollow, setUsers,
        setCurrentPage, setTotalUsersCount, toggleIsFetching,
        toggleFollowingProgress
    })(UsersContainer)

