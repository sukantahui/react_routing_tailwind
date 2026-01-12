import React from "react";
import Whiteboard from "../../../../../common/Whiteboard";

export default function Topic14() {
    return (
        <div className="space-y-10">            
            {/* keep it */}
            <section className="bg-slate-900 text-slate-200 p-8 rounded-2xl shadow-xl space-y-10">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <p className="text-sky-300 font-semibold">Explore more:</p>
                    <a
                        href="https://docs.google.com/document/d/1FPLcUZAp8LJLEPZ3CCHK7ZJsI0wSTsbcl3sxFl4WzJo/edit?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                    >
                        Get your Document
                    </a>
                </div>
            </section> 
        </div>
    );
}
