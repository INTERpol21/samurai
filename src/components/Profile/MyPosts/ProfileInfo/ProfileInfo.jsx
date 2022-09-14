import style from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (<div>
        <div>
            <img className={style.picture}
                 src="https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg"
                 alt="background"
            />
        </div>
        <div className={style.title}>
            P.S Altai
        </div>
    </div>)
}

export default ProfileInfo;