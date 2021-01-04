import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { Card, Table, Divider, Modal } from "antd";
//import columns1 from "./reportcard";
import Mod1 from "./ReportExpenses";
import { getToken } from "../storage/storage";
import { getReports, deleteReport  } from "../api/Services";
import NewReport from "./reportcard";

class TabsCard1 extends React.Component {
  state = {
    visible: false,
    posts: [],
    repId: null,
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

  componentDidMount() {
    getToken().then(token => {
      getReports(token).then(resJson => {
        this.setState({
          posts: resJson.data
        });
      });
    });
  }

  render() {
    const posts=this.state.posts;
    const visible = this.state.visible;
    const columns1 = [
      {
        title: "Report Name",
        dataIndex: "reportName",
        key: "reportName "
      },

      {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          (this.state.repId = record.reportName),
          (
            <span>
              <a onClick={() => this.showModal(record)}>Edit</a>

              <Divider type="vertical" />
              <a
                onClick={() => {
                  getToken().then(token => {
                    deleteReport(record.repId, token).then(resJson => {
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
        reportName: "Asdf",
        
        totalAmount: "5000"
      },
      {
        reportName: "Asdfg",
        totalAmount: "6000"
      },
      {
        reportName: "Asdfgh",
        totalAmount: "10000"
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
            <NewReport
              disable={this.state.disable}
              details={this.state.modalRecord}
              closeModal={() => this.setState({ visible: false})}
            />
          </div>
        </Modal>
        <Card
          style={{ width: "100%" }}
          title={<h1>Reports</h1>}
          extra={<Mod1 />}
        >
          <Table columns={columns1} dataSource={posts} />
        </Card>
        <br />
        <br />
      </div>
    );
  }
}
export default TabsCard1;