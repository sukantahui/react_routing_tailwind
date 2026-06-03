import React, { Component } from "react";
import JavaShortQuestionPracticeTemplate from "../../../PythonShortQuestionPracticeTemplate";
import shortQData from "./topic20_files/questions.json";

export default class Topic20 extends Component {
  render() {
    return <JavaShortQuestionPracticeTemplate data={shortQData} />;
  }
}