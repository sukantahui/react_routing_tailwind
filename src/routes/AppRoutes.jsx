import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NetworkRoadmap from '../components/study/network/NetworkRoadmap';
import NetworkModuleView from '../components/study/network/NetworkModuleView';
import NetworkTopicView from '../components/study/network/NetworkTopicView';
import IscTweleveTopicView from '../components/study/isc-12/IscTwelveTopicView';
import IscTweleveModuleView from '../components/study/isc-12/IscTwelveModuleView';
import IscTweleveRoadmap from '../components/study/isc-12/IscTwelveRoadmap';


// Public components (lazy)
const Home = lazy(() => import('./HomeComponent/Home'));
const Certificate = lazy(() => import('./certificates/Certificate'));
const Login = lazy(() => import('../components/Login'));
const QRCodeGenerator = lazy(() => import('../common/QRCodeGenerator'));
const LinkedListVisualizer = lazy(() => import('../common/LinkedListVisualizer'));
const DoublyLinkedListVisualizer = lazy(() => import('../common/DoublyLinkedListVisualizer'));
const BinaryTreeVisualizer = lazy(() => import('../common/BinaryTreeVisualizer'));
const AvlTreeVisualizer = lazy(() => import('../common/AvlTreeVisualizer'));

const Study = lazy(() => import('../components/study/Study'));
const ClassEleven = lazy(() => import('../components/study/class_11/ClassEleven'));
const ClassElevenWbb = lazy(() => import('../components/study/class_11/wbb/ClassElevenWbb'));
const ComputerApplicationWbbEleven = lazy(() => import('../components/study/class_11/wbb/computer_application/ComputerApplicationWbbEleven'));
const SemTwoComputerApplicationWbbEleven = lazy(() => import('../components/study/class_11/wbb/computer_application/semester2/SemTwoComputerApplicationWbbEleven'));
const DataStructureSemTwoComputerApplicationWbbEleven = lazy(() => import('../components/study/class_11/wbb/computer_application/semester2/chapters/DataStructureSemTwoComputerApplicationWbbEleven'));
const Bca = lazy(() => import('../components/study/bca/Bca'));
const JavaChapters = lazy(() => import('../components/GeneralSubjects/java/JavaChapters'));
const IntroductionToJava = lazy(() => import('../components/GeneralSubjects/java/IntroductionToJava'));
const TypingTest = lazy(() => import('../components/TypingTest'));
const TypingLearn = lazy(() => import('../components/typing-app/TypingLearn'));
const JavaScriptRoadmap = lazy(() => import('../components/study/javaScript/JavaScriptRoadmap'));
const JavaScriptModuleView = lazy(() => import('../components/study/javaScript/JavaScriptModuleView'));
const JavaScriptTopicView = lazy(() => import('../components/study/javaScript/JavaScriptTopicView'));
const Playground = lazy(() => import('../common/Playground'));
const PythonRoadmap = lazy(() => import('../components/study/python/PythonRoadmap'));
const PythonModuleView = lazy(() => import('../components/study/python/PythonModuleView'));
const PythonTopicView = lazy(() => import('../components/study/python/PythonTopicView'));
const PythonPlayground = lazy(() => import('../common/PythonPlayground'));
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
const IconResources = lazy(() => import('../components/IconResources'));
const VSCodeUltraExpertGuide = lazy(() => import('../components/VSCodeUltraExpertGuide'));
const ICSE9JavaRoadmap = lazy(() => import('../components/study/icse-java-9/ICSE9JavaRoadmap'));
const ICSE9JavaModuleView = lazy(() => import('../components/study/icse-java-9/ICSE9JavaModuleView'));
const ICSE9JavaTopicView = lazy(() => import('../components/study/icse-java-9/ICSE9JavaTopicView'));
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
const PlayWhiteBoard = lazy(() => import('../components/PlayWhiteBoard'));
const ComputerArchitectureRoadmap = lazy(() => import('../components/study/computer-architecture/ComputerArchitectureRoadmap'));
const ComputerArchitectureModuleView = lazy(() => import('../components/study/computer-architecture/ComputerArchitectureModuleView'));
const ComputerArchitectureTopicView = lazy(() => import('../components/study/computer-architecture/ComputerArchitectureTopicView'));
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
const JavaXRoadmap = lazy(() => import('../components/study/icse-java-x/JavaXRoadmap'));
const JavaXModuleView = lazy(() => import('../components/study/icse-java-x/JavaXModuleView'));
const JavaXTopicView = lazy(() => import('../components/study/icse-java-x/JavaXTopicView'));
const CertificateGenerator = lazy(() => import('../common/CertificateGenerator'));
const StudentAdmission = lazy(() => import('../components/StudentAdmission'));
const AddCourse = lazy(() => import('../components/AddCourse'));
const AddResult = lazy(() => import('../components/AddResult'));
const Subject = lazy(() => import('../components/Subject'));

