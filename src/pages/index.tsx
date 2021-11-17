import { createEffect, onMount } from "solid-js"
import { createStore } from "solid-js/store"

export default () => {
	let $input: HTMLInputElement
	let $image: HTMLImageElement
	let $canvas: HTMLCanvasElement
	let $aside: HTMLElement
	const [state, setState] = createStore({
		cols: 4,
		rows: 4,
		frameWidth: 0,
		frameColor: '#000000',
		gridWidth: 1,
		gridColor: '#000000',
		name: ''
	})
	const suffixFilename = () => {
		if (state.name === '') return ''
		const ext = state.name.slice(state.name.lastIndexOf("."))
		return `${state.name.replace(ext, '')}_grid.png`
	}

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
		console.log(JSON.stringify(state));
		
	}
	function handleDownload() {
		if (state.name === '') return
		const url = $canvas.toDataURL('image/png')
		const a = document.createElement('a')
		a.download = state.name
		a.href = url.replace('image/png', 'image/octet-steam')
		a.click()
	}
	function handlePreview() {
		const files = $input.files
		if (files[0]) {
			$image.removeAttribute('width')
			$image.removeAttribute('height')
			$image.src = URL.createObjectURL(files[0])
			setState('name', files[0].name)
			setState('name', suffixFilename())
		}
		$image.onload = drawBatch
	}
	function handleNumericInput(e: InputEvent, prop: 'cols'|'rows'|'frameWidth'|'gridWidth') {
		const target = e.target as HTMLInputElement
		const value = target.value?.match(/\d+/) || []
		setState(prop, value.length ? parseInt(value[0]) : 0)
	}

	onMount(() => {
		$image.width = 300
		$image.height = 300
	})
	createEffect(drawBatch)

	return (
		<main>
			<article class="fixed left-0 top-0 w-full sm:w-2/3 h-full overflow-y-auto p-5 bg-yellow-50">
				<canvas class="max-w-full block mx-auto bg-white" ref={$canvas}></canvas>
			</article>
			<aside class="hidden sm:block fixed left-0 sm:left-auto sm:right-0 top-0 w-64 sm:w-1/3 h-full overflow-y-auto p-2 bg-yellow-200" ref={$aside}>
				<div>
					<label>
						<div class="btn mb-2">Choose image</div>
						<input accept="image/*" class="hidden" type="file" ref={$input} onChange={handlePreview} />
					</label>
					<img class="hidden" alt="Image" ref={$image} />
				</div>
				<div>
					<label htmlFor="input-cols">Cols:</label>
					<input id="input-cols" type="number" value={state.cols} onInput={e => handleNumericInput(e, 'cols')} />
				</div>
				<div>
					<label htmlFor="input-rows">Rows:</label>
					<input id="input-rows" type="number" value={state.rows} onInput={e => handleNumericInput(e, 'rows')} />
				</div>
				<hr class="border-yellow-700 my-5" />
				<div>
					<label htmlFor="input-frame">Frame Border:</label>
					<input id="input-frame" type="number" value={state.frameWidth} onInput={e => handleNumericInput(e, 'frameWidth')} />
				</div>
				<div class="mb-5">
					<label htmlFor="input-frame-color">Frame Color:</label>
					<input id="input-frame-color" type="color" value={state.frameColor} onInput={e => setState('frameColor', e.currentTarget.value)} />
				</div>
				<div>
					<label htmlFor="input-grid">Grid Line:</label>
					<input id="input-grid" type="number" value={state.gridWidth} onInput={e => handleNumericInput(e, 'gridWidth')} />
				</div>
				<div>
					<label htmlFor="input-grid-color">Grid Line Color:</label>
					<input id="input-grid-color" type="color" value={state.gridColor} onInput={e => setState('gridColor', e.currentTarget.value)} />
				</div>
				<hr class="border-yellow-700 my-5" />
				<label htmlFor="input-download" class="mx-3">Save as:</label>
				<div className="flex">
					<input id="input-download" class="w-full !p-2" type="text" value={state.name} onInput={e => setState('name', e.currentTarget.value)} />
					<button class="btn" onClick={handleDownload}>Download</button>
				</div>
			</aside>
			<div
				onClick={() => $aside.classList.toggle('hidden')}
				className="sm:hidden text-xl select-none cursor-pointer fixed bottom-2 right-2 p-4 bg-yellow-700 bg-opacity-40"
			>
				Editor
			</div>
		</main>
	)
}