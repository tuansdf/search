import { createSignal, JSX } from "solid-js";

export const CopyableText = (props: JSX.IntrinsicElements["span"]) => {
  let ref: ReturnType<typeof setTimeout> | undefined = undefined;
  const [copied, setCopied] = createSignal(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(props.children || ""));
    setCopied(true);
    if (ref) {
      clearTimeout(ref);
    }
    ref = setTimeout(() => setCopied(false), 1000);
  };

  return (
    <span
      style={{ cursor: "pointer" }}
      {...props}
      onClick={handleCopy}
      data-tooltip={copied() ? "Copied" : "Click to copy"}
    ></span>
  );
};
