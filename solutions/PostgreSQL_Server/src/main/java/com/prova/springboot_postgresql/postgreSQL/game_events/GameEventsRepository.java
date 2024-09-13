package com.prova.springboot_postgresql.postgreSQL.game_events;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for the GameEvents entity.
 * Used for handling CRUD operations and custom queries.
 */
@Repository
public interface GameEventsRepository extends JpaRepository<GameEvents, String> {

    /**
     * Query to find game events by date
     * @param date The date of the game events to search for
     * @return A list of game events with the date passed as parameter.
     */
    List<GameEvents> findByDate(LocalDate date);
}
