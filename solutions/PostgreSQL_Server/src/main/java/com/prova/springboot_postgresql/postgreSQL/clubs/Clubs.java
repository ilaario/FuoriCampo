package com.prova.springboot_postgresql.postgreSQL.clubs;

import jakarta.persistence.*;

import java.math.BigDecimal;

/**
 * Represents a football club entity.
 * Maps the 'clubs' table in the database.
 */
@Entity
@Table(name = "clubs")
public class Clubs {

    @Id
    @Column(name = "club_id", nullable = false)
    private Integer id;

    @Column(name = "club_code", length = 100)
    private String clubCode;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "domestic_competition_id", length = 100)
    private String domesticCompetitionId;

    @Column(name = "total_market_value", length = 100)
    private String totalMarketValue;

    @Column(name = "squad_size")
    private Integer squadSize;

    @Column(name = "average_age", precision = 4, scale = 1)
    private BigDecimal averageAge;

    @Column(name = "foreigners_number")
    private Integer foreignersNumber;

    @Column(name = "foreigners_percentage", precision = 4, scale = 1)
    private BigDecimal foreignersPercentage;

    @Column(name = "national_team_players")
    private Integer nationalTeamPlayers;

    @Column(name = "stadium_name", length = 100)
    private String stadiumName;

    @Column(name = "stadium_seats")
    private Integer stadiumSeats;

    @Column(name = "net_transfer_record", length = 100)
    private String netTransferRecord;

    @Column(name = "coach_name", length = 100)
    private String coachName;

    @Column(name = "last_season")
    private Integer lastSeason;

    @Column(name = "url")
    private String url;


    // Constructors
    public Clubs() {
    }

    public Clubs(Integer id, String clubCode, String name, String domesticCompetitionId, String totalMarketValue, Integer squadSize, BigDecimal averageAge, Integer foreignersNumber, BigDecimal foreignersPercentage, Integer nationalTeamPlayers, String stadiumName, Integer stadiumSeats, String netTransferRecord, String coachName, Integer lastSeason, String url) {
        this.id = id;
        this.clubCode = clubCode;
        this.name = name;
        this.domesticCompetitionId = domesticCompetitionId;
        this.totalMarketValue = totalMarketValue;
        this.squadSize = squadSize;
        this.averageAge = averageAge;
        this.foreignersNumber = foreignersNumber;
        this.foreignersPercentage = foreignersPercentage;
        this.nationalTeamPlayers = nationalTeamPlayers;
        this.stadiumName = stadiumName;
        this.stadiumSeats = stadiumSeats;
        this.netTransferRecord = netTransferRecord;
        this.coachName = coachName;
        this.lastSeason = lastSeason;
        this.url = url;
    }


    // Getters and Setters
    /**
     * Get the id of the club.
     * @return The id of the club.
     */
    public Integer getId() {
        return id;
    }

    /**
     * Set the id of the club.
     * @param id The id of the club.
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Get the code of the club.
     * @return The code of the club.
     */
    public String getClubCode() {
        return clubCode;
    }

    /**
     * Set the code of the club.
     * @param clubCode The code of the club.
     */
    public void setClubCode(String clubCode) {
        this.clubCode = clubCode;
    }

    /**
     * Get the name of the club.
     * @return The name of the club.
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the club.
     * @param name The name of the club.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the id of the domestic competition of the club.
     * @return The id of the domestic competition of the club.
     */
    public String getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    /**
     * Set the id of the domestic competition of the club.
     * @param domesticCompetitionId The id of the domestic competition of the club.
     */
    public void setDomesticCompetitionId(String domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    /**
     * Get the total market value of the club.
     * @return The total market value of the club.
     */
    public String getTotalMarketValue() {
        return totalMarketValue;
    }

    /**
     * Set the total market value of the club.
     * @param totalMarketValue The total market value of the club.
     */
    public void setTotalMarketValue(String totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    /**
     * Get the squad size of the club.
     * @return The squad size of the club.
     */
    public Integer getSquadSize() {
        return squadSize;
    }

    /**
     * Set the squad size of the club.
     * @param squadSize The squad size of the club.
     */
    public void setSquadSize(Integer squadSize) {
        this.squadSize = squadSize;
    }

    /**
     * Get the average age of the club.
     * @return The average age of the club.
     */
    public BigDecimal getAverageAge() {
        return averageAge;
    }

    /**
     * Set the average age of the club.
     * @param averageAge The average age of the club.
     */
    public void setAverageAge(BigDecimal averageAge) {
        this.averageAge = averageAge;
    }

    /**
     * Get the number of foreigners in the club.
     * @return The number of foreigners in the club.
     */
    public Integer getForeignersNumber() {
        return foreignersNumber;
    }

    /**
     * Set the number of foreigners in the club.
     * @param foreignersNumber The number of foreigners in the club.
     */
    public void setForeignersNumber(Integer foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    /**
     * Get the percentage of foreigners in the club.
     * @return The percentage of foreigners in the club.
     */
    public BigDecimal getForeignersPercentage() {
        return foreignersPercentage;
    }

    /**
     * Set the percentage of foreigners in the club.
     * @param foreignersPercentage The percentage of foreigners in the club.
     */
    public void setForeignersPercentage(BigDecimal foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    /**
     * Get the number of national team players in the club.
     * @return The number of national team players in the club.
     */
    public Integer getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    /**
     * Set the number of national team players in the club.
     * @param nationalTeamPlayers The number of national team players in the club.
     */
    public void setNationalTeamPlayers(Integer nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    /**
     * Get the name of the stadium of the club.
     * @return The name of the stadium of the club.
     */
    public String getStadiumName() {
        return stadiumName;
    }

    /**
     * Set the name of the stadium of the club.
     * @param stadiumName The name of the stadium of the club.
     */
    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    /**
     * Get the number of seats in the stadium of the club.
     * @return The number of seats in the stadium of the club.
     */
    public Integer getStadiumSeats() {
        return stadiumSeats;
    }

    /**
     * Set the number of seats in the stadium of the club.
     * @param stadiumSeats The number of seats in the stadium of the club.
     */
    public void setStadiumSeats(Integer stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    /**
     * Get the net transfer record of the club.
     * @return The net transfer record of the club.
     */
    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    /**
     * Set the net transfer record of the club.
     * @param netTransferRecord The net transfer record of the club.
     */
    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    /**
     * Get the name of the coach of the club.
     * @return The name of the coach of the club.
     */
    public String getCoachName() {
        return coachName;
    }

    /**
     * Set the name of the coach of the club.
     * @param coachName The name of the coach of the club.
     */
    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    /**
     * Get the last season of the club.
     * @return The last season of the club.
     */
    public Integer getLastSeason() {
        return lastSeason;
    }

    /**
     * Set the last season of the club.
     * @param lastSeason The last season of the club.
     */
    public void setLastSeason(Integer lastSeason) {
        this.lastSeason = lastSeason;
    }

    /**
     * Get the url of the club.
     * @return The url of the club.
     */
    public String getUrl() {
        return url;
    }

    /**
     * Set the url of the club.
     * @param url The url of the club.
     */
    public void setUrl(String url) {
        this.url = url;
    }

}