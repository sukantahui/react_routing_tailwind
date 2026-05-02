import React, { Component } from "react";
import BooleanAlgebraPracticeTemplate from "../../../BooleanAlgebraPracticeTemplate";
import booleanAlgebraData from "./topic40_files/pos_to_sop_questions.json";

export default class Topic40 extends Component {
  render() {
    return <BooleanAlgebraPracticeTemplate data={booleanAlgebraData} />;
  }
}