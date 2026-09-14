import React, { useEffect, useState, Suspense, lazy } from "react";
// import AppRoutes from "./routes/AppRoutes";
import AppRoutes from "./routes/AppRoutes-master-roadmap";
import NavBar from "./routes/NavBar";
import AuthNavBar from "./routes/AuthNavBar";
import { BookA } from "lucide-react";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";

const SelectionWordLookup = lazy(() => import("./common/SelectionWordLookup"));
const WordDictionary = lazy(() => import("./common/WordDictionary"));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dictionaryModalWord, setDictionaryModalWord] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authChanged", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleOpenDict = (e) => {
      if (e.detail?.word) {
        setDictionaryModalWord(e.detail.word);
      }
    };
    window.addEventListener("open-study-dictionary", handleOpenDict);
    return () => window.removeEventListener("open-study-dictionary", handleOpenDict);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-sky-500/30 selection:text-sky-300 overflow-x-clip">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        {isLoggedIn ? (
          <AuthNavBar setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <NavBar />
        )}
      </div>

      {/* Main Content */}
      <main className="pt-[106px] lg:pt-14">
        <AppRoutes setIsLoggedIn={setIsLoggedIn} />
      </main>

      {/* Global Floating Text Selection Word Lookup for entire application */}
      <Suspense fallback={null}>
        <SelectionWordLookup
          onOpenDictionaryModal={(word) => setDictionaryModalWord(word)}
        />
      </Suspense>

      {/* Global Word Dictionary & External Websites Modal */}
      {dictionaryModalWord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-sky-500/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 sticky top-0 bg-slate-900 z-10">
              <div className="flex items-center gap-2.5">
                <BookA size={22} className="text-sky-400" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">English Vocabulary &amp; Word Meaning</h3>
                  <p className="text-xs text-slate-400">Instant definitions, phonetics, audio, &amp; external reference dictionaries</p>
                </div>
              </div>
              <button
                onClick={() => setDictionaryModalWord(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-base font-bold"
              >
                ✕
              </button>
            </div>

            <Suspense fallback={
              <div className="py-12 text-center text-slate-400 text-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400 mx-auto mb-3" />
                Loading Dictionary...
              </div>
            }>
              <WordDictionary initialWord={dictionaryModalWord} showTitle={false} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}