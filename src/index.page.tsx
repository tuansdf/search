import { getUrlStore, PLACEHOLDER } from "@/utils.ts";
import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { data } from "@/data.ts";

const getBang = (q: string): { q: string; t: string | null } => {
  const match = q.match(/(?<=\s|^)!(\b[a-zA-Z]+\b)(?=\s|$)/);
  if (!match) return { q, t: null };
  return { q: q.replace(/(?<=\s|^)!(\b[a-zA-Z]+\b)(\s?)/, ""), t: match[1] };
};

const handleSearch = (q: string, isAuto?: boolean) => {
  if (!q) return;
  const bang = getBang(q);
  let searchUrl: string | undefined;
  if (bang.t) {
    searchUrl = String(data.find((item) => item.t === bang.t)?.u || "");
  }
  if (searchUrl) {
    searchUrl = searchUrl.replace(PLACEHOLDER, encodeURIComponent(bang.q.trim()));
  } else {
    searchUrl = getUrlStore().replace(PLACEHOLDER, encodeURIComponent(q.trim()));
  }
  if (isAuto) {
    window.location.replace(searchUrl);
  } else {
    window.location.href = searchUrl;
  }
};

export default function IndexPage() {
  const q = window.location.hash?.substring(1) || "";

  handleSearch(decodeURIComponent(q), true);

  const [input, setInput] = createSignal<string>(q);

  return (
    <Show when={!q}>
      <form
        class="index-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(input());
        }}
      >
        <h1>Search</h1>
        <input autofocus type="search" value={input()} onInput={(e) => setInput(e.target.value)} />
        <A href="/settings" class="secondary">
          Settings
        </A>
      </form>
    </Show>
  );
}
