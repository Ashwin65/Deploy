import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./formm.css";
import "./card1.css";
import "./layout.css";
import { createReport, addExpenseToReport, getExpensesForReport } from "../api/Services";
import { getToken } from "../storage/storage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "history";
import { SIGNOUT } from "../api/Config";
import { onSignOut } from "../storage/storage";
//import addExpTable from "./expense1";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Layout,
  Card,
  Avatar,
  PageHeader,
  Icon,
  Upload,
  message,
  Menu,
  Table,
  Modal
} from "antd";
import { number } from "prop-types";
import { DatePicker } from "antd";
import moment from "moment";
import { columns, data } from "./expenses";
import addExpTable from "../components/addExpense";
import ExpTable from "./expense1";

const { Option } = Select;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Reportcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportName: "",
      expData: [],
      repData: [],
      expId: "",
      visible: false,
      addExpenseFlag: false,
      posts:[],
    };
    
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  componentDidMount() {
    getToken().then(token => {
      getExpensesForReport(token).then(resJson => {
        console.log(JSON.stringify(resJson));
        this.setState({
          posts: resJson.data
        });
      });
    });
  }
  

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      values.imagePath = this.state.imagePath;
      if (!err) {
        console.log("params" + JSON.stringify(values));
        getToken().then(token => {
          let expDetails = this.getExpDetails();
          createReport(
            {
              reportName: values.reportName,
              reportDate: moment(new Date()).format("YYYY-MM-DD"),
              //0,
              totalAmount: expDetails[1],
              //null
              expenseIds: expDetails[0]
            },
            token
          ).then(res => {
            if (res.status == 200) {
              alert(res.message);
              this.props.history.push("/Report");
            }
            console.log(JSON.stringify(res));
          });
        });
        
        
      }
    });
  };

  //------------------------------------------------------------------------------

  _showModal = () => this.setState({ visible: true });

  _hideModal = () => this.setState({ visible: false });


  getExpDetails = () => {
    let selectedData = this.state.selectedData;
    let totalAmount = 0;
    let expIds = [];
    selectedData.forEach(function(expense) {
      expIds.push(expense.expId);
      totalAmount = totalAmount + expense.amount;
    });
    console.log("\nexpIds"+JSON.stringify(expIds)+"\ntotalAmount"+totalAmount)
    return [expIds, totalAmount];
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };



  //------------------------------------------------------------------------------
  render() {
    const { getFieldDecorator } = this.props.form;
    const posts=this.state.posts;
    const { autoCompleteResult } = this.state;
    const columns = [
      {
        title: "ExpenseName",
        dataIndex: "expenseName",
        key: "1"
      },
      {
        title: "date",
        dataIndex: "expDate",
        key: "2",
        render:text=>(
          <span>
            {
              text .substr(0,10).split('-').reverse().join('/')
            }
          </span>
        )
             
        },
      
      {
        title: "Amount",
        dataIndex: "amount",
        key: "3"
      },
    ];
    const data = [
      {
        key: "1",
        ExpenseId: "11",
        expDate: "21-03-98",
        Merchant: "uber",
        expenseName: "x",
        amount: "5000",
        category: "travel"
      },
      {
        key: "2",
        expenseName: "Jim Green",
        age: 42,
        expDate: "21-03-98",
        address: "London No. 1 Lake Park",
        amount: "2000",
        tags: ["loser"]
      },
      {
        key: "3",
        expenseName: "Joe Black",
        expDate: "21-03-98",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        amount: "3000",
        tags: ["cool", "teacher"]
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({selectedData:selectedRows})
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
  

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
                    <Avatar size="large" icon="user" />
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
            <PageHeader title="Create Report" />
            <Card className="profilecard">
              <div className="createreportform">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={this._showModal}
                      className="addExpensebutton"
                    >
                      Add Expense
                    </Button>
                    <Modal
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      title={<h2>Add Expenses</h2>}
                      footer={[
                     
                      ]}
                    >
                       <div className="expenseform">
           <Table rowSelection={rowSelection}  columns={columns} dataSource={posts}  />
              
           
          </div>
        </Modal>
        
                  </Form.Item>
                  <div>
                  <Form.Item label={`Report Name`} style={{ columnSpan: 4 }}>
                    {getFieldDecorator(`reportName`, {
                      rules: [
                        {
                          required: true,
                          message: "Input something!"
                        }
                      ]
                    })(<Input placeholder="" />)}

                  

                  </Form.Item>
                  </div>
                  <Form.Item>
                    <Table columns ={ columns} dataSource={this.state.selectedData} />
                  </Form.Item>
                  <Form.Item>
                 
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        id="b1"
                        className="submit"
                        onClick ={this.handleSubmit}
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

const NewReport = Form.create({ name: "advanced_search" })(Reportcard);
export default NewReport;