import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import InitRoot from '../../Root';
import Navigation from '../../components/Navigation/Navigation';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class SiderMenu extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Navigation history={this.props.history} />
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={true} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1">
                <Icon type="login" />
                <span>Login</span>
                <Link to='/' />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="user-add" />
                <span>Signup</span>
                <Link to='/signup' />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="file-text" />
                <span>Pagination</span>
                <Link to='/signup' />
              </Menu.Item>

            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}><InitRoot /></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default SiderMenu