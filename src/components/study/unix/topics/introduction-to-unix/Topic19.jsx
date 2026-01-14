import React, { Component } from "react";

import UnixLinuxShortQuestionPracticeTemplate from "../../../UnixLinuxShortQuestionPracticeTemplate";
import shortQData from "./introduction-to-unix-short.json";

export default class Topic19 extends Component {
  render() {
    return <UnixLinuxShortQuestionPracticeTemplate data={shortQData} />;
  }
}