import styles from "./users.module.css"

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
                followed: true,
                fullName: "Антон",
                status: "I am a boss",
                location: {city: "Omsk", country: "Russia"}
            },
            {
                id: 2,
                photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
                followed: false,
                fullName: "Владимир",
                status: "I am a boss",
                location: {city: "Omsk", country: "Russia"}
            },
            {
                id: 3,
                photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
                followed: true,
                fullName: "Екатерина",
                status: "I am a boss",
                location: {city: "Omsk", country: "Russia"}
            },
            {
                id: 4,
                photoUrl: "https://demotivation.ru/wp-content/uploads/2020/04/100325-yana.jpg",
                followed: false,
                fullName: "Вася",
                status: "I am a boss",
                location: {city: "Omsk", country: "Russia"}
            },

        ])
    }

    return (<div>
        {props.users.map(user => <div key={user.id}>
                    <span>
                        <div>
                            <img className={styles.userPhoto} src={user.photoUrl} alt="#"/>
                        </div>
                        <div>
                            {user.followed
                                ? <button onClick={() => {
                                    props.unfollow(user.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(user.id)
                                }}>Follow</button>}

                        </div>
                    </span>
            <span>
                        <span>
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.country}</div>
                            <div>{user.location.city}</div>
                        </span>
                </span>
        </div>)}
    </div>)
}

export default Users