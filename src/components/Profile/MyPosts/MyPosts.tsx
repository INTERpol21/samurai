import style from "./MyPosts.module.css";
import React from "react";
import Post from "./Post/Post";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {ErrorMessageWrapper} from "../../../utils/validators/validators";
import * as Yup from "yup";
import {PostType} from "../../../types/types";


// let newPostElement = createRef();
//
    // let onAddPost = () => {
    //     props.addPost();
    //     //Фунция из BLL(redux)
    //     // props.dispatch(addPostActionCreator());
    //     debugger
    // }
    // //Срабатывает всякий раз когда мы хотим изменить содержимое input(newPostElement)
    // let onPostChange = () => {
    //     let text = newPostElement.current.value;
    //     //Фунция из BLL(redux)newText:text так как в store.js action.newText
    //     //Перекидываем весь функционал и излишество в контейнер
    //     // let action = (updateNewPostTextActionCreator(text));
    //     // props.dispatch(action);
    //     props.updateNewPostText(text)
    // }

//     const AddMassageForm = (props) => {
//
//         let addNewMessage = (values) => {
//
//             props.addPost(values);
//         }
//
//         return (
//             <Formik
//                 initialValues={{
//                     newPostText: ""
//                 }}
//                 onSubmit={(values, {resetForm}) => {
//                     addNewMessage(values.newPostText);
//                     resetForm({values: ''});
//                 }
//                 }
//             >
//                 {() => (
//                     <Form>
//                         <div>
//                             <Field
//                                 name={'newPostText'}
//                                 as={'textarea'}
//                                 placeholder={'Введите текст'}
//                             />
//                         </div>
//                         <button type={'submit'}>Send</button>
//                     </Form>
//                 )}
//             </Formik>
//         )
//     }
//
//
//     return (<div className={style.blockPosts}>
//
//         <h2>My posts</h2>
//         <div>
//             <AddMassageForm addPost={props.addPost}/>
//             {/*<form>*/}
//             {/*    <input onChange={onPostChange} value={props.newPostText}*/}
//             {/*           type="text" ref={newPostElement} placeholder={"Напиши текст"}/>*/}
//             {/*    <button type={"button"} onClick={onAddPost}>Add post</button>*/}
//             {/*</form>*/}
//             <div className={style.posts}>
//                 {postsElements}
//             </div>
//         </div>
//     </div>)
// })

export type MapMyPostsPropsType = {
    posts: Array<PostType>
}

export type DispatchMyPostsPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapMyPostsPropsType & DispatchMyPostsPropsType> = props => {

    // тут reverse - для теста
    let postsElement =
        [...props.posts]
            .reverse()
            .map(p => <Post value={p.message} likesCount={p.likesCount} key={p.id}/>)

    return (
        <div className={style.postsBlock}>

            <h3 className={style.text_h3}>
                My posts:
            </h3>

            <AddNewPostForm
                addPost={props.addPost}
            />

            <div className={style.posts}>
                {postsElement}
            </div>

        </div>
    )
}


type AddNewPostFormPropsType = {
    addPost: (newPostText: string) => void
}

const AddNewPostForm: React.FC<AddNewPostFormPropsType> = (props) => {

    const validationSchema = Yup.object().shape({

        newPostText: Yup.string()
            .min(2, 'Must be longer than 2 characters !')
            .max(100, 'Must be shorter than 100 characters !')
            .required('Required !')
    })

    const OnAddPost = (values: string) => {
        props.addPost(values)
    }

    return (
        <Formik
            initialValues={{
                newPostText: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                OnAddPost(values.newPostText)
                resetForm()
            }}
        >
            {() => (
                <Form>
                    <div>
                        <Field
                            name={'newPostText'}
                            as={'textarea'}
                            placeholder={'Enter your message'}
                        />
                    </div>

                    <ErrorMessage name="newPostText">
                        {ErrorMessageWrapper}
                    </ErrorMessage>

                    <button type={'submit'}>Add posts</button>
                </Form>
            )}
        </Formik>
    )
}


export default MyPosts
