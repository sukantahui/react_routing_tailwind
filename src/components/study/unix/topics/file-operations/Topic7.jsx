// Topic7.jsx
import React, { Component } from "react";

import Header from "./topic7-container/Header";
import ConceptFoundation from "./topic7-container/ConceptFoundation";
import LiveLogDemo from "./topic7-container/LiveLogDemo";
import InternalFlowSVG from "./topic7-container/InternalFlowSVG";
import RealWorldExamples from "./topic7-container/RealWorldExamples";
import TipsAndBestPractices from "./topic7-container/TipsAndBestPractices";
import TeacherNote from "./topic7-container/TeacherNote";
import Checklist from "./topic7-container/Checklist";

export default class Topic7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false
    };
  }

  toggleDarkMode = () => {
    this.setState(prev => ({ isDarkMode: !prev.isDarkMode }));
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { isDarkMode } = this.state;

    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={this.toggleDarkMode} />

        <main className="max-w-6xl mx-auto px-6 py-10 space-y-14">
          <ConceptFoundation />
          <LiveLogDemo isDarkMode={isDarkMode} />
          <InternalFlowSVG isDarkMode={isDarkMode} />
          <RealWorldExamples />
          <TipsAndBestPractices />
          <TeacherNote />
          <Checklist />
        </main>
      </div>
    );
  }
}
