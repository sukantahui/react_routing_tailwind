import { Routes, Route } from 'react-router-dom';
import Home from './HomeComponent/Home';
import Certificate from './certificates/Certificate';
import Admin from './Admin';
import Bijoya from './Bijoya';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import AddStudent from '../components/AddStudent';
import ClassEleven from '../components/study/class_11/ClassEleven';
import ClassElevenWbb from '../components/study/class_11/wbb/ClassElevenWbb';
import ComputerApplicationWbbEleven from '../components/study/class_11/wbb/computer_application/ComputerApplicationWbbEleven';
import SemTwoComputerApplicationWbbEleven from '../components/study/class_11/wbb/computer_application/semester2/SemTwoComputerApplicationWbbEleven';
import DataStructureSemTwoComputerApplicationWbbEleven from '../components/study/class_11/wbb/computer_application/semester2/chapters/DataStructureSemTwoComputerApplicationWbbEleven';
import TypingTest from '../components/TypingTest';
import Bca from '../components/study/bca/Bca';
import JavaChapters from '../components/GeneralSubjects/java/JavaChapters';
import IntroductionToJava from '../components/GeneralSubjects/java/IntroductionToJava';
import TypingLearn from '../components/typing-app/TypingLearn';
import JavaScriptRoadmap from '../components/study/javaScript/JavaScriptRoadmap';
import JavaScriptModuleView from '../components/study/javaScript/JavaScriptModuleView';
import JavaScriptTopicView from '../components/study/javaScript/JavaScriptTopicView';
import Playground from '../common/Playground';
import PythonRoadmap from '../components/study/python/PythonRoadMap';
import PythonModuleView from '../components/study/python/PythonModuleView';
import PythonTopicView from '../components/study/python/PythonTopicView';
import PythonPlayground from '../common/PythonPlayground';
import CRoadmap from '../components/study/c-language/CRoadmap';
import CModuleView from '../components/study/c-language/CModuleView';
import CTopicView from '../components/study/c-language/CTopicView';

import TallyRoadmap from  "../components/study/tally/TallyRoadmap";
import TallyModuleView from  "../components/study/tally/TallyModuleView";
import TallyTopicView from  "../components/study/tally/TallyTopicView";

import ExcelRoadmap from '../components/study/excel/ExcelRoadmap';
import ExcelModuleView from '../components/study/excel/ExcelModuleView';
import ExcelTopicView from '../components/study/excel/ExcelTopicView';

import GitRoadmap from '../components/study/git/GitRoadmap';
import GitModuleView from '../components/study/git/GitModuleView';
import GitTopicView from '../components/study/git/GitTopicView';

import IconResources from '../components/IconResources';
import VSCodeUltraExpertGuide from '../components/VSCodeUltraExpertGuide';

import ICSE9JavaRoadmap from '../components/study/icse-java-9/ICSE9JavaRoadmap';
import ICSE9JavaModuleView from '../components/study/icse-java-9/ICSE9JavaModuleView';
import ICSE9JavaTopicView from '../components/study/icse-java-9/ICSE9JavaTopicView';
import JavaRoadmap from '../components/study/java-core/JavaRoadmap';
import JavaModuleView from '../components/study/java-core/JavaModuleView';
import JavaTopicView from '../components/study/java-core/JavaTopicView';
import GeneralRoadmap from '../components/study/general/GeneralRoadmap';
import GeneralModuleView from '../components/study/general/GeneralModuleView';
import GeneralTopicView from '../components/study/general/GeneralTopicView';
import CssRoadmap from '../components/study/css/CssRoadmap';
import CssModuleView from '../components/study/css/CssModuleView';
import CssTopicView from '../components/study/css/CssTopicView';
// ⬇️ Import Study component
import Study from '../components/study/Study';
import IscElevenRoadmap from '../components/study/isc-11/IscElevenRoadmap';
import IscElevenModuleView from '../components/study/isc-11/IscElevenModuleView';
import IscElevenTopicView from '../components/study/isc-11/IscElevenTopicView';
import PlayWhiteBoard from '../components/PlayWhiteBoard';

import ComputerArchitectureRoadmap from '../components/study/computer-architecture/ComputerArchitectureRoadmap';
import ComputerArchitectureModuleView from '../components/study/computer-architecture/ComputerArchitectureModuleView';
import ComputerArchitectureTopicView from '../components/study/computer-architecture/ComputerArchitectureTopicView';

