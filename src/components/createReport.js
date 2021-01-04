import React from 'react';
import Dropdown from 'react-dropdown';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Select, Input, Button, DatePicker, Menu } from 'antd';
import Multiselect from 'multiselect-dropdown-react';
import "./createReport.css";
import { getExpenses, deleteExpense } from "../api/Services";
import { getToken, onSignIn, onSignOut } from "../storage/storage";
import {signInUser} from "../api/Services"

const { Option } = Select;

class App extends React.Component {

    state ={
        posts: [],
    };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log("params" + JSON.stringify(values));
        signInUser(values).then(resJson => {
          onSignIn(resJson.jwt_token);
          if (resJson.status === 200) this.props.history.push("/layout");
          else alert(resJson.message);
        });
      }
    });
  };
  result(params) {
    console.log(params);
  }

  componentDidMount() {
    getToken().then(token => {
      getExpenses(token).then(resJson => {
        console.log(JSON.stringify(resJson));
        this.setState({
          posts: resJson
        });
      });
    });
  }    

  render() {
      const {posts}=  this.state;
    const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };
    const { getFieldDecorator } = this.props.form;
    const options = [{
       key: 'one'}, {key: 'two'}, {key:'three'
    }
      ]
      const data = [{
        name: 'one',
        value: 'one'
      },
      {
          name: 'two',
          value: 'two'
        },
        {
          name: 'three',
          value: 'three'
        },
        {
          name: 'four',
          value: 'four'
        },
        {
          name: 'five',
          value: 'five'
        },
        {
          name: 'six',
          value: 'six'
        }];
      const defaultOption = options[0]
    return (
      <Form labelCol={{ span: 10 }} wrapperCol={{ span: 10 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Note">
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="DatePicker">
          {getFieldDecorator('date-picker', config)(<DatePicker />)}
        </Form.Item>
        
        <Form.Item label="Select[multiple]">
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Multiselect options={data} onSelectOptions={this.result} />

          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedApp = Form.create({ name: 'coordinated' })(App);
export default WrappedApp;