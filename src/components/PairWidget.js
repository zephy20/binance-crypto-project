import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import socketIOClient from "socket.io-client";

export default class PairWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const socket = socketIOClient("http://localhost:5000");
    socket.emit("symbol", this.props.symbol);

    socket.on("symboldata", data => {
      if (data.symbol === this.props.symbol) this.setState({ data });
    });

    socket.on("symbolprice", data => {
      this.setState({ symbolPrice: Object.values(data) });
    });

    socket.on("lastprice", data => {
      this.setState({ lastPrice: data });
    });
  }

  render() {
    var symbol = this.props.symbol.replace("BTC", "");
    return (
      <div>
        <Card style={{ width: "90%" }}>
          <Card.Body>
            <Card.Title>Market Pair Details</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {symbol}/BTC
            </Card.Subtitle>
            <Card.Text>
              <span>
                Current Price: &nbsp;
                {this.state.lastPrice && this.state.lastPrice
                  ? this.state.lastPrice
                  : "-"}
              </span>
              <br />
              <span style={{ display: "flex" }}>
                24h Price Change: &nbsp;
                <span
                  style={
                    this.state.data && this.state.data.priceChange < 0
                      ? { color: "red", fontWeight:"bold" }
                      : { color: "green", fontWeight:"bold" }
                  }
                >
                  {this.state.data &&
                  this.state.data.priceChange &&
                  this.state.data.priceChange
                    ? this.state.data.priceChange
                    : "-"}
                  &nbsp;
                  {this.state.data &&
                    this.state.data.percentChange &&
                    this.state.data.percentChange + "%"}
                </span>
              </span>
              <span>
                24h Volume: &nbsp;
                {this.state.data &&
                this.state.data.volume &&
                this.state.data.volume
                  ? this.state.data.volume
                  : "-"}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
