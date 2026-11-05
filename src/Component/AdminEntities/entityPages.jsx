import React, { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import classes from '../AdminAccess/adminAccess.module.css'
import RefreshButton from '../AdminAccess/refreshButton'
import {
	useDeleteAdminEntityMutation,
	useGetPlayersQuery,
	useGetTeamsQuery,
	useGetTournamentsQuery,
	useSaveAdminEntityMutation,
} from '../../store/api/apiSlice'

const IMAGES = 'https://rankoff.org/images'
const MAX_ROWS = 50

const errorMessage = (error) => error?.data?.message || 'Something went wrong, try again'
const day = (v) => (v ? String(v).slice(0, 10) : '')

// Описание сущностей: поля формы и откуда брать список
const ENTITIES = {
	players: {
		title: 'Players',
		single: 'player',
		idKey: 'player_id',
		labelKey: 'nickname',
		newIdLabel: 'Player ID (optional, auto if empty)',
		fields: [
			{ key: 'nickname', label: 'Nickname', required: true },
			{ key: 'name', label: 'Name' },
			{ key: 'surname', label: 'Surname' },
			{ key: 'country_flag', label: 'Country (English name)' },
			{ key: 'date_birth', label: 'Date of birth', type: 'date' },
			{ key: 'logo_player', label: 'Photo file name', type: 'file', dir: 'LogoPlayers' },
			{ key: 'link_vk', label: 'VK link', type: 'url' },
			{ key: 'link_yt', label: 'YouTube link', type: 'url' },
			{ key: 'link_discord', label: 'Discord link', type: 'url' },
			{ key: 'link_telegram', label: 'Telegram link', type: 'url' },
		],
	},
	teams: {
		title: 'Teams',
		single: 'team',
		idKey: 'team_id',
		labelKey: 'name_team',
		newIdLabel: 'Team ID (optional, auto if empty)',
		fields: [
			{ key: 'name_team', label: 'Team name', required: true },
			{ key: 'tag_team', label: 'Tag' },
			{ key: 'logo_team', label: 'Logo file name', type: 'file', dir: 'LogoTeams' },
			{ key: 'link_vk', label: 'VK link', type: 'url' },
			{ key: 'link_yt', label: 'YouTube link', type: 'url' },
			{ key: 'link_discord', label: 'Discord link', type: 'url' },
			{ key: 'link_telegram', label: 'Telegram link', type: 'url' },
		],
	},
	tournaments: {
		title: 'Tournaments',
		single: 'tournament',
		idKey: 'id',
		labelKey: 'name_tour',
		fields: [
			{ key: 'name_tour', label: 'Tournament name', required: true },
			{ key: 'season', label: 'Season' },
			{ key: 'line', label: 'Line' },
			{ key: 'tier', label: 'Tier (1-5)', type: 'number' },
			{ key: 'prize_pool', label: 'Prize pool' },
			{ key: 'date_start', label: 'Start date', type: 'date', required: true },
			{ key: 'date_end', label: 'End date', type: 'date', required: true },
			{ key: 'date_tour', label: 'Dates (free text, shown on site)' },
			{ key: 'logo_tour', label: 'Logo file name', type: 'file', dir: 'LogoAndBannerTour' },
			{ key: 'banner_tour', label: 'Banner file name', type: 'file', dir: 'LogoAndBannerTour' },
			{ key: 'link_vk_tour', label: 'VK link', type: 'url' },
			{ key: 'link_yt_tour', label: 'YouTube link', type: 'url' },
			{ key: 'link_discord_tour', label: 'Discord link', type: 'url' },
			{ key: 'link_telegram_tour', label: 'Telegram link', type: 'url' },
		],
	},
}

const toForm = (cfg, row) => {
	const form = {}
	cfg.fields.forEach((f) => {
		const v = row ? row[f.key] : ''
		form[f.key] = f.type === 'date' ? day(v) : v === null || v === undefined ? '' : String(v)
	})
	return form
}

const Field = ({ field, value, onChange }) => (
	<div style={{ marginBottom: 10 }}>
		<div className={classes.hint}>
			{field.label}
			{field.required ? ' *' : ''}
		</div>
		<div className={classes.row}>
			<input
				className={classes.input}
				style={{ maxWidth: 420 }}
				type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
				min={field.type === 'number' ? 1 : undefined}
				max={field.type === 'number' ? 5 : undefined}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={field.type === 'url' ? 'https://' : field.type === 'file' ? 'file.png' : ''}
				autoComplete="off"
			/>
			{field.type === 'file' && value && /\.(png|jpe?g|svg|webp|gif)$/i.test(value) && (
				<img src={`${IMAGES}/${field.dir}/${encodeURIComponent(value)}`} alt="" style={{ height: 40, maxWidth: 120, objectFit: 'contain' }} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} onLoad={(e) => (e.currentTarget.style.visibility = 'visible')} />
			)}
		</div>
		{field.type === 'file' && <div className={classes.hint}>Put the file into images/{field.dir} on the site manually first.</div>}
	</div>
)

