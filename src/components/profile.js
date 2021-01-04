import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./layout.css";
import "./profile.css";
import "./signup.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReportPage from "./Report";
import history from "./history";
import WrappedNormalLoginForm from "./login";
import { SIGNOUT } from "../api/Config";
import { onSignOut } from "../storage/storage";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Icon,
  Layout,
  Menu,
  Button,
  AutoComplete,
  Modal,
  Avatar,
  Alert,
  Card,
  PageHeader
} from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class ProfileSettings extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "91"
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="sider"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="sider">
            <Menu theme="dark" defaultSelectedKeys={[]}>
              <Menu.Item key="1">
                <Link to="/layout" className="Dashboard">
                  <Icon type="home" />
                  <span>Home</span>
                </Link>
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

        <Layout>
          <Header className="header">
            <Menu
              title="Hello "
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
            >
              <SubMenu
                title={<span>Product Name</span>}
                className="productname"
              />

              <SubMenu
                key="sub2"
                hello
                title={
                  <span>
                    User name
                    <Icon type="user" />
                  </span>
                }
                className="username"
              >
                <Menu.Item key="6">
                  {" "}
                  <Link to="/profile" className="Profile">
                    Account Settings
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="7"
                  onClick={() => {
                    onSignOut().then(() => {
                      this.props.history.push("/");
                    });
                  }}
                >
                  Sign out
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>

          <Content className="content">
            <PageHeader title="Account Settings" />
            <Card className="profilecard">
              <div
                className="profilepageheader"
                style={{ textAlign: "center" }}
              >
                <Avatar size={64} icon="user" />
                <h1>User name</h1>
              </div>
              <div className="profileform" style={{ textAlign: "center" }}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item label="First Name">
                    {getFieldDecorator("firstname", {
                      rules: [{ required: true }]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Last Name">
                    {getFieldDecorator("lastname", {
                      rules: [{ required: true }]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="E-mail">
                    {getFieldDecorator("emailId", {
                      rules: [{ required: true }]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        },
                        {
                          validator: this.validateToNextPassword
                        }
                      ]
                    })(<Input.Password />)}
                  </Form.Item>
                  <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "Please confirm your password!"
                        },
                        {
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                  </Form.Item>

                  <Form.Item label="Phone Number">
                    {getFieldDecorator("phone", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your phone number!"
                        }
                      ]
                    })(<Input addonBefore={prefixSelector} maxLength={10} />)}
                  </Form.Item>
                  <Form.Item>
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        id="b1"
                        className="submit"
                      >
                        Save
                      </Button>
                    </div>
                    <br />
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const Profile = Form.create({ name: "profilesettings" })(ProfileSettings);

export default Profile;