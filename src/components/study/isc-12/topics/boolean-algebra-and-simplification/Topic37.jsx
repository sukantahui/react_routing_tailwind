import React, { Component } from "react";
import BooleanAlgebraPracticeTemplate from "../../../BooleanAlgebraPracticeTemplate";
import booleanAlgebraData from "./topic37_files/boolean_algebra_questions.json";

export default class Topic37 extends Component {
  render() {
    return <BooleanAlgebraPracticeTemplate data={booleanAlgebraData} />;
  }
}