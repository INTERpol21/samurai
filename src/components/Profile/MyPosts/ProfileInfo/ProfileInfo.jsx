import style from "./ProfileInfo.module.css";
import Preloader from "../../../UX/Preloader/Preloader";
import defaultAvatar from "./../../../../assets/images/avatar.png"
import ProfileStatusWithHOOK from "./ProfileStatusWithHOOK";
import ProfileDataForm from "./ProfileDataForm";
import React, {ChangeEvent, useState} from 'react'


// const ProfileInfo = (props) => {
//
//     if (!props.profile) {
//         return (
//             <div>
//                 <Preloader/>
//                 <ProfileStatusWithHOOK status={props.status} updateStatus={props.updateStatus}/>
//             </div>
//         )
//     }
//
//
//     return (<div>
//
//         <div>
//             <img
//                 src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}
//                 alt={`user avatar ${props.profile.userId}`}
//                 style={{borderRadius: 80, width: 150}}
//
//             />
//         </div>
//         <div className={style.title}>
//             <img src={props.profile.photos.large} alt=""/>
//             <ProfileStatusWithHOOK status={props.status} updateStatus={props.updateStatus}/>
//
//             <div className={style.descriptionBlock}>
//                 Name: {props.profile.fullName} <br/>
//                 About: {props.profile.aboutMe} <br/>
//                 Contacts:
//
//                 facebook: {props.profile.contacts.facebook} <br/>
//                 website: {props.profile.contacts.website} <br/>
//                 VK: {props.profile.contacts.vk} <br/>
//                 twitter: {props.profile.contacts.twitter} <br/>
//                 instagram: {props.profile.contacts.instagram} <br/>
//                 youtube: {props.profile.contacts.youtube} <br/>
//                 github: {props.profile.contacts.github} <br/>
//                 mainLink: {props.profile.contacts.mainLink} <br/><br/>
//                 Looking for a job: {props.profile.lookingForAJob === true
//                 ? props.profile.lookingForAJobDescription
//                 : "Yes, i want work in Perrweb"} <br/>
//                 <br/>
//
//
//             </div>
//         </div>
//     </div>)
// }


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    let {profile, saveProfile} = props


    if (!profile) {
        return <Preloader/>
    }

    let alt_descriptionBlock = `photo_${profile.userId}`

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.files?.length) {
            props.savePhoto(event.target.files[0])
        }
    }

    const handleSubmit = (formData, setStatus,
                          setSubmitting, goToViewMode) => {

        saveProfile(formData, setStatus, setSubmitting, goToViewMode)

    }


    return (
        <div>


        <div className={style.descriptionBlock}>

                <img src={profile.photos.large !== null
                    ? profile.photos.large
                    : defaultAvatar}
                     className={style.defaultAvatar}
                     alt={alt_descriptionBlock}
                />

                <div>
                    {profile.fullName} - userId - {profile.userId}
                </div>

                <div>
                    {props.isOwner
                        &&
                        <input
                            type={'file'}
                            onChange={onMainPhotoSelected}
                        />}
                </div>


                <div className={style.profileBlock}>

                    {editMode
                        ? <ProfileDataForm profile={profile}
                                           handleSubmit={handleSubmit}
                                           goToViewMode={
                                               () => setEditMode(false)}/>
                        : <ProfileData profile={profile}
                                       isOwner={props.isOwner}
                                       goToEditMode={
                                           () => setEditMode(true)}/>}

                    <ProfileStatusWithHOOK
                        status={props.status}
                        updateStatus={props.updateStatus}
                        isOwner={props.isOwner}/>

                </div>

            </div>

        </div>
    )
}


const ProfileData = ({profile, isOwner, goToEditMode}) => {

    return (
        <div>

            <div>
                {isOwner &&
                    <button onClick={goToEditMode}>Edit</button>
                }
            </div>

            <div>
                <b> Full name</b>: {profile.fullName}
            </div>

            <div>
                <b> Looking for a job</b>: {profile.lookingForAJob
                ? 'yes' : 'no'}
            </div>

            {profile.lookingForAJob &&
                <div>
                    <b> My professional skills</b>: {profile.lookingForAJobDescription}
                </div>}

            <div>
                <b> About me</b>: {profile.aboutMe}
            </div>

            <div>
                <b> Contacts</b>:
                {Object.keys(profile.contacts).map(key => {
                    return <Contacts
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts}/>
                })}
            </div>

        </div>)
}


const Contacts = ({contactTitle, contactValue}) => {

    return (
        <div className={style.contact}>
            <b> {contactTitle}</b>: {contactValue}
        </div>)
}

export default ProfileInfo


