import React, { Component } from "react";
import JavaOutputPracticeTemplate from "../../../JavaOutputPracticeTemplate";
import forLoopData from "./java_output_questions.json";

export default class Topic7 extends Component {
  render() {
    return <JavaOutputPracticeTemplate data={forLoopData} />;
  }
}
