import { SetStoreFunction, Store } from "solid-js/store"
import upFileIcon from "../assets/icons/upfile.svg"
import colsIcon from "../assets/icons/cols.svg"
import innerIcon from "../assets/icons/inner.svg"
import outerIcon from "../assets/icons/outer.svg"

type State = {
	cols: number,
	rows: number,
	frameWidth: number,
	frameColor: string,
	gridWidth: number,
	gridColor: string,
	name: string
}
type Props = {
	state: [Store<State>, SetStoreFunction<State>],
	drawBatch: Function,
	refImage: HTMLImageElement,
	refInput: HTMLInputElement,
	refCanvas: HTMLCanvasElement,
}

const Editor = (props: Props) => {
	const [state, setState] = props.state
	let $image = props.refImage
	let $input = props.refInput
	let $canvas = props.refCanvas
	const suffixFilename = () => {
		if (state.name === '') return ''
		const ext = state.name.slice(state.name.lastIndexOf("."))
		return `${state.name.replace(ext, '')}_grid.png`
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
		$image.onload = () => props.drawBatch()
	}
	function handleNumericInput(e: InputEvent, prop: 'cols'|'rows'|'frameWidth'|'gridWidth') {
		const target = e.target as HTMLInputElement
		const value = target.value?.match(/\d+/) || []
		setState(prop, value.length ? parseInt(value[0]) : 0)
	}

	return (
		<>
			<div class="row">
				<label class="w-full">
					<div class="btn mb-2 flex items-center">
						<img src={upFileIcon} alt="up-file" class="h-5 mr-1" />
						Choose image
					</div>
					<input accept="image/*" class="hidden" type="file" ref={$input} onChange={handlePreview} />
				</label>
			</div>
			<hr class="border-yellow-500 my-5" />
			<div class="row">
				<label htmlFor="input-cols" class="flex items-center">
					<img src={colsIcon} alt="cols" class="w-10 h-10 p-1 mr-1" />
					Cols:
				</label>
				<input class="h-10 w-1/4 ml-auto" id="input-cols" type="number" value={state.cols} onInput={e => handleNumericInput(e, 'cols')} />
			</div>
			<div class="row">
				<label htmlFor="input-rows" class="flex items-center">
					<img src={colsIcon} alt="rows" class="w-10 h-10 p-1 mr-1 rotate-90" />
					Rows:
				</label>
				<input class="h-10 w-1/4 ml-auto" id="input-rows" type="number" value={state.rows} onInput={e => handleNumericInput(e, 'rows')} />
			</div>
			<hr class="border-yellow-500 my-5" />
			<div class="row">
				<label htmlFor="input-grid" class="flex items-center">
					<img src={innerIcon} alt="innerLine" class="w-10 h-10 mr-1" />
					Grid:
				</label>
				<input class="h-10 py-0 w-1/4 ml-auto" id="input-grid" type="number" value={state.gridWidth} onInput={e => handleNumericInput(e, 'gridWidth')} />
				<input class="!p-1 ml-1 w-10 h-10 border border-gray-600" type="color" value={state.gridColor} onInput={e => setState('gridColor', e.currentTarget.value)} />
			</div>
			<div class="row">
				<label htmlFor="input-border" class="flex items-center">
					<img src={outerIcon} alt="outerLine" class="w-10 h-10 mr-1" />
					Border:
				</label>
				<input class="h-10 py-0 w-1/4 ml-auto" id="input-border" type="number" value={state.frameWidth} onInput={e => handleNumericInput(e, 'frameWidth')} />
				<input class="!p-1 ml-1 w-10 h-10 border border-gray-600" type="color" value={state.frameColor} onInput={e => setState('frameColor', e.currentTarget.value)} />
			</div>
			<hr class="border-yellow-500 my-5" />
			<label htmlFor="input-download" class="mx-3">Save as:</label>
			<div className="flex mx-3">
				<input class="w-full" id="input-download" type="text" value={state.name} onInput={e => setState('name', e.currentTarget.value)} />
				<button class="btn ml-1" onClick={handleDownload}>Download</button>
			</div>
		</>
	)
}

export default Editor