package com.prova.springboot_postgresql.postgreSQL.players;

import jakarta.persistence.*;

import java.time.LocalDate;

/**
 * Represents a football player entity.
 * Maps the 'players' table in the database.
 */
@Entity
@Table(name = "players")
public class Players {

    @Id
    @Column(name = "player_id", nullable = false)
    private Integer id;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "last_season")
    private Integer lastSeason;

    @Column(name = "current_club_id")
    private Integer currentClubId;

    @Column(name = "player_code", length = 100)
    private String playerCode;

    @Column(name = "country_of_birth", length = 100)
    private String countryOfBirth;

    @Column(name = "city_of_birth", length = 100)
    private String cityOfBirth;

    @Column(name = "country_of_citizenship", length = 100)
    private String countryOfCitizenship;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "sub_position", length = 50)
    private String subPosition;

    @Column(name = "\"position\"", length = 50)
    private String position;

    @Column(name = "foot", length = 10)
    private String foot;

    @Column(name = "height_in_cm")
    private Integer heightInCm;

    @Column(name = "market_value_in_eur", length = 100)
    private String marketValueInEur;

    @Column(name = "highest_market_value_in_eur", length = 100)
    private Integer highestMarketValueInEur;

    @Column(name = "contract_expiration_date")
    private LocalDate contractExpirationDate;

    @Column(name = "agent_name", length = 50)
    private String agentName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "url")
    private String url;

    @Column(name = "current_club_domestic_competition_id", length = 10)
    private String currentClubDomesticCompetitionId;

    @Column(name = "current_club_name", length = 100)
    private String currentClubName;


    // Constructors
    public Players() {
    }

    public Players(Integer id, String firstName, String lastName, String name, Integer lastSeason, Integer currentClubId, String playerCode, String countryOfBirth, String cityOfBirth, String countryOfCitizenship, LocalDate dateOfBirth, String subPosition, String position, String foot, Integer heightInCm, String marketValueInEur, Integer highestMarketValueInEur, LocalDate contractExpirationDate, String agentName, String imageUrl, String url, String currentClubDomesticCompetitionId, String currentClubName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
        this.lastSeason = lastSeason;
        this.currentClubId = currentClubId;
        this.playerCode = playerCode;
        this.countryOfBirth = countryOfBirth;
        this.cityOfBirth = cityOfBirth;
        this.countryOfCitizenship = countryOfCitizenship;
        this.dateOfBirth = dateOfBirth;
        this.subPosition = subPosition;
        this.position = position;
        this.foot = foot;
        this.heightInCm = heightInCm;
        this.marketValueInEur = marketValueInEur;
        this.highestMarketValueInEur = highestMarketValueInEur;
        this.contractExpirationDate = contractExpirationDate;
        this.agentName = agentName;
        this.imageUrl = imageUrl;
        this.url = url;
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
        this.currentClubName = currentClubName;
    }


    // Getters and Setters
    /**
     * Get the id of the player.
     * @return The id of the player.
     */
    public Integer getId() {
        return id;
    }

    /**
     * Set the id of the player.
     * @param id The id of the player.
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Get the first name of the player.
     * @return The first name of the player.
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Set the first name of the player.
     * @param firstName The first name of the player.
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Get the last name of the player.
     * @return The last name of the player.
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Set the last name of the player.
     * @param lastName The last name of the player.
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Get the name of the player.
     * @return The name of the player.
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the player.
     * @param name The name of the player.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the last season of the player.
     * @return The last season of the player.
     */
    public Integer getLastSeason() {
        return lastSeason;
    }

    /**
     * Set the last season of the player.
     * @param lastSeason The last season of the player.
     */
    public void setLastSeason(Integer lastSeason) {
        this.lastSeason = lastSeason;
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
     * Get the player code.
     * @return The player code.
     */
    public String getPlayerCode() {
        return playerCode;
    }

    /**
     * Set the player code.
     * @param playerCode The player code.
     */
    public void setPlayerCode(String playerCode) {
        this.playerCode = playerCode;
    }

    /**
     * Get the country of birth of the player.
     * @return The country of birth of the player.
     */
    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    /**
     * Set the country of birth of the player.
     * @param countryOfBirth The country of birth of the player.
     */
    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    /**
     * Get the city of birth of the player.
     * @return The city of birth of the player.
     */
    public String getCityOfBirth() {
        return cityOfBirth;
    }

    /**
     * Set the city of birth of the player.
     * @param cityOfBirth The city of birth of the player.
     */
    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    /**
     * Get the country of citizenship of the player.
     * @return The country of citizenship of the player.
     */
    public String getCountryOfCitizenship() {
        return countryOfCitizenship;
    }

    /**
     * Set the country of citizenship of the player.
     * @param countryOfCitizenship The country of citizenship of the player.
     */
    public void setCountryOfCitizenship(String countryOfCitizenship) {
        this.countryOfCitizenship = countryOfCitizenship;
    }

    /**
     * Get the date of birth of the player.
     * @return The date of birth of the player.
     */
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    /**
     * Set the date of birth of the player.
     * @param dateOfBirth The date of birth of the player.
     */
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    /**
     * Get the sub position of the player.
     * @return The sub position of the player.
     */
    public String getSubPosition() {
        return subPosition;
    }

    /**
     * Set the sub position of the player.
     * @param subPosition The sub position of the player.
     */
    public void setSubPosition(String subPosition) {
        this.subPosition = subPosition;
    }

    /**
     * Get the position of the player.
     * @return The position of the player.
     */
    public String getPosition() {
        return position;
    }

    /**
     * Set the position of the player.
     * @param position The position of the player.
     */
    public void setPosition(String position) {
        this.position = position;
    }

    /**
     * Get the foot of the player.
     * @return The foot of the player.
     */
    public String getFoot() {
        return foot;
    }

    /**
     * Set the foot of the player.
     * @param foot The foot of the player.
     */
    public void setFoot(String foot) {
        this.foot = foot;
    }

    /**
     * Get the height of the player in centimeters.
     * @return The height of the player in centimeters.
     */
    public Integer getHeightInCm() {
        return heightInCm;
    }

    /**
     * Set the height of the player in centimeters.
     * @param heightInCm The height of the player in centimeters.
     */
    public void setHeightInCm(Integer heightInCm) {
        this.heightInCm = heightInCm;
    }

    /**
     * Get the market value of the player in euros.
     * @return The market value of the player in euros.
     */
    public String getMarketValueInEur() {
        return marketValueInEur;
    }

    /**
     * Set the market value of the player in euros.
     * @param marketValueInEur The market value of the player in euros.
     */
    public void setMarketValueInEur(String marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    /**
     * Get the highest market value of the player in euros.
     * @return The highest market value of the player in euros.
     */
    public Integer getHighestMarketValueInEur() {
        return highestMarketValueInEur;
    }

    /**
     * Set the highest market value of the player in euros.
     * @param highestMarketValueInEur The highest market value of the player in euros.
     */
    public void setHighestMarketValueInEur(Integer highestMarketValueInEur) {
        this.highestMarketValueInEur = highestMarketValueInEur;
    }

    /**
     * Get the contract expiration date of the player.
     * @return The contract expiration date of the player.
     */
    public LocalDate getContractExpirationDate() {
        return contractExpirationDate;
    }

    /**
     * Set the contract expiration date of the player.
     * @param contractExpirationDate The contract expiration date of the player.
     */
    public void setContractExpirationDate(LocalDate contractExpirationDate) {
        this.contractExpirationDate = contractExpirationDate;
    }

    /**
     * Get the name of the agent of the player.
     * @return The name of the agent of the player.
     */
    public String getAgentName() {
        return agentName;
    }

    /**
     * Set the name of the agent of the player.
     * @param agentName The name of the agent of the player.
     */
    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    /**
     * Get the image URL of the player.
     * @return The image URL of the player.
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * Set the image URL of the player.
     * @param imageUrl The image URL of the player.
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Get the URL of the player.
     * @return The URL of the player.
     */
    public String getUrl() {
        return url;
    }

    /**
     * Set the URL of the player.
     * @param url The URL of the player.
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Get the current club domestic competition id of the player.
     * @return The current club domestic competition id of the player.
     */
    public String getCurrentClubDomesticCompetitionId() {
        return currentClubDomesticCompetitionId;
    }

    /**
     * Set the current club domestic competition id of the player.
     * @param currentClubDomesticCompetitionId The current club domestic competition id of the player.
     */
    public void setCurrentClubDomesticCompetitionId(String currentClubDomesticCompetitionId) {
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
    }

    /**
     * Get the current club name of the player.
     * @return The current club name of the player.
     */
    public String getCurrentClubName() {
        return currentClubName;
    }

    /**
     * Set the current club name of the player.
     * @param currentClubName The current club name of the player.
     */
    public void setCurrentClubName(String currentClubName) {
        this.currentClubName = currentClubName;
    }

}