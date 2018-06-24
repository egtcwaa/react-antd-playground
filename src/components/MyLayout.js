import React from 'react'
import { Layout, Menu, Icon, Row, Col, Badge,Avatar  } from 'antd';
import {
  // BrowserRouter as Router,
  Route,
  PropsRoute,
  // Switch,
  Link
} from 'react-router-dom'

import async from '../async'
import '../css/MyLayout.css';


// let InputDemo = async(() => import("./InputDemo"));
let Calendar = async(() => import("./Calendar"));
let Dashboard = async(() => import("./Dashboard"));
let MapPage = async(() => import("./MapPage"));
// let GalleryPage = async(() => import("./GalleryPage"));

const { Header, Sider, Content } = Layout;

class MyLayout extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      userData:null,
      collapsed: false
    }
    this.stitchClient = props.stitchClient;
  }

  componentDidMount() {
    if (this.stitchClient.isAuthenticated()) {
      this.stitchClient.userProfile()
      .then(userData=>{
        this.setState({userData:userData.data})
      })
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    //Prevent page refresh menu highlight issue
    let href = window.location.href.split('/')
    let authed = this.stitchClient.isAuthenticated();
    let logout = () => this.stitchClient.logout().then(() => window.location.reload());
    href = href[3]

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/' + href]} selectedKeys={['/' + href]}>
            <Menu.Item key="/">
              <Icon type="dashboard" />
              <span>Dashboard</span>
              <Link to='/'></Link>
            </Menu.Item>
            <Menu.Item key="/calendar">
              <Icon type="calendar" />
              <span>Calendar</span>
              <Link to='/calendar'></Link>
            </Menu.Item>
            <Menu.Item key="/map">
              <Icon type="car" />
              <span>Parking</span>
              <Link to='/map'></Link>
            </Menu.Item>
            {/* <Menu.Item key="/gallery">
              <Icon type="camera" />
              <span>GalleryCollection</span>
              <Link to='/gallery'></Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', paddingLeft: '20px' }}>
            <Row>
              <Col span={17} style={{ textAlign: 'left' }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              <Col span={1}>
                <Badge count={8} dot>
                  <Icon
                    type="notification"
                    style={{ fontSize: 20 }} />
                </Badge>
              </Col>
              <Col span={1}>
                <Badge count={0} dot>
                  <Icon
                    type="mail"
                    style={{ fontSize: 20 }} />
                </Badge>
              </Col>
              <Col span={2}>
                {authed
                ? <div className="login-header">
                    {this.state.userData && this.state.userData.picture
                      ? <Avatar src={this.state.userData.picture} />
                      : null}
    
                        {this.state.userData && this.state.userData.name ? this.state.userData.name : "?"}
                  </div>
                : null}
                {!authed
                ? <div className="login-links-panel">
 
                      <Badge count={0} dot>
                        <Icon
                          type="user"
                          style={{ fontSize: 20 }} />
                      </Badge>
          
                  </div>
                : null}
              </Col>
              <Col span={3}>
              {authed
                ? <div className="login-header">
                    <div>
                      
                      <a className="logout" href="#" onClick={() => logout()}>
                        sign out
                      </a>
                    </div>
                  </div>
                : null}
              {!authed
                ? <div className="login-links-panel">
                    {/* <div
                      onClick={() => this.stitchClient.authenticate("google")}
                      className="signin-button"
                    > */}
                    <a onClick={() => this.stitchClient.authenticate("google")}>
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        height="18px"
                        viewBox="0 0 48 48"
                      >
                        <g>
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          />
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          />
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          />
                          <path fill="none" d="M0 0h48v48H0z" />
                        </g>
                      </svg>
                      
                      <span className="signin-button-text">Sign in with Google</span>
                      </a>
                    {/* </div> */}
                  </div>
                : null}
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 950 }}>
            <Route path='/' exact component={Dashboard}></Route>
            {/* <Route path='/setting' component={InputDemo}></Route> */}
            <Route path='/calendar' component={Calendar}></Route>
            <Route path='/map' component={MapPage}></Route>
            {/* <Route path='/gallery' component={GalleryPage}></Route> */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout
