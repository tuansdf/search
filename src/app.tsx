import { bangs } from "@/bangs.ts";
import { createSignal, Show } from "solid-js";

const PLACEHOLDER = "{{{s}}}";
const DEFAULT_URL = `https://www.google.com/search?q={{{s}}}`;

const getBang = (q: string): { q: string; b: string | null } => {
  const match = q.match(/(?<=\s|^)!(\b[a-zA-Z]+\b)(?=\s|$)/);
  if (!match) return { q, b: null };
  return { q: q.replace(/(?<=\s|^)!(\b[a-zA-Z]+\b)(\s?)/, ""), b: match[1] };
};

const handleSearch = (q: string) => {
  if (!q.trim()) return;
  const bang = getBang(q);
  let searchUrl: string | undefined;
  if (bang.b) {
    searchUrl = String(bangs?.[bang.b]?.u || "");
  }
  if (searchUrl) {
    window.location.href = searchUrl.replace(PLACEHOLDER, bang.q.trim());
  } else {
    window.location.href = DEFAULT_URL.replace(PLACEHOLDER, q.trim());
  }
};

export default function App() {
  const [input, setInput] = createSignal("");
  const [copied, setCopied] = createSignal(false);

  const search = new URLSearchParams(window.location.search);
  const q = search.get("q");
  if (q) {
    handleSearch(q);
  }

  const templateUrl = `${window.location.origin}?q=%s`;

  let timeout: ReturnType<typeof setTimeout> | undefined;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(templateUrl);
      setCopied(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setCopied(false), 1000);
    } catch {}
  };

  return (
    <Show when={!q}>
      <form
        class="main-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(input());
        }}
      >
        <h1 class="title">Search</h1>
        <input autofocus type="search" onInput={(e) => setInput(e.target.value)} />
        <button
          type="button"
          class="template outline secondary"
          onClick={handleCopy}
          data-tooltip={copied() ? "Copied" : "Click to copy"}
        >
          {templateUrl}
        </button>
      </form>
    </Show>
  );
}
