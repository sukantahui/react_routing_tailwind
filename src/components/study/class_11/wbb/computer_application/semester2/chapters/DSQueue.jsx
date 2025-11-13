import React from "react";

const DSQueue = () => (
    <section className="mb-8">
        <h4 className="text-xl font-semibold text-blue-200 mb-3">কিউ (Queue):</h4>
        <p className="text-gray-300 leading-relaxed">কিউ হল স্ট্যাকের মতো ডেটা সংরক্ষণ একপ্রকার পদ্ধতি এবং এক ধরনের লিনিয়ার ডেটা স্ট্রাকচার। কিউ-এ নতুন ডেটা যোগ করা হয় Tail-এ এবং ডেটা গ্রহণ করা হয় Head থেকে। এটি First In First Out (FIFO) পদ্ধতি।</p>


        <div className="mt-3 bg-gray-700 p-3 rounded">
            <p className="text-gray-200">Picture Description: Queue Image</p>
            <ul className="list-disc pl-6 text-gray-300">
                <li>People standing one behind another</li>
                <li>First person labeled Head</li>
                <li>Last person labeled Tail</li>
            </ul>
        </div>
    </section>
);

export default DSQueue;
