import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Card, Table, Divider, Modal } from "antd";
//import columns from "./expense1";
import { getExpenses, deleteExpense } from "../api/Services";
import { getToken } from "../storage/storage";
import Mod from "./expense_modal";
import ExpTable from "./expense1";
import WrappedAdvancedSearchForm from "./formm";
import WrappedEditexpense from "./editExpense";
import { Button } from "antd/lib/radio";

class TabsCard extends React.Component {
  state = {
    visible: false,
    disable: true,
    posts: [],
    expId: null,
    modalRecord: []
  };
  constructor(props) {
    super(props);
  }

  showModal = record => {
    this.setState({
      visible: true,
      modalRecord: record
    });
  };

  handleSave = e => {
    e.preventDefault();
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    getToken().then(token => {
      getExpenses(token).then(resJson => {
        console.log(JSON.stringify(resJson));
        this.setState({
          posts: resJson.data
        });
      });
    });
  }

  render() {
    const { posts } = this.state;
    const visible = this.state.visible;

    const columns = [
      {
        title: "Expense Name",
        dataIndex: "expenseName",
        key: "expenseName",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Merchant",
        dataIndex: "merchant",
        key: "merchant"
      },
      {
        title: "Date",
        dataIndex: "expDate",
        key: "expDate"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount"
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          (this.state.expId = record.expId),
          (
            <span>
              <a onClick={() => this.showModal(record)}>Edit</a>

              <Divider type="vertical" />
              <a
                onClick={() => {
                  getToken().then(token => {
                    deleteExpense(record.expId, token).then(resJson => {
                      console.log(JSON.stringify(resJson));
                      window.location.reload();
                    });
                  });
                }}
              >
                Delete
              </a>
            </span>
          )
        )
      }
    ];
    const data = [
      {
        expenseName: "Asdf",
        amount: "5000",
        category: "travel",
        expDate: "1998-09-09",
        merchant: "merchant1",
        description: "Descriptiondslcndscnbsdc"
      },
      {
        expenseName: "Asdfg",
        amount: "5000",
        category: "travel",
        expDate: "1998-09-09",
        merchant: "merchant1",
        description: "Descriptiondslcndscnbsdc"
      },
      {
        expenseName: "Asdfh",
        amount: "5000",
        category: "travel",
        expDate: "1998-09-09",
        merchant: "merchant1",
        description: "Descriptiondslcndscnbsdc"
      }
    ];

    return (
      <div>
        <Modal
          visible={visible}
          title={<h2>EDIT EXPENSE</h2>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="expenseform">
            <WrappedEditexpense
              disable={this.state.disable}
              details={this.state.modalRecord}
              closeModal={() => this.setState({ visible: false})}
            />
          </div>
        </Modal>
        <Card
          style={{ width: "100%" }}
          title={<h1>Expenses</h1>}
          extra={<Mod />}
        >
          <Table columns={columns} dataSource={posts} />
        </Card>
        <br />
        <br />
      </div>
    );
  }
}
export default TabsCard;