// Токен администратора (вход по логину и паролю). localStorage может быть недоступен — оборачиваем в try/catch
const KEY = 'rankoff_admin_token'

export const getAdminToken = () => {
	try {
		return localStorage.getItem(KEY)
	} catch {
		return null
	}
}

export const setAdminToken = (token) => {
	try {
		localStorage.setItem(KEY, token)
	} catch {}
}

export const clearAdminToken = () => {
	try {
		localStorage.removeItem(KEY)
	} catch {}
}

export const adminAuthHeaders = () => {
	const token = getAdminToken()
	return token ? { Accept: 'application/json', Authorization: `Bearer ${token}` } : { Accept: 'application/json' }
}
