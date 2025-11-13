import React from "react";

const DSArray = () => (
    <section className="mb-8">
        <h4 className="text-xl font-semibold text-blue-200 mb-3">অ্যারে (Array):</h4>
        <p className="text-gray-300 leading-relaxed">অ্যারে হলো উপাদানগুলিকে একই শ্রেণীবদ্ধ সাজানো। অ্যারে সাধারণত দু’ধরনের হতে পারে — লিনিয়ার অ্যারে এবং নন-লিনিয়ার অ্যারে।</p>


        <h5 className="font-semibold text-blue-200 mt-3 mb-2">অ্যারের বৈশিষ্ট্য:</h5>
        <ol className="list-decimal pl-6 text-gray-300 space-y-1">
        <li>Elements একই ধরনের হতে হবে (Homogeneous)</li>
        <li>একটি নির্দিষ্ট Length থাকে (e.g., 10, 20...)</li>
        <li>Indexing শূন্য থেকে শুরু হয় (0..n-1)</li>
        <li>মেমোরিতে পরপর সংরক্ষিত থাকে (contiguous)</li>
        </ol>


        <h5 className="font-semibold text-blue-200 mt-3 mb-2">অ্যারের প্রকাশের পদ্ধতি:</h5>
        <ul className="list-disc pl-6 text-gray-300">
        <li>Subscript notation: A₁, A₂, A₃ … Aₙ</li>
        <li>Function-like: A(1), A(2), ... (FORTRAN)</li>
        <li>Bracket notation: A[1], A[2], ... (C, Java, etc.)</li>
        </ul>


        <p className="text-gray-300 mt-3">লেংথ নির্ণয়: <code className="bg-gray-700 px-2 py-1 rounded">Length = UB - LB + 1</code></p>


        <div className="mt-3 text-gray-300 whitespace-pre-line">{`উদাহরণ (চিত্র) :
            LB UB
            ┌───┬───┬───┬───┬───┬───┬───┐
            │11 │12 │13 │14 │15 │ │ │
            └───┴───┴───┴───┴───┴───┴───┘
            0 1 2 3 4 5 6
            এখানে UB = 4, LB = 0 => L = 4 - 0 + 1 = 5
        `}
        </div>
    </section>
);

export default DSArray;
