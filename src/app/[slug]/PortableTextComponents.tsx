import { PortableTextComponents } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// 👉 Định nghĩa các component custom
export const components: PortableTextComponents = {
  types: {
    code: ({ value }) => (
      <SyntaxHighlighter
        language={value.language || "javascript"}
        style={vscDarkPlus}
        customStyle={{
          borderRadius: "0.75rem",
          padding: "1rem",
          fontSize: "0.9rem",
        }}
      >
        {value.code}
      </SyntaxHighlighter>
    ),
  },
  marks: {
    inlineCode: ({ children, value }) => (
      <SyntaxHighlighter
        language={value?.language || "typescript"}
        style={vscDarkPlus}
        customStyle={{
          display: "inline",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "0.9em",
        }}
      >
        {String(children)}
      </SyntaxHighlighter>
    ),
    code: ({ children }) => (
      <code className="bg-gray-800 text-green-300 px-1.5 py-0.5 rounded-md font-mono text-sm tracking-tight">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-1">{children}</ol>
    ),
  },
};
