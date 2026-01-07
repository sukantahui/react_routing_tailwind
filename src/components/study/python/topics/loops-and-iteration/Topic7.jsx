import React, { Component } from "react";
import PythonOutputPracticeTemplate from "../../../PythonOutputPracticeTemplate";
import forLoopData from "./python_for_loop_output_questions.json";

export default class Topic7 extends Component {
  render() {
    return <PythonOutputPracticeTemplate data={forLoopData}/>;
  }
}
