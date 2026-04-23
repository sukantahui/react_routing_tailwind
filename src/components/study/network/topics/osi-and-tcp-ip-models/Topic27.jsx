import React, { Component } from "react";
import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import shortQData from "./topic27_files/questions.json";

export default class Topic27 extends Component {
  render() {
    return <JavaShortQuestionPracticeTemplate data={shortQData} />;
  }
}