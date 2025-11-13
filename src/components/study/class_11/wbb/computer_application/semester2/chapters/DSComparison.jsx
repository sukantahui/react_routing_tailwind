import React from "react";

const DSComparison = () => (
    <section className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-300 mb-3">১.৫ লিনিয়ার ও নন-লিনিয়ার ডেটা স্ট্রাকচারের পার্থক্য:</h3>


        <div className="overflow-x-auto">
            <table className="w-full text-gray-300 border border-gray-700">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-3 border border-gray-600 text-left">লিনিয়ার ডেটা স্ট্রাকচার</th>
                        <th className="p-3 border border-gray-600 text-left">নন–লিনিয়ার ডেটা স্ট্রাকচার</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3 border border-gray-700">ডেটা উপাদানগুলি ক্রমানুসারে থাকে</td>
                        <td className="p-3 border border-gray-700">ডেটা উপাদানগুলি ক্রমানুসারে থাকে না (এলোমেলো বা হায়ারার্কিক্যাল)</td>
                    </tr>
                    <tr>
                        <td className="p-3 border border-gray-700">Access সাধারণত সহজ</td>
                        <td className="p-3 border border-gray-700">Access করা জটিল হতে পারে</td>
                    </tr>
                    <tr>
                        <td className="p-3 border border-gray-700">উদাহরণ: Array, Stack, Queue, Linked List</td>
                        <td className="p-3 border border-gray-700">উদাহরণ: Tree, Graph</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
);
export default DSComparison;
