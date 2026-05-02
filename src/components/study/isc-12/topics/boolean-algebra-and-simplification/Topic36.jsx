import React, { Component } from "react";
import BooleanAlgebraPracticeTemplate from "../../../BooleanAlgebraPracticeTemplate";
import booleanAlgebraData from "./topic36_files/duality_questions.json";

export default class Topic36 extends Component {
  render() {
    return <BooleanAlgebraPracticeTemplate data={booleanAlgebraData} />;
  }
}