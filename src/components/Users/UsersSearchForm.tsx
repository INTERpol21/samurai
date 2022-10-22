import {Field, Form, Formik} from "formik";
import {FilterUsersReducerType} from "../../redux/Reducer/UsersReducer";
import {getUsersFilter} from "../../redux/Reducer/UsersSelectors";
import {useSelector} from "react-redux";
import React from "react";

type SetSubmittingType = {
    setSubmitting: (isSubmitting: boolean) => void
}

type PropsType = {
    onFilterChanged: (filter: FilterUsersReducerType) => void
}

type FormValuesType = {
    term: string, friend: string
}


const UsersSearchForm: React.FC<PropsType> = (props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (
        values: FormValuesType,
        {setSubmitting}: SetSubmittingType) => {

        const filter2: FilterUsersReducerType = {
            term: values.term,
            friend: values.friend === 'true'
                ? true
                : values.friend === 'false' ? false : null
        }

        props.onFilterChanged(filter2)

        setSubmitting(false)
    }

    return (
        <div>

            <Formik
                enableReinitialize
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend)
                }}

                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>

                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default UsersSearchForm