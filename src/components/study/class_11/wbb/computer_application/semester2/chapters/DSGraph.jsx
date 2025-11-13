import React from "react";

const DSGraph = () => (
    <section className="mb-8">
        <h4 className="text-xl font-semibold text-blue-200 mb-3">২. গ্রাফ (Graph):</h4>
        <p className="text-gray-300 leading-relaxed">গ্রাফ হলো নোড (Vertex) ও নোড সংযোগকারী রেখা (Edge) দ্বারা গঠিত একটি স্ট্রাকচার। উদাহরণ: V = A,B,C,D,E ; E = (AB),(AD),(CD),(BC),(CE)</p>


        <div className="mt-3 bg-gray-700 p-3 rounded">
            <p className="text-gray-200">Picture Description: Graph Diagram</p>
            <ul className="list-disc pl-6 text-gray-300">
                <li>Nodes: A, B, C, D, E</li>
                <li>Edges: AB, AD, BC, CD, CE</li>
            </ul>
        </div>


        <p className="text-gray-300 mt-3">Graph (G) = (V, E) where V = set of vertices, E = set of edges connecting vertices in V.</p>
    </section>
);
export default DSGraph;
