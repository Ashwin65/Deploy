import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./layout.css";
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Card } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReportPage from "./Report";

import history from "./history";
import WrappedNormalLoginForm from "./login";
import { SIGNOUT } from "../api/Config";
import { onSignOut } from "../storage/storage";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Dashboard extends React.Component {
  state = {
    collapsed: false
  };

  logout() {
    history.push("/");
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Header className="header" />
          </Col>
        </Row>

        <Row>
          <Col span={33.33}>
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
                      <Icon type="home" />
                      <span>Home</span>
                    </Menu.Item>

                    <Menu.Item key="2">
                      <Link to="/expense" className="Expense">
                        <Icon type="dollar" />
                        <span>Expenses</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to="/Report" className="ReportPage">
                        <Icon type="file-text" />
                        <span>Reports</span>
                      </Link>
                    </Menu.Item>
                  </Menu>
                </div>
              </Sider>
            </Layout>
          </Col>

          <Col span={66.66}>
            <Content className="content">
              <Row gutter={24}>
                <Col span={12}>
                  <Card className="expense_back">
                    <div className="circle">
                      <b style={{ fontSize: "40px" }}>2</b>
                    </div>
                    <div className="count">
                      <b style={{ fontSize: "40px" }}>Expenses</b>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card className="reports_back">
                    <div className="circle">
                      <b style={{ fontSize: "40px" }}>2</b>
                    </div>
                    <div className="count">
                      <b style={{ fontSize: "40px" }}>Reports</b>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Col>
        </Row>
      </div>
    );
  }
}
