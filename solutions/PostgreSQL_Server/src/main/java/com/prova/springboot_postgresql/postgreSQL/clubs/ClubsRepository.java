package com.prova.springboot_postgresql.postgreSQL.clubs;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for the Clubs entity.
 * Used for handling CRUD operations and custom queries.
 */
@Repository
public interface ClubsRepository extends JpaRepository<Clubs, String> {

    /**
     * Query to find a club by name
     * @param name The name of the club to search for
     * @return An Optional containing the club with the name passed as parameter if found.
     */
    Optional<Clubs> findClubByName(String name);

    /**
     * Query to find a club by id
     * @param id The id of the club to search for
     * @return An Optional containing the club with the id passed as parameter if found.
     */
    @Query("SELECT c FROM Clubs c WHERE c.id = :id")
    Optional<Clubs> findClubById(Integer id);

    /**
     * Query to find the best clubs based on the total highest market value of their players in the last season
     * @param pageable Pageable object to handle pagination
     * @return A list of Clubs with the total highest market value.
     */
    @Query("SELECT c.id, c.name, SUM(p.highestMarketValueInEur) AS total_highest_market_value " +
            "FROM Players p " +
            "JOIN Clubs c ON p.currentClubId = c.id " +
            "WHERE p.lastSeason = 2023 " +
            "GROUP BY c.id, c.name " +
            "ORDER BY total_highest_market_value DESC")
    List<Object[]> findBestClubs(Pageable pageable);

    /**
     * Query to find all clubs ordered by name
     * @return A list of all clubs ordered by name.
     */
    @Query("SELECT c FROM Clubs c ORDER BY c.name ASC")
    List<Clubs> findAllClubs();

}
