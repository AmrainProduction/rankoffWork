// iOS Safari приближает страницу, когда фокус попадает в поле со шрифтом меньше 16px, и после ввода не возвращает масштаб.
// Пока фокус в поле, запрещаем масштабирование в meta viewport, после потери фокуса возвращаем исходное значение:
// автозума нет, а щипок для масштаба в остальное время работает.
const FIELD = 'input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=button]):not([type=submit]), textarea, select'

export const preventInputZoom = () => {
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
	const meta = document.querySelector('meta[name="viewport"]')
	if (!isIOS || !meta) return

	const original = meta.getAttribute('content')
	const locked = `${original}, maximum-scale=1`

	const unlock = () => meta.setAttribute('content', original)
	const lock = (e) => {
		if (!(e.target instanceof Element)) return
		if (e.target.matches(FIELD)) {
			meta.setAttribute('content', locked)
		} else if (e.target.closest('[data-lock-zoom]')) {
			// Кнопка, которая программно ставит фокус в поле (поиск в навбаре на телефоне): запрещаем зум заранее,
			// а если фокус в поле так и не оказался, масштаб возвращаем
			meta.setAttribute('content', locked)
			setTimeout(() => {
				if (!(document.activeElement instanceof Element && document.activeElement.matches(FIELD))) unlock()
			}, 1500)
		}
	}

	// touchstart срабатывает раньше focus: к моменту фокуса зум уже запрещён
	document.addEventListener('touchstart', lock, { passive: true, capture: true })
	document.addEventListener('focusin', lock)
	document.addEventListener('focusout', unlock)
}
