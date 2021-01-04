import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./formm.css";
import "./card1.css";
import { editExpense } from "../api/Services";
import { getToken } from "../storage/storage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "history";
import { Form, Row, Col, Input, Button, Icon, Upload, message, Select } from "antd";
import { number } from "prop-types";
import { DatePicker } from "antd";
import moment from "moment";
import TabsCard from "./expenses";

class Editexpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: "",
      disable: true,
    };
  }
  isDisabled()
  {
    this.setState({
      disable: false
    })
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

  getFields() {
    const { getFieldDecorator } = this.props.form;

    const children = [];
    const { Option } = Select;
    children.push(
      <div className="form">
        <Button type="primary"  style={{float: "right"}} onClick={() => this.isDisabled()}>
           Edit
            </Button>
        <Form onSubmit={this.handleSubmit}>
        
            
<div>
          <Form.Item label={`Expense Name`} style={{ columnSpan: 4 }}>
            {getFieldDecorator(`expenseName`, {
              rules: [
                {
                  required: true,
                  message: "Input something!"
                }
              ]
            })(<Input placeholder="" disabled={this.state.disable}/>)}
          </Form.Item>
          <Form.Item label={`Merchant`} Col span={8}>
            {getFieldDecorator(`merchant`, {
              rules: [
                {
                  required: true,
                  message: "Input something!"
                }
              ]
            })(<Input placeholder="" disabled={this.state.disable} />)}
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
                disabled={this.state.disable}
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
            })(<Input type="number" placeholder="" disabled={this.state.disable}/>)}
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
            })(<Input placeholder="" disabled={this.state.disable} />)}
          </Form.Item>
          <Form.Item label="Upload">
            {getFieldDecorator("imagePath", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(<Input type="file" name="file" onChange={this.onChange} disabled={this.state.disable}/>)}
          </Form.Item>
          </div>
        </Form>
        <div
          style={{ height: "100px", width: "100px", justifyContent: "center" }}
        >
          <img src={`data:image/jpeg;base64,` + this.state.imageData} />
        </div>
      </div>
    );

    return children;
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      values.imagePath = this.state.imagePath;
      if (!err) {
        console.log("params" + JSON.stringify(values));
        getToken().then(token => {
          editExpense(values, token).then(resJson => {
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

  componentDidMount = () => {
    
    let details = this.props.details;
    this.setState({ imageData: details.imagePath,
       });
    console.log(details.expDate);
    this.props.form.setFieldsValue({
      expenseName: details.expenseName,
      amount: details.amount,
      category: details.category,
      merchant: details.merchant,
      expDate: moment(details.expDate),
      description: details.description
    });
  };

  render() {
    const { details } = this.props;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button
              onClick={() => this.props.closeModal()}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedEditexpense = Form.create({ name: "advanced_search" })(
  Editexpense
);
export default WrappedEditexpense;