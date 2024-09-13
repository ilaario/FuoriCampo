package com.prova.springboot_postgresql.postgreSQL.game_lineups;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for the GameLineups entity.
 * Used for handling business logic and communicating with the repository.
 */
@Service
public class GameLineupsService {
    private final GameLineupsRepository gameLineupsRepository;

    public GameLineupsService(GameLineupsRepository gameLineupsRepository) {
        this.gameLineupsRepository = gameLineupsRepository;
    }

    /**
     * Method to get a game lineup by game id
     * @param game_id The id of the game to search for
     * @return A list of GameLineups with the game id passed as parameter.
     */
    public List<GameLineups> getGameLineupsByGameId(Integer game_id){
        return gameLineupsRepository.findGameLineupsByGameId(game_id);
    }

    /**
     * Method to get a game lineup by club id
     * @param club_id The id of the club to search for
     * @return A list of GameLineups with the club id passed as parameter.
     */
    public List<GameLineups> getGameLineupsByClubId(Integer club_id){
        return gameLineupsRepository.findGameLineupsByClubId(club_id);
    }

    /**
     * Method to get a game lineup by player id
     * @param player_id The id of the player to search for
     * @return A list of GameLineups with the player id passed as parameter.
     */
    public List<GameLineups> getGameLineupsByPlayerId(String player_id){
        return gameLineupsRepository.findGameLineupsByPlayerId(player_id);
    }

    /**
     * Method to get a game lineup by player name
     * @param player_name The name of the player to search for
     * @return A list of GameLineups with the player name passed as parameter.
     */
    public List<GameLineups> getGameLineupsByPlayerName(String player_name){
        return gameLineupsRepository.findGameLineupsByPlayerName(player_name);
    }
}
