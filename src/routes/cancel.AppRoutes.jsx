import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';




// --------------------------------------------------------------
// 2. LAZY‑LOADED COMPONENTS (split by feature)
// --------------------------------------------------------------

const StudentWithAdmission = lazy(()=> import('../components/students/StudentWithAdmission'));

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
const JavaScriptRoadmap = lazy(() => import('../components/study/javaScript/JavaScriptRoadmap'));
const JavaScriptModuleView = lazy(() => import('../components/study/javaScript/JavaScriptModuleView'));
const JavaScriptTopicView = lazy(() => import('../components/study/javaScript/JavaScriptTopicView'));

const PythonRoadmap = lazy(() => import('../components/study/python/PythonRoadmap'));
const PythonModuleView = lazy(() => import('../components/study/python/PythonModuleView'));
const PythonTopicView = lazy(() => import('../components/study/python/PythonTopicView'));

const CRoadmap = lazy(() => import('../components/study/c-language/CRoadmap'));
const CModuleView = lazy(() => import('../components/study/c-language/CModuleView'));
const CTopicView = lazy(() => import('../components/study/c-language/CTopicView'));

const TallyRoadmap = lazy(() => import('../components/study/tally/TallyRoadmap'));
const TallyModuleView = lazy(() => import('../components/study/tally/TallyModuleView'));
const TallyTopicView = lazy(() => import('../components/study/tally/TallyTopicView'));

const ExcelRoadmap = lazy(() => import('../components/study/excel/ExcelRoadmap'));
const ExcelModuleView = lazy(() => import('../components/study/excel/ExcelModuleView'));
const ExcelTopicView = lazy(() => import('../components/study/excel/ExcelTopicView'));

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

const QuantitativeAnalysisRoadmap = lazy(() => import('../components/study/quantitative-analysis/QuantitativeAnalysisRoadmap'));
const QuantitativeAnalysisModuleView = lazy(() => import('../components/study/quantitative-analysis/QuantitativeAnalysisModuleView'));
const QuantitativeAnalysisTopicView = lazy(() => import('../components/study/quantitative-analysis/QuantitativeAnalysisTopicView'));

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