const EntityPage = ({ entity, query }) => {
	const cfg = ENTITIES[entity]
	const { admin } = useOutletContext()
	const { data, isLoading, isFetching, refetch } = query({}, { refetchOnMountOrArgChange: true })
	const [save, { isLoading: saving }] = useSaveAdminEntityMutation()
	const [remove, { isLoading: removing }] = useDeleteAdminEntityMutation()

	const [search, setSearch] = useState('')
	const [selected, setSelected] = useState(null) // null — ничего, 'new' — создание, иначе строка
	const [form, setForm] = useState({})
	const [newId, setNewId] = useState('')
	const [error, setError] = useState('')
	const [okText, setOkText] = useState('')
	const [usage, setUsage] = useState(null)

	const list = useMemo(() => {
		const rows = Array.isArray(data) ? data : []
		const q = search.trim().toLowerCase()
		const filtered = q ? rows.filter((r) => String(r[cfg.labelKey] ?? '').toLowerCase().includes(q)) : rows
		return filtered
	}, [data, search, cfg.labelKey])

	useEffect(() => {
		setSelected(null)
		setSearch('')
		setError('')
		setOkText('')
		setUsage(null)
	}, [entity])

	const open = (row) => {
		setSelected(row)
		setForm(toForm(cfg, row === 'new' ? null : row))
		setNewId('')
		setError('')
		setOkText('')
		setUsage(null)
	}

	const isNew = selected === 'new'

	const submit = async (e) => {
		e.preventDefault()
		setError('')
		setOkText('')
		setUsage(null)
		const body = { ...form }
		if (entity === 'tournaments') {
			body.tier = body.tier === '' ? null : Number(body.tier)
		}
		if (isNew && newId.trim() && cfg.newIdLabel) {
			body[cfg.idKey] = Number(newId)
		}
		const result = await save({ entity, id: isNew ? null : selected[cfg.idKey], body })
		if (result.error) {
			setError(errorMessage(result.error))
			return
		}
		setOkText(isNew ? 'Created' : 'Saved')
		const fresh = await refetch()
		if (isNew) {
			const createdId = result.data?.[cfg.idKey] ?? result.data?.id
			const row = (fresh.data || []).find((r) => String(r[cfg.idKey]) === String(createdId))
			if (row) {
				setSelected(row)
				setForm(toForm(cfg, row))
			} else {
				setSelected(null)
			}
		} else {
			const row = (fresh.data || []).find((r) => String(r[cfg.idKey]) === String(selected[cfg.idKey]))
			if (row) setSelected(row)
		}
	}

	const del = async () => {
		if (!window.confirm(`Delete ${cfg.single} "${selected[cfg.labelKey]}"? This cannot be undone.`)) return
		setError('')
		setOkText('')
		setUsage(null)
		const result = await remove({ entity, id: selected[cfg.idKey] })
		if (result.error) {
			setError(errorMessage(result.error))
			setUsage(result.error?.data?.usage || null)
			return
		}
		setSelected(null)
		setOkText('Deleted')
		refetch()
	}

	return (
		<div className={`${classes.card} ${classes.page}`}>
			<h2 className={classes.title}>{cfg.title}</h2>
			<div className={classes.row} style={{ marginBottom: 12 }}>
				<input className={classes.input} style={{ maxWidth: 320 }} placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
				<button type="button" className={classes.btnDark} onClick={() => open('new')}>
					Create {cfg.single}
				</button>
				<RefreshButton onClick={refetch} spinning={isFetching} />
			</div>

			{isLoading && <div className={classes.hint}>Loading...</div>}

			{!selected && (
				<div>
					<div className={classes.hint}>
						{list.length > MAX_ROWS ? `Showing first ${MAX_ROWS} of ${list.length}, refine the search` : `${list.length} found`}
					</div>
					<table className={classes.table}>
						<tbody>
							{list.slice(0, MAX_ROWS).map((r) => (
								<tr key={r[cfg.idKey]}>
									<td>{r[cfg.labelKey]}</td>
									<td style={{ opacity: 0.6 }}>{entity === 'tournaments' ? r.name_tour_sort : `#${r[cfg.idKey]}`}</td>
									<td>
										<span className={classes.link} onClick={() => open(r)}>
											edit
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{okText && <div className={classes.ok}>{okText}</div>}
				</div>
			)}

			{selected && (
				<form onSubmit={submit}>
					<div className={classes.row} style={{ marginBottom: 10 }}>
						<strong>{isNew ? `New ${cfg.single}` : selected[cfg.labelKey]}</strong>
						<span className={classes.link} onClick={() => setSelected(null)}>
							back to list
						</span>
					</div>
					{!isNew && entity === 'tournaments' && <div className={classes.hint}>Key: {selected.name_tour_sort} (generated, does not change on rename)</div>}
					{isNew && cfg.newIdLabel && (
						<div style={{ marginBottom: 10 }}>
							<div className={classes.hint}>{cfg.newIdLabel}</div>
							<input className={classes.input} style={{ maxWidth: 160 }} type="number" min={1} value={newId} onChange={(e) => setNewId(e.target.value)} />
						</div>
					)}
					{cfg.fields.map((f) => (
						<Field key={f.key} field={f} value={form[f.key] ?? ''} onChange={(v) => setForm({ ...form, [f.key]: v })} />
					))}
					{!isNew && <div className={classes.hint}>Renaming or changing a logo also updates the same value in matches, rosters and statistics.</div>}
					<div className={classes.row} style={{ marginTop: 10 }}>
						<button type="submit" className={classes.btn} disabled={saving}>
							{saving ? 'Saving...' : isNew ? 'Create' : 'Save'}
						</button>
						{!isNew && admin?.is_super && (
							<button type="button" className={classes.btnDark} disabled={removing} onClick={del}>
								Delete
							</button>
						)}
					</div>
					{error && <div className={classes.error}>{error}</div>}
					{usage && (
						<ul>
							{Object.entries(usage).map(([k, v]) => (
								<li key={k}>
									{k}: {v}
								</li>
							))}
						</ul>
					)}
					{okText && <div className={classes.ok}>{okText}</div>}
				</form>
			)}
		</div>
	)
}

export const PlayersPage = () => <EntityPage entity="players" query={useGetPlayersQuery} />
export const TeamsPage = () => <EntityPage entity="teams" query={useGetTeamsQuery} />
export const TournamentsPage = () => <EntityPage entity="tournaments" query={useGetTournamentsQuery} />
