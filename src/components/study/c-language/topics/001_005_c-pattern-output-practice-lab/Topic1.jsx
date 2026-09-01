import React from "react";
import COutputPracticeTemplate from "../../../COutputPracticeTemplate";
import tokensData from "./topic1_files/c-tokens-operators-output-practice-data.json";

export default function Topic1() {
  return (
    <div className="mt-4 pt-2 md:pt-4">
      <COutputPracticeTemplate data={tokensData} />
    </div>
  );
}
