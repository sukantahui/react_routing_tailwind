import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';




// --------------------------------------------------------------
// 2. LAZY‑LOADED COMPONENTS (split by feature)
// --------------------------------------------------------------

const StudentWithAdmission = lazy(() => import('../components/students/StudentWithAdmission'));

const NetworkRoadmap = lazy(() => import('../components/study/network/NetworkRoadmap'));
const NetworkModuleView = lazy(() => import('../components/study/network/NetworkModuleView'));
const NetworkTopicView = lazy(() => import('../components/study/network/NetworkTopicView'));
const IscTweleveTopicView = lazy(() => import('../components/study/isc-12/IscTwelveTopicView'));
const IscTweleveModuleView = lazy(() => import('../components/study/isc-12/IscTwelveModuleView'));
const IscTweleveRoadmap = lazy(() => import('../components/study/isc-12/IscTwelveRoadmap'));
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

// 2e. Roadmap / module / topic views per technology
// (Each technology has three components: Roadmap, ModuleView, TopicView)


const CRoadmap = lazy(() => import('../components/study/c-language/CRoadmap'));
const CModuleView = lazy(() => import('../components/study/c-language/CModuleView'));
const CTopicView = lazy(() => import('../components/study/c-language/CTopicView'));

const TallyRoadmap = lazy(() => import('../components/study/tally/TallyRoadmap'));
const TallyModuleView = lazy(() => import('../components/study/tally/TallyModuleView'));
const TallyTopicView = lazy(() => import('../components/study/tally/TallyTopicView'));


const GitRoadmap = lazy(() => import('../components/study/git/GitRoadmap'));
const GitModuleView = lazy(() => import('../components/study/git/GitModuleView'));
const GitTopicView = lazy(() => import('../components/study/git/GitTopicView'));

const ICSE9JavaRoadmap = lazy(() => import('../components/study/icse-java-9/ICSE9JavaRoadmap'));
const ICSE9JavaModuleView = lazy(() => import('../components/study/icse-java-9/ICSE9JavaModuleView'));
const ICSE9JavaTopicView = lazy(() => import('../components/study/icse-java-9/ICSE9JavaTopicView'));

const JavaXRoadmap = lazy(() => import('../components/study/icse-java-x/JavaXRoadmap'));
const JavaXModuleView = lazy(() => import('../components/study/icse-java-x/JavaXModuleView'));
const JavaXTopicView = lazy(() => import('../components/study/icse-java-x/JavaXTopicView'));

const JavaRoadmap = lazy(() => import('../components/study/java-core/JavaRoadmap'));
const JavaModuleView = lazy(() => import('../components/study/java-core/JavaModuleView'));
const JavaTopicView = lazy(() => import('../components/study/java-core/JavaTopicView'));

const GeneralRoadmap = lazy(() => import('../components/study/general/GeneralRoadmap'));
const GeneralModuleView = lazy(() => import('../components/study/general/GeneralModuleView'));
const GeneralTopicView = lazy(() => import('../components/study/general/GeneralTopicView'));

const CssRoadmap = lazy(() => import('../components/study/css/CssRoadmap'));
const CssModuleView = lazy(() => import('../components/study/css/CssModuleView'));
const CssTopicView = lazy(() => import('../components/study/css/CssTopicView'));

const IscElevenRoadmap = lazy(() => import('../components/study/isc-11/IscElevenRoadmap'));
const IscElevenModuleView = lazy(() => import('../components/study/isc-11/IscElevenModuleView'));
const IscElevenTopicView = lazy(() => import('../components/study/isc-11/IscElevenTopicView'));

const RDBMSMysQLRoadmap = lazy(() => import('../components/study/rdbms-mysql/RdbmsMysqlRoadmap'));
const RDBMSMysQLModuleView = lazy(() => import('../components/study/rdbms-mysql/RdbmsMysqlModuleView'));
const RDBMSMysQLTopicView = lazy(() => import('../components/study/rdbms-mysql/RdbmsMysqlTopicView'));

