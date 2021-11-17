export default {
	workbox: {
		globPatterns: [
			'**/*.{js,css,html,svg,png,jpg}',
		]
	},
	includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
	manifest: {
		name: 'Gridy',
		short_name: 'Gridy',
		description: 'Add grid to image',
		icons: [
			{
				"src": "/android-chrome-192x192.png",
				"sizes": "192x192",
				"type": "image/png"
			},
			{
				"src": "/android-chrome-512x512.png",
				"sizes": "512x512",
				"type": "image/png"
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable',
			}
		],
		theme_color: "#ffffff",
		background_color: "#ffffff",
		display: "standalone",
	}
}