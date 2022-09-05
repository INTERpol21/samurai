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
            <div>
                My post
            </div>
            <div>
                New post
            </div>
            <div>
                <div>post 1</div>
                <div>post 2</div>
            </div>
        </div>
    )
}

export default Profile;