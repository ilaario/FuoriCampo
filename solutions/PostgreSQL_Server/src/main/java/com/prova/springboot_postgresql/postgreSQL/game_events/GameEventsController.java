package com.prova.springboot_postgresql.postgreSQL.game_events;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

import java.util.List;

/**
 * Controller class that handles the HTTP requests for the GameEvents entity.
 * Provides endpoints for retrieving game events information.
 */
@RestController
@RequestMapping("/gameEvents") // Mappping the controller to /gameEvents
public class GameEventsController {

    private final GameEventsService gameEventsService;

    public GameEventsController(GameEventsService gameEventsService) {
        this.gameEventsService = gameEventsService;
    }

    /**
     * Method that returns the game events with the date passed as parameter
     * @param date The date of the game events to search for
     * @return ResponseEntity containing the game events with the date passed as parameter or a 404 status code if no game events are found
     */
    @GetMapping("/getGameEventsByDate")
    public ResponseEntity<List<GameEvents>> getGameEventsByDate(@RequestParam LocalDate date) {
        List<GameEvents> gameEvents = gameEventsService.getGameEventsByDate(date);
        if(gameEvents.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(gameEvents);
        }
    }
}
