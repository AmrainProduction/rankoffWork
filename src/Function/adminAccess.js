// Какое право нужно для страницы админки. Список прав совпадает с Admin::PERMISSIONS на сервере (app/Models/Admin.php).
// 'super' — только суперадмин, null — любой вошедший администратор.
// Страницы, которых нет в списках, по умолчанию относятся к 'banners'.
export const PERMISSION_LABELS = {
	polls: 'Polls',
	data: 'All Data sections (players, teams, tournaments, maps, matches, rosters, RCL)',
	players: 'Data: players',
	teams: 'Data: teams',
	tournaments: 'Data: tournaments',
	maps: 'Data: maps entry (any tournament)',
	short_matches: 'Data: tournament matches',
	tournament_teams: 'Data: tournament teams',
	rosters: 'Data: team rosters',
	rcl: 'Data: RCL match stats',
	banners: 'Banners and tops',
	tournament_matches: 'Match entry for assigned tournaments only',
}

// Право на каждую страницу. Список прав совпадает с Admin::PERMISSIONS на сервере.
const PAGE_PERMISSIONS = {
	'/a/POLLS': 'polls',
	'/a/PLAYERS': 'players',
	'/a/TEAMS': 'teams',
	'/a/TOURNAMENTS': 'tournaments',
	'/a/ADDMATCHES': 'maps',
	'/a/ADD_SHORT_MATCHES': 'short_matches',
	'/a/ADD_TEAMS_TOUR': 'tournament_teams',
	'/a/UPDATE_ROSTER': 'rosters',
	'/a/RCL/MATCHES_STATS': 'rcl',
	// Внесение карт для внешних админов турниров: подходит и право на карты, и право на назначенные турниры
	'/a/TOURNAMENT_MATCHES': ['maps', 'tournament_matches'],
}
const SUPER = ['/a/ADMINS', '/a/LOGS', '/a/FUNCTIONS']
const ANY = ['/a/ACCOUNT']

// 'data' целиком включает эти права (как Admin::DATA_PERMISSIONS на сервере)
const DATA_PERMISSIONS = ['players', 'teams', 'tournaments', 'maps', 'short_matches', 'tournament_teams', 'rosters', 'rcl']

const startsWithAny = (pathname, list) => list.some((p) => pathname === p || pathname.startsWith(p + '/'))

export const requiredPermission = (pathname) => {
	if (pathname === '/a' || pathname === '/a/') return null
	if (startsWithAny(pathname, SUPER)) return 'super'
	if (startsWithAny(pathname, ANY)) return null
	const key = Object.keys(PAGE_PERMISSIONS).find((p) => pathname === p || pathname.startsWith(p + '/'))
	if (key) return PAGE_PERMISSIONS[key]
	return 'banners'
}

// Есть ли у администратора конкретное право (с учётом 'data' и суперадмина)
export const can = (admin, permission) => {
	if (admin.is_super) return true
	if (permission === 'super') return false
	return admin.permissions.includes(permission) || (admin.permissions.includes('data') && DATA_PERMISSIONS.includes(permission))
}

// permission — одно право, список прав (достаточно любого) или null (любой администратор)
export const hasAccess = (admin, permission) => {
	if (!permission) return true
	if (admin.is_super) return true
	const list = Array.isArray(permission) ? permission : [permission]
	return list.some((p) => can(admin, p))
}
