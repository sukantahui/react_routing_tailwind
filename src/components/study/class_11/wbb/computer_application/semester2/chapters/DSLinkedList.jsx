import React from "react";

const DSLinkedList = () => (
    <section className="mb-8">
    <h4 className="text-xl font-semibold text-blue-200 mb-3">লিংকড লিস্ট (Linked List):</h4>
    <p className="text-gray-300 leading-relaxed">লিংকড লিস্ট হল এক ধরনের সংরক্ষণ ও তালিকা করার পদ্ধতি। প্রতিটি একক উপাদানকে নোড বলা হয়; প্রতিটি নোডে ডেটা ও পরবর্তী নোডের অ্যাড্রেস থাকে। এটি ডাইনামিক মেমোরি ব্যবহারে উপকারী।</p>


    <div className="mt-3 bg-gray-700 p-3 rounded">
        <p className="text-gray-200">Picture Description: Linked List Diagram</p>
        <ul className="list-disc pl-6 text-gray-300">
            <li>Series of boxes connected by arrows</li>
            <li>Each box: left = information, right = next pointer</li>
            <li>First box labeled Start</li>
            <li>Last pointer shows Null</li>
        </ul>
    </div>


    <p className="text-gray-300 mt-3">লিংকড লিস্টে START নামক একটি List Pointer Variable থাকে যা প্রথম নোডের Address নির্দেশ করে।</p>
    </section>
);
export default DSLinkedList;
