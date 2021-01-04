import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Divider, Tag } from "antd";
import { Menu, Dropdown, Icon, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import TabsCard from "./expenses";
import Mod from "./expense_modal";
import { getExpenses, deleteExpense, getExpensesForReport } from "../api/Services";
import { getToken } from "../storage/storage";

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
    Amount: "2000",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    Amount: "3000",
    tags: ["cool", "teacher"]
  }
];
class ExpTable extends React.Component {
  state = {
    searchText: "",
    showModal: false,
    modalId: null,
    posts:[],
    selectedData:[]
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
    const posts=this.state.posts;
    const columns = [
      {
        title: "ExpenseNames",
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

    const { showModal, modalId } = this.state;
    return (
      <>
        <Table rowSelection={rowSelection}  columns={columns} dataSource={posts} />
        {showModal && <Mod id={modalId}
         />}
      </>
    );
  }
}

export default ExpTable;