// Admin / protected components (lazy)
const Admin = lazy(() => import('./Admin'));
const Bijoya = lazy(() => import('./Bijoya'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const AddStudent = lazy(() => import('../components/AddStudent'));

// 404 (can be lazy or normal)
const NotFound = lazy(() => import('./NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading page...</p>
        </div>
      </div>
    }>
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
          element={<Certificate />}   // Public? Originally commented out ProtectedRoute – kept as is
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

        <Route path="/qrcode" element={<QRCodeGenerator />} />
        <Route path="/LinkedListVisualizer" element={<LinkedListVisualizer />} />
        <Route path="/DoublyLinkedListVisualizer" element={<DoublyLinkedListVisualizer />} />
        <Route path="/BinaryTreeVisualizer" element={<BinaryTreeVisualizer />} />
        <Route path="/AvlTreeVisualizer" element={<AvlTreeVisualizer />} />

        <Route
          path="/certificate"
          element={
            <ProtectedRoute>
              <CertificateGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admission"
          element={
            <ProtectedRoute>
              <StudentAdmission />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <AddResult />
            </ProtectedRoute>
          }
        />

        {/* Master */}
        <Route path="/students/add" element={<AddStudent />} />

        <Route path="/subject" element={<Subject />} />

        {/* Public Study Routes */}
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

        <Route path="/javascript/roadmap" element={<JavaScriptRoadmap />} />
        <Route path="/javascript/module/:slug" element={<JavaScriptModuleView />} />
        <Route path="/javascript/topic/:moduleSlug/:topicIndex" element={<JavaScriptTopicView />} />

        <Route path="/play" element={<Playground />} />
        <Route path="/python-play" element={<PythonPlayground />} />

        <Route path="/python/roadmap" element={<PythonRoadmap />} />
        <Route path="/python/module/:slug" element={<PythonModuleView />} />
        <Route path="/python/topic/:moduleSlug/:topicIndex" element={<PythonTopicView />} />

        <Route path="/c-language/roadmap" element={<CRoadmap />} />
        <Route path="/c-language/module/:slug" element={<CModuleView />} />
        <Route path="/c-language/topic/:moduleSlug/:topicIndex" element={<CTopicView />} />

        <Route path="/tally/roadmap" element={<TallyRoadmap />} />
        <Route path="/tally/module/:slug" element={<TallyModuleView />} />
        <Route path="/tally/topic/:moduleSlug/:topicIndex" element={<TallyTopicView />} />

        <Route path="/excel/roadmap" element={<ExcelRoadmap />} />
        <Route path="/excel/module/:slug" element={<ExcelModuleView />} />
        <Route path="/excel/topic/:moduleSlug/:topicIndex" element={<ExcelTopicView />} />

        <Route path="/git/roadmap" element={<GitRoadmap />} />
        <Route path="/git/module/:slug" element={<GitModuleView />} />
        <Route path="/git/topic/:moduleSlug/:topicIndex" element={<GitTopicView />} />

        <Route path="/icse-java-ix/roadmap" element={<ICSE9JavaRoadmap />} />
        <Route path="/icse-java-ix/module/:slug" element={<ICSE9JavaModuleView />} />
        <Route path="/icse-java-ix/topic/:moduleSlug/:topicIndex" element={<ICSE9JavaTopicView />} />

        <Route path="/icse-java-x/roadmap" element={<JavaXRoadmap />} />
        <Route path="/icse-java-x/module/:slug" element={<JavaXModuleView />} />
        <Route path="/icse-java-x/topic/:moduleSlug/:topicIndex" element={<JavaXTopicView />} />

        <Route path="/java-core/roadmap" element={<JavaRoadmap />} />
        <Route path="/java-core/module/:slug" element={<JavaModuleView />} />
        <Route path="/java-core/topic/:moduleSlug/:topicIndex" element={<JavaTopicView />} />

        <Route path="/general/roadmap" element={<GeneralRoadmap />} />
        <Route path="/general/module/:slug" element={<GeneralModuleView />} />
        <Route path="/general/topic/:moduleSlug/:topicIndex" element={<GeneralTopicView />} />

        <Route path="/css/roadmap" element={<CssRoadmap />} />
        <Route path="/css/module/:slug" element={<CssModuleView />} />
        <Route path="/css/topic/:moduleSlug/:topicIndex" element={<CssTopicView />} />

        <Route path="/isc-11/roadmap" element={<IscElevenRoadmap />} />
        <Route path="/isc-11/module/:slug" element={<IscElevenModuleView />} />
        <Route path="/isc-11/topic/:moduleSlug/:topicIndex" element={<IscElevenTopicView />} />


        <Route path="/isc-12/roadmap" element={<IscTweleveRoadmap />} />
        <Route path="/isc-12/module/:slug" element={<IscTweleveModuleView />} />
        <Route path="/isc-12/topic/:moduleSlug/:topicIndex" element={<IscTweleveTopicView />} />

        <Route path="/computer-architecture/roadmap" element={<ComputerArchitectureRoadmap />} />
        <Route path="/computer-architecture/module/:slug" element={<ComputerArchitectureModuleView />} />
        <Route path="/computer-architecture/topic/:moduleSlug/:topicIndex" element={<ComputerArchitectureTopicView />} />

        <Route path="/unix/roadmap" element={<UnixRoadmap />} />
        <Route path="/unix/module/:slug" element={<UnixModuleView />} />
        <Route path="/unix/topic/:moduleSlug/:topicIndex" element={<UnixTopicView />} />

        <Route path="/react/roadmap" element={<ReactRoadmap />} />
        <Route path="/react/module/:slug" element={<ReactModuleView />} />
        <Route path="/react/topic/:moduleSlug/:topicIndex" element={<ReactTopicView />} />

        <Route path="/node/roadmap" element={<NodeRoadmap />} />
        <Route path="/node/module/:slug" element={<NodeModuleView />} />
        <Route path="/node/topic/:moduleSlug/:topicIndex" element={<NodeTopicView />} />

        <Route path="/java-web/roadmap" element={<JavaWebRoadmap />} />
        <Route path="/java-web/module/:slug" element={<JavaWebModuleView />} />
        <Route path="/java-web/topic/:moduleSlug/:topicIndex" element={<JavaWebTopicView />} />

        <Route path="/network/roadmap" element={<NetworkRoadmap />} />
        <Route path="/network/module/:slug" element={<NetworkModuleView />} />
        <Route path="/network/topic/:moduleSlug/:topicIndex" element={<NetworkTopicView />} />

        <Route path="/icons" element={<IconResources />} />
        <Route path="/vscode" element={<VSCodeUltraExpertGuide />} />
        <Route path="/whiteBoard" element={<PlayWhiteBoard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}