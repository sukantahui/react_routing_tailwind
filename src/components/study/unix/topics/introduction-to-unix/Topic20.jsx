import React, { Component } from "react";
// import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import UnixShortQuestionPracticeTemplate from "../../../UnixShortQuestionPracticeTemplate";
import shortQData from "./topic20_files/questios.json";

export default class Topic20 extends Component {
  render() {
    return <UnixShortQuestionPracticeTemplate data={shortQData} />;
  }
}