import Editor from "@components/Editor"
import { createEffect, createSignal, onMount } from "solid-js"
import { createStore } from "solid-js/store"

export default () => {
	let $input: HTMLInputElement
	let $image: HTMLImageElement
	let $canvas: HTMLCanvasElement
	let $editor: HTMLDivElement
	const [sidebar, setSidebar] = createSignal(false)
	const [state, setState] = createStore({
		cols: 4,
		rows: 4,
		frameWidth: 1,
		frameColor: '#000000',
		gridWidth: 1,
		gridColor: '#000000',
		name: ''
	})

	function drawImage() {
		$canvas.width = $image.width
		$canvas.height = $image.height
		const ctx = $canvas.getContext('2d')
		ctx.drawImage($image, 0, 0)
	}
	function drawFrameLine() {
		const ctx = $canvas.getContext('2d')
		if (state.frameWidth) {
			ctx.lineWidth = state.frameWidth * 4
			ctx.strokeStyle = state.frameColor
			ctx.strokeRect(0, 0, $canvas.width, $canvas.height)
		}
	}
	function drawHorizontalLines() {
		const ctx = $canvas.getContext('2d')
		for (let x = (state.rows - 1); x >= 1; x--) {
			const corX = $image.height / state.rows * x
			ctx.lineWidth = state.gridWidth ? state.gridWidth * 2 : 1
			ctx.strokeStyle = state.gridColor
			ctx.beginPath()
			ctx.moveTo(0, corX)
			ctx.lineTo($image.width, corX)
			ctx.stroke()
		}
	}
	function drawVerticalLines() {
		const ctx = $canvas.getContext('2d')
		for (let y = (state.cols - 1); y >= 1; y--) {
			const corY = $image.width / state.cols * y
			ctx.lineWidth = state.gridWidth ? state.gridWidth * 2 : 1
			ctx.strokeStyle = state.gridColor
			ctx.beginPath()
			ctx.moveTo(corY, 0)
			ctx.lineTo(corY, $image.height)
			ctx.stroke()
		}
	}
	function drawBatch() {
		drawImage()
		drawFrameLine()
		drawHorizontalLines()
		drawVerticalLines()
	}

	onMount(() => {
		$image.width = 300
		$image.height = 300
	})
	createEffect(drawBatch)

	return (
		<main class="bg-yellow-50">
			<article class="fixed left-0 top-0 w-full sm:w-2/3 h-full overflow-y-auto flex items-center justify-center p-5 bg-yellow-50">
				<div>
					<img class="hidden" alt="Image" ref={$image} />
					<canvas class="max-w-full block mx-auto bg-white" ref={$canvas}></canvas>
				</div>
			</article>
			<aside classList={{'active': sidebar()}}>
				{/* Overlay */}
				<div
					onClick={() => setSidebar(val => !val)}
					class="overlay fixed sm:hidden z-40 top-0 left-0 w-full h-full bg-black bg-opacity-20"
				></div>
				<div ref={$editor} class="sidebar">
					<Editor
						state={[state, setState]}
						drawBatch={drawBatch}
						refImage={$image}
						refInput={$input}
						refCanvas={$canvas}
					/>
				</div>
			</aside>
			<div
				onClick={() => setSidebar(val => !val)}
				className="sm:hidden text-xl select-none cursor-pointer fixed z-30 bottom-2 right-2 p-4 bg-yellow-700 bg-opacity-40"
			>
				Editor
			</div>
		</main>
	)
}