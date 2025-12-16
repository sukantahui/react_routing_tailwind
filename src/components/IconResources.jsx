import React, { Component } from "react";
import {
  Link2,
  Image,
  Code2,
  Palette,
  ExternalLink
} from "lucide-react";

export default class IconResources extends Component {

  resources = [
    {
      category: "SVG Brand Logos (Tech & Tools)",
      icon: <Code2 size={18} />,
      items: [
        {
          name: "Simple Icons",
          url: "https://simpleicons.org",
          type: "SVG",
          use: "Best for tech logos (JS, Python, Git, React)",
        },
        {
          name: "SVGrepo",
          url: "https://www.svgrepo.com",
          type: "SVG",
          use: "Large collection of free SVG icons",
        },
      ],
    },

    {
      category: "UI Icon Libraries (Buttons, Menus)",
      icon: <Palette size={18} />,
      items: [
        {
          name: "Heroicons",
          url: "https://heroicons.com",
          type: "SVG",
          use: "Perfect for Tailwind UI & menus",
        },
        {
          name: "Lucide Icons",
          url: "https://lucide.dev",
          type: "SVG",
          use: "Modern UI icons (you already use this)",
        },
        {
          name: "Font Awesome",
          url: "https://fontawesome.com",
          type: "SVG / Webfont",
          use: "Classic icons, good for legacy jQuery apps",
        },
      ],
    },

    {
      category: "Logos & PNG Icons",
      icon: <Image size={18} />,
      items: [
        {
          name: "Clearbit Logos",
          url: "https://logo.clearbit.com",
          type: "PNG",
          use: "Company logos using domain names",
        },
        {
          name: "Flaticon",
          url: "https://www.flaticon.com",
          type: "PNG / SVG",
          use: "Illustrations & UI icons",
        },
      ],
    },

    {
      category: "Developer Assets & UI Inspiration",
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
          use: "Ready-made Tailwind UI sections",
        },
      ],
    },
  ];

  render() {
    return (
      <div className="max-w-4xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-sky-300">
            Icon & Logo Resources for Web Developers
          </h2>
          <p className="text-slate-400 text-sm">
            A curated list of SVG, PNG and icon libraries for building
            modern, clean and professional web applications.
          </p>
        </div>

        {/* RESOURCE LIST */}
        {this.resources.map((section, idx) => (
          <div
            key={idx}
            className="bg-gray-900/70 border border-gray-800 rounded-xl p-5 space-y-4"
          >
            <h3 className="flex items-center gap-2 text-lg font-medium text-indigo-300">
              {section.icon}
              {section.category}
            </h3>

            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-4 bg-gray-950/60 p-3 rounded-lg hover:bg-gray-800/60 transition"
                >
                  <div>
                    <p className="text-white font-medium">
                      {item.name}
                      <span className="ml-2 text-xs text-amber-400">
                        {item.type}
                      </span>
                    </p>
                    <p className="text-sm text-slate-400">
                      {item.use}
                    </p>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300"
                  >
                    <ExternalLink size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
