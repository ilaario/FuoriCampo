package com.prova.springboot_postgresql.postgreSQL.player_valuations;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for the PlayerValuations entity.
 * Used for handling business logic and communicating with the repository.
 */
@Service
public class PlayerValuationsService {

    private final PlayerValuationsRepository playerValuationsRepository;

    public PlayerValuationsService(PlayerValuationsRepository playerValuationsRepository) {
        this.playerValuationsRepository = playerValuationsRepository;
    }

    /**
     * Method to get a player valuation by id
     * @param id The id of the player valuation to search for
     * @return An Optional containing the player valuation with the id passed as parameter if found.
     */
    public Optional<PlayerValuations> getPlayerValuationById(Long id){
        return playerValuationsRepository.findPlayerValuationById(id);
    }

    /**
     * Method to get a player valuation by last season
     * @param last_season The last season of the player valuation to search for
     * @return A list of player valuations with the last season passed as parameter.
     */
    public List<PlayerValuations> getPlayerValuationByLastSeason(Integer last_season){
        return playerValuationsRepository.findPlayerValuationByLastSeason(last_season);
    }

    /**
     * Method to get a player valuation by market value
     * @param market_value_in_eur The market value of the player valuation to search for
     * @return A list of player valuations with the market value passed as parameter.
     */
    public List<PlayerValuations> getPlayerValuationsByMarketValueInEur(Integer market_value_in_eur){
        return playerValuationsRepository.findPlayerValuationsByMarketValueInEur(market_value_in_eur);
    }
}
