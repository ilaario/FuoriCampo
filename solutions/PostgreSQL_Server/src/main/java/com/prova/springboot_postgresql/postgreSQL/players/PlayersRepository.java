package com.prova.springboot_postgresql.postgreSQL.players;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for the Players entity.
 * Used for handling CRUD operations and custom queries.
 */
@Repository
public interface PlayersRepository extends JpaRepository<Players, String> {

    /**
     * Query to find a player by its id
     * @param player_id The id of the player to search for
     * @return An Optional containing the player with the id passed as parameter if found.
     */
    Optional<Players> findPlayerById(Integer player_id);

    /**
     * Query to find a player by its name
     * @param name The name of the player to search for
     * @return A list of players with the name passed as parameter if found.
     */
    List<Players> findPlayerByName(String name);

    /**
     * Query to find a player by its country of citizenship
     * @param country_of_citizenship The country of citizenship of the player to search for
     * @return A list of players with the country of citizenship passed as parameter if found.
     */
    List<Players> findPlayerByCountryOfCitizenship(String country_of_citizenship);

    /**
     * Query to find a player by its position
     * @param position The position of the player to search for
     * @return A list of players with the position passed as parameter if found.
     */
    List<Players> findPlayerByPosition(String position);

    /**
     * Query to find a player by its current club domestic competition id
     * @param current_club_domestic_competition_id The current club domestic competition id of the player to search for
     * @return A list of players with the current club domestic competition id passed as parameter if found.
     */
    List<Players> findPlayerByCurrentClubDomesticCompetitionId(String current_club_domestic_competition_id);

    /**
     * Query to find a player by its current club name
     * @param current_club_name The current club name of the player to search for
     * @return A list of players with the current club name passed as parameter if found.
     */
    List<Players> findPlayerByCurrentClubName(String current_club_name);

    /**
     * Query to find a player by its birth year
     * @param year The birth year of the player to search for
     * @return A list of players with the birth year passed as parameter if found.
     */
    @Query("SELECT p FROM Players p WHERE EXTRACT(YEAR FROM p.dateOfBirth) = :year")
    List<Players> findPlayerByBirthYear(@Param("year") int year);

    /**
     * Query to find the top 10 players with the highest market value
     * @param pageable Pageable object to handle pagination
     * @return A list of the top 10 players with the highest market value.
     */
    @Query("SELECT p FROM Players p WHERE p.highestMarketValueInEur IS NOT NULL ORDER BY p.highestMarketValueInEur DESC")
    List<Players> findTop10PlayersWithValue(Pageable pageable);

    /**
     * Query to find a player by its current club id
     * @param current_club_id The current club id of the player to search for
     * @return A list of players with the current club id passed as parameter if found.
     */
    List<Players> findPlayerByCurrentClubId(Integer current_club_id);

    /**
     * Query to find all players ordered by name
     * @return A list of all players ordered by name.
     */
    @Query("SELECT p FROM Players p ORDER BY p.name ASC")
    List<Players> findAllPlayers();

}
