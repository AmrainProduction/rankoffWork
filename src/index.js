import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { preventInputZoom } from './Function/preventInputZoom'

// Тема цветов баннеров: '' — основная, 'major' — оформление мажора (палитры в App.css)
const BANNER_THEME = 'major'
if (BANNER_THEME) document.documentElement.dataset.bannerTheme = BANNER_THEME

preventInputZoom()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>,
	// </React.StrictMode>
)
