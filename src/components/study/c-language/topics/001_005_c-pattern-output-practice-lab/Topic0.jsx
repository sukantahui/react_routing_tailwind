import React from "react";
import COutputPracticeTemplate from "../../../COutputPracticeTemplate";
import patternData from "./topic0_files/c-pattern-output-practice-data.json";

export default function Topic0() {
  return (
    <div className="mt-4 pt-2 md:pt-4">
      <COutputPracticeTemplate data={patternData} />
    </div>
  );
}
