const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				'sea-pink': {
					// sea-pink
					50: '#fdf3f4',
					100: '#fbe8eb',
					200: '#f6d5da',
					300: '#ea9daa',
					400: '#e58799',
					500: '#d75c77',
					600: '#c13d60',
					700: '#a22e4f',
					800: '#882947',
					900: '#752642'
				},

				primary: {
					// electric-violet
					50: '#f3f1ff',
					100: '#ebe5ff',
					200: '#d9ceff',
					300: '#bea6ff',
					400: '#9f75ff',
					500: '#843dff',
					600: '#7916ff',
					700: '#6b04fd',
					800: '#5a03d5',
					900: '#4b05ad'
				},

				mendy: {
					// mendy
					50: '#fef2f3',
					100: '#fde6e7',
					200: '#fbd0d5',
					300: '#f7aab2',
					400: '#f27a8a',
					500: '#ea546c',
					600: '#d5294d',
					700: '#b31d3f',
					800: '#961b3c',
					900: '#811a39'
				},
				quartz: {
					50: '#f7f7f8',
					100: '#efedf1',
					200: '#d9d8df',
					300: '#b9b6c3',
					400: '#928ea2',
					500: '#757087',
					600: '#5f5a6f',
					700: '#4d4959',
					800: '#43404c',
					900: '#3b3842'
				},
				blue: {
					50: '#eef2ff',
					100: '#e1e7fe',
					200: '#c8d4fd',
					300: '#a7b6fa',
					400: '#8490f5',
					500: '#6d71ee',
					600: '#524ae1',
					700: '#453cc6',
					800: '#3933a0',
					900: '#32307f'
				},
				amberTest: {
					50: '#fdfaed',
					100: '#f8f0cd',
					200: '#f1e096',
					300: '#ecd06f',
					400: '#e5b73a',
					500: '#dd9a23',
					600: '#c3771c',
					700: '#a2561b',
					800: '#84441c',
					900: '#6d391a'
				},
				amaranth: {
					// amaranth
					50: '#fff1f4',
					100: '#ffe3e8',
					200: '#ffcbd8',
					300: '#ffa1b8',
					400: '#ff6d94',
					500: '#fa3972',
					600: '#e91f64',
					700: '#c40c4f',
					800: '#a40d49',
					900: '#8c0f45'
				},
				info: {
					50: '#f0f3ff',
					100: '#e4e9ff',
					200: '#cdd6ff',
					300: '#a5b2ff',
					400: '#7280ff',
					500: '#3a43ff',
					600: '#1612ff',
					700: '#0101ff',
					800: '#0000c8',
					900: '#0202b0'
				},
				success: {
					50: '#ecfdf3',
					100: '#d1fae1',
					200: '#a7f3c9',
					300: '#6ee7ac',
					400: '#34d38b',
					500: '#0fa968',
					600: '#05965c',
					700: '#04784c',
					800: '#065f3e',
					900: '#064e34'
				},
				warning: {
					50: '#feffe7',
					100: '#fbffc1',
					200: '#fcff86',
					300: '#fffc41',
					400: '#ffef0d',
					500: '#ffe100',
					600: '#d1a600',
					700: '#a67802',
					800: '#895d0a',
					900: '#744c0f'
				},
				danger: {
					50: '#fff0f0',
					100: '#ffdddd',
					200: '#ffc1c1',
					300: '#ff9595',
					400: '#ff5959',
					500: '#ff2626',
					600: '#fc0606',
					700: '#c80000',
					800: '#af0505',
					900: '#900c0c'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
