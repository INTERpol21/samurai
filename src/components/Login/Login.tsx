import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/Reducer/AuthReducer";
import {ErrorMessageWrapper, validateEmailField} from "../../utils/validators/validators";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Navigate} from "react-router-dom";
import * as Yup from "yup";
import style from "./Login.module.css"
import {RootState} from "../../redux/redux-store";
import React from "react";
import {ThunkDispatch} from "redux-thunk";


const validationSchema = Yup.object().shape({

    password: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(15, "Must be shorter than 15 characters")
        .required("Required 2")
});


export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector(
        (state: RootState) => state.auth.captchaUrl)

    const isAuth = useSelector(
        (state: RootState) => state.auth.isAuth)

    const dispatch: ThunkDispatch<any, any, any> = useDispatch()


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={style.loginBlock}>
            <h2> Login page </h2>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                    general: '',
                    captcha: ''
                }}
                validate={validateEmailField}
                validationSchema={validationSchema}

                onSubmit={(values, bagWithMethods) => {

                    let {setStatus, setFieldValue, setSubmitting} = bagWithMethods;

                    //debugger


                    dispatch(login(
                        values,
                        setStatus,
                        setFieldValue,
                        setSubmitting))
                }}
            >
                {(propsF) => {

                    let {status, values, isSubmitting} = propsF;

                    //console.log( status );
                    //console.log( values.general );
                    //console.log( propsF.isSubmitting );

                    return (
                        <Form>

                            <div>

                                {values.general &&
                                    <div>
                                        _.{values.general} - with setFieldValue
                                    </div>}

                                {status &&
                                    <div className={style.validationErrorMessage}>
                                        ..{status}
                                    </div>}

                                {status && captchaUrl &&
                                    <div>

                                        <div>
                                            <img src={captchaUrl} alt={status}/>
                                        </div>

                                        <div>
                                            <Field
                                                name={'captcha'}
                                                type={'text'}/>
                                        </div>

                                    </div>

                                }

                                <div>
                                    <Field
                                        name={'email'}
                                        type={'text'}
                                        placeholder={'e-mail'}/>
                                </div>
                                <ErrorMessage name="email">
                                    {ErrorMessageWrapper}
                                </ErrorMessage>

                                <div>
                                    <Field
                                        name={'password'}
                                        type={'password'}
                                        placeholder={'password'}/>
                                </div>
                                <ErrorMessage name="password">
                                    {ErrorMessageWrapper}
                                </ErrorMessage>

                                <div>
                                    <Field
                                        type={'checkbox'}
                                        name={'rememberMe'}
                                        id='rememberMe'/>
                                    <label htmlFor={'rememberMe'}> remember me </label>
                                </div>

                                <button type={'submit'}
                                        disabled={isSubmitting}
                                >{isSubmitting ? "Please wait..." : "Submit"}</button>

                            </div>


                        </Form>
                    )
                }
                }
            </Formik>


        </div>
    )
}

