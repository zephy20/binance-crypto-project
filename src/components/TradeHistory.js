import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Table from "react-bootstrap/Table";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Spinner from "react-bootstrap/Spinner";

export default class TradeHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      maxTrue: false,
      temp: ""
    };
  }

  componentDidMount() {
    var rows = [];
    var joined;
    const socket = socketIOClient("http://localhost:5000");
    socket.emit("tradehistory", this.props.symbol);
    socket.on("tradehistory", data => {
      this.setState(
        {
          rows: [data, ...this.state.rows],
          temp: data
        },
        () => {
          this.setData();
        }
      );
    });
  }

  setData = () => {
    var rows = [...this.state.rows];
    if (rows.length > 10) {
      rows.splice(-1, 1);
      this.setState({ rows });
    }
  };

  renderData = (data, index) => {
    return (
      <tr key={index}>
        <td>{data.price}</td>
        <td>{data.quantity}</td>
        <td>{data.time}</td>
      </tr>
    );
  };

  editPrice = (fieldValue, row, rowIdx, colIdx) => {
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    if (row.price > this.state.temp.price) {
      return "profit-color";
    } else {
      return "loss-color";
    }
  };
  render() {
    return (
      <div>
        {this.state.rows.length > 0 ? (
          <BootstrapTable data={this.state.rows && this.state.rows}>
            <TableHeaderColumn
              dataField="price"
              columnClassName={this.editPrice.bind(this)}
              isKey
            >
              Price
            </TableHeaderColumn>
            <TableHeaderColumn dataField="quantity">Quantity</TableHeaderColumn>
            <TableHeaderColumn dataField="time">Time</TableHeaderColumn>
          </BootstrapTable>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20%"
            }}
          >
            <p>Loading live trade history</p>&nbsp;&nbsp;
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    );
  }
}
