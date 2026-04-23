import React, { Component } from "react";
import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import shortQData from "./topic4_files/topic4_questions.json";

export default class Topic4 extends Component {
  render() {
    return <JavaShortQuestionPracticeTemplate data={shortQData} />;
  }
}