const CyberSecurityRoadmap = lazy(() => import('../components/study/cyber-security/CyberSecurityRoadmap'));
const CyberSecurityModuleView = lazy(() => import('../components/study/cyber-security/CyberSecurityModuleView'));
const CyberSecurityTopicView = lazy(() => import('../components/study/cyber-security/CyberSecurityTopicView'));


const ComputerArchitectureRoadmap = lazy(() =>
  import('../components/study/computer-architecture/ComputerArchitectureRoadmap')
);
const ComputerArchitectureModuleView = lazy(() =>
  import('../components/study/computer-architecture/ComputerArchitectureModuleView')
);
const ComputerArchitectureTopicView = lazy(() =>
  import('../components/study/computer-architecture/ComputerArchitectureTopicView')
);

const UnixRoadmap = lazy(() => import('../components/study/unix/UnixRoadmap'));
const UnixModuleView = lazy(() => import('../components/study/unix/UnixModuleView'));
const UnixTopicView = lazy(() => import('../components/study/unix/UnixTopicView'));

const ReactRoadmap = lazy(() => import('../components/study/react/ReactRoadmap'));
const ReactModuleView = lazy(() => import('../components/study/react/ReactModuleView'));
const ReactTopicView = lazy(() => import('../components/study/react/ReactTopicView'));

const NodeRoadmap = lazy(() => import('../components/study/node/NodeRoadmap'));
const NodeModuleView = lazy(() => import('../components/study/node/NodeModuleView'));
const NodeTopicView = lazy(() => import('../components/study/node/NodeTopicView'));

