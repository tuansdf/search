/* @refresh reload */
import "@picocss/pico/css/pico.blue.css";
import "@/globals.css";
import App from "@/app.tsx";
import { render } from "solid-js/web";

const root = document.getElementById("root");

render(() => <App />, root!);
