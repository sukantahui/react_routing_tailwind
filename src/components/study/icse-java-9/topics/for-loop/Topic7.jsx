import React, { Component } from "react";
import OutputPracticeTemplate from "../../../OutputPracticeTemplate";
import forLoopData from "./java_output_questions.json";

export default class Topic7 extends Component {
  render() {
    return <OutputPracticeTemplate data={forLoopData} />;
  }
}
