import React, { Component } from "react";
import {
  Link2,
  Image,
  Code2,
  Palette,
  ExternalLink,
  Search,
} from "lucide-react";

export default class IconResources extends Component {
  state = { query: "" };

  resources = [
    {
      category: "SVG Brand Logos (Tech & Tools)",
      icon: <Code2 size={18} />,
      items: [
        {
          name: "Simple Icons (Official)",
          url: "https://simpleicons.org",
          type: "SVG",
          use: "Tech brand logos (Java, Python, Git, Excel)",
        },
        {
          name: "Simple Icons (CDN Directory)",
          url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/",
          type: "SVG / CDN",
          use: "Direct SVG access using slugs (java.svg)",
        },
        {
          name: "SVGrepo",
          url: "https://www.svgrepo.com",
          type: "SVG",
          use: "Large free SVG icon library",
        },
      ],
    },
    {
      category: "UI Icon Libraries",
      icon: <Palette size={18} />,
      items: [
        {
          name: "Heroicons",
          url: "https://heroicons.com",
          type: "SVG",
          use: "Tailwind-first UI icons",
        },
        {
          name: "Lucide Icons",
          url: "https://lucide.dev",
          type: "SVG",
          use: "Modern icons (used in this project)",
        },
      ],
    },
    {
      category: "Logos & Illustrations",
      icon: <Image size={18} />,
      items: [
        {
          name: "Clearbit Logos",
          url: "https://logo.clearbit.com",
          type: "PNG",
          use: "Company logos via domain",
        },
        {
          name: "Flaticon",
          url: "https://www.flaticon.com",
          type: "PNG / SVG",
          use: "Illustrations & symbols",
        },
      ],
    },
    {
      category: "UI Inspiration",
      icon: <Link2 size={18} />,
      items: [
        {
          name: "UIverse",
          url: "https://uiverse.io",
          type: "HTML / CSS",
          use: "Buttons, loaders, UI blocks",
        },
        {
          name: "Tailwind Components",
          url: "https://tailwindcomponents.com",
          type: "Tailwind",
          use: "Ready-made Tailwind sections",
        },
      ],
    },
  ];

  render() {
    const { query } = this.state;

    const filtered = this.resources
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          `${item.name} ${item.use}`
            .toLowerCase()
            .includes(query.toLowerCase())
        ),
      }))
      .filter(section => section.items.length > 0);

    return (
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* ================= HEADER ================= */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-sky-400">
              Icon & Logo Resources
            </h2>
            <p className="text-slate-400 text-sm max-w-3xl">
              Carefully selected icon and logo resources for building
              clean, professional web applications.
            </p>
          </div>

          {/* ================= SEARCH ================= */}
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400"
            />
            <input
              type="text"
              placeholder="Search Java, Excel, SVG, icons…"
              value={query}
              onChange={(e) => this.setState({ query: e.target.value })}
              className="
              w-full pl-9 pr-4 py-2 rounded-xl
              bg-slate-900/80
              border border-sky-500/30
              text-sm text-slate-200 placeholder-slate-500
              focus:outline-none focus:border-sky-500
            "
            />
          </div>

          {/* ================= LIST ================= */}
          {filtered.map((section, idx) => (
            <div
              key={idx}
              className="
              rounded-2xl p-5 space-y-4
              bg-gradient-to-br from-slate-900/70 to-slate-900/40
              border border-indigo-500/20
            "
            >
              <h3 className="flex items-center gap-2 text-base font-medium text-indigo-300">
                {section.icon}
                {section.category}
              </h3>

              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="
                    flex justify-between gap-4
                    rounded-xl p-4
                    bg-slate-900/80
                    border border-slate-700/50
                    hover:border-indigo-500/60
                    hover:bg-slate-900
                    transition
                  "
                  >
                    <div>
                      <p className="text-slate-200 font-medium text-sm">
                        {item.name}
                        <span className="ml-2 text-xs text-amber-400">
                          {item.type}
                        </span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {item.use}
                      </p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300 mt-1"
                      title="Open resource"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ================= FOOTER NOTE ================= */}
          <p className="text-xs text-slate-500">
            Tip: Prefer SVG icons with <b className="text-sky-400">currentColor</b> for theme consistency.
          </p>

        </div>
      </div>
    );
  }
}
