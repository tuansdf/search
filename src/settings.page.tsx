import { A } from "@solidjs/router";

export default function SettingsPage() {
  const templateUrl = `${window.location.origin}?q=%s`;

  return (
    <div class="settings-container">
      <A href="/" style={{ display: "inline-block", "margin-bottom": "0.5rem" }}>
        Go back
      </A>
      <h1>Settings</h1>
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
    </div>
  );
}
