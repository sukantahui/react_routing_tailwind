import React, { Component } from "react";
import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import shortQData from "./topic9_files/questions.json";

export default class Topic9 extends Component {
  render() {
    return <JavaShortQuestionPracticeTemplate data={shortQData} />;
  }
}