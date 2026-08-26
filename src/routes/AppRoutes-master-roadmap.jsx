import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// --------------------------------------------------------------
// 2. LAZY‑LOADED COMPONENTS (split by feature)
// --------------------------------------------------------------

const StudentWithAdmission = lazy(() => import('../components/students/StudentWithAdmission'));

const StudentFeeReceiptPart2 = lazy(() => import('../components/StudentFeeReceiptPart2'));
const StudentFeeReceiptPart3 = lazy(() => import('../components/StudentFeeReceiptPart3'));
const StudentFeeReceiptPart4 = lazy(() => import('../components/StudentFeeReceiptPart4'));

// 2a. Public / general purpose
const Home = lazy(() => import('./HomeComponent/Home'));
const Login = lazy(() => import('../components/Login'));
const NotFound = lazy(() => import('./NotFound'));
const Certificate = lazy(() => import('./certificates/Certificate'));
const QRCodeGenerator = lazy(() => import('../common/QRCodeGenerator'));
const Playground = lazy(() => import('../common/Playground'));
const PythonPlayground = lazy(() => import('../common/PythonPlayground'));
const PlayWhiteBoard = lazy(() => import('../components/PlayWhiteBoard'));
const IconResources = lazy(() => import('../components/IconResources'));
const VSCodeUltraExpertGuide = lazy(() => import('../components/VSCodeUltraExpertGuide'));
const TypingTest = lazy(() => import('../components/TypingTest'));
const AudioExtractor = lazy(() => import('../components/AudioExtractor'));
const TypingLearn = lazy(() => import('../components/typing-app/TypingLearn'));

// 2b. Data structure visualizers
const LinkedListVisualizer = lazy(() => import('../common/LinkedListVisualizer'));
const DoublyLinkedListVisualizer = lazy(() => import('../common/DoublyLinkedListVisualizer'));
const BinaryTreeVisualizer = lazy(() => import('../common/BinaryTreeVisualizer'));
const AvlTreeVisualizer = lazy(() => import('../common/AvlTreeVisualizer'));

// 2c. Study – main entry and class‑specific
const Study = lazy(() => import('../components/study/Study'));
const ClassEleven = lazy(() => import('../components/study/class_11/ClassEleven'));
const ClassElevenWbb = lazy(() => import('../components/study/class_11/wbb/ClassElevenWbb'));
const ComputerApplicationWbbEleven = lazy(() =>
  import('../components/study/class_11/wbb/computer_application/ComputerApplicationWbbEleven')
);
const SemTwoComputerApplicationWbbEleven = lazy(() =>
  import('../components/study/class_11/wbb/computer_application/semester2/SemTwoComputerApplicationWbbEleven')
);
const DataStructureSemTwoComputerApplicationWbbEleven = lazy(() =>
  import('../components/study/class_11/wbb/computer_application/semester2/chapters/DataStructureSemTwoComputerApplicationWbbEleven')
);
const Bca = lazy(() => import('../components/study/bca/Bca'));

// 2d. General subject components (Java, BCA Java)
const JavaChapters = lazy(() => import('../components/GeneralSubjects/java/JavaChapters'));
const IntroductionToJava = lazy(() => import('../components/GeneralSubjects/java/IntroductionToJava'));

