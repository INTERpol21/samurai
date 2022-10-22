import React, {FC} from "react";
import style from "./users.module.css";
import defaultAvatar from "../../assets/images/avatar.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";


type PropsType = {
    user: UserType
    followingInProgress: Array<number | null>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User: FC<PropsType> = (props) => {

    let user = props.user;


    return (
        <div>
         <span>
            <div>
               <NavLink to={'/profile/' + user.id}>
                  <img src={user.photos.small !== null
                      ? user.photos.small
                      : defaultAvatar}
                       className={style.defaultAvatar}
                       alt={'fff'}/>
               </NavLink>
            </div>

            <div>
               {user.followed
                   ?
                   <button
                       disabled={
                           props.followingInProgress.some(id => id === user.id)}
                       onClick={() => {

                           props.unfollow(user.id)

                       }}>
                       Unfollow
                   </button>

                   :
                   <button
                       disabled={props.followingInProgress.some(id => id === user.id)}
                       onClick={() => {

                           props.follow(user.id)

                       }}>
                       Follow
                   </button>}
            </div>
         </span>

            <span>
            <span>
               <div>
                  {user.name}
               </div>
               <div>
                  {user.status}
               </div>
            </span>

            <span>
               <div>
                  {'user.location.country'}
               </div>
               <div>
                  {'user.location.city'}
               </div>
            </span>
         </span>

        </div>)
}


export default User;
