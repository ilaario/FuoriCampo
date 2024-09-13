package com.prova.springboot_postgresql.postgreSQL.game_lineups;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for the GameLineups entity.
 * Used for handling CRUD operations and custom queries.
 */
@Repository
public interface GameLineupsRepository extends JpaRepository<GameLineups, String> {

    /**
     * Query to find all game lineups by game id
     * @param game_id The id of the game to search for
     * @return A list of GameLineups with the game id passed as parameter.
     */
    List<GameLineups> findGameLineupsByGameId(Integer game_id);

    /**
     * Query to find all game lineups by club id
     * @param club_id The id of the club to search for
     * @return A list of GameLineups with the club id passed as parameter.
     */
    List<GameLineups> findGameLineupsByClubId(Integer club_id);

    /**
     * Query to find all game lineups by player id
     * @param player_id The id of the player to search for
     * @return A list of GameLineups with the player id passed as parameter.
     */
    List<GameLineups> findGameLineupsByPlayerId(String player_id);

    /**
     * Query to find all game lineups by player name
     * @param player_name The name of the player to search for
     * @return A list of GameLineups with the player name passed as parameter.
     */
    List<GameLineups> findGameLineupsByPlayerName(String player_name);
}
