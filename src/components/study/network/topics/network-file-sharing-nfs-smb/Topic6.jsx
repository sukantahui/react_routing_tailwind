import React, { Component } from "react";
// import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import GeneralShortQuestionPracticeTemplate from "../../../GeneralShortQuestionPracticeTemplate";
import shortQData from "./topic6_files/questions.json";

export default class Topic6 extends Component {
  render() {
    return <GeneralShortQuestionPracticeTemplate data={shortQData} />;
  }
}