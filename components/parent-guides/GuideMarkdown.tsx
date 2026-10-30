import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Root, Element, ElementContent } from "hast";

// Adds data-label to every body cell from its column header, so a table can
// stack into labelled rows on a phone instead of scrolling sideways.
function rehypeTableLabels() {
  const text = (node: ElementContent): string =>
    node.type === "text"
      ? node.value
      : node.type === "element"
        ? node.children.map(text).join("")
        : "";

  const walk = (node: Root | Element) => {
    for (const child of node.children) {
      if (child.type !== "element") continue;
      if (child.tagName === "table") {
        const labels: string[] = [];
        const thead = child.children.find(
          (c): c is Element => c.type === "element" && c.tagName === "thead",
        );
        thead?.children.forEach((tr) => {
          if (tr.type !== "element") return;
          tr.children.forEach((th) => {
            if (th.type === "element") labels.push(text(th).trim());
          });
        });
        const tbody = child.children.find(
          (c): c is Element => c.type === "element" && c.tagName === "tbody",
        );
        tbody?.children.forEach((tr) => {
          if (tr.type !== "element") return;
          let i = 0;
          tr.children.forEach((td) => {
            if (td.type !== "element") return;
            td.properties = { ...td.properties, dataLabel: labels[i] ?? "" };
            i++;
          });
        });
      } else {
        walk(child);
      }
    }
  };
  return (tree: Root) => walk(tree);
}

const components: Components = {
  p: ({ children }) => (
    <p className="mt-5 first:mt-0 text-[1.0625rem] md:text-[1.125rem] leading-[1.8] text-slate">
      {children}
    </p>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 font-serif text-xl md:text-[1.4rem] leading-snug text-deep-ink">
      {children}
    </h3>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-deep-ink">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="guide-ul mt-5 space-y-3 pl-0 text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-slate">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-3 pl-6 text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-slate marker:font-semibold marker:text-navy">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="relative">{children}</li>,
  a: ({ href = "", children }) => {
    if (href.startsWith("#source-")) {
      return (
        <sup className="ml-0.5">
          <a
            href={href}
            className="relative rounded px-0.5 font-sans text-[0.72em] font-semibold text-navy no-underline hover:bg-blue-mist before:absolute before:-inset-x-1.5 before:-inset-y-2 before:content-['']"
            aria-label={`Source ${String(children)}`}
          >
            [{children}]
          </a>
        </sup>
      );
    }
    const internal = href.startsWith("/") || href.startsWith("#");
    return (
      <a
        href={href}
        {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="font-medium text-navy underline decoration-[var(--bh-warm-amber)] decoration-2 underline-offset-[3px] transition-colors hover:text-deep-ink"
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="guide-table mt-8 overflow-hidden rounded-xl border border-blue-gray bg-white">
      <table className="w-full border-collapse text-left text-[0.95rem] leading-[1.65]">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-blue-mist px-5 py-3.5 align-bottom font-sans text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-deep-ink [&_strong]:font-semibold">
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      data-label={(props as { "data-label"?: string })["data-label"]}
      className="border-t border-blue-gray px-5 py-4 align-top text-slate"
    >
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-[3px] border-navy pl-5 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-blue-gray" />,
};

export default function GuideMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeTableLabels]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}
