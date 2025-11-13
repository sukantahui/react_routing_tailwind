import React from "react";
import DSIntro from "./DSIntro";
import DSData from "./DSData";
import DSDataStructure from "./DSDataStructure";
import DSDataTypes from "./DSDataTypes";
import DSClassification from "./DSClassification";
import DSLinear from "./DSLinear";
import DSArray from "./DSArray";
import DSStack from "./DSStack";
import DSQueue from "./DSQueue";
import DSLinkedList from "./DSLinkedList";
import DSNonLinear from "./DSNonLinear";
import DSTree from "./DSTree";
import DSGraph from "./DSGraph";
import DSComparison from "./DSComparison"
import DSExercises from "./DSExercises";

const DataStructureSemTwoComputerApplicationWbbEleven = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex justify-center">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-auto max-h-screen">
          <DSIntro />
          <DSData />
          <DSDataStructure />
          <DSDataTypes />
          <DSClassification />
          <DSLinear />
          <DSArray />
          <DSStack />
          <DSQueue />
          <DSLinkedList />
          <DSNonLinear />
          <DSTree />
          <DSGraph />
          <DSComparison />
          <DSExercises />
        </div>
    </div>
  );
};

export default DataStructureSemTwoComputerApplicationWbbEleven;
