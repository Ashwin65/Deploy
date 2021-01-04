import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Divider, Tag } from "antd";
import { Menu, Dropdown, Icon, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import TabsCard from "./expenses";
import Mod from "./expense_modal";

const data = [
  {
    key: "1",
    ExpenseId: "11",
    Date: "21-03-98",
    Merchant: "uber",
    name: "x",
    Amount: "5000",
    category: "travel"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
class addExpTable extends React.Component {
  state = {
    searchText: "",
    showModal: false,
    modalId: null
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  showmodal = modalId => {
    this.setState({
      showModal: true,
      modalId: modalId
    });
  };

  render() {
    const columns = [
      {
        title: "userId",
        dataIndex: "ExpenseId",
        key: "1",
        render: (text, record) => (
          <button onClick={() => this.showmodal(record.ExpenseId)}>
            {text}{" "}
          </button>
        )
      },
      {
        title: "id",
        dataIndex: "key",
        key: "2"
      },
      {
        title: "title",
        dataIndex: "name",
        key: "3"
      },
      {
        title: "Amount",
        dataIndex: "Amount",
        key: "4"
      },
      {
        title: "category",
        dataIndex: "category",
        key: "5"
      }
    ];

    const { showModal, modalId } = this.state;
    return (
      <>
        <Table columns={columns} dataSource={data} />
        {showModal && <Mod id={modalId}
         />}
      </>
    );
  }
}

export default addExpTable;
