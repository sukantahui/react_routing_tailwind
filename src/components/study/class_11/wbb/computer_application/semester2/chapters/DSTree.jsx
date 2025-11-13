import React from "react";

const DSTree = () => (
    <section className="mb-8">
        <h4 className="text-xl font-semibold text-blue-200 mb-3">১. ট্রি (Tree):</h4>
        <p className="text-gray-300 leading-relaxed">ট্রি হল একটি হায়ারার্কিক্যাল ডেটা স্ট্রাকচার। প্রথম নোডকে Root বলা হয়; নীচের গাছের শাখাগুলো Child node।</p>


        <div className="mt-3 bg-gray-700 p-3 rounded">
            <p className="text-gray-200">Picture Description: Tree Diagram</p>
            <ul className="list-disc pl-6 text-gray-300">
                <li>Top node labeled A (Root)</li>
                <li>Below A: B and C (Child nodes)</li>
                <li>Under B: D and E; Under C: F and G</li>
            </ul>
        </div>


        <p className="text-gray-300 mt-3">প্রতিটি নোডে সর্বাধিক দুটি চাইল্ড নোড থাকতে পারে (Left Child, Right Child) — (Note: this describes a binary tree). ট্রি বিভিন্ন সার্চিং/সোর্টিং ক্ষেত্রে ব্যবহৃত হয়।</p>
    </section>
);
export default DSTree;