// const JavaWebRoadmap = lazy(() => import('../components/study/java-web/JavaWebRoadmap'));
// const JavaWebModuleView = lazy(() => import('../components/study/java-web/JavaWebModuleView'));
// const JavaWebTopicView = lazy(() => import('../components/study/java-web/JavaWebTopicView'));

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
    >
      <Routes>
        {/* ---------- Public routes ---------- */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CERTIFICATE_VIEW} element={<Certificate />} />
        <Route path={ROUTES.QRCODE} element={<QRCodeGenerator />} />
        <Route path={ROUTES.PLAYGROUND} element={<Playground />} />
        <Route path={ROUTES.PYTHON_PLAY} element={<PythonPlayground />} />
        <Route path={ROUTES.WHITEBOARD} element={<PlayWhiteBoard />} />
        <Route path={ROUTES.ICONS} element={<IconResources />} />
        <Route path={ROUTES.VSCODE} element={<VSCodeUltraExpertGuide />} />
        <Route path={ROUTES.TYPING_TEST} element={<TypingTest />} />
        <Route path={ROUTES.TYPING_LEARN} element={<TypingLearn />} />
        <Route path={ROUTES.AUDIO_EXTRACT} element={<AudioExtractor />} />

        {/* Data structure visualizers */}
        <Route path={ROUTES.LINKED_LIST} element={<LinkedListVisualizer />} />
        <Route path={ROUTES.DOUBLY_LINKED_LIST} element={<DoublyLinkedListVisualizer />} />
        <Route path={ROUTES.BINARY_TREE} element={<BinaryTreeVisualizer />} />
        <Route path={ROUTES.AVL_TREE} element={<AvlTreeVisualizer />} />

        {/* ---------- Protected routes (admin / internal) ---------- */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRouteWrapper>
              <Dashboard />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.STUDENT_WITH_ADMISSION}
          element={
            <ProtectedRouteWrapper>
              <StudentWithAdmission />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRouteWrapper>
              <Admin />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.BIJOYA}
          element={<Bijoya />}
        />

        <Route
          path={ROUTES.CERTIFICATE_GENERATOR}
          element={
            <ProtectedRouteWrapper>
              <CertificateGenerator />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.STUDENT_ADMISSION}
          element={
            <ProtectedRouteWrapper>
              <StudentAdmission />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.ADD_COURSE}
          element={
            <ProtectedRouteWrapper>
              <AddCourse />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.ADD_RESULT}
          element={
            <ProtectedRouteWrapper>
              <AddResult />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.FEE_RECEIPT}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceipt />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.FEE_RECEIPT_PART2}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceiptPart2 />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.FEE_RECEIPT_PART3}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceiptPart3 />
            </ProtectedRouteWrapper>
          }
        />

        <Route
          path={ROUTES.FEE_RECEIPT_PART4}
          element={
            <ProtectedRouteWrapper>
              <StudentFeeReceiptPart4 />
            </ProtectedRouteWrapper>
          }
        />

        <Route path={ROUTES.ADD_STUDENT} element={<AddStudent />} />
        <Route path={ROUTES.SUBJECTS} element={<Subject />} />

        {/* ---------- Study routes ---------- */}
        <Route path={ROUTES.STUDY} element={<Study />} />

        {/* Class 11 & WB Board */}
        <Route path={ROUTES.CLASS_11} element={<ClassEleven />} />
        <Route path={ROUTES.CLASS_11_WBB} element={<ClassElevenWbb />} />
        <Route path={ROUTES.WBB_COMP_APP} element={<ComputerApplicationWbbEleven />} />
        <Route path={ROUTES.WBB_COMP_APP_SEM2} element={<SemTwoComputerApplicationWbbEleven />} />
        <Route
          path={ROUTES.WBB_COMP_APP_SEM2_DSA}
          element={<DataStructureSemTwoComputerApplicationWbbEleven />}
        />

        {/* BCA */}
        <Route path={ROUTES.BCA} element={<Bca />} />
        <Route path={ROUTES.BCA_JAVA} element={<JavaChapters />} />
        <Route path={ROUTES.BCA_JAVA_CH1} element={<IntroductionToJava />} />

        {/* C Language - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.C_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={cRoadmap}
              subjectKey="c-language"
            />
          }
        />

        <Route
          path={ROUTES.C_MODULE}
          element={
            <StudyModuleView
              roadmapData={cRoadmap}
              subjectKey="c-language"
            />
          }
        />

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
        />
        {/* -------------------------------------------------- */}

        {/* Tall */}
        <Route
          path={ROUTES.TALLY_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={tallyRoadmap}
              subjectKey="tally"
            />
          }
        />

        <Route
          path={ROUTES.TALLY_MODULE}
          element={
            <StudyModuleView
              roadmapData={tallyRoadmap}
              subjectKey="tally"
            />
          }
        />

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
        />
        {/* ------------------------------------------ */}
        {/* Git - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.GIT_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={gitRoadmap}
              subjectKey="git"
            />
          }
        />

        <Route
          path={ROUTES.GIT_MODULE}
          element={
            <StudyModuleView
              roadmapData={gitRoadmap}
              subjectKey="git"
            />
          }
        />

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
        />
        {/* --------------------------------------------------- */}
        <Route
          path={ROUTES.JAVASCRIPT_MODULE}
          element={
            <StudyModuleView
              roadmapData={javascriptRoadmap}
              subjectKey="javascript"
            />
          }
        />

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
        />

        {/* JavaScript - MASTER STUDY COMPONENTS */}
        <Route
          path={ROUTES.JAVASCRIPT_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={javascriptRoadmap}
              subjectKey="javascript"
            />
          }
        />

        <Route
          path={ROUTES.JAVASCRIPT_MODULE}
          element={
            <StudyModuleView
              roadmapData={javascriptRoadmap}
              subjectKey="javascript"
            />
          }
        />

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
        />

        {/* Python */}
        <Route
          path={ROUTES.PYTHON_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={pythonRoadmap}
              subjectKey="python"
            />
          }
        />

        <Route
          path={ROUTES.PYTHON_MODULE}
          element={
            <StudyModuleView
              roadmapData={pythonRoadmap}
              subjectKey="python"
            />
          }
        />

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
        />

        {/* -------------------------------------- */}


        {/* ICSE Java IX - MASTER STUDY COMPONENTS */}
        <Route
          path={ROUTES.ICSE_IX_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={icse9JavaRoadmap}
              subjectKey="icse-java-ix"
            />
          }
        />

        <Route
          path={ROUTES.ICSE_IX_MODULE}
          element={
            <StudyModuleView
              roadmapData={icse9JavaRoadmap}
              subjectKey="icse-java-ix"
            />
          }
        />

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
        />

        {/* ---------------------------------------------------------- */}

        {/* ICSE Java X - MASTER STUDY COMPONENTS */}
        <Route
          path={ROUTES.ICSE_X_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={icse10JavaRoadmap}
              subjectKey="icse-java-x"
            />
          }
        />

        <Route
          path={ROUTES.ICSE_X_MODULE}
          element={
            <StudyModuleView
              roadmapData={icse10JavaRoadmap}
              subjectKey="icse-java-x"
            />
          }
        />

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
        />

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
        />

        <Route
          path={ROUTES.JAVA_CORE_MODULE}
          element={
            <StudyModuleView
              roadmapData={javaRoadmap}
              subjectKey="java-core"
            />
          }
        />

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
        />
        {/* --------------------------------- */}

        {/* Java Web - MASTER STUDY COMPONENTS */}
        <Route
          path={ROUTES.JAVA_WEB_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={javaWebRoadmap}
              subjectKey="java-web"
            />
          }
        />

        <Route
          path={ROUTES.JAVA_WEB_MODULE}
          element={
            <StudyModuleView
              roadmapData={javaWebRoadmap}
              subjectKey="java-web"
            />
          }
        />

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
        />

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
        />

        <Route
          path={ROUTES.CSS_MODULE}
          element={
            <StudyModuleView
              roadmapData={modernCssRoadmap}
              subjectKey="css"
            />
          }
        />

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
        />
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
        />

        <Route
          path={ROUTES.ISC_11_MODULE}
          element={
            <StudyModuleView
              roadmapData={isc11Roadmap}
              subjectKey="isc-11"
            />
          }
        />

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
        />
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
        />

        <Route
          path={ROUTES.ISC_12_MODULE}
          element={
            <StudyModuleView
              roadmapData={isc12Roadmap}
              subjectKey="isc-12"
            />
          }
        />

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
        />

        {/* ----------------------------------------------- */}
        {/* Computer Architecture - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.COMPUTER_ARCHITECTURE_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={computerArchitectureRoadmap}
              subjectKey="computer-architecture"
            />
          }
        />

        <Route
          path={ROUTES.COMPUTER_ARCHITECTURE_MODULE}
          element={
            <StudyModuleView
              roadmapData={computerArchitectureRoadmap}
              subjectKey="computer-architecture"
            />
          }
        />

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
        />
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
        />

        <Route
          path={ROUTES.UNIX_MODULE}
          element={
            <StudyModuleView
              roadmapData={unixRoadmap}
              subjectKey="unix"
            />
          }
        />

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
        />
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
        />

        <Route
          path={ROUTES.NETWORK_MODULE}
          element={
            <StudyModuleView
              roadmapData={computerNetworkRoadmap}
              subjectKey="computer-network"
            />
          }
        />

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
        />
        {/* ----------------------------------------------------------------- */}
        {/* Cyber Security - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.CYBER_SECURITY_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={cyberSecurityRoadmap}
              subjectKey="cyber-security"
            />
          }
        />

        <Route
          path={ROUTES.CYBER_SECURITY_MODULE}
          element={
            <StudyModuleView
              roadmapData={cyberSecurityRoadmap}
              subjectKey="cyber-security"
            />
          }
        />

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
        />
        {/* ------------------------------------------------------ */}
        {/* General - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.GENERAL_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={generalRoadmap}
              subjectKey="general"
            />
          }
        />

        <Route
          path={ROUTES.GENERAL_MODULE}
          element={
            <StudyModuleView
              roadmapData={generalRoadmap}
              subjectKey="general"
            />
          }
        />

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
        />
        {/* ---------------------------------------------------------- */}
        {/* Node.js - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.NODE_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={nodeRoadmap}
              subjectKey="node"
            />
          }
        />

        <Route
          path={ROUTES.NODE_MODULE}
          element={
            <StudyModuleView
              roadmapData={nodeRoadmap}
              subjectKey="node"
            />
          }
        />

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
        />
        {/* ------------------------------------------------------------------ */}

