import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";
import {ProfileType} from "../../types/types";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: File) => void
    saveProfile: (formData: ProfileType, setStatus: any,
                  setSubmitting: any, goToViewMode: any) => void
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo
                {...props}
            />
            <MyPostsContainer
            />
        </div>
    )
}

export default Profile