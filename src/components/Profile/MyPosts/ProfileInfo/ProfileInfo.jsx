import style from "./ProfileInfo.module.css";


const ProfileInfo = (props) => {

    if (!props.profile) {
        return (<div>
            <div>
                <img className={style.picture}
                     src="https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg"
                     alt=""
                />
            </div>
            <div className={style.title}>
                P.S Altai
            </div>
        </div>)
    }


    return (<div>

        <div>
            <img className={style.picture}
                 src="https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg"
                 alt="background"
            />
        </div>
        <div className={style.title}>
            <img src={props.profile.photos.large} alt=""/>
            P.S Altai
        </div>
    </div>)
}

export default ProfileInfo;