const JavaWebRoadmap = lazy(() => import('../components/study/java-web/JavaWebRoadmap'));
const JavaWebModuleView = lazy(() => import('../components/study/java-web/JavaWebModuleView'));
const JavaWebTopicView = lazy(() => import('../components/study/java-web/JavaWebTopicView'));

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

  COMP_ARCH_ROADMAP: '/computer-architecture/roadmap',
  COMP_ARCH_MODULE: '/computer-architecture/module/:slug',
  COMP_ARCH_TOPIC: '/computer-architecture/topic/:moduleSlug/:topicIndex',

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

        {/* ---------- Technology roadmaps (each with /roadmap, /module, /topic) ---------- */}
        {/* JavaScript */}
        <Route path={ROUTES.JAVASCRIPT_ROADMAP} element={<JavaScriptRoadmap />} /&gt;
        <Route path={ROUTES.JAVASCRIPT_MODULE} element={<JavaScriptModuleView />} /&gt;
        <Route path={ROUTES.JAVASCRIPT_TOPIC} element={<JavaScriptTopicView />} /&gt;

        {/* Python */}
        <Route path={ROUTES.PYTHON_ROADMAP} element={<PythonRoadmap />} /&gt;
        <Route path={ROUTES.PYTHON_MODULE} element={<PythonModuleView />} /&gt;
        <Route path={ROUTES.PYTHON_TOPIC} element={<PythonTopicView />} /&gt;

        {/* C Language */}
        <Route path={ROUTES.C_ROADMAP} element={<CRoadmap />} /&gt;
        <Route path={ROUTES.C_MODULE} element={<CModuleView />} /&gt;
        <Route path={ROUTES.C_TOPIC} element={<CTopicView />} /&gt;

        {/* Tally */}
        <Route path={ROUTES.TALLY_ROADMAP} element={<TallyRoadmap />} /&gt;
        <Route path={ROUTES.TALLY_MODULE} element={<TallyModuleView />} /&gt;
        <Route path={ROUTES.TALLY_TOPIC} element={<TallyTopicView />} /&gt;

        {/* Excel */}
        <Route path={ROUTES.EXCEL_ROADMAP} element={<ExcelRoadmap />} /&gt;
        <Route path={ROUTES.EXCEL_MODULE} element={<ExcelModuleView />} /&gt;
        <Route path={ROUTES.EXCEL_TOPIC} element={<ExcelTopicView />} /&gt;

        {/* Git */}
        <Route path={ROUTES.GIT_ROADMAP} element={<GitRoadmap />} /&gt;
        <Route path={ROUTES.GIT_MODULE} element={<GitModuleView />} /&gt;
        <Route path={ROUTES.GIT_TOPIC} element={<GitTopicView />} /&gt;

        {/* ICSE Java IX */}
        <Route path={ROUTES.ICSE_IX_ROADMAP} element={<ICSE9JavaRoadmap />} /&gt;
        <Route path={ROUTES.ICSE_IX_MODULE} element={<ICSE9JavaModuleView />} /&gt;
        <Route path={ROUTES.ICSE_IX_TOPIC} element={<ICSE9JavaTopicView />} /&gt;

        {/* ICSE Java X */}
        <Route path={ROUTES.ICSE_X_ROADMAP} element={<JavaXRoadmap />} /&gt;
        <Route path={ROUTES.ICSE_X_MODULE} element={<JavaXModuleView />} /&gt;
        <Route path={ROUTES.ICSE_X_TOPIC} element={<JavaXTopicView />} /&gt;

        {/* Java Core */}
        <Route path={ROUTES.JAVA_CORE_ROADMAP} element={<JavaRoadmap />} /&gt;
        <Route path={ROUTES.JAVA_CORE_MODULE} element={<JavaModuleView />} /&gt;
        <Route path={ROUTES.JAVA_CORE_TOPIC} element={<JavaTopicView />} /&gt;

        {/* General */}
        <Route path={ROUTES.GENERAL_ROADMAP} element={<GeneralRoadmap />} /&gt;
        <Route path={ROUTES.GENERAL_MODULE} element={<GeneralModuleView />} /&gt;
        <Route path={ROUTES.GENERAL_TOPIC} element={<GeneralTopicView />} /&gt;

        {/* CSS */}
        <Route path={ROUTES.CSS_ROADMAP} element={<CssRoadmap />} /&gt;
        <Route path={ROUTES.CSS_MODULE} element={<CssModuleView />} /&gt;
        <Route path={ROUTES.CSS_TOPIC} element={<CssTopicView />} /&gt;

        {/* ISC 11 */}
        <Route path={ROUTES.ISC_11_ROADMAP} element={<IscElevenRoadmap />} /&gt;
        <Route path={ROUTES.ISC_11_MODULE} element={<IscElevenModuleView />} /&gt;
        <Route path={ROUTES.ISC_11_TOPIC} element={<IscElevenTopicView />} /&gt;

        {/* ISC 12 */}
        <Route path={ROUTES.ISC_12_ROADMAP} element={<IscTweleveRoadmap />} /&gt;
        <Route path={ROUTES.ISC_12_MODULE} element={<IscTweleveModuleView />} /&gt;
        <Route path={ROUTES.ISC_12_TOPIC} element={<IscTweleveTopicView />} /&gt;

        {/* Computer Architecture */}
        <Route path={ROUTES.COMP_ARCH_ROADMAP} element={<ComputerArchitectureRoadmap />} /&gt;
        <Route path={ROUTES.COMP_ARCH_MODULE} element={<ComputerArchitectureModuleView />} /&gt;
        <Route path={ROUTES.COMP_ARCH_TOPIC} element={<ComputerArchitectureTopicView />} /&gt;

        {/* Unix */}
        <Route path={ROUTES.UNIX_ROADMAP} element={<UnixRoadmap />} /&gt;
        <Route path={ROUTES.UNIX_MODULE} element={<UnixModuleView />} /&gt;
        <Route path={ROUTES.UNIX_TOPIC} element={<UnixTopicView />} /&gt;

        {/* React */}
        <Route path={ROUTES.REACT_ROADMAP} element={<ReactRoadmap />} /&gt;
        <Route path={ROUTES.REACT_MODULE} element={<ReactModuleView />} /&gt;
        <Route path={ROUTES.REACT_TOPIC} element={<ReactTopicView />} /&gt;

        {/* Node.js */}
        <Route path={ROUTES.NODE_ROADMAP} element={<NodeRoadmap />} /&gt;
        <Route path={ROUTES.NODE_MODULE} element={<NodeModuleView />} /&gt;
        <Route path={ROUTES.NODE_TOPIC} element={<NodeTopicView />} /&gt;

        {/* Java Web */}
        <Route path={ROUTES.JAVA_WEB_ROADMAP} element={<JavaWebRoadmap />} /&gt;
        <Route path={ROUTES.JAVA_WEB_MODULE} element={<JavaWebModuleView />} /&gt;
        <Route path={ROUTES.JAVA_WEB_TOPIC} element={<JavaWebTopicView />} /&gt;

        {/* Network */}
        <Route path={ROUTES.NETWORK_ROADMAP} element={<NetworkRoadmap />} /&gt;
        <Route path={ROUTES.NETWORK_MODULE} element={<NetworkModuleView />} /&gt;
        <Route path={ROUTES.NETWORK_TOPIC} element={<NetworkTopicView />} /&gt;

        {/* RDBMS */}
        <Route path={ROUTES.RDBMS_MYSQL_ROADMAP} element={<RDBMSMysQLRoadmap />} /&gt;
        <Route path={ROUTES.RDBMS_MYSQL_MODULE} element={<RDBMSMysQLModuleView />} /&gt;
        <Route path={ROUTES.RDBMS_MYSQL_TOPIC} element={<RDBMSMysQLTopicView />} /&gt;

        {/* Cyber Security */}
        <Route path={ROUTES.CYBER_SECURITY_ROADMAP} element={<CyberSecurityRoadmap />} /&gt;
        <Route path={ROUTES.CYBER_SECURITY_MODULE} element={<CyberSecurityModuleView />} /&gt;
        <Route path={ROUTES.CYBER_SECURITY_TOPIC} element={<CyberSecurityTopicView />} /&gt;

        {/* Quatatitative Analysis */}
        <Route path={ROUTES.QUANTITATIVE_ANALYSIS_ROADMAP} element={<QuantitativeAnalysisRoadmap />} /&gt;
        <Route path={ROUTES.QUANTITATIVE_ANALYSIS_MODULE} element={<QuantitativeAnalysisModuleView />} /&gt;
        <Route path={ROUTES.QUANTITATIVE_ANALYSIS_TOPIC} element={<QuantitativeAnalysisTopicView />} /&gt;

        {/* ---------- Catch‑all 404 ---------- */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} /&gt;
      </Routes>
    </Suspense>
  );
}