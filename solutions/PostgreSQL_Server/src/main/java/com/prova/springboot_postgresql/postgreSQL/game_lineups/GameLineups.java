package com.prova.springboot_postgresql.postgreSQL.game_lineups;

import jakarta.persistence.*;

/**
 * Represents a game lineup entity.
 * Maps the 'game_lineups' table in the database.
 */
@Entity
@Table(name = "game_lineups")
public class GameLineups {

    @Id
    @Column(name = "game_lineups_id", nullable = false, length = 50)
    private String gameLineupsId;

    @Column(name = "game_id")
    private Integer gameId;

    @Column(name = "club_id")
    private Integer clubId;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "number", length = 32)
    private String number;

    @Column(name = "player_id", length = 32)
    private String playerId;

    @Column(name = "player_name", length = 100)
    private String playerName;

    @Column(name = "team_captain")
    private Boolean teamCaptain;

    @Column(name = "\"position\"", length = 50)
    private String position;


    // Constructors
    public GameLineups() {
    }

    public GameLineups(String gameLineupsId, Integer gameId, Integer clubId, String type, String number, String playerId, String playerName, Boolean teamCaptain, String position) {
        this.gameLineupsId = gameLineupsId;
        this.gameId = gameId;
        this.clubId = clubId;
        this.type = type;
        this.number = number;
        this.playerId = playerId;
        this.playerName = playerName;
        this.teamCaptain = teamCaptain;
        this.position = position;
    }


    // Getters and Setters
    /**
     * Get the id of the game lineup.
     * @return the id of the game lineup.
     */
    public String getGameLineupsId() {
        return gameLineupsId;
    }

    /**
     * Set the id of the game lineup.
     * @param gameLineupsId the id of the game lineup.
     */
    public void setGameLineupsId(String gameLineupsId) {
        this.gameLineupsId = gameLineupsId;
    }

    /**
     * Get the id of the game.
     * @return the id of the game.
     */
    public Integer getGameId() {
        return gameId;
    }

    /**
     * Set the id of the game.
     * @param gameId the id of the game.
     */
    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    /**
     * Get the id of the club.
     * @return the id of the club.
     */
    public Integer getClubId() {
        return clubId;
    }

    /**
     * Set the id of the club.
     * @param clubId the id of the club.
     */
    public void setClubId(Integer clubId) {
        this.clubId = clubId;
    }

    /**
     * Get the type of the game lineup.
     * @return the type of the game lineup.
     */
    public String getType() {
        return type;
    }

    /**
     * Set the type of the game lineup.
     * @param type the type of the game lineup.
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Get the number of the game lineup.
     * @return the number of the game lineup.
     */
    public String getNumber() {
        return number;
    }

    /**
     * Set the number of the game lineup.
     * @param number the number of the game lineup.
     */
    public void setNumber(String number) {
        this.number = number;
    }

    /**
     * Get the id of the player.
     * @return the id of the player.
     */
    public String getPlayerId() {
        return playerId;
    }

    /**
     * Set the id of the player.
     * @param playerId the id of the player.
     */
    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    /**
     * Get the name of the player.
     * @return the name of the player.
     */
    public String getPlayerName() {
        return playerName;
    }

    /**
     * Set the name of the player.
     * @param playerName the name of the player.
     */
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    /**
     * Get the team captain status of the player.
     * @return the team captain status of the player.
     */
    public Boolean getTeamCaptain() {
        return teamCaptain;
    }

    /**
     * Set the team captain status of the player.
     * @param teamCaptain the team captain status of the player.
     */
    public void setTeamCaptain(Boolean teamCaptain) {
        this.teamCaptain = teamCaptain;
    }

    /**
     * Get the position of the player.
     * @return the position of the player.
     */
    public String getPosition() {
        return position;
    }

    /**
     * Set the position of the player.
     * @param position the position of the player.
     */
    public void setPosition(String position) {
        this.position = position;
    }

}