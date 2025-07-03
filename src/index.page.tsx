import { Bang } from "@/types.ts";
import { getBangs, getUrlStore, PLACEHOLDER } from "@/utils.ts";
import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

const getBang = (q: string): { q: string; t: string | null } => {
  const match = q.match(/(?<=\s|^)!(\b[a-zA-Z]+\b)(?=\s|$)/);
  if (!match) return { q, t: null };
  return { q: q.replace(/(?<=\s|^)!(\b[a-zA-Z]+\b)(\s?)/, ""), t: match[1] };
};

const handleSearch = (data: Bang[], q: string, isAuto?: boolean) => {
  if (!q.trim()) return;
  const bang = getBang(q);
  let searchUrl: string | undefined;
  if (bang.t) {
    searchUrl = String(data.find((item) => item.t === bang.t)?.u || "");
  }
  if (searchUrl) {
    searchUrl = searchUrl.replace(PLACEHOLDER, bang.q.trim());
  } else {
    searchUrl = getUrlStore().replace(PLACEHOLDER, q.trim());
  }
  if (isAuto) {
    window.location.replace(searchUrl);
  } else {
    window.location.href = searchUrl;
  }
};

const handleLoad = async (onData: (a: Bang[]) => void) => {
  try {
    const search = new URLSearchParams(window.location.search);
    const data = await getBangs();
    const q = search.get("q");
    if (q) {
      handleSearch(data, q, true);
    } else {
      onData(data);
    }
  } catch {}
};

export default function IndexPage() {
  const search = new URLSearchParams(window.location.search);
  const q = search.get("q") || "";

  const [loading, setLoading] = createSignal<boolean>(true);
  const [data, setData] = createSignal<Bang[]>([]);
  const [input, setInput] = createSignal<string>(q);

  handleLoad((d) => {
    setData(d);
    setLoading(false);
  });

  return (
    <Show when={!loading()}>
      <form
        class="index-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(data(), input());
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
