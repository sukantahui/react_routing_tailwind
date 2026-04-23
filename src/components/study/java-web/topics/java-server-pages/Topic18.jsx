import React, { Component } from "react";
import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import shortQData from "./topic18_files/questions.json";

export default class Topic18 extends Component {
  render() {
    return <JavaShortQuestionPracticeTemplate data={shortQData} />;
  }
}