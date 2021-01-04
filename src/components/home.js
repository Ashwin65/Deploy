import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./layout.css";
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Card } from "antd";
import WrappedAdvancedSearchForm from "./formm";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Home extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "20vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="pie-chart" />
              <span>Expenses</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>Reports</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, textAlign: "center" }}>
            <div>
              <Menu
                title="Hello "
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
              >
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
                  <Menu.Item key="6">Account Settings</Menu.Item>

                  <Menu.Item key="7">Sign out</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 600
            }}
          >
            <div
              style={{ background: "#ECECEC", padding: "30px", minHeight: 400 }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Card
                    style={{ minHeight: 400 }}
                    title="Expense"
                    bordered={false}
                  />
                </Col>
                <Col span={12}>
                  <Card
                    style={{ minHeight: 400 }}
                    title="Reports"
                    bordered={false}
                  >
                    <WrappedAdvancedSearchForm />
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