//Last

        {/* C Language
        <Route path={ROUTES.C_ROADMAP} element={<CRoadmap />} />
        <Route path={ROUTES.C_MODULE} element={<CModuleView />} />
        <Route path={ROUTES.C_TOPIC} element={<CTopicView />} /> */}

        {/* Tally */}
        {/* <Route path={ROUTES.TALLY_ROADMAP} element={<TallyRoadmap />} />
        <Route path={ROUTES.TALLY_MODULE} element={<TallyModuleView />} />
        <Route path={ROUTES.TALLY_TOPIC} element={<TallyTopicView />} /> */}

        {/* Excel */}
        <Route
          path={ROUTES.EXCEL_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={excelRoadmap}
              subjectKey="excel"
            />
          }
        />

        <Route
          path={ROUTES.EXCEL_MODULE}
          element={
            <StudyModuleView
              roadmapData={excelRoadmap}
              subjectKey="excel"
            />
          }
        />

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
        />
        -----------------------------------------------
        {/* RDBMS / MySQL - MASTER STUDY COMPONENTS */}
        <Route
          path={ROUTES.RDBMS_MYSQL_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={rdbmsMysqlRoadmap}
              subjectKey="rdbms-mysql"
            />
          }
        />

        <Route
          path={ROUTES.RDBMS_MYSQL_MODULE}
          element={
            <StudyModuleView
              roadmapData={rdbmsMysqlRoadmap}
              subjectKey="rdbms-mysql"
            />
          }
        />

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
        />
        {/* --------------------------------------------- */}
        {/* React - MASTER STUDY COMPONENTS */}

        <Route
          path={ROUTES.REACT_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={reactRoadmap}
              subjectKey="react"
            />
          }
        />

        <Route
          path={ROUTES.REACT_MODULE}
          element={
            <StudyModuleView
              roadmapData={reactRoadmap}
              subjectKey="react"
            />
          }
        />

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
        />

        {/* ----------------------------------------------------- */}

        {/* Git
        <Route path={ROUTES.GIT_ROADMAP} element={<GitRoadmap />} />
        <Route path={ROUTES.GIT_MODULE} element={<GitModuleView />} />
        <Route path={ROUTES.GIT_TOPIC} element={<GitTopicView />} /> */}

        {/* ICSE Java IX */}
        {/* <Route path={ROUTES.ICSE_IX_ROADMAP} element={<ICSE9JavaRoadmap />} />
        <Route path={ROUTES.ICSE_IX_MODULE} element={<ICSE9JavaModuleView />} />
        <Route path={ROUTES.ICSE_IX_TOPIC} element={<ICSE9JavaTopicView />} /> */}

        {/* ICSE Java X */}
        {/* <Route path={ROUTES.ICSE_X_ROADMAP} element={<JavaXRoadmap />} />
        <Route path={ROUTES.ICSE_X_MODULE} element={<JavaXModuleView />} />
        <Route path={ROUTES.ICSE_X_TOPIC} element={<JavaXTopicView />} /> */}

        {/* Java Core */}
        {/* <Route path={ROUTES.JAVA_CORE_ROADMAP} element={<JavaRoadmap />} />
        <Route path={ROUTES.JAVA_CORE_MODULE} element={<JavaModuleView />} />
        <Route path={ROUTES.JAVA_CORE_TOPIC} element={<JavaTopicView />} /> */}

        {/* General */}
        <Route path={ROUTES.GENERAL_ROADMAP} element={<GeneralRoadmap />} />
        <Route path={ROUTES.GENERAL_MODULE} element={<GeneralModuleView />} />
        <Route path={ROUTES.GENERAL_TOPIC} element={<GeneralTopicView />} />

        {/* CSS */}
        {/* <Route path={ROUTES.CSS_ROADMAP} element={<CssRoadmap />} />
        <Route path={ROUTES.CSS_MODULE} element={<CssModuleView />} />
        <Route path={ROUTES.CSS_TOPIC} element={<CssTopicView />} /> */}

        {/* ISC 11 */}
        {/* <Route path={ROUTES.ISC_11_ROADMAP} element={<IscElevenRoadmap />} />
        <Route path={ROUTES.ISC_11_MODULE} element={<IscElevenModuleView />} />
        <Route path={ROUTES.ISC_11_TOPIC} element={<IscElevenTopicView />} /> */}

        {/* ISC 12 */}
        {/* <Route path={ROUTES.ISC_12_ROADMAP} element={<IscTweleveRoadmap />} />
        <Route path={ROUTES.ISC_12_MODULE} element={<IscTweleveModuleView />} />
        <Route path={ROUTES.ISC_12_TOPIC} element={<IscTweleveTopicView />} /> */}

        {/* Computer Architecture */}
        {/* <Route path={ROUTES.COMP_ARCH_ROADMAP} element={<ComputerArchitectureRoadmap />} />
        <Route path={ROUTES.COMP_ARCH_MODULE} element={<ComputerArchitectureModuleView />} />
        <Route path={ROUTES.COMP_ARCH_TOPIC} element={<ComputerArchitectureTopicView />} /> */}

        {/* Unix */}
        <Route path={ROUTES.UNIX_ROADMAP} element={<UnixRoadmap />} />
        <Route path={ROUTES.UNIX_MODULE} element={<UnixModuleView />} />
        <Route path={ROUTES.UNIX_TOPIC} element={<UnixTopicView />} />

        {/* React */}
        <Route path={ROUTES.REACT_ROADMAP} element={<ReactRoadmap />} />
        <Route path={ROUTES.REACT_MODULE} element={<ReactModuleView />} />
        <Route path={ROUTES.REACT_TOPIC} element={<ReactTopicView />} />

        {/* Node.js */}
        <Route path={ROUTES.NODE_ROADMAP} element={<NodeRoadmap />} />
        <Route path={ROUTES.NODE_MODULE} element={<NodeModuleView />} />
        <Route path={ROUTES.NODE_TOPIC} element={<NodeTopicView />} />

        {/* Java Web */}
        {/* <Route path={ROUTES.JAVA_WEB_ROADMAP} element={<JavaWebRoadmap />} />
        <Route path={ROUTES.JAVA_WEB_MODULE} element={<JavaWebModuleView />} />
        <Route path={ROUTES.JAVA_WEB_TOPIC} element={<JavaWebTopicView />} /> */}

        {/* Network */}
        <Route path={ROUTES.NETWORK_ROADMAP} element={<NetworkRoadmap />} />
        <Route path={ROUTES.NETWORK_MODULE} element={<NetworkModuleView />} />
        <Route path={ROUTES.NETWORK_TOPIC} element={<NetworkTopicView />} />

        {/* RDBMS */}
        {/* <Route path={ROUTES.RDBMS_MYSQL_ROADMAP} element={<RDBMSMysQLRoadmap />} />
        <Route path={ROUTES.RDBMS_MYSQL_MODULE} element={<RDBMSMysQLModuleView />} />
        <Route path={ROUTES.RDBMS_MYSQL_TOPIC} element={<RDBMSMysQLTopicView />} /> */}

        {/* Cyber Security */}
        <Route path={ROUTES.CYBER_SECURITY_ROADMAP} element={<CyberSecurityRoadmap />} />
        <Route path={ROUTES.CYBER_SECURITY_MODULE} element={<CyberSecurityModuleView />} />
        <Route path={ROUTES.CYBER_SECURITY_TOPIC} element={<CyberSecurityTopicView />} />

        {/* Quatatitative Analysis */}
        <Route
          path={ROUTES.QUANTITATIVE_ANALYSIS_ROADMAP}
          element={
            <StudyRoadmap
              roadmapData={quantitativeAnalysisRoadmap}
              subjectKey="quantitative-analysis"
            />
          }
        />

        <Route
          path={ROUTES.QUANTITATIVE_ANALYSIS_MODULE}
          element={
            <StudyModuleView
              roadmapData={quantitativeAnalysisRoadmap}
              subjectKey="quantitative-analysis"
            />
          }
        />

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
        />

        {/* ---------- Catch‑all 404 ---------- */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}