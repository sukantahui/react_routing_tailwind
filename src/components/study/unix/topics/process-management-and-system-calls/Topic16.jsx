import React, { Component } from "react";
// import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import UnixShortQuestionPracticeTemplate from "../../../UnixShortQuestionPracticeTemplate";
import shortQData from "./topic16_files/questions.json";

export default class Topic15 extends Component {
  render() {
    return <UnixShortQuestionPracticeTemplate data={shortQData} />;
  }
}