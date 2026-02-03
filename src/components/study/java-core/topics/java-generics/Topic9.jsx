import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import MainJavaCode from "./NumberComparator.java?raw"
function Topic9() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Java Examples</h1>
      
      {/* Load from public folder */}
      <JavaFileLoader 
        fileModule={MainJavaCode}
        title="Main.java"
        highlightLines={[]}
      />
      
     
    </div>
  );
}

export default Topic9;