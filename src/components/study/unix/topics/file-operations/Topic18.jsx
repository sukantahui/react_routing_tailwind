import React, { Component } from "react";
import UnixShortQuestionPracticeTemplate from "../../../UnixShortQuestionPracticeTemplate";
import shortQData from "./topic18_files/questions.json";

export default class Topic18 extends Component {
  render() {
    return <UnixShortQuestionPracticeTemplate data={shortQData} />;
  }
}