import React, { Component } from "react";

export default class QuizIfElse extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      submitted: false,
      correctIndex: 1
    };
  }

  handleSelect(index){
    this.setState({ selected:index });
  }

  handleSubmit(){
    this.setState({ submitted:true });
  }

  render(){
    const options = [
      "if(x = 10)",
      "if(x == 10)",
      "if(x === 10)",
      "if(x equals 10)"
    ];

    return(
      <div className="mt-10 p-6 rounded-xl border bg-white dark:bg-slate-900">
        <h3 className="font-medium mb-3">Quiz: Correct if condition?</h3>

        {options.map((opt,i)=>(
          <button key={i}
            onClick={()=>this.handleSelect(i)}
            className={`block w-full text-left p-2 mb-2 rounded border
              ${this.state.selected===i?"bg-sky-100 dark:bg-sky-900":""}`}>
            {opt}
          </button>
        ))}

        <button onClick={()=>this.handleSubmit()}
          className="mt-2 px-4 py-2 bg-sky-500 text-white rounded">
          Submit
        </button>

        {this.state.submitted && (
          <p className="mt-3 font-medium">
            {this.state.selected === this.state.correctIndex
              ? "Correct! == compares values."
              : "Wrong. = is assignment, not comparison."}
          </p>
        )}
      </div>
    );
  }
}
