import React from "react";
import { useParams } from 'react-router-dom';

function Certificate() {
  const { certificateId } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-xl max-w-md text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-2">
          Student Profile
          <h1>Certificate ID: {certificateId}</h1>
        </h1>
        <p className="text-gray-600">
          Student details and educational achievements will appear here.
        </p>
      </div>
    </div>
  );
}

export default Certificate;