// 2f. Admin / protected features
const Admin = lazy(() => import('./Admin'));
const Bijoya = lazy(() => import('./Bijoya'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const AddStudent = lazy(() => import('../components/AddStudent'));
const CertificateGenerator = lazy(() => import('../common/CertificateGenerator'));
const StudentAdmission = lazy(() => import('../components/StudentAdmission'));
const AddCourse = lazy(() => import('../components/AddCourse'));
const AddResult = lazy(() => import('../components/AddResult'));
const Subject = lazy(() => import('../components/Subject'));
const StudentFeeReceipt = lazy(() => import('../components/StudentFeeReceipt'));

// --------------------------------------------------------------
// 3. ROUTE PATH CONSTANTS (avoid typos, centralise updates)
// --------------------------------------------------------------
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CERTIFICATE_VIEW: '/certificates/:certificateId',
  ADMIN: '/admin',
  BIJOYA: '/bijoya',
  QRCODE: '/qrcode',
  LINKED_LIST: '/LinkedListVisualizer',
  DOUBLY_LINKED_LIST: '/DoublyLinkedListVisualizer',
  BINARY_TREE: '/BinaryTreeVisualizer',
  AVL_TREE: '/AvlTreeVisualizer',
  CERTIFICATE_GENERATOR: '/certificate',
  STUDENT_ADMISSION: '/admission',
  ADD_COURSE: '/courses',
  ADD_RESULT: '/results',
  FEE_RECEIPT: '/studentFeesReceipt',
  FEE_RECEIPT_PART2: '/studentFeesReceiptPart2',
  FEE_RECEIPT_PART3: '/studentFeesReceiptPart3',
  FEE_RECEIPT_PART4: '/studentFeesReceiptPart4',
  ADD_STUDENT: '/students/add',
  SUBJECTS: '/subjects',
  STUDY: '/study',
  CLASS_11: '/study/class11',
  CLASS_11_WBB: '/study/class11/wbb',
  WBB_COMP_APP: '/study/class11/wbb/computer-application',
  WBB_COMP_APP_SEM2: '/study/class11/wbb/computer-application/sem2',
  WBB_COMP_APP_SEM2_DSA: '/study/class11/wbb/computer-application/sem2/dsa',
  BCA: '/study/bca',
  BCA_JAVA: '/study/bca/java',
  BCA_JAVA_CH1: '/study/bca/java/chapter-1',
  TYPING_TEST: '/tools/type-test',
  TYPING_LEARN: '/tools/typing-learn',
  AUDIO_EXTRACT: '/tools/audioextract',
  PLAYGROUND: '/play',
  PYTHON_PLAY: '/python-play',
  ICONS: '/icons',
  VSCODE: '/vscode',
  WHITEBOARD: '/whiteBoard',
  STUDENT_WITH_ADMISSION: 'students/student-admission',
  NOT_FOUND: '*',

  // Technology routes – pattern: /{tech}/roadmap, /{tech}/module/:slug, /{tech}/topic/:moduleSlug/:topicIndex
  JAVASCRIPT_ROADMAP: '/javascript/roadmap',
  JAVASCRIPT_MODULE: '/javascript/module/:slug',
  JAVASCRIPT_TOPIC: '/javascript/topic/:moduleSlug/:topicIndex',

  PYTHON_ROADMAP: '/python/roadmap',
  PYTHON_MODULE: '/python/module/:slug',
  PYTHON_TOPIC: '/python/topic/:moduleSlug/:topicIndex',

  C_ROADMAP: '/c-language/roadmap',
  C_MODULE: '/c-language/module/:slug',
  C_TOPIC: '/c-language/topic/:moduleSlug/:topicIndex',

  TALLY_ROADMAP: '/tally/roadmap',
  TALLY_MODULE: '/tally/module/:slug',
  TALLY_TOPIC: '/tally/topic/:moduleSlug/:topicIndex',

  EXCEL_ROADMAP: '/excel/roadmap',
  EXCEL_MODULE: '/excel/module/:slug',
  EXCEL_TOPIC: '/excel/topic/:moduleSlug/:topicIndex',

  GIT_ROADMAP: '/git/roadmap',
  GIT_MODULE: '/git/module/:slug',
  GIT_TOPIC: '/git/topic/:moduleSlug/:topicIndex',

  ICSE_IX_ROADMAP: '/icse-java-ix/roadmap',
  ICSE_IX_MODULE: '/icse-java-ix/module/:slug',
  ICSE_IX_TOPIC: '/icse-java-ix/topic/:moduleSlug/:topicIndex',

  ICSE_X_ROADMAP: '/icse-java-x/roadmap',
  ICSE_X_MODULE: '/icse-java-x/module/:slug',
  ICSE_X_TOPIC: '/icse-java-x/topic/:moduleSlug/:topicIndex',

  JAVA_CORE_ROADMAP: '/java-core/roadmap',
  JAVA_CORE_MODULE: '/java-core/module/:slug',
  JAVA_CORE_TOPIC: '/java-core/topic/:moduleSlug/:topicIndex',

  GENERAL_ROADMAP: '/general/roadmap',
  GENERAL_MODULE: '/general/module/:slug',
  GENERAL_TOPIC: '/general/topic/:moduleSlug/:topicIndex',

  CSS_ROADMAP: '/css/roadmap',
  CSS_MODULE: '/css/module/:slug',
  CSS_TOPIC: '/css/topic/:moduleSlug/:topicIndex',

  ISC_11_ROADMAP: '/isc-11/roadmap',
  ISC_11_MODULE: '/isc-11/module/:slug',
  ISC_11_TOPIC: '/isc-11/topic/:moduleSlug/:topicIndex',

  ISC_12_ROADMAP: '/isc-12/roadmap',
  ISC_12_MODULE: '/isc-12/module/:slug',
  ISC_12_TOPIC: '/isc-12/topic/:moduleSlug/:topicIndex',

  COMPUTER_ARCHITECTURE_ROADMAP: '/computer-architecture/roadmap',
  COMPUTER_ARCHITECTURE_MODULE: '/computer-architecture/module/:slug',
  COMPUTER_ARCHITECTURE_TOPIC: '/computer-architecture/topic/:moduleSlug/:topicIndex',

  UNIX_ROADMAP: '/unix/roadmap',
  UNIX_MODULE: '/unix/module/:slug',
  UNIX_TOPIC: '/unix/topic/:moduleSlug/:topicIndex',

  REACT_ROADMAP: '/react/roadmap',
  REACT_MODULE: '/react/module/:slug',
  REACT_TOPIC: '/react/topic/:moduleSlug/:topicIndex',

  NODE_ROADMAP: '/node/roadmap',
  NODE_MODULE: '/node/module/:slug',
  NODE_TOPIC: '/node/topic/:moduleSlug/:topicIndex',

  JAVA_WEB_ROADMAP: '/java-web/roadmap',
  JAVA_WEB_MODULE: '/java-web/module/:slug',
  JAVA_WEB_TOPIC: '/java-web/topic/:moduleSlug/:topicIndex',

  NETWORK_ROADMAP: '/network/roadmap',
  NETWORK_MODULE: '/network/module/:slug',
  NETWORK_TOPIC: '/network/topic/:moduleSlug/:topicIndex',

  RDBMS_MYSQL_ROADMAP: '/rdbms-mysql/roadmap',
  RDBMS_MYSQL_MODULE: '/rdbms-mysql/module/:slug',
  RDBMS_MYSQL_TOPIC: '/rdbms-mysql/topic/:moduleSlug/:topicIndex',

  CYBER_SECURITY_ROADMAP: '/cyber-security/roadmap',
  CYBER_SECURITY_MODULE: '/cyber-security/module/:slug',
  CYBER_SECURITY_TOPIC: '/cyber-security/topic/:moduleSlug/:topicIndex',

  QUANTITATIVE_ANALYSIS_ROADMAP: '/quantitative-analysis/roadmap',
  QUANTITATIVE_ANALYSIS_MODULE: '/quantitative-analysis/module/:slug',
  QUANTITATIVE_ANALYSIS_TOPIC: '/quantitative-analysis/topic/:moduleSlug/:topicIndex',

  MACHINE_LEARNING_ROADMAP: '/machine-learning/roadmap',
  MACHINE_LEARNING_MODULE: '/machine-learning/module/:slug',
  MACHINE_LEARNING_TOPIC: '/machine-learning/topic/:moduleSlug/:topicIndex',
};

// ============================================================
// MASTER STUDY COMPONENTS
// ============================================================
const StudyRoadmap = lazy(() =>
  import("../components/study/StudyRoadmap")
);

const StudyModuleView = lazy(() =>
  import("../components/study/StudyModuleView")
);

const StudyTopicView = lazy(() =>
  import("../components/study/StudyTopicView")
);

//for Quantitative Analysis
import quantitativeAnalysisRoadmap from "../components/study/quantitative-analysis/quantitative-analysis-roadmap.json";
const quantitativeAnalysisTopicModules = import.meta.glob("../components/study/quantitative-analysis/topics/*/Topic*.jsx");

// for python
import pythonRoadmap from "../components/study/python/python-roadmap.json";
const pythonTopicModules = import.meta.glob("../components/study/python/topics/*/Topic*.jsx");

//for excel
import excelRoadmap from "../components/study/excel/excel-basic-to-advanced.json";
const excelTopicModules = import.meta.glob("../components/study/excel/topics/*/Topic*.jsx");

import javascriptRoadmap from
  "../components/study/javaScript/javascript-roadmap-enhanced.json";

const javascriptTopicModules = import.meta.glob(
  "../components/study/javaScript/topics/*/Topic*.jsx"
);

// C-Language
import cRoadmap from
  "../components/study/c-language/c-language-roadmap.json";

const cTopicModules = import.meta.glob(
  "../components/study/c-language/topics/*/Topic*.jsx"
);

//Tally
import tallyRoadmap from "../components/study/tally/tally-prime-roadmap.json";
const tallyTopicModules = import.meta.glob(
  "../components/study/tally/topics/*/Topic*.jsx"
);

// Git
import gitRoadmap from "../components/study/git/git-roadmap.json";
const gitTopicModules = import.meta.glob(
  "../components/study/git/topics/*/Topic*.jsx"
);

//ICSE Class IX
import icse9JavaRoadmap from "../components/study/icse-java-9/icse-java-ix-roadmap.json";
const icse9JavaTopicModules = import.meta.glob(
  "../components/study/icse-java-9/topics/*/Topic*.jsx"
);
// console.log(
//   "ICSE IX topic modules:",
//   Object.keys(icse9JavaTopicModules)
// );

// ICSE Java X
import icse10JavaRoadmap from
  "../components/study/icse-java-x/icse-class-10-roadmap.json";

const icse10JavaTopicModules = import.meta.glob(
  "../components/study/icse-java-x/topics/*/Topic*.jsx"
);

// Core Java
import javaRoadmap from "../components/study/java-core/java-core-roadmap.json";
const javaTopicModules = import.meta.glob(
  "../components/study/java-core/topics/*/Topic*.jsx"
);

//java web
import javaWebRoadmap from
  "../components/study/java-web/java-web-roadmap.json";

const javaWebTopicModules = import.meta.glob(
  "../components/study/java-web/topics/*/Topic*.jsx"
);

// RDBMS / MySQL
import rdbmsMysqlRoadmap from
  "../components/study/rdbms-mysql/rdbms-mysql-course-roadmap.json";
const rdbmsMysqlTopicModules = import.meta.glob(
  "../components/study/rdbms-mysql/topics/*/Topic*.jsx"
);

// React
import reactRoadmap from
  "../components/study/react/react19-roadmap.json";
const reactTopicModules = import.meta.glob(
  "../components/study/react/topics/*/Topic*.jsx"
);

// Modern CSS
import modernCssRoadmap from
  "../components/study/css/css-roadmap.json";
const modernCssTopicModules = import.meta.glob(
  "../components/study/css/topics/*/Topic*.jsx"
);

// ISC Class 11
import isc11Roadmap from
  "../components/study/isc-11/isc11-roadmap.json";

const isc11TopicModules = import.meta.glob(
  "../components/study/isc-11/topics/*/Topic*.jsx"
);

// ISC Class 12
import isc12Roadmap from
  "../components/study/isc-12/isc12-roadmap.json";

const isc12TopicModules = import.meta.glob(
  "../components/study/isc-12/topics/*/Topic*.jsx"
);

// Computer Architecture
import computerArchitectureRoadmap from
  "../components/study/computer-architecture/computer-architecture-roadmap.json";

const computerArchitectureTopicModules = import.meta.glob(
  "../components/study/computer-architecture/topics/*/Topic*.jsx"
);

// UNIX
import unixRoadmap from
  "../components/study/unix/unix-basic-to-ultra-expert-roadmap.json";

const unixTopicModules = import.meta.glob(
  "../components/study/unix/topics/*/Topic*.jsx"
);

// Computer Network
import computerNetworkRoadmap from
  "../components/study/network/network-roadmap.json";
const computerNetworkTopicModules = import.meta.glob(
  "../components/study/network/topics/*/Topic*.jsx"
);

// Cyber Security
import cyberSecurityRoadmap from
  "../components/study/cyber-security/cyber-securty-roadmap.json";

const cyberSecurityTopicModules = import.meta.glob(
  "../components/study/cyber-security/topics/*/Topic*.jsx"
);

// General
import generalRoadmap from
  "../components/study/general/general-roadmap.json";
const generalTopicModules = import.meta.glob(
  "../components/study/general/topics/*/Topic*.jsx"
);

// Node.js
import nodeRoadmap from
  "../components/study/node/node-roadmap.json";
const nodeTopicModules = import.meta.glob(
  "../components/study/node/topics/*/Topic*.jsx"
);

// Machine Learning
import machineLearningRoadmap from
  "../components/study/machine-learning/machine_learning_roadmap.json";
const machineLearningTopicModules = import.meta.glob(
  "../components/study/machine-learning/topics/*/Topic*.jsx"
);

//first
// --------------------------------------------------------------
// 4. HELPER: Protected route wrapper
// --------------------------------------------------------------
const ProtectedRouteWrapper = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

// --------------------------------------------------------------
// 5. MAIN COMPONENT
// --------------------------------------------------------------

/**
 * AppRoutes – defines all application routes with code splitting and protected access.
 *
 * Public routes (e.g., /, /login) are accessible to everyone.
 * Protected routes (e.g., /dashboard, /admin) require authentication.
 * All dynamic study paths are lazy‑loaded for better performance.
 *
 * @returns {JSX.Element} The routing configuration wrapped in Suspense.
 */
export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4" />
            <p className="text-gray-400">Loading page...</p>
          </div>
        </div>
      }
    &gt;
      <Routes>
        {/* ---------- Public routes ---------- */}
        <Route path={ROUTES.HOME} element={<Home />} /&gt;
        <Route path={ROUTES.LOGIN} element={<Login />} /&gt;
        <Route path={ROUTES.CERTIFICATE_VIEW} element={<Certificate />} /&gt;
        <Route path={ROUTES.QRCODE} element={<QRCodeGenerator />} /&gt;
        <Route path={ROUTES.PLAYGROUND} element={<Playground />} /&gt;
        <Route path={ROUTES.PYTHON_PLAY} element={<PythonPlayground />} /&gt;
        <Route path={ROUTES.WHITEBOARD} element={<PlayWhiteBoard />} /&gt;
        <Route path={ROUTES.ICONS} element={<IconResources />} /&gt;
        <Route path={ROUTES.VSCODE} element={<VSCodeUltraExpertGuide />} /&gt;
        <Route path={ROUTES.TYPING_TEST} element={<TypingTest />} /&gt;
        <Route path={ROUTES.TYPING_LEARN} element={<TypingLearn />} /&gt;
        <Route path={ROUTES.AUDIO_EXTRACT} element={<AudioExtractor />} /&gt;

        {/* Data structure visualizers */}
        <Route path={ROUTES.LINKED_LIST} element={<LinkedListVisualizer />} /&gt;
        <Route path={ROUTES.DOUBLY_LINKED_LIST} element={<DoublyLinkedListVisualizer />} /&gt;
        <Route path={ROUTES.BINARY_TREE} element={<BinaryTreeVisualizer />} /&gt;
        <Route path={ROUTES.AVL_TREE} element={<AvlTreeVisualizer />} /&gt;

        {/* ---------- Protected routes (admin / internal) ---------- */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRouteWrapper>
              <Dashboard />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.STUDENT_WITH_ADMISSION}
          element={
            <ProtectedRouteWrapper>
              <StudentWithAdmission />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRouteWrapper>
              <Admin />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.BIJOYA}
          element={<Bijoya />}
        /&gt;

        <Route
          path={ROUTES.CERTIFICATE_GENERATOR}
          element={
            <ProtectedRouteWrapper>
              <CertificateGenerator />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.STUDENT_ADMISSION}
          element={
            <ProtectedRouteWrapper>
              <StudentAdmission />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.ADD_COURSE}
          element={
            <ProtectedRouteWrapper>
              <AddCourse />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.ADD_RESULT}
          element={
            <ProtectedRouteWrapper>
              <AddResult />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.FEE_RECEIPT}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceipt />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.FEE_RECEIPT_PART2}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceiptPart2 />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.FEE_RECEIPT_PART3}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceiptPart3 />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route
          path={ROUTES.FEE_RECEIPT_PART4}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceiptPart4 />
            </ProtectedRouteWrapper>
          }
        /&gt;

        <Route path={ROUTES.ADD_STUDENT} element={<AddStudent />} /&gt;
        <Route path={ROUTES.SUBJECTS} element={<Subject />} /&gt;

        {/* ---------- Study routes ---------- */}
        <Route path={ROUTES.STUDY} element={<Study />} /&gt;

        {/* Class 11 & WB Board */}
        <Route path={ROUTES.CLASS_11} element={<ClassEleven />} /&gt;
        <Route path={ROUTES.CLASS_11_WBB} element={<ClassElevenWbb />} /&gt;
        <Route path={ROUTES.WBB_COMP_APP} element={<ComputerApplicationWbbEleven />} /&gt;
        <Route path={ROUTES.WBB_COMP_APP_SEM2} element={<SemTwoComputerApplicationWbbEleven />} /&gt;
        <Route
          path={ROUTES.WBB_COMP_APP_SEM2_DSA}
          element={<DataStructureSemTwoComputerApplicationWbbEleven />}
        /&gt;

        {/* BCA */}
        <Route path={ROUTES.BCA} element={<Bca />} /&gt;
        <Route path={ROUTES.BCA_JAVA} element={<JavaChapters />} /&gt;
        <Route path={ROUTES.BCA_JAVA_CH1} element={<IntroductionToJava />} /&gt;
        <Route
          path={ROUTES.C_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={cRoadmap}
              subjectKey="c-language"
            />
          }
        /&gt;

        <Route
          path={ROUTES.C_MODULE}
          element={
            <StudyModuleView
              roadmapData={cRoadmap}
              subjectKey="c-language"
            />
          }
        /&gt;

        <Route
          path={ROUTES.C_TOPIC}
          element={
            <StudyTopicView
              roadmapData={cRoadmap}
              subjectKey="c-language"
              topicModules={cTopicModules}
              topicBasePath="../components/study/c-language/topics"
            />
          }
        /&gt;
        {/* -------------------------------------------------- */}

        {/* Tally */}
        <Route
          path={ROUTES.TALLY_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={tallyRoadmap}
              subjectKey="tally"
            />
          }
        /&gt;

        <Route
          path={ROUTES.TALLY_MODULE}
          element={
            <StudyModuleView
              roadmapData={tallyRoadmap}
              subjectKey="tally"
            />
          }
        /&gt;

        <Route
          path={ROUTES.TALLY_TOPIC}
          element={
            <StudyTopicView
              roadmapData={tallyRoadmap}
              subjectKey="tally"
              topicModules={tallyTopicModules}
              topicBasePath="../components/study/tally/topics"
            />
          }
        /&gt;
        {/* ------------------------------------------ */}
        <Route
          path={ROUTES.GIT_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={gitRoadmap}
              subjectKey="git"
            />
          }
        /&gt;

        <Route
          path={ROUTES.GIT_MODULE}
          element={
            <StudyModuleView
              roadmapData={gitRoadmap}
              subjectKey="git"
            />
          }
        /&gt;

        <Route
          path={ROUTES.GIT_TOPIC}
          element={
            <StudyTopicView
              roadmapData={gitRoadmap}
              subjectKey="git"
              topicModules={gitTopicModules}
              topicBasePath="../components/study/git/topics"
            />
          }
        /&gt;
        {/* --------------------------------------------------- */}
        {/* JavaScript - MASTER STUDY COMPONENTS */}
        <Route
          path={ROUTES.JAVASCRIPT_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={javascriptRoadmap}
              subjectKey="javascript"
            />
          }
        /&gt;

        <Route
          path={ROUTES.JAVASCRIPT_MODULE}
          element={
            <StudyModuleView
              roadmapData={javascriptRoadmap}
              subjectKey="javascript"
            />
          }
        /&gt;

        <Route
          path={ROUTES.JAVASCRIPT_TOPIC}
          element={
            <StudyTopicView
              roadmapData={javascriptRoadmap}
              subjectKey="javascript"
              topicModules={javascriptTopicModules}
              topicBasePath="../components/study/javaScript/topics"
            />
          }
        /&gt;

        {/* Python */}
        <Route
          path={ROUTES.PYTHON_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={pythonRoadmap}
              subjectKey="python"
            />
          }
        /&gt;

        <Route
          path={ROUTES.PYTHON_MODULE}
          element={
            <StudyModuleView
              roadmapData={pythonRoadmap}
              subjectKey="python"
            />
          }
        /&gt;

        <Route
          path={ROUTES.PYTHON_TOPIC}
          element={
            <StudyTopicView
              roadmapData={pythonRoadmap}
              subjectKey="python"
              topicModules={pythonTopicModules}
              topicBasePath="../components/study/python/topics"
            />
          }
        /&gt;

        {/* -------------------------------------- */}
        <Route
          path={ROUTES.ICSE_IX_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={icse9JavaRoadmap}
              subjectKey="icse-java-ix"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ICSE_IX_MODULE}
          element={
            <StudyModuleView
              roadmapData={icse9JavaRoadmap}
              subjectKey="icse-java-ix"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ICSE_IX_TOPIC}
          element={
            <StudyTopicView
              roadmapData={icse9JavaRoadmap}
              subjectKey="icse-java-ix"
              topicModules={icse9JavaTopicModules}
              topicBasePath="../components/study/icse-java-9/topics"
            />
          }
        /&gt;

        {/* ---------------------------------------------------------- */}
        <Route
          path={ROUTES.ICSE_X_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={icse10JavaRoadmap}
              subjectKey="icse-java-x"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ICSE_X_MODULE}
          element={
            <StudyModuleView
              roadmapData={icse10JavaRoadmap}
              subjectKey="icse-java-x"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ICSE_X_TOPIC}
          element={
            <StudyTopicView
              roadmapData={icse10JavaRoadmap}
              subjectKey="icse-java-x"
              topicModules={icse10JavaTopicModules}
              topicBasePath="../components/study/icse-java-x/topics"
            />
          }
        /&gt;

        {/* ----------------------------------------------------- */}

        {/* Core Java - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.JAVA_CORE_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={javaRoadmap}
              subjectKey="java-core"
            />
          }
        /&gt;

        <Route
          path={ROUTES.JAVA_CORE_MODULE}
          element={
            <StudyModuleView
              roadmapData={javaRoadmap}
              subjectKey="java-core"
            />
          }
        /&gt;

        <Route
          path={ROUTES.JAVA_CORE_TOPIC}
          element={
            <StudyTopicView
              roadmapData={javaRoadmap}
              subjectKey="java-core"
              topicModules={javaTopicModules}
              topicBasePath="../components/study/java-core/topics"
            />
          }
        /&gt;
        {/* --------------------------------- */}
        <Route
          path={ROUTES.JAVA_WEB_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={javaWebRoadmap}
              subjectKey="java-web"
            />
          }
        /&gt;

        <Route
          path={ROUTES.JAVA_WEB_MODULE}
          element={
            <StudyModuleView
              roadmapData={javaWebRoadmap}
              subjectKey="java-web"
            />
          }
        /&gt;

        <Route
          path={ROUTES.JAVA_WEB_TOPIC}
          element={
            <StudyTopicView
              roadmapData={javaWebRoadmap}
              subjectKey="java-web"
              topicModules={javaWebTopicModules}
              topicBasePath="../components/study/java-web/topics"
            />
          }
        /&gt;

        {/* --------------------------- */}
        {/* Modern CSS - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.CSS_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={modernCssRoadmap}
              subjectKey="css"
            />
          }
        /&gt;

        <Route
          path={ROUTES.CSS_MODULE}
          element={
            <StudyModuleView
              roadmapData={modernCssRoadmap}
              subjectKey="css"
            />
          }
        /&gt;

        <Route
          path={ROUTES.CSS_TOPIC}
          element={
            <StudyTopicView
              roadmapData={modernCssRoadmap}
              subjectKey="css"
              topicModules={modernCssTopicModules}
              topicBasePath="../components/study/css/topics"
            />
          }
        /&gt;
        {/* ----------------------------------- */}
        {/* ISC Class 11 - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.ISC_11_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={isc11Roadmap}
              subjectKey="isc-11"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ISC_11_MODULE}
          element={
            <StudyModuleView
              roadmapData={isc11Roadmap}
              subjectKey="isc-11"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ISC_11_TOPIC}
          element={
            <StudyTopicView
              roadmapData={isc11Roadmap}
              subjectKey="isc-11"
              topicModules={isc11TopicModules}
              topicBasePath="../components/study/isc-11/topics"
            />
          }
        /&gt;
        {/* ------------------------------------------ */}
        {/* ISC Class 12 - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.ISC_12_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={isc12Roadmap}
              subjectKey="isc-12"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ISC_12_MODULE}
          element={
            <StudyModuleView
              roadmapData={isc12Roadmap}
              subjectKey="isc-12"
            />
          }
        /&gt;

        <Route
          path={ROUTES.ISC_12_TOPIC}
          element={
            <StudyTopicView
              roadmapData={isc12Roadmap}
              subjectKey="isc-12"
              topicModules={isc12TopicModules}
              topicBasePath="../components/study/isc-12/topics"
            />
          }
        /&gt;

        {/* ----------------------------------------------- */}
        <Route
          path={ROUTES.COMPUTER_ARCHITECTURE_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={computerArchitectureRoadmap}
              subjectKey="computer-architecture"
            />
          }
        /&gt;

        <Route
          path={ROUTES.COMPUTER_ARCHITECTURE_MODULE}
          element={
            <StudyModuleView
              roadmapData={computerArchitectureRoadmap}
              subjectKey="computer-architecture"
            />
          }
        /&gt;

        <Route
          path={ROUTES.COMPUTER_ARCHITECTURE_TOPIC}
          element={
            <StudyTopicView
              roadmapData={computerArchitectureRoadmap}
              subjectKey="computer-architecture"
              topicModules={computerArchitectureTopicModules}
              topicBasePath="../components/study/computer-architecture/topics"
            />
          }
        /&gt;
        {/* ---------------------------------------------------- */}
        {/* UNIX - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.UNIX_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={unixRoadmap}
              subjectKey="unix"
            />
          }
        /&gt;

        <Route
          path={ROUTES.UNIX_MODULE}
          element={
            <StudyModuleView
              roadmapData={unixRoadmap}
              subjectKey="unix"
            />
          }
        /&gt;

        <Route
          path={ROUTES.UNIX_TOPIC}
          element={
            <StudyTopicView
              roadmapData={unixRoadmap}
              subjectKey="unix"
              topicModules={unixTopicModules}
              topicBasePath="../components/study/unix/topics"
            />
          }
        /&gt;
        {/* ---------------------------------------------------------- */}
        {/* Computer Network - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.NETWORK_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={computerNetworkRoadmap}
              subjectKey="computer-network"
            />
          }
        /&gt;

        <Route
          path={ROUTES.NETWORK_MODULE}
          element={
            <StudyModuleView
              roadmapData={computerNetworkRoadmap}
              subjectKey="computer-network"
            />
          }
        /&gt;

        <Route
          path={ROUTES.NETWORK_TOPIC}
          element={
            <StudyTopicView
              roadmapData={computerNetworkRoadmap}
              subjectKey="computer-network"
              topicModules={computerNetworkTopicModules}
              topicBasePath="../components/study/computer-network/topics"
            />
          }
        /&gt;
        {/* ----------------------------------------------------------------- */}
        <Route
          path={ROUTES.CYBER_SECURITY_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={cyberSecurityRoadmap}
              subjectKey="cyber-security"
            />
          }
        /&gt;

        <Route
          path={ROUTES.CYBER_SECURITY_MODULE}
          element={
            <StudyModuleView
              roadmapData={cyberSecurityRoadmap}
              subjectKey="cyber-security"
            />
          }
        /&gt;

        <Route
          path={ROUTES.CYBER_SECURITY_TOPIC}
          element={
            <StudyTopicView
              roadmapData={cyberSecurityRoadmap}
              subjectKey="cyber-security"
              topicModules={cyberSecurityTopicModules}
              topicBasePath="../components/study/cyber-security/topics"
            />
          }
        /&gt;
        {/* ------------------------------------------------------ */}
        <Route
          path={ROUTES.GENERAL_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={generalRoadmap}
              subjectKey="general"
            />
          }
        /&gt;

        <Route
          path={ROUTES.GENERAL_MODULE}
          element={
            <StudyModuleView
              roadmapData={generalRoadmap}
              subjectKey="general"
            />
          }
        /&gt;

        <Route
          path={ROUTES.GENERAL_TOPIC}
          element={
            <StudyTopicView
              roadmapData={generalRoadmap}
              subjectKey="general"
              topicModules={generalTopicModules}
              topicBasePath="../components/study/general/topics"
            />
          }
        /&gt;
        {/* ---------------------------------------------------------- */}
        <Route
          path={ROUTES.NODE_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={nodeRoadmap}
              subjectKey="node"
            />
          }
        /&gt;

        <Route
          path={ROUTES.NODE_MODULE}
          element={
            <StudyModuleView
              roadmapData={nodeRoadmap}
              subjectKey="node"
            />
          }
        /&gt;

        <Route
          path={ROUTES.NODE_TOPIC}
          element={
            <StudyTopicView
              roadmapData={nodeRoadmap}
              subjectKey="node"
              topicModules={nodeTopicModules}
              topicBasePath="../components/study/node/topics"
            />
          }
        /&gt;
        {/* ------------------------------------------------------------------ */}
        {/* Machine Learning */}
        <Route
          path={ROUTES.MACHINE_LEARNING_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={machineLearningRoadmap}
              subjectKey="machine-learning"
            />
          }
        /&gt;

        <Route
          path={ROUTES.MACHINE_LEARNING_MODULE}
          element={
            <StudyModuleView
              roadmapData={machineLearningRoadmap}
              subjectKey="machine-learning"
            />
          }
        /&gt;

        <Route
          path={ROUTES.MACHINE_LEARNING_TOPIC}
          element={
            <StudyTopicView
              roadmapData={machineLearningRoadmap}
              subjectKey="machine-learning"
              topicModules={machineLearningTopicModules}
              topicBasePath="../components/study/machine-learning/topics"
            />
          }
        /&gt;
        {/* ------------------------------------------------------------------ */}
        {/* Excel */}
        <Route
          path={ROUTES.EXCEL_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={excelRoadmap}
              subjectKey="excel"
            />
          }
        /&gt;

        <Route
          path={ROUTES.EXCEL_MODULE}
          element={
            <StudyModuleView
              roadmapData={excelRoadmap}
              subjectKey="excel"
            />
          }
        /&gt;

        <Route
          path={ROUTES.EXCEL_TOPIC}
          element={
            <StudyTopicView
              roadmapData={excelRoadmap}
              subjectKey="excel"
              topicModules={excelTopicModules}
              topicBasePath="../components/study/excel/topics"
            />
          }
        /&gt;
        <Route
          path={ROUTES.RDBMS_MYSQL_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={rdbmsMysqlRoadmap}
              subjectKey="rdbms-mysql"
            />
          }
        /&gt;

        <Route
          path={ROUTES.RDBMS_MYSQL_MODULE}
          element={
            <StudyModuleView
              roadmapData={rdbmsMysqlRoadmap}
              subjectKey="rdbms-mysql"
            />
          }
        /&gt;

        <Route
          path={ROUTES.RDBMS_MYSQL_TOPIC}
          element={
            <StudyTopicView
              roadmapData={rdbmsMysqlRoadmap}
              subjectKey="rdbms-mysql"
              topicModules={rdbmsMysqlTopicModules}
              topicBasePath="../components/study/rdbms-mysql/topics"
            />
          }
        /&gt;
        {/* --------------------------------------------- */}
        <Route
          path={ROUTES.REACT_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={reactRoadmap}
              subjectKey="react"
            />
          }
        /&gt;

        <Route
          path={ROUTES.REACT_MODULE}
          element={
            <StudyModuleView
              roadmapData={reactRoadmap}
              subjectKey="react"
            />
          }
        /&gt;

        <Route
          path={ROUTES.REACT_TOPIC}
          element={
            <StudyTopicView
              roadmapData={reactRoadmap}
              subjectKey="react"
              topicModules={reactTopicModules}
              topicBasePath="../components/study/react/topics"
            />
          }
        /&gt;

        {/* Quantitative Analysis */}
        <Route
          path={ROUTES.QUANTITATIVE_ANALYSIS_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={quantitativeAnalysisRoadmap}
              subjectKey="quantitative-analysis"
            />
          }
        /&gt;

        <Route
          path={ROUTES.QUANTITATIVE_ANALYSIS_MODULE}
          element={
            <StudyModuleView
              roadmapData={quantitativeAnalysisRoadmap}
              subjectKey="quantitative-analysis"
            />
          }
        /&gt;

        <Route
          path={ROUTES.QUANTITATIVE_ANALYSIS_TOPIC}
          element={
            <StudyTopicView
              roadmapData={quantitativeAnalysisRoadmap}
              subjectKey="quantitative-analysis"
              topicModules={quantitativeAnalysisTopicModules}
              topicBasePath="../components/study/quantitative-analysis/topics"
            />
          }
        /&gt;

        {/* Catch-all 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} /&gt;
      </Routes>
    </Suspense>
  );
}