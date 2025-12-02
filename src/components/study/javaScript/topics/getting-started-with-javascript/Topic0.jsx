import React from "react";

export default function Topic0() {
    return (
        <div className="space-y-4">

            <h2 className="text-xl font-semibold text-sky-300">
                What is JavaScript and Where It Runs?
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
                What is JavaScript and Where Does It Run? (Perfect Definition)

                JavaScript is a high-level, versatile, and lightweight programming language used to make web pages interactive, dynamic, and intelligent.
                It is one of the core technologies of the web—along with HTML (structure) and CSS (styling)—and is supported by all modern browsers.

                JavaScript was originally created to run inside web browsers, allowing developers to:
                <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
                    <li>Respond to user actions (clicks, typing, scrolling)</li>
                    <li>Update content on the page without reloading</li>
                    <li>Validate forms</li>
                    <li>Display animations, interactive UI, and dynamic effects</li>
                </ul>
            </p>
            <p>Over time, JavaScript evolved into a full-fledged general-purpose language, meaning it can now run in many environments other than browsers.</p>

            <h3 className="text-lg font-semibold text-slate-200">Where JavaScript Runs</h3>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
                <li><strong>Browsers:</strong> Chrome, Firefox, Edge, Safari</li>
                <li><strong>Servers:</strong> Using Node.js</li>
                <li><strong>Developer Tools:</strong> CLI tools like npm, vite, eslint</li>
                <li><strong>Mobile Apps:</strong> React Native</li>
                <li><strong>Desktop Apps:</strong> Electron (VS Code, Discord)</li>
                <li><strong>IoT:</strong> Microcontrollers with JS runtimes</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-200">Example</h3>

            <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-xs md:text-sm whitespace-pre-wrap">
                {`console.log("JavaScript is everywhere!");`}
            </pre>

            <p className="text-slate-400 text-sm">
                This line prints a message in the browser console or Node.js terminal.
            </p>

        </div>
    );
}
