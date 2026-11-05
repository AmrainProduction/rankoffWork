// Меню админки. Пункт виден, если у администратора есть право на его страницу (см. requiredPermission в adminAccess.js).
// hideWhen — дополнительно скрыть пункт (например, дубль страницы для тех, у кого есть полное право).
import { can } from './adminAccess'

const hasMaps = (admin) => can(admin, 'maps')

export const ADMIN_MENU = [
	{
		id: 'data',
		title: 'Data',
		items: [
			{ label: 'PLAYERS', path: '/a/PLAYERS' },
			{ label: 'TEAMS', path: '/a/TEAMS' },
			{ label: 'TOURNAMENTS', path: '/a/TOURNAMENTS' },
			{ label: 'ADDMATCHES', path: '/a/ADDMATCHES' },
			{ label: 'TOURNAMENT_MATCHES', path: '/a/TOURNAMENT_MATCHES', hideWhen: hasMaps },
			{ label: 'ADD_SHORT_MATCHES', path: '/a/ADD_SHORT_MATCHES' },
			{ label: 'ADD_TEAMS_TOUR', path: '/a/ADD_TEAMS_TOUR' },
			{ label: 'UPDATE_ROSTER', path: '/a/UPDATE_ROSTER' },
			{ label: 'TOURNAMENT_ROSTERS', path: '/a/TOURNAMENT_ROSTERS' },
			{ label: 'POLLS', path: '/a/POLLS' },
		],
	},
	{
		id: 'banners',
		title: 'Banners',
		items: [
			{ label: 'TOP_PLAYERS_TOUR', path: '/a/TOP_PLAYERS_TOUR' },
			{ label: 'MVP_PLAYER_TOUR', path: '/a/MVP_PLAYER_TOUR' },
			{ label: 'STATS_PLAYER_TOUR', path: '/a/STATS_PLAYER_TOUR' },
			{ label: 'RANKING_TEAMS', path: '/a/RANKING_TEAMS' },
			{ label: 'MATCHES', path: '/a/MATCHES' },
			{ label: 'MATCHESDAY', path: '/a/MATCHESDAY' },
			{ label: 'RCL/MATCHES_STATS', path: '/a/RCL/MATCHES_STATS' },
			{ label: 'COMPARE_PLAYERS', path: '/a/COMPARE_PLAYERS' },
			{ label: 'COMPARE_TOPS', path: '/a/COMPARE_TOPS' },
			{ label: 'METRICS_PLAYER', path: '/a/METRICS_PLAYER' },
			{ label: 'PREDICTORS', path: '/a/PREDICTORS' },
			{ label: 'EMOJI', path: '/i/EMOJI' },
			{ label: 'EMOJI_PLAYERS', path: '/i/EMOJI_PLAYERS' },
			{ label: 'EMOJI_EVENTS', path: '/i/EMOJI_EVENTS' },
		],
	},
	{
		id: 'analytics',
		title: 'Analytics',
		items: [{ label: 'CONTEXT', path: '/a/CONTEXT' }],
	},
	{
		id: 'functions',
		title: 'Functions',
		items: [{ label: 'FUNCTIONS', path: '/a/FUNCTIONS' }],
	},
	{
		id: 'admin',
		title: 'Administration',
		items: [
			{ label: 'ADMINS', path: '/a/ADMINS' },
			{ label: 'USERS', path: '/a/USERS' },
			{ label: 'STATS', path: '/a/STATS' },
			{ label: 'LOGS', path: '/a/LOGS' },
			{ label: 'USER_LOGS', path: '/a/USER_LOGS' },
		],
	},
]
