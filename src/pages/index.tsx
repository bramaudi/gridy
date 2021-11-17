import { createEffect, onMount } from "solid-js"
import { createStore } from "solid-js/store"

export default () => {
	let $input: HTMLInputElement
	let $image: HTMLImageElement
	let $canvas: HTMLCanvasElement
	const [state, setState] = createStore({
		cols: 4,
		rows: 4,
		frameWidth: 0,
		gridWidth: 1,
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
			ctx.strokeRect(0, 0, $canvas.width, $canvas.height)
		}
	}
	function drawHorizontalLines() {
		const ctx = $canvas.getContext('2d')
		for (let x = (state.rows - 1); x >= 1; x--) {
			const corX = $image.height / state.rows * x
			ctx.lineWidth = state.gridWidth ? state.gridWidth * 2 : 1
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
			<article class="fixed left-0 top-0 w-2/3 h-full overflow-y-auto p-5 bg-yellow-50">
				<canvas class="max-w-full block mx-auto bg-white" ref={$canvas}></canvas>
			</article>
			<aside class="fixed right-0 top-0 w-1/3 h-full overflow-y-auto p-2 bg-yellow-200">
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
				<div>
					<label htmlFor="input-grid">Grid Line:</label>
					<input id="input-grid" type="number" value={state.gridWidth} onInput={e => handleNumericInput(e, 'gridWidth')} />
				</div>
				<hr class="border-yellow-700 my-5" />
				<label htmlFor="input-download" class="mx-3">Save as:</label>
				<div className="flex">
					<input id="input-download" class="w-full !p-2" type="text" value={state.name} onInput={e => setState('name', e.currentTarget.value)} />
					<button class="btn" onClick={handleDownload}>Download</button>
				</div>
			</aside>
		</main>
	)
}