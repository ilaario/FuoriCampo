package com.prova.springboot_postgresql.postgreSQL.game_lineups;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class that handles the HTTP requests for the GameLineups entity.
 * Provides endpoints for retrieving game lineups information.
 */
@RestController
@RequestMapping("/gameLineups") //Mapping the controller to /gameLineups
public class GameLineupsController {

    private final GameLineupsService gameLineupsService;

    public GameLineupsController(GameLineupsService gameLineupsService) {
        this.gameLineupsService = gameLineupsService;
    }

    /**
     * Method that returns a game lineup by the game id
     * @param game_id The id of the game to search for
     * @return ResponseEntity containing the game lineup with the game id passed as parameter or a 404 status code if the game lineup is not found
     */
    @GetMapping("/getGameLineupsByGameId")
    public ResponseEntity<List<GameLineups>> getGameLineupsByGameId(@RequestParam Integer game_id) {
        List<GameLineups> gameLineups = gameLineupsService.getGameLineupsByGameId(game_id);
        if (gameLineups.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(gameLineups);
        }
    }

    /**
     * Method that returns a game lineup by the club id
     * @param club_id The id of the club to search for
     * @return ResponseEntity containing the game lineup with the club id passed as parameter or a 404 status code if the game lineup is not found
     */
    @GetMapping("/getGameLineupsByClubId")
    public ResponseEntity<List<GameLineups>> getGameLineupsByClubId(@RequestParam Integer club_id) {
        List<GameLineups> gameLineups = gameLineupsService.getGameLineupsByClubId(club_id);
        if (gameLineups.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(gameLineups);
        }
    }

    /**
     * Method that returns a game lineup by the player id
     * @param player_id The id of the player to search for
     * @return ResponseEntity containing the game lineup with the player id passed as parameter or a 404 status code if the game lineup is not found
     */
    @GetMapping("/getGameLineupsByPlayerId")
    public ResponseEntity<List<GameLineups>> getGameLineupsByPlayerId(@RequestParam String player_id) {
        List<GameLineups> gameLineups = gameLineupsService.getGameLineupsByPlayerId(player_id);
        if (gameLineups.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(gameLineups);
        }
    }

    /**
     * Method that returns a game lineup by the player name
     * @param player_name The name of the player to search for
     * @return ResponseEntity containing the game lineup with the player name passed as parameter or a 404 status code if the game lineup is not found
     */
    @GetMapping("/getGameLineupsByPlayerName")
    public ResponseEntity<List<GameLineups>> getGameLineupsByPlayerName(@RequestParam String player_name) {
        List<GameLineups> gameLineups = gameLineupsService.getGameLineupsByPlayerName(player_name);
        if (gameLineups.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(gameLineups);
        }
    }
}
