import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * BlockMath: Renders display-mode LaTeX mathematics using KaTeX.
 * Gracefully falls back to styled text if a syntax error occurs.
 */
export const BlockMath = ({ math, className = '' }) => {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: true,
        throwOnError: false,
        strict: false,
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
      return `<span class="text-rose-400 font-mono text-xs">${math}</span>`;
    }
  }, [math]);

  return (
    <div
      className={`overflow-x-auto py-2 text-white font-normal ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * InlineMath: Renders inline LaTeX mathematics using KaTeX.
 */
export const InlineMath = ({ math, className = '' }) => {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: false,
        throwOnError: false,
        strict: false,
      });
    } catch (e) {
      return `<span class="text-rose-400 font-mono text-xs">${math}</span>`;
    }
  }, [math]);

  return (
    <span
      className={`inline-block align-middle font-normal ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default { BlockMath, InlineMath };
