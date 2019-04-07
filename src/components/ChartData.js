import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import { TypeChooser } from "react-stockcharts/lib/helper";
import Spinner from "react-bootstrap/Spinner";

import CandleStickChartWithMACDIndicator from "./CandleStickChartWithMACDIndicator";
export default class ChartData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      newData: [],
      length: 0
    };
  }
  componentDidMount() {
    const socket = socketIOClient("http://localhost:5000");
    socket.emit("chartdata", this.props.symbol);
    socket.on("chartdata", data => {
      this.setState(
        {
          chartData: data
        },
        () => {
          this.setData();
        }
      );
    });
  }
  setData = () => {
    this.setState({
      newData: [...this.state.newData, this.state.chartData]
    });
  };

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    console.log(this.state.newData);
    return (
      <div>
        {this.state.newData.length > 5 ? (
          <TypeChooser>
            {type => (
              <CandleStickChartWithMACDIndicator
                type={type}
                data={this.state.newData}
              />
            )}
          </TypeChooser>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20%"
            }}
          >
            <p>Loading live chart data</p>&nbsp;&nbsp;
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    );
  }
}
