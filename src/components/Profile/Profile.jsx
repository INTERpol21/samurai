import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo {...props}/>
            <MyPostsContainer status={props.status}/>
        </div>
    )
}

export default Profile;