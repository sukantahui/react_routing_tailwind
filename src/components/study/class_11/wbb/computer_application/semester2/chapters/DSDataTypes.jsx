import React from "react";

const DSDataTypes = () => (
    <section className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-200 mb-3">১.৩ ডেটা স্ট্রাকচারে বিভিন্ন ডেটা টাইপের ভূমিকা:</h3>
        <p className="text-gray-300 leading-relaxed">ডেটা স্ট্রাকচারে বিভিন্ন ধরনের ডেটা টাইপের সংরক্ষণ থাকে, ডেটা স্ট্রাকচারের প্রোগ্রামের অনুযায়ী বিভিন্ন ধরনের ডেটা সংরক্ষণ করা যায়।</p>


        <div className="mt-3 space-y-3 text-gray-300">
            <div>
                <h4 className="font-semibold">১. পূর্ণসংখ্যার পরিমাণ (Integer Number):</h4>
                <p className="leading-relaxed">যে কোনো গণিতের সংখ্যায় যে কোনো গণনাকৃত সংখ্যা থাকে বা পূর্ণসংখ্যা বা ইন্টিজার নাম্বার এর জায়গায় প্রোগ্রামে ব্যবহৃত হতে পারে। উদাহরণ — 10, 25, –50, 1050 ইত্যাদি। 0 ও পূর্ণসংখ্যার অন্তর্ভুক্ত হতে পারে।</p>
            </div>


            <div>
                <h4 className="font-semibold">ফ্লোট বা দশমিকযুক্ত সংখ্যা (Floating Point Number):</h4>
                <p className="leading-relaxed">যে সকল গণিতিক সংখ্যায় দশমিক থাকে তাকে দশমিকযুক্ত সংখ্যা বা ফ্লোট নাম্বার বলে। যেমন— 45.02, 5.8, -1.2, 40.25 ইত্যাদি সংখ্যা ফ্লোট বা দশমিকযুক্ত সংখ্যা হতে পারে।</p>
            </div>


            <div>
                <h4 className="font-semibold">ক্যারেক্টার (Character):</h4>
                <p className="leading-relaxed">ইংরেজি বর্ণমালা (A থেকে Z) সমন্বয়ে গঠিত অথবা সংখ্যা (0–9) সমন্বয়ে গঠিত ডেটাকেই Character ডেটা বলে। এছাড়াও বিশেষ অক্ষর যেমন— @, #, $, % ইত্যাদি ব্যবহার হতে পারে। উদাহরণ— Rajib Das, University, Mango, A001, WB19G7124 ইত্যাদি।</p>
            </div>


            <div>
                <h4 className="font-semibold">যুক্তিগত বা লজিক্যাল ডেটা (Logical Data):</h4>
                <p className="leading-relaxed">লজিক্যাল ডেটা হলো যে ডেটা প্রদত্ত দুটি অবস্থার মধ্যে হতে পারে। যেমন— সত্য-মিথ্যা (True–False), হ্যাঁ–না (Yes–No), ছোট–বড় (Small–Large), অন–অফ (ON–OFF) ইত্যাদি।</p>
            </div>


            <div>
                <h4 className="font-semibold">স্ট্রিং (String):</h4>
                <p className="leading-relaxed">স্ট্রিং হলো বর্ণ ও সংখ্যা (যেমন “Computer”) যা একক ডেটা টাইপ হিসেবে বিবেচিত হয়। স্ট্রিং ডেটা হতে পারে যেমন— “Rajib”, “A007”, “S200” ইত্যাদি।</p>
            </div>
        </div>
    </section>
);

export default DSDataTypes;
