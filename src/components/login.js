import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./login.css";
import history from "./history";
import { signInUser } from "../api/Services";
import { onSignIn, isSignedIn } from "../storage/storage";
import {
  Form,
  Icon,
  Input,
  Button,
  Alert,
  Checkbox,
  Divider,
  Card,
  Spin
} from "antd";
import SiderDemo from "./layout";

class NormalLoginForm extends React.Component {
  constructor(props) {

    isSignedIn().then(token => {
      if (!token) {
        console.log('not valid');
        // not logged in so redirect to login page with the return url
      }
      else{
        console.log("valid");
       return <Redirect to="/"/>
      }
      
     
    })
    super(props);
    this.state = {
      emailId: "",
      paswd: "",
      loading: false
    };
    
    
  }



  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("params" + JSON.stringify(values));
        signInUser(values).then(resJson => {
          console.log(JSON.stringify(resJson))
          onSignIn(resJson.data);
          if (resJson.status === 200) this.props.history.push("/layout");
          else alert(resJson.message);
        });
      }
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <Card className="logincard">
        <div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h1 align="center">Sign In</h1>
            <br />
            <Form.Item label="User Name">
              {getFieldDecorator("emailId", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  size="large"
                  style={{ width: "100%" }}
                  prefix={<Icon type="user" />}
                  placeholder="Email Id"
                  name="Username"
                />
              )}
            </Form.Item>
            <Form.Item label="Password" text-align="left">
              {getFieldDecorator("paswd", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login"
                  disabled={loading}
                >
                  {loading && <Spin indicator={antIcon} />}
                  <span>SignIn</span>
                </Button>
              </div>
              <br />
              <a href="">
                <li>
                  <Link to={"/signup"} className="WrappedRegistrationForm">
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        id="b2"
                        className="register"
                      >
                        <span>New Account? Register</span>
                      </Button>
                    </div>
                  </Link>
                </li>
              </a>
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
