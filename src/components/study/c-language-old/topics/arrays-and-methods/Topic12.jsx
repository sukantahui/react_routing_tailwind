import React, { useEffect, useState } from 'react';
// import CProjectAnswerTemplate from '../components/study/c/CProjectAnswerTemplate';
import CProjectAnswerTemplate from '../../../CProjectAnswerTemplate';
import projectsData from './topic12_files/expert-project.json';

// Import all C files with ?raw (Vite)
import E001 from './topic12_files/answers/E001.c?raw';
import E002 from './topic12_files/answers/E002.c?raw';
import E003 from './topic12_files/answers/E003.c?raw';
import E004 from './topic12_files/answers/E004.c?raw';
import E005 from './topic12_files/answers/E005.c?raw';
import E006 from './topic12_files/answers/E006.c?raw';
import E007 from './topic12_files/answers/E007.c?raw';
import E008 from './topic12_files/answers/E008.c?raw';
import E009 from './topic12_files/answers/E009.c?raw';
import E010 from './topic12_files/answers/E010.c?raw';
import E011 from './topic12_files/answers/E011.c?raw';
import E012 from './topic12_files/answers/E012.c?raw';
import E013 from './topic12_files/answers/E013.c?raw';
import E014 from './topic12_files/answers/E014.c?raw';
import E015 from './topic12_files/answers/E015.c?raw';
import E016 from './topic12_files/answers/E016.c?raw';
import E017 from './topic12_files/answers/E017.c?raw';
import E018 from './topic12_files/answers/E018.c?raw';
import E019 from './topic12_files/answers/E019.c?raw';
import E020 from './topic12_files/answers/E020.c?raw';
import E021 from './topic12_files/answers/E021.c?raw';
import E022 from './topic12_files/answers/E022.c?raw';
import E023 from './topic12_files/answers/E023.c?raw';
import E024 from './topic12_files/answers/E024.c?raw';
import E025 from './topic12_files/answers/E025.c?raw';
import E026 from './topic12_files/answers/E026.c?raw';
import E027 from './topic12_files/answers/E027.c?raw';
import E028 from './topic12_files/answers/E028.c?raw';
import E029 from './topic12_files/answers/E029.c?raw';
import E030 from './topic12_files/answers/E030.c?raw';
import E031 from './topic12_files/answers/E031.c?raw';
import E032 from './topic12_files/answers/E032.c?raw';
import E033 from './topic12_files/answers/E033.c?raw';
import E034 from './topic12_files/answers/E034.c?raw';
import E035 from './topic12_files/answers/E035.c?raw';
import E036 from './topic12_files/answers/E036.c?raw';
import E037 from './topic12_files/answers/E037.c?raw';
import E038 from './topic12_files/answers/E038.c?raw';
import E039 from './topic12_files/answers/E039.c?raw';
import E040 from './topic12_files/answers/E040.c?raw';
import E041 from './topic12_files/answers/E041.c?raw';
import E042 from './topic12_files/answers/E042.c?raw';
import E043 from './topic12_files/answers/E043.c?raw';
import E044 from './topic12_files/answers/E044.c?raw';
import E045 from './topic12_files/answers/E045.c?raw';
import E046 from './topic12_files/answers/E046.c?raw';
import E047 from './topic12_files/answers/E047.c?raw';
import E048 from './topic12_files/answers/E048.c?raw';
import E049 from './topic12_files/answers/E049.c?raw';
import E050 from './topic12_files/answers/E050.c?raw';



// ... import all 50

const answerMap = {
  E001,
  E002,
  E003,
  E004,
  E005,
  E006,
  E007,
  E008,
  E009,
  E010,
  E011,
  E012,
  E013,
  E014,
  E015,
  E016,
  E017,
  E018,
  E019,
  E020,
  E021,
  E022,
  E023,
  E024,
  E025,
  E026,
  E027,
  E028,
  E029,
  E030,
  E031,
  E032,
  E033,
  E034,
  E035,
  E036,
  E037,
  E038,
  E039,
  E040,
  E041,
  E042,
  E043,
  E044,
  E045,
  E046,
  E047,
  E048,
  E049,
  E050,
};



export default function CProjectsPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // Merge the raw code into the projects data
    const enhancedProjects = projectsData.projects.map(proj => ({
      ...proj,
      answer: answerMap[proj.projectId]   // add answer field with raw code
    }));

    setEnhancedData({
      ...projectsData,
      projects: enhancedProjects
    });
  }, []);

  if (!enhancedData) return <div>Loading...</div>;

  return <CProjectAnswerTemplate data={enhancedData} />;
}