import UnixRoadmap from '../components/study/unix/UnixRoadmap';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/certificates/:certificateId"
        element={
          <ProtectedRoute>
            <Certificate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bijoya"
        element={
          <ProtectedRoute>
            <Bijoya />
          </ProtectedRoute>
        }
      />

      <Route path="/students/add" element={<AddStudent />} />

      {/* ✅ Public Route (No Login Required) */}
      <Route path="/study" element={<Study />} />
      <Route path="/study/class11" element={<ClassEleven />} />
      <Route path="/study/class11/wbb" element={<ClassElevenWbb />} />
      <Route path="/study/class11/wbb/computer-application" element={<ComputerApplicationWbbEleven />} />
      <Route path="/study/class11/wbb/computer-application/sem2" element={<SemTwoComputerApplicationWbbEleven />} />
      <Route path="/study/class11/wbb/computer-application/sem2/dsa" element={<DataStructureSemTwoComputerApplicationWbbEleven />} />

      <Route path="/study/bca" element={<Bca />} />
      <Route path="/study/bca/java" element={<JavaChapters />} />
      <Route path="/study/bca/java/chapter-1" element={<IntroductionToJava />} />
      <Route path="/tools/type-test" element={<TypingTest />} />
      <Route path="/tools/typing-learn" element={<TypingLearn />} />

      {/* <Route path="/tutorial/js" element={<JavaScriptRoadmap />} /> */}
      <Route path="/javascript/roadmap" element={<JavaScriptRoadmap />} />
      <Route path="/javascript/module/:slug" element={<JavaScriptModuleView />} />
      <Route path="/javascript/topic/:moduleSlug/:topicIndex"  element={<JavaScriptTopicView />}/>


      <Route path="/play"  element={<Playground />}/>
      <Route path="/python-play"  element={<PythonPlayground />}/>


      <Route path="/python/roadmap" element={<PythonRoadmap />} />
      <Route path="/python/module/:slug" element={<PythonModuleView />} />
      <Route path="/python/topic/:moduleSlug/:topicIndex"  element={<PythonTopicView />}/>

      {/* For C Language */}
      <Route path="/c-language/roadmap" element={<CRoadmap />} />
      <Route path="/c-language/module/:slug" element={<CModuleView />} />
      <Route path="/c-language/topic/:moduleSlug/:topicIndex"  element={<CTopicView />}/>


      {/* For Tally Prime */}
      <Route path="/tally/roadmap" element={<TallyRoadmap />} />
      <Route path="/tally/module/:slug" element={<TallyModuleView />} />
      <Route path="/tally/topic/:moduleSlug/:topicIndex"  element={<TallyTopicView />}/>

      {/* For Excel  */}
      <Route path="/excel/roadmap" element={<ExcelRoadmap />} />
      <Route path="/excel/module/:slug" element={<ExcelModuleView />} />
      <Route path="/excel/topic/:moduleSlug/:topicIndex"  element={<ExcelTopicView/>}/>

    {/* For Git  */}
      <Route path="/git/roadmap" element={<GitRoadmap />} />
      <Route path="/git/module/:slug" element={<GitModuleView />} />
      <Route path="/git/topic/:moduleSlug/:topicIndex"  element={<GitTopicView/>}/>

      {/* For Git  */}
      <Route path="/icse-java-ix/roadmap" element={<ICSE9JavaRoadmap />} />
      <Route path="/icse-java-ix/module/:slug" element={<ICSE9JavaModuleView />} />
      <Route path="/icse-java-ix/topic/:moduleSlug/:topicIndex"  element={<ICSE9JavaTopicView/>}/>

      {/* For Java  */}
      <Route path="/java-core/roadmap" element={<JavaRoadmap />} />
      <Route path="/java-core/module/:slug" element={<JavaModuleView />} />
      <Route path="/java-core/topic/:moduleSlug/:topicIndex"  element={<JavaTopicView/>}/>

      {/* For Fundamental  */}
      <Route path="/general/roadmap" element={<GeneralRoadmap />} />
      <Route path="/general/module/:slug" element={<GeneralModuleView />} />
      <Route path="/general/topic/:moduleSlug/:topicIndex"  element={<GeneralTopicView/>}/>

      {/* For CSS  */}
      <Route path="/css/roadmap" element={<CssRoadmap />} />
      <Route path="/css/module/:slug" element={<CssModuleView />} />
      <Route path="/css/topic/:moduleSlug/:topicIndex"  element={<CssTopicView/>}/>

      {/* For ISC 11  */}
      <Route path="/isc-11/roadmap" element={<IscElevenRoadmap />} />
      <Route path="/isc-11/module/:slug" element={<IscElevenModuleView />} />
      <Route path="/isc-11/topic/:moduleSlug/:topicIndex"  element={<IscElevenTopicView/>}/>

      {/* Computer Architecture  */}
      <Route path="/computer-architecture/roadmap" element={<ComputerArchitectureRoadmap />} />
      <Route path="/computer-architecture/module/:slug" element={<ComputerArchitectureModuleView />} />
      <Route path="/computer-architecture/topic/:moduleSlug/:topicIndex"  element={<ComputerArchitectureTopicView/>}/>

      {/* Computer Architecture  */}
      <Route path="/unix/roadmap" element={<UnixRoadmap />} />
      {/* <Route path="/unix/module/:slug" element={<UnixModuleView />} /> */}
      {/* <Route path="/unix/topic/:moduleSlug/:topicIndex"  element={<UnixTopicView/>}/> */}

      {/* Icon Resource */}
      <Route path="/icons" element={<IconResources />} />
      <Route path="/vscode" element={<VSCodeUltraExpertGuide />} />
      <Route path="/whiteBoard" element={<PlayWhiteBoard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
