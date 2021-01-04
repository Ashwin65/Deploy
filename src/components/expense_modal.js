import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import WrappedAdvancedSearchForm from "./formm";
import "./formm.css";
import WrappedEditexpense from "./editExpense";

class Mod extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSave = e => {
    e.preventDefault();
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Expense
        </Button>
        <Modal
          visible={visible}
          title={<h2>Create Expense</h2>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="expenseform">
            <WrappedAdvancedSearchForm
              closeModal={() => this.setState({ visible: false })}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
export default Mod;
