import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic0: Introduction to Computer Networks
 *
 * @component
 * @returns {JSX.Element} The rendered topic component
 *
 * @description
 * This component provides a comprehensive introduction to computer networks,
 * covering fundamental concepts, real-world applications, and key terminology.
 * It follows a pedagogical approach suitable for beginners while maintaining
 * professional depth.
 *
 * @example
 * <Topic0 />
 */
const Topic0 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.style.animationPlayState = "running";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Trigger initial visibility
    setIsVisible(true);

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div
      className={clsx(
        "min-h-screen w-full bg-white dark:bg-gray-950",
        "text-gray-800 dark:text-gray-100",
        "font-sans leading-relaxed antialiased",
        "px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12"
      )}
    >
      <div className="mx-auto max-w-4xl">
        {/* ============================================================ */}
        {/* SECTION 1: Hero / Title                                          */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mb-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50",
            "dark:from-gray-900 dark:to-gray-800",
            "p-6 sm:p-8 md:p-10",
            "border border-blue-100/50 dark:border-gray-700/50",
            "shadow-sm hover:shadow-md transition-all duration-300",
            "animate-[fadeSlideUp_0.8s_ease-out_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex flex-col items-start gap-3">
            <span
              className={clsx(
                "inline-block rounded-full bg-blue-100 dark:bg-blue-900/40",
                "px-4 py-1 text-xs font-semibold uppercase tracking-wider",
                "text-blue-700 dark:text-blue-300"
              )}
            >
              Topic 0
            </span>
            <h1
              className={clsx(
                "text-3xl sm:text-4xl md:text-5xl font-bold",
                "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400",
                "bg-clip-text text-transparent"
              )}
            >
              Introduction to Computer Networks
            </h1>
            <p
              className={clsx(
                "mt-2 text-lg sm:text-xl text-gray-600 dark:text-gray-300",
                "max-w-2xl"
              )}
            >
              Understanding the foundations of how computers communicate and
              share resources in the modern world.
            </p>
          </div>

          {/* Hero SVG: Network nodes illustration */}
          <div
            className={clsx(
              "mt-6 flex w-full justify-center",
              "animate-[fadeSlideUp_1s_ease-out_0.2s_forwards]",
              "motion-reduce:animate-none"
            )}
            style={{ animationPlayState: "paused" }}
          >
            <svg
              viewBox="0 0 600 180"
              className="w-full max-w-2xl h-auto"
              aria-label="Computer network illustration showing connected nodes"
              role="img"
            >
              <title>Computer Network Illustration</title>
              {/* Background glow */}
              <circle
                cx="300"
                cy="90"
                r="120"
                fill="url(#glowGrad)"
                opacity="0.08"
              />
              <defs>
                <radialGradient id="glowGrad">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
                <filter id="nodeGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connection lines with animated dash */}
              <g opacity="0.5">
                <line
                  x1="120"
                  y1="90"
                  x2="240"
                  y2="60"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="240"
                  y1="60"
                  x2="360"
                  y2="60"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="360"
                  y1="60"
                  x2="480"
                  y2="90"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="120"
                  y1="90"
                  x2="240"
                  y2="120"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="240"
                  y1="120"
                  x2="360"
                  y2="120"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="360"
                  y1="120"
                  x2="480"
                  y2="90"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="240"
                  y1="60"
                  x2="300"
                  y2="90"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="240"
                  y1="120"
                  x2="300"
                  y2="90"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="360"
                  y1="60"
                  x2="300"
                  y2="90"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="360"
                  y1="120"
                  x2="300"
                  y2="90"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
              </g>

              {/* Nodes */}
              <g filter="url(#nodeGlow)">
                {/* Left node */}
                <circle
                  cx="120"
                  cy="90"
                  r="18"
                  fill="#3b82f6"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="r"
                    values="18;20;18"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="120"
                  y="94"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  PC
                </text>

                {/* Top-left node */}
                <circle
                  cx="240"
                  cy="60"
                  r="14"
                  fill="#6366f1"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="r"
                    values="14;16;14"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="240"
                  y="64"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Laptop
                </text>

                {/* Top-right node */}
                <circle
                  cx="360"
                  cy="60"
                  r="14"
                  fill="#8b5cf6"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="r"
                    values="14;16;14"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="360"
                  y="64"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Server
                </text>

                {/* Right node */}
                <circle
                  cx="480"
                  cy="90"
                  r="18"
                  fill="#3b82f6"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="r"
                    values="18;20;18"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="480"
                  y="94"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  PC
                </text>

                {/* Bottom-left node */}
                <circle
                  cx="240"
                  cy="120"
                  r="14"
                  fill="#6366f1"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="r"
                    values="14;16;14"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="240"
                  y="124"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Phone
                </text>

                {/* Bottom-right node */}
                <circle
                  cx="360"
                  cy="120"
                  r="14"
                  fill="#8b5cf6"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="r"
                    values="14;16;14"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="360"
                  y="124"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Printer
                </text>

                {/* Central hub */}
                <circle
                  cx="300"
                  cy="90"
                  r="10"
                  fill="#f59e0b"
                  className="transition-all duration-300"
                >
                  <animate
                    attributeName="r"
                    values="10;13;10"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x="300"
                  y="94"
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  Hub
                </text>
              </g>

              {/* Labels */}
              <text
                x="300"
                y="170"
                textAnchor="middle"
                fill="currentColor"
                className="text-gray-500 dark:text-gray-400 text-sm"
                fontSize="14"
              >
                A simple computer network connecting multiple devices
              </text>
            </svg>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: What is a Computer Network?                         */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mb-10 rounded-xl",
            "bg-gray-50/80 dark:bg-gray-900/60",
            "p-6 sm:p-8",
            "border border-gray-200/70 dark:border-gray-800/70",
            "hover:border-blue-200/50 dark:hover:border-blue-800/50",
            "transition-all duration-300 hover:shadow-md",
            "animate-[fadeSlideUp_0.7s_ease-out_0.1s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex items-start gap-3">
            <span
              className={clsx(
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
                "text-sm font-bold"
              )}
            >
              1
            </span>
            <div>
              <h2
                className={clsx(
                  "text-2xl sm:text-3xl font-semibold",
                  "text-gray-800 dark:text-gray-100"
                )}
              >
                What is a Computer Network?
              </h2>
              <div
                className={clsx(
                  "mt-4 space-y-4 text-gray-700 dark:text-gray-300",
                  "text-base sm:text-lg"
                )}
              >
                <p>
                  A <strong className="text-blue-600 dark:text-blue-400">
                    computer network
                  </strong>{" "}
                  is a collection of interconnected computing devices that
                  communicate and share resources with each other. These devices
                  — which can include computers, servers, smartphones, printers,
                  and IoT devices — are linked together using physical wires,
                  optical fibers, or wireless signals.
                </p>
                <p>
                  Think of it like a digital neighborhood: each device is a
                  house, and the network is the road system that allows people
                  (data) to travel from one house to another. Just as roads have
                  traffic rules, networks have{" "}
                  <strong className="text-indigo-600 dark:text-indigo-400">
                    protocols
                  </strong>{" "}
                  — a set of rules that govern how data is sent, received, and
                  interpreted.
                </p>
                <div
                  className={clsx(
                    "mt-4 rounded-lg border-l-4 border-blue-500",
                    "bg-blue-50/70 dark:bg-blue-950/30",
                    "px-4 py-3"
                  )}
                >
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <span className="font-semibold">💡 Key Insight:</span> A
                    network isn't just about cables and Wi-Fi — it's about
                    enabling communication, collaboration, and resource sharing
                    between people and machines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: Why Do We Need Networks?                            */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mb-10 rounded-xl",
            "bg-gray-50/80 dark:bg-gray-900/60",
            "p-6 sm:p-8",
            "border border-gray-200/70 dark:border-gray-800/70",
            "hover:border-green-200/50 dark:hover:border-green-800/50",
            "transition-all duration-300 hover:shadow-md",
            "animate-[fadeSlideUp_0.7s_ease-out_0.2s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex items-start gap-3">
            <span
              className={clsx(
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
                "text-sm font-bold"
              )}
            >
              2
            </span>
            <div>
              <h2
                className={clsx(
                  "text-2xl sm:text-3xl font-semibold",
                  "text-gray-800 dark:text-gray-100"
                )}
              >
                Why Do We Need Computer Networks?
              </h2>
              <div
                className={clsx(
                  "mt-4 space-y-4 text-gray-700 dark:text-gray-300",
                  "text-base sm:text-lg"
                )}
              >
                <p>
                  In today's interconnected world, computer networks are the
                  backbone of almost everything we do. Here's why they are
                  essential:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-green-300/50 dark:hover:border-green-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-2xl">📁</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Resource Sharing
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Printers, files, and applications can be shared across
                      multiple users, reducing costs and improving efficiency.
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-green-300/50 dark:hover:border-green-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-2xl">💬</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Communication
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Email, messaging, video calls, and social media — all rely
                      on networks to connect people across the globe.
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-green-300/50 dark:hover:border-green-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-2xl">🌐</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Access to Information
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      The internet — the largest network of all — gives us
                      access to a world of knowledge, services, and
                      entertainment.
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-green-300/50 dark:hover:border-green-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-2xl">💰</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Cost Efficiency
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Instead of buying expensive hardware for each user,
                      networks allow centralized resources that everyone can
                      access.
                    </p>
                  </div>
                </div>

                <div
                  className={clsx(
                    "mt-3 rounded-lg border-l-4 border-green-500",
                    "bg-green-50/70 dark:bg-green-950/30",
                    "px-4 py-3"
                  )}
                >
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <span className="font-semibold">🌍 Real-World Example:</span>{" "}
                    Think about how students at Jadavpur University use the
                    campus network to access online libraries, submit
                    assignments, and collaborate on projects — all without
                    needing to be in the same room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: Key Components of a Network                        */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mb-10 rounded-xl",
            "bg-gray-50/80 dark:bg-gray-900/60",
            "p-6 sm:p-8",
            "border border-gray-200/70 dark:border-gray-800/70",
            "hover:border-purple-200/50 dark:hover:border-purple-800/50",
            "transition-all duration-300 hover:shadow-md",
            "animate-[fadeSlideUp_0.7s_ease-out_0.3s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex items-start gap-3">
            <span
              className={clsx(
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
                "text-sm font-bold"
              )}
            >
              3
            </span>
            <div>
              <h2
                className={clsx(
                  "text-2xl sm:text-3xl font-semibold",
                  "text-gray-800 dark:text-gray-100"
                )}
              >
                Key Components of a Network
              </h2>
              <div
                className={clsx(
                  "mt-4 space-y-4 text-gray-700 dark:text-gray-300",
                  "text-base sm:text-lg"
                )}
              >
                <p>
                  Every computer network is built from several essential
                  components. Understanding these building blocks is the first
                  step toward mastering networking:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-purple-300/50 dark:hover:border-purple-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-xl">🖥️</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Nodes / Devices
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Any device connected to the network — computers, phones,
                      printers, servers, switches, routers.
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-purple-300/50 dark:hover:border-purple-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-xl">🔗</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Links / Connections
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      The physical or wireless medium that carries data — copper
                      cables, fiber optics, Wi-Fi, Bluetooth.
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-purple-300/50 dark:hover:border-purple-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-xl">📜</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Protocols
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Rules that define how data is formatted, transmitted, and
                      received. Examples: TCP/IP, HTTP, FTP.
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "rounded-lg bg-white/80 dark:bg-gray-800/50",
                      "p-4 border border-gray-200/60 dark:border-gray-700/60",
                      "hover:border-purple-300/50 dark:hover:border-purple-700/50",
                      "transition-all duration-300 hover:shadow-md"
                    )}
                  >
                    <span className="text-xl">🌐</span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                      Addressing
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Unique identifiers (like IP addresses and MAC addresses)
                      that help locate devices on the network.
                    </p>
                  </div>
                </div>

                <div
                  className={clsx(
                    "mt-3 rounded-lg border-l-4 border-purple-500",
                    "bg-purple-50/70 dark:bg-purple-950/30",
                    "px-4 py-3"
                  )}
                >
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    <span className="font-semibold">🔍 Observe:</span> In a
                    typical office in Barrackpore, the network includes desktop
                    computers (nodes), Ethernet cables (links), TCP/IP
                    (protocol), and each device has a unique IP address
                    (addressing).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: Real-World Analogy                                  */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mb-10 rounded-xl",
            "bg-gray-50/80 dark:bg-gray-900/60",
            "p-6 sm:p-8",
            "border border-gray-200/70 dark:border-gray-800/70",
            "hover:border-amber-200/50 dark:hover:border-amber-800/50",
            "transition-all duration-300 hover:shadow-md",
            "animate-[fadeSlideUp_0.7s_ease-out_0.4s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex items-start gap-3">
            <span
              className={clsx(
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
                "text-sm font-bold"
              )}
            >
              4
            </span>
            <div>
              <h2
                className={clsx(
                  "text-2xl sm:text-3xl font-semibold",
                  "text-gray-800 dark:text-gray-100"
                )}
              >
                A Real-World Analogy: The Post Office
              </h2>
              <div
                className={clsx(
                  "mt-4 space-y-4 text-gray-700 dark:text-gray-300",
                  "text-base sm:text-lg"
                )}
              >
                <p>
                  To understand how computer networks work, imagine a postal
                  system:
                </p>

                <div
                  className={clsx(
                    "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2",
                    "rounded-lg bg-white/60 dark:bg-gray-800/40",
                    "p-4 border border-gray-200/50 dark:border-gray-700/50"
                  )}
                >
                  <div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">📮</span>
                        <span>
                          <strong>You</strong> = A device (node) that wants to
                          send data
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">✉️</span>
                        <span>
                          <strong>Letter</strong> = Data packet being
                          transmitted
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">📍</span>
                        <span>
                          <strong>Address</strong> = IP address (destination)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">🏣</span>
                        <span>
                          <strong>Post Office</strong> = Router (directs
                          traffic)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">🚚</span>
                        <span>
                          <strong>Delivery Truck</strong> = Transmission medium
                          (cable/wireless)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">📬</span>
                        <span>
                          <strong>Mailbox</strong> = Network interface card (NIC)
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 160"
                      className="w-full max-w-[200px] h-auto"
                      aria-label="Post office analogy illustration"
                      role="img"
                    >
                      <rect
                        x="10"
                        y="30"
                        width="40"
                        height="40"
                        rx="4"
                        fill="#f59e0b"
                        opacity="0.8"
                      />
                      <text x="30" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        You
                      </text>
                      <rect
                        x="150"
                        y="30"
                        width="40"
                        height="40"
                        rx="4"
                        fill="#3b82f6"
                        opacity="0.8"
                      />
                      <text x="170" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        Friend
                      </text>
                      <rect
                        x="70"
                        y="100"
                        width="60"
                        height="36"
                        rx="6"
                        fill="#8b5cf6"
                        opacity="0.8"
                      />
                      <text x="100" y="122" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        Network
                      </text>
                      <line
                        x1="50"
                        y1="50"
                        x2="70"
                        y2="118"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="16"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="130"
                        y1="118"
                        x2="150"
                        y2="50"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="16"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <text
                        x="100"
                        y="155"
                        textAnchor="middle"
                        fill="currentColor"
                        className="text-gray-500 dark:text-gray-400 text-xs"
                        fontSize="10"
                      >
                        Postal System Analogy
                      </text>
                    </svg>
                  </div>
                </div>

                <div
                  className={clsx(
                    "mt-2 rounded-lg border-l-4 border-amber-500",
                    "bg-amber-50/70 dark:bg-amber-950/30",
                    "px-4 py-3"
                  )}
                >
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-semibold">📬 Think about it:</span>{" "}
                    Just like the postal system needs addresses, post offices,
                    and delivery vehicles to work, a computer network needs
                    addresses (IP), routers, and transmission media to function.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 6: Common Mistakes & Best Practices                    */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mb-10 rounded-xl",
            "bg-gray-50/80 dark:bg-gray-900/60",
            "p-6 sm:p-8",
            "border border-gray-200/70 dark:border-gray-800/70",
            "hover:border-red-200/50 dark:hover:border-red-800/50",
            "transition-all duration-300 hover:shadow-md",
            "animate-[fadeSlideUp_0.7s_ease-out_0.5s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex items-start gap-3">
            <span
              className={clsx(
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
                "text-sm font-bold"
              )}
            >
              5
            </span>
            <div>
              <h2
                className={clsx(
                  "text-2xl sm:text-3xl font-semibold",
                  "text-gray-800 dark:text-gray-100"
                )}
              >
                Common Mistakes &amp; Best Practices
              </h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Common Mistakes */}
                <div
                  className={clsx(
                    "rounded-lg bg-red-50/60 dark:bg-red-950/20",
                    "p-4 border border-red-200/50 dark:border-red-800/30"
                  )}
                >
                  <h4 className="font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                    <span>❌</span> Common Mistakes
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>
                        <strong>Confusing</strong> a network with the internet —
                        the internet is just one (very large) network.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>
                        <strong>Thinking</strong> that Wi-Fi and Ethernet are
                        different types of networks — they're just different
                        transmission media.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>
                        <strong>Ignoring</strong> security — even the simplest
                        network needs basic protection.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>
                        <strong>Assuming</strong> all networks use the same
                        protocols — different networks use different rules.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Best Practices */}
                <div
                  className={clsx(
                    "rounded-lg bg-green-50/60 dark:bg-green-950/20",
                    "p-4 border border-green-200/50 dark:border-green-800/30"
                  )}
                >
                  <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
                    <span>✅</span> Best Practices
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>
                        <strong>Always</strong> start with a clear understanding
                        of what you're trying to connect.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>
                        <strong>Document</strong> your network layout — it helps
                        with troubleshooting.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>
                        <strong>Learn</strong> the OSI model — it's the
                        foundation of networking.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>
                        <strong>Practice</strong> with tools like ping and
                        traceroute to understand network behavior.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className={clsx(
                  "mt-4 rounded-lg border-l-4 border-red-500",
                  "bg-red-50/70 dark:bg-red-950/30",
                  "px-4 py-3"
                )}
              >
                <p className="text-sm text-red-800 dark:text-red-200">
                  <span className="font-semibold">⚠️ Pro Tip:</span> When you're
                  starting out, don't get overwhelmed by all the terminology.
                  Focus on understanding the{" "}
                  <strong>purpose</strong> of each concept first — the details
                  will fall into place with practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 7: Mini Checklist                                     */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mb-10 rounded-xl",
            "bg-gray-50/80 dark:bg-gray-900/60",
            "p-6 sm:p-8",
            "border border-gray-200/70 dark:border-gray-800/70",
            "hover:border-teal-200/50 dark:hover:border-teal-800/50",
            "transition-all duration-300 hover:shadow-md",
            "animate-[fadeSlideUp_0.7s_ease-out_0.6s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex items-start gap-3">
            <span
              className={clsx(
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300",
                "text-sm font-bold"
              )}
            >
              6
            </span>
            <div>
              <h2
                className={clsx(
                  "text-2xl sm:text-3xl font-semibold",
                  "text-gray-800 dark:text-gray-100"
                )}
              >
                📋 Mini Checklist
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Before moving on, make sure you understand these key points:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "What a computer network is and why it matters",
                  "The difference between a node, a link, and a protocol",
                  "Why addressing (like IP) is important in networks",
                  "How the post office analogy helps explain networking",
                  "That the internet is a type of network — not the only one",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={clsx(
                      "flex items-center gap-2 rounded-lg",
                      "bg-white/70 dark:bg-gray-800/50",
                      "px-3 py-2 border border-gray-200/50 dark:border-gray-700/50",
                      "hover:border-teal-300/50 dark:hover:border-teal-700/50",
                      "transition-all duration-300 hover:shadow-sm"
                    )}
                  >
                    <span className="text-teal-500 text-lg">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 8: FAQ                                                */}
        {/* ============================================================ */}
        <div
          className={clsx(
            "mb-10",
            "animate-[fadeSlideUp_0.7s_ease-out_0.7s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <FAQTemplate
            title="Introduction to Computer Networks FAQs"
            questions={questions}
          />
        </div>

        {/* ============================================================ */}
        {/* SECTION 9: Teacher's Note                                     */}
        {/* ============================================================ */}
        <div
          className={clsx(
            "animate-[fadeSlideUp_0.7s_ease-out_0.8s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <Teacher
            note={
              "Welcome to the world of computer networking! 🌐 This is the foundation upon which everything else will be built. Take your time to really understand the 'why' behind each concept — not just the 'what'. When I teach this to students at Barrackpore, I always emphasize that networking is like learning a new language: start with the alphabet (nodes, links, protocols), then move to words (packets, frames), and finally sentences (applications). \n\nPro tip: Draw your own network diagrams on paper — it helps build intuition. And remember, every expert was once a beginner who kept asking questions. Keep asking!"
            }
          />
        </div>

        {/* ============================================================ */}
        {/* SECTION 10: Hint Section                                      */}
        {/* ============================================================ */}
        <section
          ref={addToRefs}
          className={clsx(
            "mt-8 rounded-xl",
            "bg-blue-50/40 dark:bg-blue-950/20",
            "p-6 border border-blue-200/40 dark:border-blue-800/30",
            "transition-all duration-300 hover:shadow-sm",
            "animate-[fadeSlideUp_0.7s_ease-out_0.9s_forwards]",
            "motion-reduce:animate-none"
          )}
          style={{ animationPlayState: "paused" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">
                Think About…
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>Observe carefully:</strong> How many devices in your
                    home or classroom are connected to a network? What do they
                    share?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>Try changing this:</strong> If you turn off your
                    Wi-Fi, which devices lose connection? What does that tell
                    you about the network?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>Challenge:</strong> Can you identify 5 different
                    types of networks around you? (Think: school lab, mobile
                    hotspot, Bluetooth, etc.)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* Inline keyframes for animations */}
      {/* ============================================================ */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0.4;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic0;