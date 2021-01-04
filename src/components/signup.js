import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { signUpUser } from "../api/Services";
import MediaQuery, { Context as ResponsiveContext } from 'react-responsive';

import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  AutoComplete,
  Modal,
  Alert,
  Card
} from "antd";
import history from "./history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import WrappedNormalLoginForm from "./login";
import "./signup.css";
import "./login.css";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("params" + JSON.stringify(values));
        signUpUser(values).then(resJson => {
          if (resJson.status === 200) this.props.history.push("/");
          else alert(resJson.message);
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("paswd")) {
      callback("Passwords didn't match");
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
      <Card className="logincard">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <h1 align="center">Sign Up</h1>
          <div className="signup_from">
            <Form.Item label="First Name">
              {getFieldDecorator("firstName", {
                rules: [{ required: true, message: "Enter your first Name" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator("lastName", {
                rules: [{ required: true, message: "Enter your Last Name" }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator("emailId", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("paswd", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password minLength={6} />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("cnfpaswd", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password minLength={6} onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>

            <Form.Item label="Phone Number">
              {getFieldDecorator("phoneNo", {
                rules: [
                  { required: true, message: "Please input your phone number!" }
                ]
              })(<Input addonBefore={prefixSelector} maxLength={10} />)}
            </Form.Item>
          </div>

          <Form.Item>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                id="b1"
                className="submit"
              >
                Sign Up
              </Button>
            </div>
            <br />
            <Link to="/" className="WrappedNormalLoginForm">
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  id="b2"
                  className="cancel"
                >
                  Cancel
                </Button>
              </div>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
