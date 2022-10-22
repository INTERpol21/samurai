import {initializeApp} from "./redux/Reducer/AppReducer";
import {connect} from "react-redux";
import {AppStateGlobalType} from "./redux/redux-store";
import React, {Suspense} from "react";
import {Breadcrumb, Layout, Menu, MenuProps} from "antd";
import NotFound from "./components/NotFound/NotFound";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/Login/Login";
import About from "./components/About/About";
import {UserPage} from "./components/Users/UsersContainer";
import Preloader from "./utils/Preloader/Preloader";
import {HeaderComponent} from "./components/Header/HeaderComponent";
import {LaptopOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'))


type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = { initializeApp: () => void }


//region antd
const {Content, Footer, Sider} = Layout

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(label: React.ReactNode,
                        key?: React.Key | null,
                        icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}


const itemsSideMenu: MenuItem[] = [

    getItem('My Profile', 'MyProfile', <UserOutlined/>, [
        getItem(
            <Link to='/profile'>
                Profile
            </Link>,
            'Profile'),
        getItem(
            <Link to='/dialogs'>
                Messages
            </Link>,
            'Messages')
    ]),

    getItem('Developers', 'Developers', <LaptopOutlined/>, [
        getItem(
            <Link to='/developers'>
                Developers list
            </Link>,
            'DevelopersList'),
        getItem(
            <Link to='/chat'>
                Developers chat
            </Link>,
            'DevelopersChat')
    ]),

    getItem('Settings', 'Settings', <SettingOutlined/>, [
        getItem(
            <Link to="/news">
                News
            </Link>,
            'News'),
        getItem(
            <Link to="/22404">
                Music
            </Link>,
            'Music')
    ])
]

//endregion antd

class App extends React.Component<MapPropsType & DispatchPropsType> {

    //region componentDid...
    catchAllUnhandledErrors = (
        promiseRejectionEvent: PromiseRejectionEvent) => {
        console.log('Some error')
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection',
            this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection',
            this.catchAllUnhandledErrors)
    }

    //endregion

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <HeaderComponent/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>
                            <Link to='/'>
                                Home
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/developers'>
                                List
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu mode="inline" style={{height: '100%'}} items={itemsSideMenu}/>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Suspense fallback={<Preloader/>}>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<Navigate to="/profile"/>}/>
                                    <Route
                                        path='/profile/:userId'
                                        element={<ProfileContainer/>}/>
                                    <Route
                                        path='/profile'
                                        element={<ProfileContainer/>}/>
                                    <Route/>
                                    <Route
                                        path='/dialogs/*'
                                        element={<DialogsContainer/>}/>
                                    <Route
                                        path='/developers'
                                        element={<UserPage
                                            pageTitle={'Самураи'}/>}/>
                                    <Route
                                        path='/login'
                                        element={<LoginPage/>}/>
                                    <Route
                                        path='/news'
                                        element={<About/>}/>
                                    <Route
                                        path='/chat'
                                        element={<ChatPage/>}/>
                                    <Route
                                        path='*'
                                        element={<NotFound/>}/>
                                </Routes>
                            </Suspense>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Samurai Social Network ©2022 Created by INTERpol
                </Footer>
            </Layout>
        )
    }
}

let mapStateToProps = (state: AppStateGlobalType) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)

