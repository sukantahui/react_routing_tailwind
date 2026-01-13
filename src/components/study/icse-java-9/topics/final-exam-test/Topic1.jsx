import React, { Component } from "react";
import JavaOutputPracticeTemplate from "../../../JavaOutputPracticeTemplate";
import forLoopData from "./java_output_mixed_topics.json";

export default class Topic1 extends Component {
  render() {
    return <JavaOutputPracticeTemplate data={forLoopData} />;
  }
}
