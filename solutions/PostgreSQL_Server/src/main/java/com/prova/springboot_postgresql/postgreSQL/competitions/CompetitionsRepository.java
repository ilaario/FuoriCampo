package com.prova.springboot_postgresql.postgreSQL.competitions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for the Competitions entity.
 * Used for handling CRUD operations and custom queries.
 */
@Repository
public interface CompetitionsRepository extends JpaRepository<Competitions, String> {

    /**
     * Query to find a competition by id
     * @param competition_id The id of the competition to search for
     * @return An Optional containing the competition with the id passed as parameter if found.
     */
    Optional<Competitions> findCompetitionByCompetitionId(String competition_id);

    /**
     * Query to find a competition by name
     * @param name The name of the competition to search for
     * @return An Optional containing the competition with the name passed as parameter if found.
     */
    Optional<Competitions> findCompetitionByName(String name);

    /**
     * Query to find a competition by country name
     * @param country_name The country name of the competition to search for
     * @return A list of competitions with the country name passed as parameter.
     */
    List<Competitions> findCompetitionsByCountryName(String country_name);

    /**
     * Query to find a competition by type
     * @param type The type of the competition to search for
     * @return A list of competitions with the type passed as parameter.
     */
    @Query("SELECT c.competitionId, c.competitionCode FROM Competitions c WHERE c.type = :type")
    List<Object[]> findCompetitionsByType(@Param("type") String type);

    /**
     * Query to find all competitions
     * @return A list of all competitions.
     */
    @Query("SELECT c.competitionId, c.competitionCode FROM Competitions c")
    List<Object[]> findAllCompetitionsDTO();

    /**
     * Query to find all distinct types of competitions
     * @return A list of all distinct types of competitions.
     */
    @Query("SELECT DISTINCT c.type FROM Competitions c")
    List<String> findDistinctTypes();

    /**
     * Query to find id, name and country name of all competitions
     * @return A list of all distinct country names of competitions.
     */
    @Query("SELECT c.competitionId, c.name, c.countryName FROM Competitions c")
    List<Object[]> findCompetitionIdNameAndCountryName();
}
