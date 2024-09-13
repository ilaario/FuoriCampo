package com.prova.springboot_postgresql.postgreSQL.player_valuations;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class that handles the HTTP requests for the PlayerValuations entity.
 * Provides endpoints for retrieving player valuations information.
 */
@RestController
@RequestMapping("/playerValuations") //Mapping the controller to /playerValuations
public class PlayerValutationsController {

    private final PlayerValuationsService playerValuationsService;

    public PlayerValutationsController(PlayerValuationsService playerValuationsService) {
        this.playerValuationsService = playerValuationsService;
    }

    /**
     * Method that returns the player valuation with the id passed as parameter
     * @param id The id of the player valuation to search for
     * @return ResponseEntity containing the player valuation with the id passed as parameter or a 404 status code if the player valuation is not found
     */
    @GetMapping("/getPlayerValuationById")
    public ResponseEntity<PlayerValuations> getPlayerValuationById(@RequestParam Long id) {
        Optional<PlayerValuations> playerValuation = playerValuationsService.getPlayerValuationById(id);
        return playerValuation.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Method that returns the player valuation with the last season passed as parameter
     * @param last_season The last season of the player valuation to search for
     * @return ResponseEntity containing a list of player valuations with the last season passed as parameter or a 404 status code if no player valuations are found
     */
    @GetMapping("/getPlayerValuationByLastSeason")
    public ResponseEntity<List<PlayerValuations>> getPlayerValuationByLastSeason(@RequestParam Integer last_season) {
        List<PlayerValuations> playerValuations = playerValuationsService.getPlayerValuationByLastSeason(last_season);
        if (playerValuations.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(playerValuations);
        }
    }

    /**
     * Method that returns the player valuation with the market value passed as parameter
     * @param market_value_in_eur The market value of the player valuation to search for
     * @return ResponseEntity containing a list of player valuations with the market value passed as parameter or a 404 status code if no player valuations are found
     */
    @GetMapping("/getPlayerValuationsByMarketValue")
    public ResponseEntity<List<PlayerValuations>> getPlayerValuationsByMarketValueInEur(@RequestParam Integer market_value_in_eur) {
        List<PlayerValuations> playerValuations = playerValuationsService.getPlayerValuationsByMarketValueInEur(market_value_in_eur);
        if (playerValuations.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(playerValuations);
        }
    }
}


