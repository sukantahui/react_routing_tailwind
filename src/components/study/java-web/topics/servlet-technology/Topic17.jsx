import React, { Component } from "react";
import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import shortQData from "./topic17_files/questions.json";

export default class Topic17 extends Component {
  render() {
    return <JavaShortQuestionPracticeTemplate data={shortQData} />;
  }
}