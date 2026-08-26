// src/components/study/java-core/file-handling/Topic38.jsx
// Topic 38: BufferedInputStream & BufferedOutputStream
// React 19 – CLASS-BASED component
// Tailwind CSS – ZERO config, ZERO plugins

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

/* =========================================================
   Inline Scoped Animations (Zero Config)
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic38 extends Component {
    constructor(props) {
        super(props);
        this.state = { mounted: false };
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    render() {
        const reveal = this.state.mounted
            ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
            : "opacity-0";

        const card =
            "rounded-xl border border-slate-200 dark:border-slate-800 " +
            "bg-white/80 dark:bg-slate-900/70 p-6 shadow-sm " +
            "transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

        return (
            <div className="space-y-28 leading-relaxed text-slate-700 dark:text-slate-300">
                <style>{animationStyles}</style>

                {/* =====================================================
            HEADER
        ===================================================== */}
                <header className={`${reveal} space-y-4`}>
                    <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                        BufferedInputStream and BufferedOutputStream
                    </h2>

                    <p className="text-sm">
                        Reading or writing a binary file one byte at a time is
                        <strong> functionally correct</strong> but
                        <strong> performance-inefficient</strong>.
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Java solves this problem using buffered byte streams.
                    </p>
                </header>

                {/* =====================================================
            WHY BUFFERING IS NEEDED
        ===================================================== */}
                <section className={`${reveal} animation-delay-[100ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            Why Buffering is Needed
                        </h3>

                        <p className="text-sm mt-2">
                            Every read or write operation on a file involves
                            <strong> costly I/O interaction</strong> with the disk.
                        </p>

                        <ul className="list-disc list-inside text-sm mt-3 space-y-1">
                            <li>Reading byte-by-byte causes frequent disk access</li>
                            <li>Disk I/O is much slower than memory</li>
                            <li>Performance drops significantly for large files</li>
                        </ul>

                        <p className="text-sm mt-3">
                            <strong>Buffering</strong> reduces disk access by reading or
                            writing data in chunks.
                        </p>
                    </div>
                </section>

                {/* =====================================================
            BUFFEREDINPUTSTREAM
        ===================================================== */}
                <section className={`${reveal} animation-delay-[200ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            BufferedInputStream
                        </h3>

                        <p className="text-sm mt-2">
                            <strong>BufferedInputStream</strong> reads a block of bytes
                            into an internal memory buffer and serves subsequent reads
                            from memory instead of disk.
                        </p>

                        <p className="text-sm mt-3">
                            <strong>Constructor (Prototype):</strong>
                            <br />
                            <code>BufferedInputStream(InputStream in)</code>
                        </p>

                        <p className="text-sm mt-2">
                            <strong>Return Type:</strong> int (byte value or -1)
                        </p>

                        <JavaCodeBlock
                            code={`FileInputStream fis = new FileInputStream("video.mp4");
BufferedInputStream bis = new BufferedInputStream(fis);

int data;
while ((data = bis.read()) != -1) {
    // process byte efficiently
}

bis.close();
fis.close();`}
                        />
                    </div>
                </section>

                {/* =====================================================
            BUFFEREDOUTPUTSTREAM
        ===================================================== */}
                <section className={`${reveal} animation-delay-[300ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            BufferedOutputStream
                        </h3>

                        <p className="text-sm mt-2">
                            <strong>BufferedOutputStream</strong> stores written bytes
                            in a memory buffer and writes them to disk in bulk.
                        </p>

                        <p className="text-sm mt-3">
                            <strong>Constructor (Prototype):</strong>
                            <br />
                            <code>BufferedOutputStream(OutputStream out)</code>
                        </p>

                        <JavaCodeBlock
                            code={`FileOutputStream fos = new FileOutputStream("backup.mp4");
BufferedOutputStream bos = new BufferedOutputStream(fos);

bos.write(data);

// Important
bos.flush();
bos.close();
fos.close();`}
                        />
                    </div>
                </section>

                {/* =====================================================
            FILE COPY WITH BUFFERING
        ===================================================== */}
                <section className={`${reveal} animation-delay-[400ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            Example: Efficient Binary File Copy
                        </h3>

                        <p className="text-sm">
                            This is how professional systems copy large binary files.
                        </p>

                        <JavaCodeBlock
                            code={`FileInputStream fis = new FileInputStream("source.mp3");
BufferedInputStream bis = new BufferedInputStream(fis);

FileOutputStream fos = new FileOutputStream("destination.mp3");
BufferedOutputStream bos = new BufferedOutputStream(fos);

int data;
while ((data = bis.read()) != -1) {
    bos.write(data);
}

bos.flush();
bis.close();
bos.close();
fis.close();
fos.close();`}
                        />
                    </div>
                </section>

                {/* =====================================================
            REAL-WORLD USE CASES
        ===================================================== */}
                <section className={`${reveal} animation-delay-[500ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            Real-World Use Cases
                        </h3>

                        <ul className="list-disc list-inside text-sm space-y-2">
                            <li>Video and audio streaming systems</li>
                            <li>File upload/download modules</li>
                            <li>Backup and restore utilities</li>
                            <li>Large PDF and image processing</li>
                        </ul>
                    </div>
                </section>

                {/* =====================================================
            COMMON PITFALLS
        ===================================================== */}
                <section className={`${reveal} animation-delay-[600ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-red-500">
                            Common Beginner Mistakes
                        </h3>

                        <ul className="list-disc list-inside text-sm space-y-2">
                            <li>Forgetting to call <code>flush()</code></li>
                            <li>Closing underlying stream before buffer</li>
                            <li>Using buffering for very small files unnecessarily</li>
                            <li>Assuming buffering changes file content (it does not)</li>
                        </ul>
                    </div>
                </section>

                {/* =====================================================
            BEST PRACTICES
        ===================================================== */}
                <section className={`${reveal} animation-delay-[700ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-emerald-500">
                            Best Practices
                        </h3>

                        <ul className="list-disc list-inside text-sm space-y-2">
                            <li>Always use buffering for large binary files</li>
                            <li>Call <code>flush()</code> before closing output streams</li>
                            <li>Wrap streams logically (File → Buffered)</li>
                            <li>Prefer try-with-resources in production code</li>
                        </ul>
                    </div>
                </section>

                {/* =====================================================
            FUNCTION & METHOD DESCRIPTIONS (EXTRA – DETAILED)
        ===================================================== */}
                <section className={`${reveal} animation-delay-[750ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            Function & Method Descriptions (Important)
                        </h3>

                        <ul className="list-disc list-inside text-sm space-y-4">
                            <li>
                                <strong>FileInputStream(String filePath)</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Purpose:
                                </span>{" "}
                                Opens a binary file for reading raw byte data.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Used when:
                                </span>{" "}
                                Reading images, audio, video, PDFs, or any non-text file.
                            </li>

                            <li>
                                <strong>BufferedInputStream(InputStream in)</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Purpose:
                                </span>{" "}
                                Wraps an input stream to improve performance using buffering.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Why needed:
                                </span>{" "}
                                Reduces disk access by reading chunks into memory.
                            </li>

                            <li>
                                <strong>int read()</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Return type:
                                </span>{" "}
                                int<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Returns:
                                </span>{" "}
                                Byte value (0–255) or <code>-1</code> when end of file is reached.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Common mistake:
                                </span>{" "}
                                Forgetting to check <code>-1</code>, causing infinite loops.
                            </li>

                            <li>
                                <strong>FileOutputStream(String filePath)</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Purpose:
                                </span>{" "}
                                Creates or overwrites a file to write binary data.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Used when:
                                </span>{" "}
                                Saving copied files, backups, downloads.
                            </li>

                            <li>
                                <strong>BufferedOutputStream(OutputStream out)</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Purpose:
                                </span>{" "}
                                Buffers output data before writing to disk.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Advantage:
                                </span>{" "}
                                Improves speed and reduces disk I/O.
                            </li>

                            <li>
                                <strong>void write(int b)</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Purpose:
                                </span>{" "}
                                Writes a single byte to the output buffer.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Note:
                                </span>{" "}
                                Data may remain in buffer until flushed.
                            </li>

                            <li>
                                <strong>void flush()</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Purpose:
                                </span>{" "}
                                Forces buffered data to be written to the file immediately.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Critical:
                                </span>{" "}
                                Prevents data loss in buffered output streams.
                            </li>

                            <li>
                                <strong>void close()</strong><br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Purpose:
                                </span>{" "}
                                Releases system resources and closes the stream.<br />
                                <span className="text-slate-600 dark:text-slate-400">
                                    Best practice:
                                </span>{" "}
                                Close buffered stream first, then underlying stream.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* =====================================================
            NOTE: PROCESS OF READING A BINARY FILE (STEP BY STEP)
        ===================================================== */}
                <section className={`${reveal} animation-delay-[150ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            Note: Process of Reading a Binary File (Step-by-Step)
                        </h3>

                        <p className="text-sm mt-2">
                            Reading a binary file means reading <strong>raw byte data</strong>
                            directly from storage without any character encoding or conversion.
                        </p>

                        {/* STEP 1 */}
                        <div className="mt-4">
                            <p className="font-semibold text-sm text-indigo-400">
                                Step 1: Identify the File Type
                            </p>
                            <p className="text-sm">
                                First, decide whether the file is human-readable.
                                If the file is an image, audio, video, or PDF, it is a
                                <strong> binary file</strong> and must be handled using byte streams.
                            </p>
                        </div>

                        {/* STEP 2 */}
                        <div className="mt-4">
                            <p className="font-semibold text-sm text-indigo-400">
                                Step 2: Create FileInputStream
                            </p>
                            <p className="text-sm">
                                A <code>FileInputStream</code> is created to establish a connection
                                between the Java program and the binary file on disk.
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Purpose: Opens the file for byte-level reading.
                            </p>
                        </div>

                        {/* STEP 3 */}
                        <div className="mt-4">
                            <p className="font-semibold text-sm text-indigo-400">
                                Step 3: Wrap with BufferedInputStream
                            </p>
                            <p className="text-sm">
                                The <code>BufferedInputStream</code> wraps the file stream to
                                improve performance by reading data in chunks instead of
                                byte-by-byte from disk.
                            </p>
                        </div>

                        {/* STEP 4 */}
                        <div className="mt-4">
                            <p className="font-semibold text-sm text-indigo-400">
                                Step 4: Read Bytes Using read()
                            </p>
                            <p className="text-sm">
                                The <code>read()</code> method is used inside a loop to read
                                one byte at a time.
                            </p>
                            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                                <li>Returns <code>0–255</code> → valid byte</li>
                                <li>Returns <code>-1</code> → end of file (EOF)</li>
                            </ul>
                        </div>

                        {/* STEP 5 */}
                        <div className="mt-4">
                            <p className="font-semibold text-sm text-indigo-400">
                                Step 5: Process the Byte
                            </p>
                            <p className="text-sm">
                                Each byte can be processed as required — copied to another file,
                                stored, or transmitted. Binary data should not be printed
                                as characters.
                            </p>
                        </div>

                        {/* STEP 6 */}
                        <div className="mt-4">
                            <p className="font-semibold text-sm text-indigo-400">
                                Step 6: Close the Streams
                            </p>
                            <p className="text-sm">
                                After reading is complete, the buffered stream is closed first,
                                followed by the file stream, to release system resources.
                            </p>
                        </div>

                        {/* FLOW SUMMARY */}
                        <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/60">
                            <p className="text-sm font-semibold text-indigo-400">
                                Logical Flow Summary
                            </p>
                            <p className="text-sm mt-1">
                                Binary File → FileInputStream → BufferedInputStream → read() → process → close
                            </p>
                        </div>
                    </div>
                </section>


                {/* =====================================================
            MORE EXAMPLES (BEGINNER → PROFESSIONAL)
        ===================================================== */}
                <section className={`${reveal} animation-delay-[450ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            More Examples (Important Practice)
                        </h3>

                        {/* ---------------- Example 1 ---------------- */}
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-semibold">
                                Example 1: Reading a Small Binary File (Beginner)
                            </p>

                            <p className="text-sm">
                                Suitable for small files like icons or thumbnails where
                                performance is not critical.
                            </p>

                            <JavaCodeBlock
                                code={`FileInputStream fis = new FileInputStream("logo.png");
BufferedInputStream bis = new BufferedInputStream(fis);

int data;
while ((data = bis.read()) != -1) {
    System.out.print(data + " ");
}

bis.close();
fis.close();`}
                            />
                        </div>

                        {/* ---------------- Example 2 ---------------- */}
                        <div className="mt-8 space-y-2">
                            <p className="text-sm font-semibold">
                                Example 2: Writing Binary Data to a File
                            </p>

                            <p className="text-sm">
                                Demonstrates buffered writing and the importance of
                                <code className="mx-1">flush()</code>.
                            </p>

                            <JavaCodeBlock
                                code={`FileOutputStream fos = new FileOutputStream("sample.bin");
BufferedOutputStream bos = new BufferedOutputStream(fos);

bos.write(65);   // A
bos.write(66);   // B
bos.write(67);   // C

bos.flush();
bos.close();
fos.close();`}
                            />
                        </div>

                        {/* ---------------- Example 3 ---------------- */}
                        <div className="mt-8 space-y-2">
                            <p className="text-sm font-semibold">
                                Example 3: Copying a Large File Efficiently (Professional)
                            </p>

                            <p className="text-sm">
                                Used in backup tools, media servers, and file migration systems.
                            </p>

                            <JavaCodeBlock
                                code={`FileInputStream fis = new FileInputStream("movie.mkv");
BufferedInputStream bis = new BufferedInputStream(fis);

FileOutputStream fos = new FileOutputStream("movie_copy.mkv");
BufferedOutputStream bos = new BufferedOutputStream(fos);

int byteData;
while ((byteData = bis.read()) != -1) {
    bos.write(byteData);
}

bos.flush();
bis.close();
bos.close();
fis.close();
fos.close();`}
                            />
                        </div>

                        {/* ---------------- Example 4 ---------------- */}
                        <div className="mt-8 space-y-2">
                            <p className="text-sm font-semibold">
                                Example 4: Professional Pattern (Try-With-Resources)
                            </p>

                            <p className="text-sm">
                                This is how modern Java applications safely handle streams.
                            </p>

                            <JavaCodeBlock
                                code={`try (
    BufferedInputStream bis =
        new BufferedInputStream(new FileInputStream("data.zip"));
    BufferedOutputStream bos =
        new BufferedOutputStream(new FileOutputStream("data_copy.zip"))
) {
    int b;
    while ((b = bis.read()) != -1) {
        bos.write(b);
    }
    bos.flush();
} catch (Exception e) {
    e.printStackTrace();
}`}
                            />
                        </div>

                    </div>
                </section>



                {/* =====================================================
            HINT SECTION
        ===================================================== */}
                <section className={`${reveal} animation-delay-[800ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-amber-500">
                            Hint for Students
                        </h3>

                        <p className="text-sm">
                            Try copying a large video file once with
                            FileInputStream only and once with BufferedInputStream.
                            Compare execution time and CPU usage.
                        </p>
                    </div>
                </section>

                {/* =====================================================
            MINI CHECKLIST
        ===================================================== */}
                <section className={`${reveal} animation-delay-[900ms]`}>
                    <div className={card}>
                        <h3 className="text-lg font-semibold text-indigo-500">
                            Quick Revision Checklist
                        </h3>

                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Why buffering improves performance</li>
                            <li>BufferedInputStream purpose</li>
                            <li>BufferedOutputStream purpose</li>
                            <li>When buffering is necessary</li>
                        </ul>
                    </div>
                </section>

                {/* =====================================================
            TEACHER NOTE
        ===================================================== */}
                <section
                    className={`${reveal} animation-delay-[1000ms] rounded-xl border 
          border-indigo-300/40 dark:border-indigo-700/40 
          bg-indigo-50/60 dark:bg-indigo-900/20 p-6 
          transition-all duration-300 hover:shadow-md`}
                >
                    <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        Teacher’s Note
                    </h3>

                    <p className="text-sm mt-2">
                        Students often underestimate buffering. Emphasize that buffering
                        does not change logic — it changes <strong>performance</strong>.
                        This distinction is critical for real-world systems.
                    </p>
                </section>

            </div>
        );
    }
}
