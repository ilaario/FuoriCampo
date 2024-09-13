package com.prova.springboot_postgresql.postgreSQL.player_valuations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for the PlayerValuations entity.
 * Used for handling CRUD operations and custom queries.
 */
@Repository
public interface PlayerValuationsRepository extends JpaRepository<PlayerValuations, Long> {

    /**
     * Query to find a player valuation by id
     * @param id The id of the player valuation to search for
     * @return An Optional containing the player valuation with the id passed as parameter if found.
     */
    Optional<PlayerValuations> findPlayerValuationById(Long id);

    /**
     * Query to find a player valuation by last season
     * @param last_season The last season of the player valuation to search for
     * @return A list of player valuations with the last season passed as parameter.
     */
    List<PlayerValuations> findPlayerValuationByLastSeason(Integer last_season);

    /**
     * Query to find a player valuation by market value
     * @param market_value_in_eur The market value of the player valuation to search for
     * @return A list of player valuations with the market value passed as parameter.
     */
    List<PlayerValuations> findPlayerValuationsByMarketValueInEur(Integer market_value_in_eur);
}
