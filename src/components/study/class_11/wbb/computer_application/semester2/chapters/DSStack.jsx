import React from "react";

const DSStack = () => (
    <section className="mb-8">
        <h4 className="text-xl font-semibold text-blue-200 mb-3">স্ট্যাক (Stack):</h4>
        <p className="text-gray-300 leading-relaxed">স্ট্যাক হল এক ধরনের লিনিয়ার ডেটা স্ট্রাকচার। স্ট্যাকটি এমন একটি স্থান যেখানে ডেটা সংগ্রহ করা হয় এবং সেই সংগ্রহিত ডেটাটি আমরা ব্যবহার করতে পারি। এই ব্যবস্থাটি Last in First Out (LIFO) নামে পরিচিত।</p>


        <p className="text-gray-300">স্ট্যাকের অপারেশন: <b>Push</b> (অন্তর্ভুক্ত করা), <b>Pop</b> (অপসারণ)।</p>


        <div className="mt-3 bg-gray-700 p-3 rounded">
            <p className="text-gray-200">Picture Description: Stack Diagram</p>
            <ul className="list-disc pl-6 text-gray-300">
                <li>A vertical stack of blocks labeled A, B, C</li>
                <li>Left arrow labeled Push to add C</li>
                <li>Right arrow labeled Pop to remove C</li>
                <li>Top of stack labeled Top</li>
            </ul>
        </div>
    </section>
);

export default DSStack;
