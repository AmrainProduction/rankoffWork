import React, { useState } from 'react'
import classes from './updateRoster.module.css'
import { useGetTeamsQuery, useUpdateAdminRosterMutation } from '../../../store/api/apiSlice'
import PlayerSelector from '../../UI/PlayerSelector/playerSelector'
import TeamSelector from '../../UI/TeamSelector/teamSelector'

const SLOTS = [0, 1, 2, 3, 4]
const PLACEHOLDER_ID = 200 // заглушка пустого слота, может повторяться

const UpdateRoster = () => {
	const listTeams = useGetTeamsQuery()
	const [updateRoster, { isLoading: isSaving }] = useUpdateAdminRosterMutation()

	const [players, setPlayers] = useState([null, null, null, null, null])
	const [team, setTeam] = useState(null)
	const [status, setStatus] = useState(null) // { ok: bool, text }

	const selectTeam = (value) => {
		setTeam(value)
		setPlayers([null, null, null, null, null]) // слоты нового состава заполнятся из выбранной команды
		setStatus(null)
	}

	const selectPlayer = (index) => (player) => {
		setPlayers((prev) => prev.map((p, i) => (i === index ? player : p)))
		setStatus(null)
	}

	// Пустой слот — заглушка 200
	const ids = players.map((p) => p?.player_id ?? PLACEHOLDER_ID)
	const hasTeam = team && Object.keys(team).length > 0
	const real = ids.filter((id) => id !== PLACEHOLDER_ID)
	const hasDuplicates = new Set(real).size !== real.length
	const isReady = hasTeam && !hasDuplicates

	const submit = async () => {
		if (!isReady || isSaving) return
		setStatus(null)
		try {
			await updateRoster({ teamId: team.team_id, players: ids }).unwrap()
			setStatus({ ok: true, text: 'Roster saved' })
			listTeams.refetch()
		} catch (error) {
			setStatus({ ok: false, text: error?.data?.message || 'Failed to save the roster, try again' })
		}
	}

	return (
		<div className={classes.wrapperMenu}>
			<div>
				<div className={classes.addPlayers}>
					<TeamSelector label={'Team:'} onSelect={selectTeam} />
					{hasTeam && SLOTS.map((i) => <PlayerSelector key={`${team.team_id}-${i}`} label={`Player #${i + 1}:`} onSelect={selectPlayer(i)} defaultPlayerValue={team[`player_${i + 1}_id`]} />)}

					{hasDuplicates && <div style={{ color: '#bd5d5d' }}>The same player is selected twice</div>}
					{status && <div style={{ color: status.ok ? '#7db489' : '#bd5d5d' }}>{status.text}</div>}

					<div className={classes.btnSaveAsImage} style={{ opacity: isReady && !isSaving ? 1 : 0.4 }} onClick={submit}>
						{isSaving ? 'Saving...' : 'Save'}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UpdateRoster
