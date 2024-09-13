package com.prova.springboot_postgresql.postgreSQL.players;

import com.prova.springboot_postgresql.postgreSQL.clubs.Clubs;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class that handles the HTTP requests for the Players entity.
 * Provides endpoints for retrieving players information.
 */
@RestController
@RequestMapping("/players") //Mapping the controller to /players
public class PlayersController {

    private final PlayersService playersService;

    public PlayersController(PlayersService playersService) {
        this.playersService = playersService;
    }

    /**
     * Method that returns the player with the id passed as parameter
     * @param player_id The id of the player to search for
     * @return ResponseEntity containing the player with the id passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerById")
    public ResponseEntity<Players> getPlayerById(@RequestParam Integer player_id) {
        Optional<Players> player = playersService.getPlayerById(player_id);
        return player.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Method that returns the player with the name passed as parameter
     * @param name The name of the player to search for
     * @return ResponseEntity containing the player with the name passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerByName")
    public ResponseEntity<List<Players>> getPlayerByName(@RequestParam String name) {
        List<Players> players = playersService.getPlayerByName(name);
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns the player with the country of citizenship passed as parameter
     * @param country_of_citizenship The country of citizenship of the player to search for
     * @return ResponseEntity containing the player with the country of citizenship passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerByCountryOfCitizenship")
    public ResponseEntity<List<Players>> getPlayerByCountryOfCitizenship(@RequestParam String country_of_citizenship) {
        List<Players> players = playersService.getPlayerByCountryOfCitizenship(country_of_citizenship);
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns the player with the birth year passed as parameter
     * @param year The birth year of the player to search for
     * @return ResponseEntity containing the player with the birth year passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerByBirthYear")
    public ResponseEntity<List<Players>> getPlayerByBirthYear(@RequestParam Integer year) {
        List<Players> players = playersService.getPlayerByBirthYear(year);
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns the player with the position passed as parameter
     * @param position The position of the player to search for
     * @return ResponseEntity containing the player with the position passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerByPosition")
    public ResponseEntity<List<Players>> getPlayerByPosition(@RequestParam String position) {
        List<Players> players = playersService.getPlayerByPosition(position);
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns the player with the current club domestic competition id passed as parameter
     * @param current_club_domestic_competition_id The current club domestic competition id of the player to search for
     * @return ResponseEntity containing the player with the current club domestic competition id passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerByCurrentClubDomesticCompetitionId")
    public ResponseEntity<List<Players>> getPlayerByCurrentClubDomesticCompetitionId(@RequestParam String current_club_domestic_competition_id) {
        List<Players> players = playersService.getPlayerByCurrentClubDomesticCompetitionId(current_club_domestic_competition_id);
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns the player with the current club name passed as parameter
     * @param current_club_name The current club name of the player to search for
     * @return ResponseEntity containing the player with the current club name passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerByCurrentClubName")
    public ResponseEntity<List<Players>> getPlayerByCurrentClubName(@RequestParam String current_club_name) {
        List<Players> players = playersService.getPlayerByCurrentClubName(current_club_name);
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns the top 10 players with the highest market value
     * @return ResponseEntity containing a list of Players or a 404 status code if no players are found
     */
    @GetMapping("/getTop10Players")
    public ResponseEntity<List<Players>> getTop10Players() {
        List<Players> players = playersService.getTop10Players();
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns the player with the current club id passed as parameter
     * @param current_club_id The current club id of the player to search for
     * @return ResponseEntity containing the player with the current club id passed as parameter or a 404 status code if the player is not found
     */
    @GetMapping("/getPlayerByCurrentClubId")
    public ResponseEntity<List<Players>> getPlayerByCurrentClubId(@RequestParam Integer current_club_id) {
        List<Players> players = playersService.getPlayerByCurrentClubId(current_club_id);
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }

    /**
     * Method that returns all the players
     * @return ResponseEntity containing the full list of Players or a 404 status code if no players are found
     */
    @GetMapping("/getAllPlayers")
    public ResponseEntity<List<Players>> getAllPlayers() {
        List<Players> players = playersService.getAllPlayers();
        if (players.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(players);
        }
    }
}
