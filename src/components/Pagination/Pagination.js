import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Card, Pagination } from "antd";

class PaginationDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 3
    };
  }
  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 3
      });
    } else {
      this.setState({
        minValue: (value - 1) * 3,
        maxValue: value * 3
      });
    }
  };
  render() {
    let data = [
      { title: "Card title1", value: "Card content1" },
      { title: "Card title2", value: "Card content2" },
      { title: "Card title3", value: "Card content3" },
      { title: "Card title4", value: "Card content4" },
      { title: "Card title5", value: "Card content5" },
      { title: "Card title6", value: "Card content6" },
      { title: "Card title7", value: "Card content7" },
      { title: "Card title8", value: "Card content8" },
      { title: "Card title9", value: "Card content9" },
      { title: "Card title10", value: "Card content10" },
      { title: "Card title11", value: "Card content11" },
      { title: "Card title12", value: "Card content12" },
      { title: "Card title13", value: "Card content13" },
      { title: "Card title14", value: "Card content14" },
      { title: "Card title15", value: "Card content15" }
    ];
    return (
      <div>
        {data &&
          data.length > 0 &&
          data.slice(this.state.minValue, this.state.maxValue).map(val => (
            <Card
              title={val.title}
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>{val.value}</p>
            </Card>
          ))}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={3}
          onChange={this.handleChange}
          total={data.length}
        />
      </div>
    );
  }
}

export default PaginationDemo;
