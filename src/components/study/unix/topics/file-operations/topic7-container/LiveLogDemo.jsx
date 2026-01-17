import React, { Component } from "react";

export default class LiveLogDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      logs: [
        "INFO Server started",
        "INFO User Swadeep logged in",
        "WARN Memory usage high",
        "ERROR API timeout",
        "INFO Recovery successful"
      ]
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prev => ({
        index: (prev.index + 1) % prev.logs.length
      }));
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { logs, index } = this.state;

    return (
      <section className="bg-black border border-slate-700 rounded-3xl p-6">
        <h2 className="text-xl font-semibold text-emerald-400 mb-4">
          🔴 Live Log Stream
        </h2>

        <pre className="text-emerald-300 font-mono">
          {`$ tail -f app.log`}
          {"\n"}
          {`logs[index]`}
        </pre>
      </section>
    );
  }
}
