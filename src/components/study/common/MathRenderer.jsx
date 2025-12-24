import React from "react";
import { InlineMath, BlockMath } from "react-katex";

export default function MathRenderer({ text = "", block = false }) {
  if (!text) return null;

  try {
    return block ? (
      <BlockMath math={text} />
    ) : (
      <InlineMath math={text} />
    );
  } catch {
    return <span className="text-rose-400">{text}</span>;
  }
}
