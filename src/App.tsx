import { JSXElement } from "solid-js"
import ReloadPrompt from "@components/ReloadPrompt";

function App({ Routes }: { Routes: () => JSXElement }) {
  return (
    <>
      <ReloadPrompt />
      <Routes />
    </>
  );
}

export default App;
