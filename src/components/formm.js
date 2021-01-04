import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./formm.css";
import "./card1.css";
import { createExpense } from "../api/Services";
import { getToken } from "../storage/storage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "history";
import { Form, Row, Col, Input, Button, Icon, Upload, message, Select } from "antd";
import { number } from "prop-types";
import { DatePicker } from "antd";
import moment from "moment";

class AdvancedSearchForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      visible: false,
      screenType:null,
      disable: true
    };
  }

 
  componentDidMount=()=>{
    console.log('Hello world')
  }

  fileSelectedHandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };
  onChange = e => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = e => {
      this.state = { imagePath: e.target.result.substr(23) };
    };
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const dateFormat = "YYYY/MM/DD";
    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text"
      }
    };

    const { getFieldDecorator } = this.props.form;
    if (this.state.screenType == 'EDIT'){
      this.props.form.setFieldsValue(this.props.details);
      console.log('setfield done')
    }
    const { Option } = Select;
    const children = [];
    children.push(
      <div className="form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label={`Expense Name`} style={{ columnSpan: 4 }}>
            {getFieldDecorator(`expenseName`, {
              rules: [
                {
                  required: true,
                  message: "Input something!"
                }
              ]
            })(<Input placeholder=""  />)}
          </Form.Item>
          <Form.Item label={`Merchant`} Col span={8}>
            {getFieldDecorator(`merchant`, {
              rules: [
                {
                  required: true,
                  message: "Input something!"
                }
              ]
            })(<Input placeholder="" />)}
          </Form.Item>
          <Form.Item label={`Date`} Col span={8}>
            {getFieldDecorator(`expDate`, {
              rules: [
                {
                  required: true,
                  message: "Input something!"
                }
              ]
            })(
              <DatePicker
                disabledDate={this.disabledStartDate}
                showTime
                format="YYYY-MM-DD"
                placeholder="YYYY-MM-DD"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
            )}
          </Form.Item>
          <Form.Item label={`Amount`} Col span={8}>
            {getFieldDecorator(`amount`, {
              rules: [
                {
                  required: true,

                  message: "Input something!"
                }
              ]
            })(<Input type="number" placeholder="" />)}
          </Form.Item>
          <Form.Item label="Category">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option"
            >
              <Option value="Travel">Travel</Option>
              <Option value="Food">food</Option>
              <Option value="Internet">Internet</Option>
              <Option value="Accomodation">Accomodation</Option>
              <Option value="Telephone">Telephone</Option>
            </Select>,
          )}
        </Form.Item>
          <Form.Item label={`Description`} style={{ columnSpan: 4 }}>
            {getFieldDecorator(`description`, {
              rules: [
                {
                  required: true,
                  message: "Input something!"
                }
              ]
            })(<Input placeholder="" />)}
          </Form.Item>
          <Form.Item label="Upload">
            {getFieldDecorator("imagePath", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(<Input type="file" name="file" onChange={this.onChange} />)}
          </Form.Item>
        </Form>
      </div>
    );

    return children;
  }

  handleSubmit = e => {
    e.preventDefault();
        
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.imagePath = this.state.imagePath;
      console.log(values);
      if (!err) {
        console.log("params" + JSON.stringify(values));
        getToken().then(token => {
          createExpense(values, token).then(resJson => {
            getToken();
            if (resJson.status === 200) {
              alert(resJson.message);
            } else alert(resJson.message);
            this.props.closeModal();
          });
        });
      }
    });
  };
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  onStartChange = value => {
    this.onChangee("expDate", value);
  };
  onChangee = (field, value) => {
    this.setState({
      visible: false
    });
  };

  componentDidMount=()=>{
    if(this.props.details){
      console.log('details  :'+JSON.stringify(this.props.details))
    console.log('ScreenType  EDIT');
    //this.props.form.setFieldsValue()
    }
  }

  render() {

    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={() => this.props.closeModal()} style={{ marginLeft: 8 }}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: "advanced_search" })(
  AdvancedSearchForm
);
export default WrappedAdvancedSearchForm;