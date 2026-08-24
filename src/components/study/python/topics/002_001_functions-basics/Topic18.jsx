import React, { Component } from "react";
import PythonOutputPracticeTemplate from "../../../PythonOutputPracticeTemplate";
import questionData from "./topic18_files/function_output_questions.json";

export default class Topic18 extends Component {
  render() {
    return <PythonOutputPracticeTemplate data={questionData}/>;
  }
}