import { getUrlStore, setUrlStore, validateUrl } from "@/utils.ts";
import { A } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";

const items = [
  {
    label: "-- Choose a template --",
    value: "",
  },
  {
    label: "DuckDuckGo",
    value: "https://duckduckgo.com/?q={{{s}}}",
  },
  {
    label: "Brave",
    value: "https://search.brave.com/search?q={{{s}}}",
  },
  {
    label: "Google",
    value: "https://www.google.com/search?q={{{s}}}",
  },
  {
    label: "Bing",
    value: "https://www.bing.com/search?q={{{s}}}",
  },
];

export default function SettingsPage() {
  const [url, setUrl] = createSignal<string>(getUrlStore());
  const [success, setSuccess] = createSignal(false);

  let ref: ReturnType<typeof setTimeout> | undefined;

  const handleSubmit = () => {
    setSuccess(false);
    if (!validateUrl(url())) return;
    setUrlStore(url());
    if (ref) {
      clearTimeout(ref);
    }
    setSuccess(true);
    ref = setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const templateUrl = `${window.location.origin}?q=%s`;

  return (
    <div class="settings-container">
      <A href="/">Go back</A>
      <h1 style={{ "margin-top": "0.5rem" }}>Settings</h1>
      <h2>1. Add custom search engine to browsers</h2>
      <h3>For Chromium-based browsers</h3>
      <ol>
        <li>
          Go to settings: <b>chrome://settings/searchEngines</b>
        </li>
        <li>
          Click on <b>Add site search/search engine</b>
        </li>
        <li>
          Paste in this URL: <b>{templateUrl}</b>
        </li>
      </ol>
      <h3>For Firefox-based browsers (from version 140)</h3>
      <ol>
        <li>
          Go to settings: <b>about:preferences#search</b>
        </li>
        <li>
          Click on <b>Add site search/search engine</b>
        </li>
        <li>
          Paste in this URL: <b>{templateUrl}</b>
        </li>
      </ol>
      <h2>2. Change default search engine</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <select
          onInput={(e) => {
            setUrl(e.target.value || url());
            e.target.value = "";
          }}
        >
          <For each={items}>{(item) => <option value={item.value}>{item.label}</option>}</For>
        </select>
        <label>
          URL
          <input value={url()} onInput={(e) => setUrl(e.target.value)} type="url" />
        </label>
        <button type="submit">Save</button>
        <Show when={success()}>
          <article>Saved</article>
        </Show>
      </form>
    </div>
  );
}
