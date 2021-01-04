import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./layout.css";
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Card } from "antd";
//import ExpTable from "./expense1";
import ReportPage from "./Report";
import TabsCard from "./expenses";
import { onSignOut } from "../storage/storage";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Expense extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="sider"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <div className="sider">
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Link to="/layout" className="Dashboard">
                  <Icon type="home" />
                  <span>Home</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Icon type="dollar" />
                <span>Expenses</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/Report" className="ReportPage">
                  <Icon type="desktop" />
                  <span>Reports</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>

        <Layout>
          <Header className="header">
            <Menu
              title="Hello "
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
            >
              <SubMenu
                style={{ textAlign: "left" }}
                title={<span>Product Name</span>}
              />

              <SubMenu
                style={{ float: "right" }}
                key="sub2"
                hello
                title={
                  <span>
                    User name
                    <Icon type="user" />
                  </span>
                }
              >
                <Menu.Item key="6" onClick ={() =>{
                this.props.history.push("/profile");
                }}>Account Settings</Menu.Item>

                <Menu.Item key="7" onClick={() =>{
                  onSignOut().then(() => {
                    this.props.history.push("/");
                  });
                }}>Sign out</Menu.Item>
              </SubMenu>
            </Menu>
          </Header>

          <Content className="content">
            <div>
              <TabsCard />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
