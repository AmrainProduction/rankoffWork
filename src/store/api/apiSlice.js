import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {URL} from '../../URL'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: URL}),
    endpoints: (build) => ({
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
    })
})

export const {
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
} = apiSlice;

