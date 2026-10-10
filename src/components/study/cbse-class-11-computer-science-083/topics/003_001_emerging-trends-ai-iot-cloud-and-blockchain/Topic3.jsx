import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic3Questions } from "./topic3_files/topic3_questions";

export default function Topic3() {
  // Interactive NLP Sandbox State
  const [inputText, setInputText] = useState(
    "Artificial Intelligence and Natural Language Processing are transforming modern chatbots into amazing smart assistants!"
  );

  // Stop words set
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "in", "on", "at", "to", "for",
    "with", "is", "was", "are", "were", "it", "this", "that", "of", "into"
  ]);

  // Sentiment Lexicons
  const positiveWords = ["amazing", "smart", "transforming", "great", "excellent", "superb", "helpful", "good"];
  const negativeWords = ["bad", "terrible", "awful", "slow", "broken", "worst", "useless", "confusing"];

  // Processing text
  const rawTokens = inputText
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const filteredTokens = rawTokens.filter((w) => !stopWords.has(w));

  const positiveMatches = filteredTokens.filter((w) => positiveWords.includes(w));
  const negativeMatches = filteredTokens.filter((w) => negativeWords.includes(w));
  const totalSentimentCount = positiveMatches.length + negativeMatches.length;
  
  let sentimentScore = 0;
  if (totalSentimentCount > 0) {
    sentimentScore = Number(((positiveMatches.length - negativeMatches.length) / totalSentimentCount).toFixed(2));
  }
  const sentimentLabel =
    sentimentScore > 0.15 ? "Positive" : sentimentScore < -0.15 ? "Negative" : "Neutral";

  // Interactive Chatbot Simulator
  const [chatLog, setChatLog] = useState([
    { sender: "bot", text: "Hello! I am your AI Virtual Assistant. How can I help you today?" }
  ]);
  const [userChatInput, setUserChatInput] = useState("");

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;

    const userMsg = userChatInput;
    const lower = userMsg.toLowerCase();
    let botReply = "I am a simple NLP bot. You can ask about 'admission', 'syllabus', 'fees', or say 'hi'!";
    let detectedIntent = "Unknown";
    let detectedEntity = "None";

    if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
      botReply = "Greetings! How can I assist you with your academic studies?";
      detectedIntent = "Greeting";
    } else if (lower.includes("admission") || lower.includes("apply")) {
      botReply = "Class 11 Admissions for Computer Science are open online until June 30th.";
      detectedIntent = "Inquire_Admission";
      detectedEntity = "Class 11";
    } else if (lower.includes("syllabus") || lower.includes("course") || lower.includes("topics")) {
      botReply = "The CBSE 083 syllabus covers Python Programming, Computer Systems, Boolean Logic, Emerging Trends, and Societal Impacts.";
      detectedIntent = "Inquire_Syllabus";
      detectedEntity = "CBSE 083";
    } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("payment")) {
      botReply = "The academic fee structure is available on the school portal under student accounts.";
      detectedIntent = "Inquire_Fees";
    } else if (lower.includes("bye") || lower.includes("thank")) {
      botReply = "You're very welcome! Have a fantastic learning day ahead!";
      detectedIntent = "Farewell";
    }

    setChatLog((prev) => [
      ...prev,
      { sender: "user", text: userMsg },
      { sender: "bot", text: botReply, intent: detectedIntent, entity: detectedEntity }
    ]);
    setUserChatInput("");
  };

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic3Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 3: Natural Language Processing (NLP)
          </h1>
          <p className="text-indigo-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Discover how computers bridge human linguistics and digital computation. Master 
            <strong> Tokenization</strong>, <strong>Stop-Word Removal</strong>, <strong>Stemming vs Lemmatization</strong>, 
            <strong> Speech Recognition</strong>, <strong>Sentiment Analysis</strong>, and <strong>Conversational Chatbots</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Introduction to NLP */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">01</span>
            What is Natural Language Processing (NLP)?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
            <strong>Natural Language Processing (NLP)</strong> is a sub-discipline of Artificial Intelligence and computational linguistics that empowers computer systems to understand, interpret, synthesize, and generate human languages (e.g., English, Hindi, Spanish, Bengali).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="bg-slate-950/70 border border-indigo-500/30 p-5 rounded-xl">
              <h3 className="text-indigo-300 font-bold text-base mb-2">1. Natural Language Understanding (NLU)</h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Focuses on parsing raw, ambiguous human text/speech into structured semantic representations. It determines user <strong>intent</strong>, extracts key <strong>entities</strong>, and resolves linguistic ambiguity.
              </p>
            </div>
            <div className="bg-slate-950/70 border border-blue-500/30 p-5 rounded-xl">
              <h3 className="text-blue-300 font-bold text-base mb-2">2. Natural Language Generation (NLG)</h3>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Focuses on taking structured machine data, database queries, or logical reasoning and converting it into grammatically fluent, coherent human text or speech responses.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The NLP Pipeline */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">02</span>
            The Standard NLP Processing Pipeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-indigo-400 font-bold text-xs uppercase mb-1">Step 1</div>
              <h4 className="text-white font-semibold text-sm mb-1">Tokenization</h4>
              <p className="text-slate-400 text-xs">
                Splitting continuous paragraphs into sentences and words (tokens).
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-indigo-400 font-bold text-xs uppercase mb-1">Step 2</div>
              <h4 className="text-white font-semibold text-sm mb-1">Stop-Word Removal</h4>
              <p className="text-slate-400 text-xs">
                Filtering out high-frequency glue words (is, the, at, with) that lack unique meaning.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-indigo-400 font-bold text-xs uppercase mb-1">Step 3</div>
              <h4 className="text-white font-semibold text-sm mb-1">Stemming / Lemmatizing</h4>
              <p className="text-slate-400 text-xs">
                Normalizing words to root forms (e.g., "studying" &rarr; "study").
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
              <div className="text-indigo-400 font-bold text-xs uppercase mb-1">Step 4</div>
              <h4 className="text-white font-semibold text-sm mb-1">POS & NER Extraction</h4>
              <p className="text-slate-400 text-xs">
                Tagging grammatical parts (Noun, Verb) and identifying named entities (People, Places).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive NLP Laboratory & Sentiment Visualizer */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">03</span>
            Interactive NLP Pipeline & Sentiment Analysis Lab
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mb-4">
            Type any sentence below to watch real-time Tokenization, Stop-Word filtering, and Lexicon Polarity Sentiment calculation.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Input Text String:
            </label>
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tokens */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-indigo-400 uppercase mb-2">
                1. Raw Tokens ({rawTokens.length})
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                {rawTokens.map((t, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Filtered Tokens */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-blue-400 uppercase mb-2">
                2. Stop-Words Removed ({filteredTokens.length})
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                {filteredTokens.map((t, idx) => (
                  <span key={idx} className="bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 px-2 py-0.5 rounded text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Sentiment Meter */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-teal-400 uppercase mb-2">
                  3. Sentiment Polarity
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs text-slate-400">Score:</span>
                  <span className="text-lg font-mono font-bold text-white">{sentimentScore}</span>
                </div>
                <div className={`p-3 rounded-lg text-center font-bold text-sm border ${
                  sentimentLabel === "Positive"
                    ? "bg-emerald-950/50 border-emerald-500/60 text-emerald-300"
                    : sentimentLabel === "Negative"
                    ? "bg-red-950/50 border-red-500/60 text-red-300"
                    : "bg-slate-800 border-slate-700 text-slate-300"
                }`}>
                  {sentimentLabel === "Positive" && "😊 POSITIVE SENTIMENT"}
                  {sentimentLabel === "Negative" && "😡 NEGATIVE SENTIMENT"}
                  {sentimentLabel === "Neutral" && "😐 NEUTRAL SENTIMENT"}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Positive words: {positiveMatches.length} | Negative words: {negativeMatches.length}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Virtual Assistant / Chatbot */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">04</span>
            Live Academic Chatbot (Intent & Entity Extraction)
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Try interacting with this NLP rule-and-intent classifier chatbot. Ask about <em>"admission"</em>, <em>"syllabus"</em>, <em>"fee"</em>, or say <em>"hello"</em>.
          </p>

          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
            {/* Chat Messages */}
            <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-950/80">
              {chatLog.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl text-xs md:text-sm ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
                    }`}
                  >
                    <div>{msg.text}</div>
                    {msg.intent && (
                      <div className="mt-1 pt-1 border-t border-slate-700/60 text-[10px] text-indigo-300 flex gap-2">
                        <span>🎯 Intent: <strong>{msg.intent}</strong></span>
                        {msg.entity && <span>🏷️ Entity: <strong>{msg.entity}</strong></span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChat} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                placeholder="Type your question here (e.g., 'What is the CBSE 083 syllabus?')..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs md:text-sm rounded-lg transition"
              >
                Send
              </button>
            </form>
          </div>
        </section>

        {/* Section 5: Real-World Applications & Indian Context */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">05</span>
            Real-World NLP Applications & National Missions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-indigo-400 font-bold mb-2">Automatic Speech Recognition (ASR)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Smart voice assistants (Siri, Alexa, Google Assistant) process acoustic audio waveforms into phonemes and language tokens for hands-free control.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-blue-400 font-bold mb-2">Project BHASHINI (Govt of India)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                India's national language translation mission utilizing AI to deliver public digital services and real-time voice translation across 22 scheduled Indian languages.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-teal-400 font-bold mb-2">Automated Grammar & Spam Filters</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Tools like Grammarly and Gmail use contextual N-grams and Transformer attention to detect spelling, stylistic mistakes, and phishing spam emails.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">06</span>
            Python Companion Simulation: NLP Sentiment & Chatbot Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Explore the pure Python code executing tokenization, stop-word elimination, sentiment scoring, and intent classification.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic3_files/nlp_sentiment_engine.py"
            title="nlp_sentiment_engine.py"
          />
        </section>

        {/* Section 7: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">07</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic3_files/topic3_note.txt"
            title="Topic 3 Revision Notes"
          />
        </section>

        {/* Section 8: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm">08</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your conceptual knowledge of NLP pipelines, NLU, NLG, Speech Recognition, and Chatbots.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-indigo-400 my-1">
                {calculateScore()} / {topic3Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic3Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic3Questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{qIndex + 1}. {q.question}
                    </span>
                    {showResults && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition border ${
                            isSelected
                              ? "bg-indigo-600/30 border-indigo-500 text-white font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-indigo-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-blue-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 9: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 text-sm">09</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "Why is natural human language so difficult for computers to parse?",
                a: "Human language is naturally ambiguous, metaphorical, context-dependent, and full of cultural idioms, sarcasm, and homonyms (words with identical spellings but different meanings like 'bat' or 'bank')."
              },
              {
                q: "What is the difference between NLU and NLG?",
                a: "Natural Language Understanding (NLU) takes unstructured human language and extracts meaning/intent. Natural Language Generation (NLG) takes structured data and generates coherent human sentences."
              },
              {
                q: "How does Lemmatization differ from Stemming in NLP?",
                a: "Stemming chops off word prefixes/suffixes using crude heuristic rules (often creating non-words like 'car' for 'caring'). Lemmatization uses a complete vocabulary and morphological dictionary analysis to return the valid root base word ('lemma')."
              },
              {
                q: "What is Project Bhashini launched by the Ministry of Electronics and IT (MeitY)?",
                a: "Project Bhashini is an Indian government AI mission that develops open-source NLP and voice-translation tools to empower citizens to access digital services in their native Indian languages."
              }
            ]}
          />
        </section>

        {/* Section 10: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Natural Language Processing is the crucial bridge connecting human voice and thought to binary machine intelligence. Focus on understanding the sequential stages of the NLP pipeline: tokenization, stop-word elimination, stemming vs lemmatization, and how intent & entity recognition power smart assistants."
        />
      </div>
    </div>
  );
}
