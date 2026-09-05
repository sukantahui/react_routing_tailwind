import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// --------------------------------------------------------------
// 1. LAZY‑LOADED CORE & PUBLIC COMPONENTS
// --------------------------------------------------------------
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
const SortingVisualizer = lazy(() => import('../components/SortingVisualizer'));
const BigOCalculator = lazy(() => import('../components/BigOCalculator'));
const JsonFormatter = lazy(() => import('../components/JsonFormatter'));
const MenstrualCalendarApp = lazy(() => import('../components/menstrual-calendar/MenstrualCalendarApp'));

// Data structure visualizers
const LinkedListVisualizer = lazy(() => import('../common/LinkedListVisualizer'));
const DoublyLinkedListVisualizer = lazy(() => import('../common/DoublyLinkedListVisualizer'));
const BinaryTreeVisualizer = lazy(() => import('../common/BinaryTreeVisualizer'));
const AvlTreeVisualizer = lazy(() => import('../common/AvlTreeVisualizer'));

// Study – class‑specific
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

// General subject components (Java, BCA Java)
const JavaChapters = lazy(() => import('../components/GeneralSubjects/java/JavaChapters'));
const IntroductionToJava = lazy(() => import('../components/GeneralSubjects/java/IntroductionToJava'));

// Admin / protected features
const Admin = lazy(() => import('./Admin'));
const UserManagement = lazy(() => import('../components/UserManagement'));
const AddUser = lazy(() => import('../components/AddUser'));
const DatabaseBackup = lazy(() => import('../components/DatabaseBackup'));
const Bijoya = lazy(() => import('./Bijoya'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const AddStudent = lazy(() => import('../components/AddStudent'));
const CertificateGenerator = lazy(() => import('../common/CertificateGenerator'));
const StudentAdmission = lazy(() => import('../components/StudentAdmission'));
const AddCourse = lazy(() => import('../components/AddCourse'));
const AddResult = lazy(() => import('../components/AddResult'));
const Subject = lazy(() => import('../components/Subject'));
const StudentFeeReceipt = lazy(() => import('../components/StudentFeeReceipt'));
const StudentFeeReceiptPart2 = lazy(() => import('../components/StudentFeeReceiptPart2'));
const StudentFeeReceiptPart3 = lazy(() => import('../components/StudentFeeReceiptPart3'));
const StudentFeeReceiptPart4 = lazy(() => import('../components/StudentFeeReceiptPart4'));
const StudentWithAdmission = lazy(() => import('../components/students/StudentWithAdmission'));
const FeePaymentsList = lazy(() => import('../components/FeePaymentsList'));

// Master Study View Engines
const StudyRoadmap = lazy(() => import('../components/study/StudyRoadmap'));
const StudyModuleView = lazy(() => import('../components/study/StudyModuleView'));
const StudyTopicView = lazy(() => import('../components/study/StudyTopicView'));

// --------------------------------------------------------------
// 2. ROUTE PATH CONSTANTS
// --------------------------------------------------------------
const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  MENSTRUAL_CALENDAR: '/menstrual-calendar',
  CERTIFICATE_VIEW: '/certificates/:certificateId',
  ADMIN: '/admin',
  USER_MANAGEMENT: '/admin/users',
  ADD_USER: '/users/add',
  REGISTER_USER: '/admin/register-user',
  DATABASE_BACKUP: '/admin/backups',
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
  SORTING_VISUALIZER: '/tools/sorting-visualizer',
  BIG_O_CALCULATOR: '/tools/big-o-calculator',
  JSON_FORMATTER: '/tools/json-formatter',
  PLAYGROUND: '/play',

  PYTHON_PLAY: '/python-play',
  ICONS: '/icons',
  VSCODE: '/vscode',
  WHITEBOARD: '/whiteBoard',
  STUDENT_WITH_ADMISSION: '/students/student-admission',
  FEE_PAYMENTS_LIST: '/payments',
  FEE_RECEIPTS_LIST: '/fees-receipts',
  REGISTER_STUDENT_ADMISSION: '/students/register-admission',
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

  DSA_ROADMAP: '/dsa/roadmap',
  DSA_MODULE: '/dsa/module/:slug',
  DSA_TOPIC: '/dsa/topic/:moduleSlug/:topicIndex',

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

// --------------------------------------------------------------
// 3. LAZY STUDY TRACK ROUTE WRAPPER
// Dynamically loads the roadmap JSON & topic modules on demand
// --------------------------------------------------------------
const roadmapCache = new Map();

function StudyTrackRoute({
  loadRoadmap,
  getTopics,
  subjectKey,
  topicBasePath,
  view, // 'roadmap' | 'module' | 'topic'
}) {
  const [roadmapData, setRoadmapData] = useState(() => roadmapCache.get(subjectKey) || null);
  const [topicModules, setTopicModules] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Reset state for new subject before fetching
    setRoadmapData(roadmapCache.get(subjectKey) || null);
    setTopicModules(null);
    setError(null);

    const fetchRoadmap = roadmapCache.has(subjectKey)
      ? Promise.resolve(roadmapCache.get(subjectKey))
      : loadRoadmap().then((module) => {
          const data = module.default || module;
          roadmapCache.set(subjectKey, data);
          return data;
        });

    const fetchTopics = view === 'topic' && getTopics ? Promise.resolve(getTopics()) : Promise.resolve(null);

    Promise.all([fetchRoadmap, fetchTopics])
      .then(([data, topics]) => {
        if (isMounted) {
          setRoadmapData(data);
          setTopicModules(topics);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(`Failed to load ${subjectKey} study track:`, err);
          setError(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [loadRoadmap, getTopics, subjectKey, view]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
        <div className="text-center max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-rose-400 font-semibold mb-2">Error loading course material</p>
          <p className="text-sm text-slate-400">Please check your connection and refresh the page.</p>
        </div>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading course curriculum...</p>
        </div>
      </div>
    );
  }

  if (view === 'roadmap') {
    return <StudyRoadmap key={subjectKey} roadmapData={roadmapData} subjectKey={subjectKey} />;
  }
  if (view === 'module') {
    return <StudyModuleView key={`${subjectKey}-module`} roadmapData={roadmapData} subjectKey={subjectKey} />;
  }
  return (
    <StudyTopicView
      key={`${subjectKey}-topic`}
      roadmapData={roadmapData}
      subjectKey={subjectKey}
      topicModules={topicModules}
      topicBasePath={topicBasePath}
    />
  );
}

// --------------------------------------------------------------
// 4. STUDY TRACK REGISTRY (All 23 Tracks with Lazy Dynamic Loading)
// --------------------------------------------------------------
const STUDY_TRACKS = [
  {
    key: 'quantitative-analysis',
    roadmapRoute: ROUTES.QUANTITATIVE_ANALYSIS_ROADMAP,
    moduleRoute: ROUTES.QUANTITATIVE_ANALYSIS_MODULE,
    topicRoute: ROUTES.QUANTITATIVE_ANALYSIS_TOPIC,
    loadRoadmap: () => import('../components/study/quantitative-analysis/quantitative-analysis-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/quantitative-analysis/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/quantitative-analysis/topics',
  },
  {
    key: 'python',
    roadmapRoute: ROUTES.PYTHON_ROADMAP,
    moduleRoute: ROUTES.PYTHON_MODULE,
    topicRoute: ROUTES.PYTHON_TOPIC,
    loadRoadmap: () => import('../components/study/python/python-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/python/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/python/topics',
  },
  {
    key: 'excel',
    roadmapRoute: ROUTES.EXCEL_ROADMAP,
    moduleRoute: ROUTES.EXCEL_MODULE,
    topicRoute: ROUTES.EXCEL_TOPIC,
    loadRoadmap: () => import('../components/study/excel/excel-basic-to-advanced.json'),
    getTopics: () => import.meta.glob('../components/study/excel/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/excel/topics',
  },
  {
    key: 'javascript',
    roadmapRoute: ROUTES.JAVASCRIPT_ROADMAP,
    moduleRoute: ROUTES.JAVASCRIPT_MODULE,
    topicRoute: ROUTES.JAVASCRIPT_TOPIC,
    loadRoadmap: () => import('../components/study/javaScript/javascript-roadmap-enhanced.json'),
    getTopics: () => import.meta.glob('../components/study/javaScript/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/javaScript/topics',
  },
  {
    key: 'c-language',
    roadmapRoute: ROUTES.C_ROADMAP,
    moduleRoute: ROUTES.C_MODULE,
    topicRoute: ROUTES.C_TOPIC,
    loadRoadmap: () => import('../components/study/c-language/c-language-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/c-language/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/c-language/topics',
  },
  {
    key: 'dsa',
    roadmapRoute: ROUTES.DSA_ROADMAP,
    moduleRoute: ROUTES.DSA_MODULE,
    topicRoute: ROUTES.DSA_TOPIC,
    loadRoadmap: () => import('../components/study/dsa/dsa-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/dsa/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/dsa/topics',
  },
  {
    key: 'tally',
    roadmapRoute: ROUTES.TALLY_ROADMAP,
    moduleRoute: ROUTES.TALLY_MODULE,
    topicRoute: ROUTES.TALLY_TOPIC,
    loadRoadmap: () => import('../components/study/tally/tally-prime-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/tally/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/tally/topics',
  },
  {
    key: 'git',
    roadmapRoute: ROUTES.GIT_ROADMAP,
    moduleRoute: ROUTES.GIT_MODULE,
    topicRoute: ROUTES.GIT_TOPIC,
    loadRoadmap: () => import('../components/study/git/git-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/git/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/git/topics',
  },
  {
    key: 'icse-java-ix',
    roadmapRoute: ROUTES.ICSE_IX_ROADMAP,
    moduleRoute: ROUTES.ICSE_IX_MODULE,
    topicRoute: ROUTES.ICSE_IX_TOPIC,
    loadRoadmap: () => import('../components/study/icse-java-9/icse-java-ix-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/icse-java-9/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/icse-java-9/topics',
  },
  {
    key: 'icse-java-x',
    roadmapRoute: ROUTES.ICSE_X_ROADMAP,
    moduleRoute: ROUTES.ICSE_X_MODULE,
    topicRoute: ROUTES.ICSE_X_TOPIC,
    loadRoadmap: () => import('../components/study/icse-java-x/icse-class-10-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/icse-java-x/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/icse-java-x/topics',
  },
  {
    key: 'java-core',
    roadmapRoute: ROUTES.JAVA_CORE_ROADMAP,
    moduleRoute: ROUTES.JAVA_CORE_MODULE,
    topicRoute: ROUTES.JAVA_CORE_TOPIC,
    loadRoadmap: () => import('../components/study/java-core/java-core-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/java-core/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/java-core/topics',
  },
  {
    key: 'java-web',
    roadmapRoute: ROUTES.JAVA_WEB_ROADMAP,
    moduleRoute: ROUTES.JAVA_WEB_MODULE,
    topicRoute: ROUTES.JAVA_WEB_TOPIC,
    loadRoadmap: () => import('../components/study/java-web/java-web-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/java-web/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/java-web/topics',
  },
  {
    key: 'rdbms-mysql',
    roadmapRoute: ROUTES.RDBMS_MYSQL_ROADMAP,
    moduleRoute: ROUTES.RDBMS_MYSQL_MODULE,
    topicRoute: ROUTES.RDBMS_MYSQL_TOPIC,
    loadRoadmap: () => import('../components/study/rdbms-mysql/rdbms-mysql-course-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/rdbms-mysql/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/rdbms-mysql/topics',
  },
  {
    key: 'react',
    roadmapRoute: ROUTES.REACT_ROADMAP,
    moduleRoute: ROUTES.REACT_MODULE,
    topicRoute: ROUTES.REACT_TOPIC,
    loadRoadmap: () => import('../components/study/react/react19-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/react/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/react/topics',
  },
  {
    key: 'css',
    roadmapRoute: ROUTES.CSS_ROADMAP,
    moduleRoute: ROUTES.CSS_MODULE,
    topicRoute: ROUTES.CSS_TOPIC,
    loadRoadmap: () => import('../components/study/css/css-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/css/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/css/topics',
  },
  {
    key: 'isc-11',
    roadmapRoute: ROUTES.ISC_11_ROADMAP,
    moduleRoute: ROUTES.ISC_11_MODULE,
    topicRoute: ROUTES.ISC_11_TOPIC,
    loadRoadmap: () => import('../components/study/isc-11/isc11-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/isc-11/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/isc-11/topics',
  },
  {
    key: 'isc-12',
    roadmapRoute: ROUTES.ISC_12_ROADMAP,
    moduleRoute: ROUTES.ISC_12_MODULE,
    topicRoute: ROUTES.ISC_12_TOPIC,
    loadRoadmap: () => import('../components/study/isc-12/isc12-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/isc-12/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/isc-12/topics',
  },
  {
    key: 'computer-architecture',
    roadmapRoute: ROUTES.COMPUTER_ARCHITECTURE_ROADMAP,
    moduleRoute: ROUTES.COMPUTER_ARCHITECTURE_MODULE,
    topicRoute: ROUTES.COMPUTER_ARCHITECTURE_TOPIC,
    loadRoadmap: () => import('../components/study/computer-architecture/computer-architecture-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/computer-architecture/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/computer-architecture/topics',
  },
  {
    key: 'unix',
    roadmapRoute: ROUTES.UNIX_ROADMAP,
    moduleRoute: ROUTES.UNIX_MODULE,
    topicRoute: ROUTES.UNIX_TOPIC,
    loadRoadmap: () => import('../components/study/unix/unix-basic-to-ultra-expert-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/unix/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/unix/topics',
  },
  {
    key: 'network',
    roadmapRoute: ROUTES.NETWORK_ROADMAP,
    moduleRoute: ROUTES.NETWORK_MODULE,
    topicRoute: ROUTES.NETWORK_TOPIC,
    loadRoadmap: () => import('../components/study/network/network-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/network/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/network/topics',
  },
  {
    key: 'cyber-security',
    roadmapRoute: ROUTES.CYBER_SECURITY_ROADMAP,
    moduleRoute: ROUTES.CYBER_SECURITY_MODULE,
    topicRoute: ROUTES.CYBER_SECURITY_TOPIC,
    loadRoadmap: () => import('../components/study/cyber-security/cyber-securty-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/cyber-security/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/cyber-security/topics',
  },
  {
    key: 'general',
    roadmapRoute: ROUTES.GENERAL_ROADMAP,
    moduleRoute: ROUTES.GENERAL_MODULE,
    topicRoute: ROUTES.GENERAL_TOPIC,
    loadRoadmap: () => import('../components/study/general/general-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/general/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/general/topics',
  },
  {
    key: 'node',
    roadmapRoute: ROUTES.NODE_ROADMAP,
    moduleRoute: ROUTES.NODE_MODULE,
    topicRoute: ROUTES.NODE_TOPIC,
    loadRoadmap: () => import('../components/study/node/node-roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/node/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/node/topics',
  },
  {
    key: 'machine-learning',
    roadmapRoute: ROUTES.MACHINE_LEARNING_ROADMAP,
    moduleRoute: ROUTES.MACHINE_LEARNING_MODULE,
    topicRoute: ROUTES.MACHINE_LEARNING_TOPIC,
    loadRoadmap: () => import('../components/study/machine-learning/machine_learning_roadmap.json'),
    getTopics: () => import.meta.glob('../components/study/machine-learning/topics/*/Topic*.jsx'),
    topicBasePath: '../components/study/machine-learning/topics',
  },
];

// --------------------------------------------------------------
// 5. HELPER: Protected route wrapper
// --------------------------------------------------------------
const ProtectedRouteWrapper = ({ children, allowedRoles }) => (
  <ProtectedRoute allowedRoles={allowedRoles}>{children}</ProtectedRoute>
);

// --------------------------------------------------------------
// 6. MAIN APP ROUTES COMPONENT
// --------------------------------------------------------------
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
        {/* ---------- Public & Tool routes ---------- */}
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
        <Route path={ROUTES.SORTING_VISUALIZER} element={<SortingVisualizer />} />
        <Route path={ROUTES.BIG_O_CALCULATOR} element={<BigOCalculator />} />
        <Route path={ROUTES.JSON_FORMATTER} element={<JsonFormatter />} />


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
          path={ROUTES.FEE_PAYMENTS_LIST}
          element={
            <ProtectedRouteWrapper>
              <FeePaymentsList />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path={ROUTES.FEE_RECEIPTS_LIST}
          element={
            <ProtectedRouteWrapper>
              <FeePaymentsList />
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
            <ProtectedRouteWrapper allowedRoles={['Admin', 'Developer', 'Owner']}>
              <Admin />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path={ROUTES.USER_MANAGEMENT}
          element={
            <ProtectedRouteWrapper allowedRoles={['Admin', 'Developer', 'Owner']}>
              <UserManagement />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path={ROUTES.ADD_USER}
          element={
            <ProtectedRouteWrapper allowedRoles={['Admin', 'Developer', 'Owner']}>
              <AddUser />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path={ROUTES.REGISTER_USER}
          element={
            <ProtectedRouteWrapper allowedRoles={['Admin', 'Developer', 'Owner']}>
              <AddUser />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path={ROUTES.DATABASE_BACKUP}
          element={
            <ProtectedRouteWrapper allowedRoles={['Admin', 'Developer', 'Owner']}>
              <DatabaseBackup />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="/backups"
          element={
            <ProtectedRouteWrapper allowedRoles={['Admin', 'Developer', 'Owner']}>
              <DatabaseBackup />
            </ProtectedRouteWrapper>
          }
        />

        <Route path={ROUTES.BIJOYA} element={<Bijoya />} />

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

        <Route
          path={ROUTES.MENSTRUAL_CALENDAR}
          element={
            <ProtectedRouteWrapper>
              <MenstrualCalendarApp />
            </ProtectedRouteWrapper>
          }
        />

        <Route path={ROUTES.ADD_STUDENT} element={<AddStudent />} />
        <Route path={ROUTES.SUBJECTS} element={<Subject />} />

        {/* ---------- Academic Study Routes ---------- */}
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

        {/* ---------- Master Study Tracks (Dynamic Lazy Loaded) ---------- */}
        {STUDY_TRACKS.map((track) => (
          <React.Fragment key={track.key}>
            <Route
              path={track.roadmapRoute}
              element={
                <StudyTrackRoute
                  loadRoadmap={track.loadRoadmap}
                  subjectKey={track.key}
                  view="roadmap"
                />
              }
            />
            <Route
              path={track.moduleRoute}
              element={
                <StudyTrackRoute
                  loadRoadmap={track.loadRoadmap}
                  subjectKey={track.key}
                  view="module"
                />
              }
            />
            <Route
              path={track.topicRoute}
              element={
                <StudyTrackRoute
                  loadRoadmap={track.loadRoadmap}
                  getTopics={track.getTopics}
                  subjectKey={track.key}
                  topicBasePath={track.topicBasePath}
                  view="topic"
                />
              }
            />
          </React.Fragment>
        ))}

        {/* Catch-all 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}