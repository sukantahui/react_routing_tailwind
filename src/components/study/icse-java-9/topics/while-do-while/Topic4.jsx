import React, { Component } from "react";
import ProjectListTemplate from "../../../ProjectListTemplate";
import projectsData from "./moderate-loop-projects.json";

export default class Topic4 extends Component {
  render() {
    return (
      <ProjectListTemplate
        title="ICSE Class IX – Java Project Work (BlueJ)"
        subtitle="These projects are designed strictly according to the ICSE Class IX Java syllabus and are ideal for practical exams and viva preparation."
        teacherNote="Students should explain the conceptual examples in viva and then convert them into complete BlueJ programs during practical exams."
        projects={projectsData.projects}
      />
    );
  }
}
