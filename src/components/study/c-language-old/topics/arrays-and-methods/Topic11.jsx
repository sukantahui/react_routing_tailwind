import React, { useEffect, useState } from 'react';
// import CProjectAnswerTemplate from '../components/study/c/CProjectAnswerTemplate';
import CProjectAnswerTemplate from '../../../CProjectAnswerTemplate';
import projectsData from './topic11_files/file_based_project1.json';

// Import all C files with ?raw (Vite)
import A001 from './topic11_files/answers/A001.c?raw';
import A002 from './topic11_files/answers/A002.c?raw';
import A003 from './topic11_files/answers/A003.c?raw';
import A004 from './topic11_files/answers/A004.c?raw';
import A005 from './topic11_files/answers/A005.c?raw';
import A006 from './topic11_files/answers/A006.c?raw';
import A007 from './topic11_files/answers/A007.c?raw';
import A008 from './topic11_files/answers/A008.c?raw';
import A009 from './topic11_files/answers/A009.c?raw';
import A010 from './topic11_files/answers/A010.c?raw';
import A011 from './topic11_files/answers/A011.c?raw';
import A012 from './topic11_files/answers/A012.c?raw';
import A013 from './topic11_files/answers/A013.c?raw';
import A014 from './topic11_files/answers/A014.c?raw';
import A015 from './topic11_files/answers/A015.c?raw';
import A016 from './topic11_files/answers/A016.c?raw';
import A017 from './topic11_files/answers/A017.c?raw';
import A018 from './topic11_files/answers/A018.c?raw';
import A019 from './topic11_files/answers/A019.c?raw';
import A020 from './topic11_files/answers/A020.c?raw';
import A021 from './topic11_files/answers/A021.c?raw';
import A022 from './topic11_files/answers/A022.c?raw';
import A023 from './topic11_files/answers/A023.c?raw';
import A024 from './topic11_files/answers/A024.c?raw';
import A025 from './topic11_files/answers/A025.c?raw';
import A026 from './topic11_files/answers/A026.c?raw';
import A027 from './topic11_files/answers/A027.c?raw';
import A028 from './topic11_files/answers/A028.c?raw';
import A029 from './topic11_files/answers/A029.c?raw';
import A030 from './topic11_files/answers/A030.c?raw';
import A031 from './topic11_files/answers/A031.c?raw';
import A032 from './topic11_files/answers/A032.c?raw';
import A033 from './topic11_files/answers/A033.c?raw';
import A034 from './topic11_files/answers/A034.c?raw';
import A035 from './topic11_files/answers/A035.c?raw';
import A036 from './topic11_files/answers/A036.c?raw';
import A037 from './topic11_files/answers/A037.c?raw';
import A038 from './topic11_files/answers/A038.c?raw';
import A039 from './topic11_files/answers/A039.c?raw';
import A040 from './topic11_files/answers/A040.c?raw';
import A041 from './topic11_files/answers/A041.c?raw';
import A042 from './topic11_files/answers/A042.c?raw';
import A043 from './topic11_files/answers/A043.c?raw';
import A044 from './topic11_files/answers/A044.c?raw';
import A045 from './topic11_files/answers/A045.c?raw';
import A046 from './topic11_files/answers/A046.c?raw';
import A047 from './topic11_files/answers/A047.c?raw';
import A048 from './topic11_files/answers/A048.c?raw';
import A049 from './topic11_files/answers/A049.c?raw';
import A050 from './topic11_files/answers/A050.c?raw';


// ... import all 50

const answerMap = {
  A001,
  A002,
  A003,
  A004,
  A005,
  A006,
  A007,
  A008,
  A009,
  A010,
  A011,
  A012,
  A013,
  A014,
  A015,
  A016,
  A017,
  A018,
  A019,
  A020,
  A021,
  A022,
  A023,
  A024,
  A025,
  A026,
  A027,
  A028,
  A029,
  A030,
  A031,
  A032,
  A033,
  A034,
  A035,
  A036,
  A037,
  A038,
  A039,
  A040,
  A041,
  A042,
  A043,
  A044,
  A045,
  A046,
  A047,
  A048,
  A049,
  A050,
};


export default function Topic11() {
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