import { Component } from "solid-js"
import { Link } from "solid-app-router"
import amogus from '../assets/amogus.txt?raw'

const NotFound: Component = () => {
	return (
		<div class="flex items-center justify-center h-screen overflow-y-hidden bg-yellow-50">
			<div>
				<h1 class="text-6xl text-black">404</h1>
				<Link href="/">&larr; Back to home</Link>
				<div innerText={amogus}></div>
			</div>
		</div>
	)
}

export default NotFound