package com.prova.springboot_postgresql.postgreSQL.game_events;

import jakarta.persistence.*;

import java.time.LocalDate;

/**
 * Represents a game event entity.
 * Maps the 'game_events' table in the database.
 */
@Entity
@Table(name = "game_events")
public class GameEvents {

    @Id
    @Column(name = "game_event_id", nullable = false, length = 50)
    private String gameEventId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "game_id")
    private Integer gameId;

    @Column(name = "minute")
    private Integer minute;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "club_id")
    private Integer clubId;

    @Column(name = "player_id")
    private Integer playerId;

    @Column(name = "description", length = 100)
    private String description;

    @Column(name = "player_in_id")
    private Integer playerInId;

    @Column(name = "player_assist_id")
    private Integer playerAssistId;


    // Constructors
    public GameEvents() {
    }

    public GameEvents(String gameEventId, LocalDate date, Integer gameId, Integer minute, String type, Integer clubId, Integer playerId, String description, Integer playerInId, Integer playerAssistId) {
        this.gameEventId = gameEventId;
        this.date = date;
        this.gameId = gameId;
        this.minute = minute;
        this.type = type;
        this.clubId = clubId;
        this.playerId = playerId;
        this.description = description;
        this.playerInId = playerInId;
        this.playerAssistId = playerAssistId;
    }


    // Getters and Setters
    /**
     * Get the game event id
     * @return The game event id
     */
    public String getGameEventId() {
        return gameEventId;
    }

    /**
     * Set the game event id
     * @param gameEventId The game event id
     */
    public void setGameEventId(String gameEventId) {
        this.gameEventId = gameEventId;
    }

    /**
     * Get the date of the game event
     * @return The date of the game event
     */
    public LocalDate getDate() {
        return date;
    }

    /**
     * Set the date of the game event
     * @param date The date of the game event
     */
    public void setDate(LocalDate date) {
        this.date = date;
    }

    /**
     * Get the game id
     * @return The game id
     */
    public Integer getGameId() {
        return gameId;
    }

    /**
     * Set the game id
     * @param gameId The game id
     */
    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    /**
     * Get the minute of the game event
     * @return The minute of the game event
     */
    public Integer getMinute() {
        return minute;
    }

    /**
     * Set the minute of the game event
     * @param minute The minute of the game event
     */
    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    /**
     * Get the type of the game event
     * @return The type of the game event
     */
    public String getType() {
        return type;
    }

    /**
     * Set the type of the game event
     * @param type The type of the game event
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Get the club id
     * @return The club id
     */
    public Integer getClubId() {
        return clubId;
    }

    /**
     * Set the club id
     * @param clubId The club id
     */
    public void setClubId(Integer clubId) {
        this.clubId = clubId;
    }

    /**
     * Get the player id
     * @return The player id
     */
    public Integer getPlayerId() {
        return playerId;
    }

    /**
     * Set the player id
     * @param playerId The player id
     */
    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    /**
     * Get the description of the game event
     * @return The description of the game event
     */
    public String getDescription() {
        return description;
    }

    /**
     * Set the description of the game event
     * @param description The description of the game event
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Get the player in id
     * @return The player in id
     */
    public Integer getPlayerInId() {
        return playerInId;
    }

    /**
     * Set the player in id
     * @param playerInId The player in id
     */
    public void setPlayerInId(Integer playerInId) {
        this.playerInId = playerInId;
    }

    /**
     * Get the player assist id
     * @return The player assist id
     */
    public Integer getPlayerAssistId() {
        return playerAssistId;
    }

    /**
     * Set the player assist id
     * @param playerAssistId The player assist id
     */
    public void setPlayerAssistId(Integer playerAssistId) {
        this.playerAssistId = playerAssistId;
    }

}