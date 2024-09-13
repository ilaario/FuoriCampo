package com.prova.springboot_postgresql.postgreSQL.player_valuations;

import jakarta.persistence.*;

import java.time.Instant;

/**
 * Represents a player valuation entity.
 * Maps the 'player_valuations' table in the database.
 */
@Entity
@Table(name = "player_valuations")
public class PlayerValuations {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "player_valuations_id_gen")
    @SequenceGenerator(name = "player_valuations_id_gen", sequenceName = "player_valuations_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "last_season")
    private Integer lastSeason;

    @Column(name = "datetime")
    private Instant datetime;

    @Column(name = "date", length = Integer.MAX_VALUE)
    private String date;

    @Column(name = "dateweek", length = Integer.MAX_VALUE)
    private String dateweek;

    @Column(name = "market_value_in_eur")
    private Integer marketValueInEur;

    @Column(name = "n")
    private Integer n;

    @Column(name = "current_club_id")
    private Integer currentClubId;

    @Column(name = "player_club_domestic_competition_id", length = Integer.MAX_VALUE)
    private String playerClubDomesticCompetitionId;


    // Constructors
    public PlayerValuations() {
    }

    public PlayerValuations(Long playerId, Integer lastSeason, Instant datetime, String date, String dateweek, Integer marketValueInEur, Integer n, Integer currentClubId, String playerClubDomesticCompetitionId) {
        this.playerId = playerId;
        this.lastSeason = lastSeason;
        this.datetime = datetime;
        this.date = date;
        this.dateweek = dateweek;
        this.marketValueInEur = marketValueInEur;
        this.n = n;
        this.currentClubId = currentClubId;
        this.playerClubDomesticCompetitionId = playerClubDomesticCompetitionId;
    }

    // Getters and Setters
    /**
     * Get the id of the player valuation.
     * @return The id of the player valuation.
     */
    public Long getId() {
        return id;
    }

    /**
     * Set the id of the player valuation.
     * @param id The id of the player valuation.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get the id of the player.
     * @return The id of the player.
     */
    public Long getPlayerId() {
        return playerId;
    }

    /**
     * Set the id of the player.
     * @param playerId The id of the player.
     */
    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    /**
     * Get the last season of the player valuation.
     * @return The last season of the player valuation.
     */
    public Integer getLastSeason() {
        return lastSeason;
    }

    /**
     * Set the last season of the player valuation.
     * @param lastSeason The last season of the player valuation.
     */
    public void setLastSeason(Integer lastSeason) {
        this.lastSeason = lastSeason;
    }

    /**
     * Get the datetime of the player valuation.
     * @return The datetime of the player valuation.
     */
    public Instant getDatetime() {
        return datetime;
    }

    /**
     * Set the datetime of the player valuation.
     * @param datetime The datetime of the player valuation.
     */
    public void setDatetime(Instant datetime) {
        this.datetime = datetime;
    }

    /**
     * Get the date of the player valuation.
     * @return The date of the player valuation.
     */
    public String getDate() {
        return date;
    }

    /**
     * Set the date of the player valuation.
     * @param date The date of the player valuation.
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * Get the dateweek of the player valuation.
     * @return The dateweek of the player valuation.
     */
    public String getDateweek() {
        return dateweek;
    }

    /**
     * Set the dateweek of the player valuation.
     * @param dateweek The dateweek of the player valuation.
     */
    public void setDateweek(String dateweek) {
        this.dateweek = dateweek;
    }

    /**
     * Get the market value of the player valuation in EUR.
     * @return The market value of the player valuation in EUR.
     */
    public Integer getMarketValueInEur() {
        return marketValueInEur;
    }

    /**
     * Set the market value of the player valuation in EUR.
     * @param marketValueInEur The market value of the player valuation in EUR.
     */
    public void setMarketValueInEur(Integer marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    /**
     * Get the n of the player valuation.
     * @return The n of the player valuation.
     */
    public Integer getN() {
        return n;
    }

    /**
     * Set the n of the player valuation.
     * @param n The n of the player valuation.
     */
    public void setN(Integer n) {
        this.n = n;
    }

    /**
     * Get the id of the current club of the player.
     * @return The id of the current club of the player.
     */
    public Integer getCurrentClubId() {
        return currentClubId;
    }

    /**
     * Set the id of the current club of the player.
     * @param currentClubId The id of the current club of the player.
     */
    public void setCurrentClubId(Integer currentClubId) {
        this.currentClubId = currentClubId;
    }

    /**
     * Get the id of the domestic competition of the player's club.
     * @return The id of the domestic competition of the player's club.
     */
    public String getPlayerClubDomesticCompetitionId() {
        return playerClubDomesticCompetitionId;
    }

    /**
     * Set the id of the domestic competition of the player's club.
     * @param playerClubDomesticCompetitionId The id of the domestic competition of the player's club.
     */
    public void setPlayerClubDomesticCompetitionId(String playerClubDomesticCompetitionId) {
        this.playerClubDomesticCompetitionId = playerClubDomesticCompetitionId;
    }

}