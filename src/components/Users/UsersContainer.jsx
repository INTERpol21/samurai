import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../UX/Preloader/Preloader";
import {follow, setCurrentPage, toggleFollowingProgress, unfollow, usersThunk} from "../../redux/Reducer/UsersReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuperSelector
} from "../../redux/Reducer/UsersSelectors";


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

//     Для componentDidMount
//
//     useEffect(() => {
//     // Your code here
// }, []);
// Для componentDidUpdate
//
// useEffect(() => {
//     // Your code here
// }, [yourDependency]);
// Для componentWillUnmount
//
// useEffect(() => {
//     // componentWillUnmount
//     return () => {
//         // Your code here
//     }
// }, [yourDependency]);


    ///getUsers вызывает getUsersThunkCreator из connect
    componentDidMount() {
        //Санки
        //с помошью CALLBACK вызываются currentPage и pageSize и передаются сюда !!!!
        this.props.usersThunk(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetching(true)
        //
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        //     .then(data => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //         this.props.setTotalUsersCount(data.totalCount)
        //     })
    }

    onPageChanged = (pageNumber) => {
        //Санки
        this.props.usersThunk(pageNumber, this.props.pageSize)
        //Когда получаем запрос
        // this.props.setCurrentPage(pageNumber)
        // this.props.toggleIsFetching(true)
        //Вынесено в API
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         // Когда получаем ответ
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //     })
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
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingInProgress(state),
        isFetching: getIsFetching(state)
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

//HOC
//Внутреним HOC connect получаем один контейнер,  внешнем withAuthRedirect еще раз оборачиваем
//Все пропсы приходят от connect по 2 функциям в файл Users
// export default withAuthRedirect(connect(mapStateToProps,
//     {
//         // setTotalUsersCount, toggleIsFetching,setUsers,
//         follow, unfollow,
//         setCurrentPage,
//         toggleFollowingProgress, getUsers
//     })(UsersContainer))
//getUsers приходит колбеком из UserReducer

export default compose(
    withAuthRedirect,
    connect(
        mapStateToProps, {
            follow, unfollow,
            setCurrentPage,
            toggleFollowingProgress, usersThunk
        }))
(UsersContainer)