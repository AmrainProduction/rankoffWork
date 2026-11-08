import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {URL} from '../../URL'
import {adminAuthHeaders} from '../../Function/adminAuth'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (build) => ({
        /*-------------- Администраторы --------------*/
        adminLogin: build.mutation({
            query: (body) => ({url: `admin/login`, method: 'POST', body, headers: {Accept: 'application/json'}}),
        }),
        adminMe: build.query({
            query: () => ({url: `admin/me`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        adminLogout: build.mutation({
            query: () => ({url: `admin/logout`, method: 'POST', headers: adminAuthHeaders()}),
        }),
        adminChangePassword: build.mutation({
            query: (body) => ({url: `admin/password`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        getAdmins: build.query({
            query: () => ({url: `admin/admins`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        getAdminAudit: build.query({
            query: (params) => ({url: `admin/audit`, params, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        getAdminTournamentRosters: build.query({
            query: (tour) => ({url: `admin/tournament-rosters/${encodeURIComponent(tour)}`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        saveAdminTournamentRoster: build.mutation({
            query: ({tour, teamId, rows}) => ({url: `admin/tournament-rosters/${encodeURIComponent(tour)}/${teamId}`, method: 'PUT', body: {rows}, headers: adminAuthHeaders()}),
        }),
        getAdminUserLogs: build.query({
            query: (params) => ({url: `admin/user-logs`, params, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        createAdminShortMatches: build.mutation({
            query: (body) => ({url: `admin/short-matches`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        getAdminStages: build.query({
            query: (tour) => ({url: `admin/stages/${encodeURIComponent(tour)}`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        createAdminStage: build.mutation({
            query: (body) => ({url: `admin/stages`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminStage: build.mutation({
            query: (id) => ({url: `admin/stages/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        setAdminStageGroupOrder: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stages/${id}/group-order`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        updateAdminStageSettings: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stages/${id}/settings`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        adminStageToPlayoff: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stages/${id}/to-playoff`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        adminStageSwissNext: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stages/${id}/swiss-next`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        linkAdminStageMatches: build.mutation({
            query: (id) => ({url: `admin/stages/${id}/link-matches`, method: 'POST', headers: adminAuthHeaders()}),
        }),
        updateAdminStageSlot: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stage-slots/${id}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        setAdminStageSlotTeam: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stage-slots/${id}/team`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        setAdminStageSlotWinner: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stage-slots/${id}/winner`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        addAdminStageSlot: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stages/${id}/slots`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        editAdminStageSlot: build.mutation({
            query: ({id, ...body}) => ({url: `admin/stage-slots/${id}/edit`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminStageSlot: build.mutation({
            query: (id) => ({url: `admin/stage-slots/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        unlinkAdminStageSlotMatch: build.mutation({
            query: (id) => ({url: `admin/stage-slots/${id}/unlink-match`, method: 'POST', headers: adminAuthHeaders()}),
        }),
        createAdminStageSlotMatch: build.mutation({
            query: (id) => ({url: `admin/stage-slots/${id}/create-match`, method: 'POST', headers: adminAuthHeaders()}),
        }),
        updateAdminRoster: build.mutation({
            query: ({teamId, players}) => ({url: `admin/teams/${teamId}/roster`, method: 'POST', body: {players}, headers: adminAuthHeaders()}),
        }),
        updateAdminShortMatch: build.mutation({
            query: ({id, ...body}) => ({url: `admin/short-matches/${id}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminShortMatch: build.mutation({
            query: ({id, withMaps}) => ({url: `admin/short-matches/${id}`, method: 'DELETE', body: {with_maps: !!withMaps}, headers: adminAuthHeaders()}),
        }),
        createAdminTournamentTeams: build.mutation({
            query: (body) => ({url: `admin/tournament-teams`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        updateAdminTournamentTeamResults: build.mutation({
            query: (body) => ({url: `admin/tournament-teams/results`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminTournamentTeam: build.mutation({
            query: ({id}) => ({url: `admin/tournament-teams/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        runAdminFunction: build.mutation({
            query: ({name, ...body}) => ({url: `admin/functions/${name}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        getStatsExplorerOptions: build.query({
            query: () => ({url: `admin/stats-explorer/options`, headers: adminAuthHeaders()}),
        }),
        runStatsExplorer: build.mutation({
            query: (body) => ({url: `admin/stats-explorer`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        getAdminSiteStats: build.query({
            query: () => ({url: `admin/site-stats`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        getAdminSiteStatsHistory: build.query({
            query: (range) => ({url: `admin/site-stats/history`, params: {range}, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        getAdminUsers: build.query({
            query: (params) => ({url: `admin/users`, params, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        getAdminUser: build.query({
            query: (id) => ({url: `admin/users/${id}`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        adminUserAction: build.mutation({
            query: ({id, name, body}) => ({url: `admin/users/${id}/${name}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminUser: build.mutation({
            query: (id) => ({url: `admin/users/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        getAdminUserPrefixes: build.query({
            query: () => ({url: `admin/user-prefixes`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        saveAdminUserPrefix: build.mutation({
            query: ({id, body}) => ({url: `admin/user-prefixes${id ? `/${id}` : ''}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminUserPrefix: build.mutation({
            query: (id) => ({url: `admin/user-prefixes/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        saveAdminEntity: build.mutation({
            query: ({entity, id, body}) => ({url: `admin/${entity}${id !== null && id !== undefined ? `/${id}` : ''}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminEntity: build.mutation({
            query: ({entity, id}) => ({url: `admin/${entity}/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        createAdmin: build.mutation({
            query: (body) => ({url: `admin/admins`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        updateAdmin: build.mutation({
            query: ({id, ...body}) => ({url: `admin/admins/${id}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        getShortMatchesLast: build.query({
            query: () => `shortMatch/last`,
        }),
        getMatches: build.query({
            query: () => `matches`,
        }),
        getShortMatch: build.query({
            query: () => `shortMatch`,
        }),
        getShortMatchesTeamByName: build.query({
            query: ({id}) => `shortMatch/Team/${id}`,
        }),
        getShortMatchByName: build.query({
            query: ({name}) => `shortMatch/${name}`,
        }),
        getShortMatchesByTournament: build.query({
            query: ({name}) => `shortMatch/Tournament/${name}`,
        }),
        getTeams: build.query({
            query: () => `teams`,
        }),
        getNecessaryTeam: build.query({
            query: ({id, name}) => `teams/${id}/${name}`,
        }),
        getRankingTeams: build.query({
            query: () => `ranking`,
        }),
        getCurrentRankingTeams: build.query({
            query: ({date}) => `ranking/current/${date}`,
        }),
        getCurrentRankingNecessaryTeam: build.query({
            query: ({date,team}) => `ranking/current/${date}/${team}`,
        }),
        getCurrentRankingNecessaryTeamForAllTime: build.query({
            query: ({id, name}) => `ranking/${id}/${name}`,
        }),
        getAwardsTeamsByName: build.query({
            query: ({id, name}) => `awards/Team/${id}/${name}`,
        }),
        getMatchesByNameTour: build.query({
            query: ({name}) => `matches/${name}`,
        }),
        getMatchesByName: build.query({
            query: ({name}) => `matches/teams/${name}`,
        }),
        getMatchesNecessaryTeam: build.query({
            query: ({id}) => `matches/team/${id}`,
        }),
        getMatchesNecessaryPlayer: build.query({
            query: ({name}) => `/matches/players/${name}`,
        }),
        getPlayers: build.query({
            query: () => `players`,
        }),
        getPlayerByNick: build.query({
            query: ({id, nickname}) => `players/${id}/${nickname}`,
        }),
        getAwardsPlayersByNick: build.query({
            query: ({id,nickname}) => `awards/Player/${id}/${nickname}`,
        }),
        getTournaments: build.query({
            query: () => `tournaments`,
        }),
        getTournamentByName: build.query({
            query: ({name}) => `tournaments/${name}`,
        }),
        getTournamentsLast: build.query({
            query: () => `tournamentsLast`,
        }),
        getLastTopTeam: build.query({
            query: () => `LastTopTeam`,
        }),
        getLastTopTeamPlayers: build.query({
            query: ({team}) => `LastTopTeamPlayers/${team}`,
        }),
        getTeamsTournaments: build.query({
            query: () => `teamsTour`,
        }),
        getPlayersTournaments: build.query({
            query: () => `tourPlayers`,
        }),
        getAwards: build.query({
            query: () => `awards`,
        }),
        getAwardsTournamentsByName: build.query({
            query: ({name}) => `awards/Tour/${name}`,
        }),
        getTeamsTournamentsByName: build.query({
            query: ({name}) => `teamsTour/${name}`,
        }),
        getTeamsTournamentsByNameTeam: build.query({
            query: ({id,name}) => `teamsTour/Team/${id}/${name}`,
        }),
        getPlayersTournamentsByNick: build.query({
            query: ({id,nickname}) => `tourPlayers/Asc/${id}/${nickname}`,
        }),
        getAllPlayersAllTournaments: build.query({
            query: () => `tourPlayers`,
        }),
        getPlayersTournamentsByNickDesc: build.query({
            query: ({id,nickname}) => `tourPlayers/Desc/${id}/${nickname}`,
        }),
        getPlayersTournamentsByNameTour: build.query({
            query: ({nameTour}) => `tourPlayers/Tournament/${nameTour}`,
        }),
        getTop20Players: build.query({
            query: ({name}) => `tourPlayers/Top20Players/${name}`,
        }),
        getPlayersPoints: build.query({
            query: () => `PlayersPoints`,
        }),
        getTeamsPoints: build.query({
            query: () => `TeamsPoints`,
        }),
        getTransferToTeamsPoints: build.query({
            query: ({id, name}) => `TransferPoints/To/${id}/${name}`,
        }),
        getTransferTeamsPoints: build.query({
            query: () => `TransferPoints`,
        }),
        getBackgroundAdvertisement: build.query({
            query: () => `backgroundAdvertisement`,
        }),
        getAdvertisement: build.query({
            query: () => `advertisement`,
        }),
        getAlertMessage: build.query({
            query: () => `alertMessage`,
        }),
        getFooterLinks: build.query({
            query: () => `footerLinks`,
        }),
        // Управление голосованиями (нужно право polls)
        createAdminPoll: build.mutation({
            query: (body) => ({url: `admin/polls`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        updateAdminPoll: build.mutation({
            query: ({id, ...body}) => ({url: `admin/polls/${id}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminPoll: build.mutation({
            query: ({id}) => ({url: `admin/polls/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        getAdminPollResults: build.query({
            query: ({id}) => ({url: `admin/polls/${id}/results`, headers: adminAuthHeaders()}),
            keepUnusedDataFor: 0,
        }),
        // Внесение карт матча (право data или tournament_matches)
        createAdminMatch: build.mutation({
            query: (body) => ({url: `admin/matches`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        deleteAdminMatch: build.mutation({
            query: (id) => ({url: `admin/matches/${id}`, method: 'DELETE', headers: adminAuthHeaders()}),
        }),
        updateAdminMatch: build.mutation({
            query: ({id, ...body}) => ({url: `admin/matches/${id}`, method: 'POST', body, headers: adminAuthHeaders()}),
        }),
        // Голосования (админка): всегда свежие данные
        getPolls: build.query({
            query: () => `polls`,
            keepUnusedDataFor: 0,
        }),
        getPoll: build.query({
            query: ({id}) => `polls/${id}`,
            keepUnusedDataFor: 0,
        }),
    })
})

export const {
    useAddAdminStageSlotMutation,
    useEditAdminStageSlotMutation,
    useDeleteAdminStageSlotMutation,
    useGetStatsExplorerOptionsQuery,
    useRunStatsExplorerMutation,
    useGetTournamentByNameQuery,
    useGetShortMatchesLastQuery,
    useGetShortMatchesTeamByNameQuery,
    useGetTeamsQuery,
    useGetAlertMessageQuery,
    useGetMatchesQuery,
    useGetNecessaryTeamQuery,
    useGetRankingTeamsQuery,
    useGetMatchesByNameTourQuery,
    useGetAllPlayersAllTournamentsQuery,
    useGetCurrentRankingNecessaryTeamQuery,
    useGetCurrentRankingNecessaryTeamForAllTimeQuery,
    useGetCurrentRankingTeamsQuery,
    useGetBackgroundAdvertisementQuery,
    useGetAdvertisementQuery,
    useGetPlayersTournamentsQuery,
    useGetTop20PlayersQuery,
    useGetPlayersTournamentsByNameTourQuery,
    useGetAwardsTeamsByNameQuery,
    useGetAwardsQuery,
    useGetAwardsTournamentsByNameQuery,
    useGetPlayersTournamentsByNickQuery,
    useGetPlayersTournamentsByNickDescQuery,
    useGetMatchesByNameQuery,
    useGetMatchesNecessaryPlayerQuery,
    useGetShortMatchQuery,
    useGetMatchesNecessaryTeamQuery,
    useGetPlayersQuery,
    useGetPlayerByNickQuery,
    useGetShortMatchByNameQuery,
    useGetShortMatchesByTournamentQuery,
    useGetTournamentsQuery,
    useGetAwardsPlayersByNickQuery,
    useGetTournamentsLastQuery,
    useGetLastTopTeamQuery,
    useGetPlayersPointsQuery,
    useGetTransferToTeamsPointsQuery,
    useGetTransferTeamsPointsQuery,
    useGetTeamsPointsQuery,
    useGetLastTopTeamPlayersQuery,
    useGetTeamsTournamentsQuery,
    useGetTeamsTournamentsByNameQuery,
    useGetTeamsTournamentsByNameTeamQuery,
    useGetFooterLinksQuery,
    useGetPollsQuery,
    useGetPollQuery,
    useAdminLoginMutation,
    useAdminMeQuery,
    useAdminLogoutMutation,
    useAdminChangePasswordMutation,
    useGetAdminsQuery,
    useSaveAdminEntityMutation,
    useGetAdminSiteStatsQuery,
    useGetAdminSiteStatsHistoryQuery,
    useGetAdminUsersQuery,
    useGetAdminUserQuery,
    useAdminUserActionMutation,
    useDeleteAdminUserMutation,
    useGetAdminUserPrefixesQuery,
    useSaveAdminUserPrefixMutation,
    useDeleteAdminUserPrefixMutation,
    useDeleteAdminEntityMutation,
    useRunAdminFunctionMutation,
    useCreateAdminTournamentTeamsMutation,
    useUpdateAdminTournamentTeamResultsMutation,
    useDeleteAdminTournamentTeamMutation,
    useUpdateAdminShortMatchMutation,
    useDeleteAdminShortMatchMutation,
    useUpdateAdminRosterMutation,
    useCreateAdminShortMatchesMutation,
    useGetAdminStagesQuery,
    useCreateAdminStageMutation,
    useDeleteAdminStageMutation,
    useLinkAdminStageMatchesMutation,
    useSetAdminStageGroupOrderMutation,
    useUpdateAdminStageSettingsMutation,
    useAdminStageToPlayoffMutation,
    useAdminStageSwissNextMutation,
    useUpdateAdminStageSlotMutation,
    useSetAdminStageSlotTeamMutation,
    useSetAdminStageSlotWinnerMutation,
    useCreateAdminStageSlotMatchMutation,
    useUnlinkAdminStageSlotMatchMutation,
    useGetAdminAuditQuery,
    useGetAdminUserLogsQuery,
    useGetAdminTournamentRostersQuery,
    useSaveAdminTournamentRosterMutation,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useCreateAdminMatchMutation,
    useDeleteAdminMatchMutation,
    useUpdateAdminMatchMutation,
    useCreateAdminPollMutation,
    useUpdateAdminPollMutation,
    useDeleteAdminPollMutation,
    useLazyGetAdminPollResultsQuery,
} = apiSlice;

