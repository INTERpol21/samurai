import profileReducer, {addPostActionCreator, deletePost} from "./ProfileReducer";

let state = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It my first post", likesCount: 22},
        {id: 3, message: "Hi, how are you?", likesCount: 32},
        {id: 4, message: "It my first post", likesCount: 42},
        {id: 5, message: "Hi, how are you?", likesCount: 52},
        {id: 6, message: "It my first post", likesCount: 62},
    ]
};

it("new post should be added", () => {
    //1. test data
    let action = addPostActionCreator("POST abc")


    //2.action
    let newState = profileReducer(state, action)

    //3.expectation
    expect(newState.posts.length).toBe(7)
})

it("new post should be POST abc", () => {
    //1. test data
    let action = addPostActionCreator("POST abc")


    //2.action
    let newState = profileReducer(state, action)

    //3.expectation
    expect(newState.posts[6].message).toBe("POST abc")
})


it("after deleting length of messages", () => {
    //1. test data
    let action = deletePost(1)


    //2.action
    let newState = profileReducer(state, action)

    //3.expectation
    expect(newState.posts.length).toBe(5)
})
