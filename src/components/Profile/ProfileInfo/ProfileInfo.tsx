import React, {ChangeEvent, useState} from "react";
import ProfileDataForm from "./ProfileDataForm";
import style from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/avatar.png"
import {ContactsType, ProfileType} from "../../../types/types";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import Preloader from "../../../utils/Preloader/Preloader";


export type ProfileInfoPropsType = {

    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: File) => void
    saveProfile: (formData: ProfileType, setStatus: any,
                  setSubmitting: any, goToViewMode: any) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

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

    const handleSubmit = (formData: ProfileType, setStatus: any,
                          setSubmitting: any, goToViewMode: any) => {

        saveProfile(formData, setStatus, setSubmitting, goToViewMode)

    }


    return (
        <div>


            <div className={style.descriptionBlock}>

                <img src={profile.photos.large !== null
                    ? profile.photos.large
                    : defaultAvatar}
                     className={style.userPhoto}
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

                    <ProfileStatusWithHooks
                        status={props.status}
                        updateStatus={props.updateStatus}
                        isOwner={props.isOwner}/>

                </div>

            </div>

        </div>
    )
}

type ProfileDataPropsType = {

    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void

}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {

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
                        contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>

        </div>)
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {

    return (
        <div className={style.contact}>
            <b> {contactTitle}</b>: {contactValue}
        </div>)
}

export default ProfileInfo
