import { bangs } from "@/bangs.ts";
import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

const PLACEHOLDER = "{{{s}}}";
const DEFAULT_URL = `https://www.google.com/search?q={{{s}}}`;

const getBang = (q: string): { q: string; b: string | null } => {
  const match = q.match(/(?<=\s|^)!(\b[a-zA-Z]+\b)(?=\s|$)/);
  if (!match) return { q, b: null };
  return { q: q.replace(/(?<=\s|^)!(\b[a-zA-Z]+\b)(\s?)/, ""), b: match[1] };
};

const handleSearch = (q: string, isAuto?: boolean) => {
  if (!q.trim()) return;
  const bang = getBang(q);
  let searchUrl: string | undefined;
  if (bang.b) {
    searchUrl = String(bangs?.[bang.b]?.u || "");
  }
  if (searchUrl) {
    searchUrl = searchUrl.replace(PLACEHOLDER, bang.q.trim());
  } else {
    searchUrl = DEFAULT_URL.replace(PLACEHOLDER, q.trim());
  }
  if (isAuto) {
    window.location.replace(searchUrl);
  } else {
    window.location.href = searchUrl;
  }
};

export default function IndexPage() {
  const [input, setInput] = createSignal("");

  const search = new URLSearchParams(window.location.search);
  const q = search.get("q");
  if (q) {
    handleSearch(q, true);
  }

  return (
    <Show when={!q}>
      <form
        class="index-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(input());
        }}
      >
        <h1 class="title">Search</h1>
        <input autofocus type="search" value={input()} onInput={(e) => setInput(e.target.value)} />
        <A href="/settings" role="button" class="outline secondary">
          Settings
        </A>
      </form>
    </Show>
  );
}
