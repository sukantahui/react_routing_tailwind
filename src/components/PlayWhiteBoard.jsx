import React, { Component } from "react";
import Whiteboard from "../common/Whiteboard";

export default class PlayWhiteBoard extends Component {
  render() {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <Whiteboard />
      </div>
    );
  }
}
