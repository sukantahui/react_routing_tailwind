import React, { Component } from "react";
import UnixShortQuestionPracticeTemplate from "../../../UnixShortQuestionPracticeTemplate";
import shortQData from "./topic11_files/questions.json";

export default class Topic11 extends Component {
  render() {
    return <UnixShortQuestionPracticeTemplate data={shortQData} />;
  }
}