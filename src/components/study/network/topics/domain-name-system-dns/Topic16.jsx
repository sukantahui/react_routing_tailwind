import React, { Component } from "react";
import GeneralShortQuestionPracticeTemplate from "../../../GeneralShortQuestionPracticeTemplate";
import shortQData from "./topic16_files/questions.json";

export default class Topic16 extends Component {
  render() {
    return <GeneralShortQuestionPracticeTemplate data={shortQData} />;
  }
}