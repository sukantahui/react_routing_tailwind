// components/HomeComponent/CourseDetails.jsx
import React from "react";
import { renderBold } from "./constants.jsx";

const CourseDetails = ({ details }) => {
  if (!details || Object.keys(details).length === 0) return null;

  return (
    <div className="space-y-4 text-gray-200">
      {details.overview && (
        <div>
          <h4 className="text-sm font-semibold text-sky-300 mb-1">📖 Overview</h4>
          <p className="text-sm leading-relaxed">{renderBold(details.overview)}</p>
        </div>
      )}

      {details.syllabus && details.syllabus.length &gt; 0 && (
        <div>
          <h4 className="text-sm font-semibold text-sky-300 mb-1">📚 Syllabus</h4>
          <ul className="list-disc list-inside text-sm space-y-0.5">
            {details.syllabus.map((item, idx) => (
              <li key={idx}>{renderBold(item)}</li>
            ))}
          </ul>
        </div>
      )}

      {details.learningOutcomes && details.learningOutcomes.length &gt; 0 && (
        <div>
          <h4 className="text-sm font-semibold text-sky-300 mb-1">🎯 Learning Outcomes</h4>
          <ul className="list-disc list-inside text-sm space-y-0.5">
            {details.learningOutcomes.map((item, idx) => (
              <li key={idx}>{renderBold(item)}</li>
            ))}
          </ul>
        </div>
      )}

      {details.prerequisites && (
        <div>
          <h4 className="text-sm font-semibold text-sky-300 mb-1">📌 Prerequisites</h4>
          <p className="text-sm">{renderBold(details.prerequisites)}</p>
        </div>
      )}

      {details.projects && details.projects.length &gt; 0 && (
        <div>
          <h4 className="text-sm font-semibold text-sky-300 mb-1">🛠️ Projects</h4>
          <ul className="list-disc list-inside text-sm space-y-0.5">
            {details.projects.map((item, idx) => (
              <li key={idx}>{renderBold(item)}</li>
            ))}
          </ul>
        </div>
      )}

      {details.certification && (
        <div>
          <h4 className="text-sm font-semibold text-sky-300 mb-1">🎓 Certification</h4>
          <p className="text-sm">{renderBold(details.certification)}</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;