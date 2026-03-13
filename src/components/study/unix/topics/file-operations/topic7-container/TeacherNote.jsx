import React, { Component } from "react";

export default class TeacherNote extends Component {
  render() {
    return (
      <section className="bg-sky-900/20 border border-sky-500/40 p-6 rounded-3xl">
        <h2 className="text-lg font-semibold text-sky-300 mb-2">
          👨‍🏫 Teacher’s Note
        </h2>

        <p className="text-slate-300">
          Students don’t fear Linux — they fear the unknown.
          Once they see logs moving live, confidence replaces fear.
        </p>
      </section>
    );
  }
}
