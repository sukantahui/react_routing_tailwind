import React, { useState } from "react";
import CodeBlock from "../../common/CodeBlock"; // optional

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export default function ShortQuestionPracticeEngine({ data }) {

    const [showAns, setShowAns] = useState([]);
    const [topic, setTopic] = useState("all");
    const [limit, setLimit] = useState(50);
    const [started, setStarted] = useState(false);
    const [sessionQ, setSessionQ] = useState([]);

    if (!data || !data.questions)
        return <p className="p-4 text-red-400">No questions found.</p>;

    const uniqueTopics = [...new Set(data.questions.map(q => q.topic))];

    const filteredByTopic =
        topic === "all"
            ? data.questions
            : data.questions.filter(q => q.topic === topic);

    function toggle(id) {
        setShowAns(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-200 p-6">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    {data.subjectLogo && (
                        <div className="p-3 rounded-2xl bg-zinc-900 ring-1 ring-sky-500/40">
                            <img
                                src={data.subjectLogo.path}
                                alt={data.subjectLogo.alt}
                                className="w-12 h-12 object-contain"
                            />
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-sky-400">
                            {data.topic}
                        </h1>
                        <p className="text-sm text-zinc-400">
                            {data.subject} • Class {data.class} • {data.board}
                        </p>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl mb-8 flex flex-wrap gap-4 justify-between">

                    <select
                        value={topic}
                        onChange={e => { setTopic(e.target.value); setStarted(false); }}
                        className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
                    >
                        <option value="all">All Topics</option>
                        {uniqueTopics.map((t, i) =>
                            <option key={i} value={t}>{t}</option>
                        )}
                    </select>

                    <select
                        value={limit}
                        onChange={e => {
                            const val = e.target.value;
                            setLimit(val === "all" ? "all" : Number(val));
                            setStarted(false);
                        }}
                        className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
                    >
                        <option value="all">All Questions</option>
                        {[5, 10, 20, 30, 50].map(n =>
                            <option key={n} value={n}>{n}</option>
                        )}
                    </select>

                    <button
                        onClick={() => {
                            setShowAns([]);
                            const pool = shuffleArray(filteredByTopic);
                            setSessionQ(limit === "all" ? pool : pool.slice(0, limit));
                            setStarted(true);
                        }}
                        className="px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg"
                    >
                        Start Practice
                    </button>
                </div>

                {/* Questions */}
                {started && sessionQ.map((q, index) => (
                    <div key={q.id} className="bg-zinc-900/80 border border-zinc-800 p-5 mb-6 rounded-2xl">

                        <div className="flex justify-between mb-2">
                            <p className="font-semibold">
                                Q{index + 1}. {q.question}
                            </p>
                            <span className="text-xs bg-sky-900 px-2 py-1 rounded">
                                {q.topic}
                            </span>
                        </div>

                        {/* Optional code block */}
                        {q.code && <CodeBlock code={q.code} />}

                        <button
                            onClick={() => toggle(q.id)}
                            className="mt-3 text-sky-400 text-sm underline"
                        >
                            {showAns.includes(q.id) ? "Hide Answer" : "Show Answer"}
                        </button>

                        {showAns.includes(q.id) && (
                            <div className="mt-3 bg-slate-900 p-4 rounded-xl text-sm">
                                {q.answer && <p>{q.answer}</p>}

                                {q.output && (
                                    <>
                                        <p className="mt-2 text-emerald-300">Output:</p>
                                        <pre className="bg-black p-2 rounded">{q.output}</pre>
                                    </>
                                )}

                                {q.explanation && (
                                    <p className="mt-2 text-zinc-300">
                                        <b>Explanation:</b> {q.explanation}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {!started && (
                    <p className="text-center text-zinc-500 mt-10">
                        Select topic and click <b>Start Practice</b>
                    </p>
                )}

            </div>
        </div>
    );
}
