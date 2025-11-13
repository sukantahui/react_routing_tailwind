import React from "react";

const DSLinear = () => (
    <section className="mb-8">
        <h4 className="text-xl font-semibold text-blue-200 mb-3">A. লিনিয়ার ডেটা স্ট্রাকচার (Linear Data Structure):</h4>
        <p className="text-gray-300 leading-relaxed mb-3">লিনিয়ার ডেটা স্ট্রাকচার হলো এক ধরনের ডেটা স্ট্রাকচার যেখানে উপাদানগুলি একটির পর একটি সোজাসুজি সাজানো থাকে। লিনিয়ার ডেটা স্ট্রাকচারে প্রথম উপাদান থেকে পরবর্তী উপাদানগুলোর সাথে সরাসরি সম্পর্ক থাকে।</p>


        <p className="text-gray-300 mb-3">ব্যবহারযোগ্য লিনিয়ার ডেটা স্ট্রাকচারের মধ্যে রয়েছে— Array, Stack, Queue এবং Linked List।</p>


        <h5 className="font-semibold text-blue-200 mb-2">১.৪.১ লিনিয়ার ডেটা স্ট্রাকচারের বৈশিষ্ট্য:</h5>
        <ol className="list-decimal pl-6 text-gray-300 space-y-1">
            <li>ডেটা উপাদানগুলি একের পর এক ক্রমানুসারে সাজানো থাকে।</li>
            <li>উপাদানগুলির মধ্যে সরল ও সিরিয়াল যুক্তি থাকে।</li>
            <li>অ্যাক্সেস করা সহজ।</li>
            <li>সাধারণত মেমরি ব্যবহার কম থাকে।</li>
            <li>মেমরি–বান্ধব নয় (কিছু ক্ষেত্রে)।</li>
            <li>প্রাথমিক প্রোগ্রাম প্রস্তুতিতে সহায়তা করে।</li>
            <li>উপাদান সংখ্যা বাড়ানো/কমানো সহজ।</li>
            <li>সর্বাধিক দ্রুত কাজ করা যায়।</li>
        </ol>
    </section>
);

export default DSLinear;
