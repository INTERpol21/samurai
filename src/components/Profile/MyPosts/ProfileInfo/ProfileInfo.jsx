import style from "./ProfileInfo.module.css";
import Preloader from "../../../UX/Preloader/Preloader";
import defaultAvatar from "./../../../../assets/images/avatar.png"
import ProfileStatusWithHOOK from "./ProfileStatusWithHOOK";


const ProfileInfo = (props) => {

    if (!props.profile) {
        return (
            <div>
                <Preloader/>
                {/*<ProfileStatusWithHOOK status={props.status} updateStatus={props.updateStatus}/>*/}
            </div>
        )
    }
    let alt_descriptionBlock = `photo_${props.profile.userId}`;
    const onMainPhotoSelected = (event) => {
        if (event.target.files.length) {
            props.savePhoto(event.target.files[0])
        }
    }
    return (<div>
        <div className={style.picture}>
            <img src='https://html5css.ru/css/img_forest.jpg' alt='photo555'/>
        </div>

        <div>


            <img src={props.profile.photos.small !== null
                ? props.profile.photos.small
                : defaultAvatar}
                 className={style.defaultAvatar}
                 alt={alt_descriptionBlock}/>


            ...Avatar + description и userId_ {props.profile.userId}

            <div>
                {props.isOwner
                    &&
                    <input
                        type={'file'}
                        onChange={onMainPhotoSelected}
                    />}
            </div>


            <ProfileStatusWithHOOK
                status={props.status}
                updateStatus={props.updateStatus}
            />

        </div>
        {/*<div>*/}
        {/*    <img*/}
        {/*        src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}*/}
        {/*        alt={`user avatar ${props.profile.userId}`}*/}
        {/*        style={{borderRadius: 80, width: 150}}*/}

        {/*    />*/}
        {/*</div>*/}
        {/*<div className={style.title}>*/}
        {/*    <img src={props.profile.photos.large} alt=""/>*/}
        {/*    <ProfileStatusWithHOOK status={props.status} updateStatus={props.updateStatus}/>*/}

        {/*    <div className={style.descriptionBlock}>*/}
        {/*        Name: {props.profile.fullName} <br/>*/}
        {/*        About: {props.profile.aboutMe} <br/>*/}
        {/*        Contacts:*/}

        {/*        facebook: {props.profile.contacts.facebook} <br/>*/}
        {/*        website: {props.profile.contacts.website} <br/>*/}
        {/*        VK: {props.profile.contacts.vk} <br/>*/}
        {/*        twitter: {props.profile.contacts.twitter} <br/>*/}
        {/*        instagram: {props.profile.contacts.instagram} <br/>*/}
        {/*        youtube: {props.profile.contacts.youtube} <br/>*/}
        {/*        github: {props.profile.contacts.github} <br/>*/}
        {/*        mainLink: {props.profile.contacts.mainLink} <br/><br/>*/}
        {/*        Looking for a job: {props.profile.lookingForAJob === true*/}
        {/*        ? props.profile.lookingForAJobDescription*/}
        {/*        : "Yes, i want work in Perrweb"} <br/>*/}
        {/*        <br/>*/}


        {/*    </div>*/}
        {/*</div>*/}
    </div>)
}


export default ProfileInfo;