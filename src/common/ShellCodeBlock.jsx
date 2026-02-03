export default function ShellCodeBlock({
  code,
  title,
  highlightLines = [],
}) {
  return (
    <div className="rounded-lg overflow-hidden border border-white/10">
      {title && (
        <div className="bg-black/40 px-3 py-2 text-sm font-semibold text-emerald-400">
          {title}
        </div>
      )}

      <pre className="bg-black/80 text-green-300 p-4 text-sm font-mono whitespace-pre overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
