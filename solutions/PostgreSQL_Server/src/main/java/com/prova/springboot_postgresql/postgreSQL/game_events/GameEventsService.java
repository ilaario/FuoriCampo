package com.prova.springboot_postgresql.postgreSQL.game_events;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Service class for the GameEvents entity.
 * Used for handling business logic and communicating with the repository.
 */
@Service
public class GameEventsService {

    private final GameEventsRepository gameEventsRepository;

    public GameEventsService(GameEventsRepository gameEventsRepository) {
        this.gameEventsRepository = gameEventsRepository;
    }

    /**
     * Method to get the game events with the date passed as parameter
     * @param date The date of the game events to search for
     * @return A list of game events with the date passed as parameter.
     */
    public List<GameEvents> getGameEventsByDate(LocalDate date){
        return gameEventsRepository.findByDate(date);
    }


}
