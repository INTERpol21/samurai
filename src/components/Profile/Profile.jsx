import MyPosts from "../MyPosts/MyPosts";
import style from "./Profile.module.css";

const Profile = () => {
    return (
        <div className={style.content}>
            <div>
                <img
                    src="https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg"
                    alt="background"
                />
            </div>
            <div>
                ava + description
            </div>
           <MyPosts/>
        </div>
    )
}

export default Profile;