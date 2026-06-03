import React, { Component } from "react";
// import JavaShortQuestionPracticeTemplate from "../../../JavaShortQuestionPracticeTemplate";
import GeneralShortQuestionPracticeTemplate from "../../../GeneralShortQuestionPracticeTemplate";
import shortQData from "./topic26_files/questions.json";

export default class Topic17 extends Component {
  render() {
    return <GeneralShortQuestionPracticeTemplate data={shortQData} />;
  }
}