import { Component, createSignal, Show } from "solid-js"
import { registerSW } from "virtual:pwa-register"
import { onMount } from "solid-js"

const ReloadPrompt: Component = () => {
  const [needRefresh, setNeedRefresh] = createSignal(false)
  const [offlineReady, setOfflineReady] = createSignal(false)

  const updateSW = registerSW({
    onNeedRefresh: () => setNeedRefresh(true),
    onOfflineReady: () => setOfflineReady(true),
  })

  onMount(() => {
    updateSW()
  })

  return (
    <div className="fixed right-0 bottom-0 m-5 text-left shadow-lg rounded bg-white text-gray-900">
      <Show when={offlineReady() || needRefresh()}>
        <div className="p-3">
          {/* Messages */}
          <Show when={needRefresh()}>
            <div>New content available, click on reload button to update.</div>
          </Show>
          <Show when={offlineReady()}>
            <div>App ready to work offline</div>
          </Show>
          {/* Buttons */}
          <Show when={needRefresh()}>
            <button onClick={() =>updateSW()} className="p-0 px-2 mt-2 rounded hover:bg-gray-200 border border-gray-300">Reload</button>
          </Show>
          <Show when={offlineReady()}>
            <button onClick={() => setOfflineReady(false)} className="p-0 px-2 mt-2 ml-2 rounded hover:bg-gray-200 border border-gray-300">Close</button>
          </Show>
        </div>
      </Show>
    </div>
  )
}

export default ReloadPrompt