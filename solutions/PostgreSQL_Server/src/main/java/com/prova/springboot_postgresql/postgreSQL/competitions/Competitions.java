package com.prova.springboot_postgresql.postgreSQL.competitions;

import jakarta.persistence.*;

/**
 * Represents football competitions entity.
 * Maps the 'competitions' table in the database.
 */
@Entity
@Table(name = "competitions")
public class Competitions {

    @Id
    @Column(name = "competition_id", nullable = false, length = 50)
    private String competitionId;

    @Column(name = "competition_code", length = 100)
    private String competitionCode;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "sub_type", length = 100)
    private String subType;

    @Column(name = "type", length = 100)
    private String type;

    @Column(name = "country_id")
    private Integer countryId;

    @Column(name = "country_name", length = 50)
    private String countryName;

    @Column(name = "domestic_league_code", length = 50)
    private String domesticLeagueCode;

    @Column(name = "confederation", length = 50)
    private String confederation;

    @Column(name = "url")
    private String url;


    // Constructors
    public Competitions() {
    }

    public Competitions(String competitionId, String competitionCode, String name, String subType, String type, Integer countryId, String countryName, String domesticLeagueCode, String confederation, String url) {
        this.competitionId = competitionId;
        this.competitionCode = competitionCode;
        this.name = name;
        this.subType = subType;
        this.type = type;
        this.countryId = countryId;
        this.countryName = countryName;
        this.domesticLeagueCode = domesticLeagueCode;
        this.confederation = confederation;
        this.url = url;
    }


    // Getters and Setters
    /**
     * Get the competition id
     * @return The competition id
     */
    public String getCompetitionId() {
        return competitionId;
    }

    /**
     * Set the competition id
     * @param competitionId The competition id
     */
    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    /**
     * Get the competition code
     * @return The competition code
     */
    public String getCompetitionCode() {
        return competitionCode;
    }

    /**
     * Set the competition code
     * @param competitionCode The competition code
     */
    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }

    /**
     * Get the name of the competition
     * @return The name of the competition
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the competition
     * @param name The name of the competition
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the sub type of the competition
     * @return The sub type of the competition
     */
    public String getSubType() {
        return subType;
    }

    /**
     * Set the sub type of the competition
     * @param subType The sub type of the competition
     */
    public void setSubType(String subType) {
        this.subType = subType;
    }

    /**
     * Get the type of the competition
     * @return The type of the competition
     */
    public String getType() {
        return type;
    }

    /**
     * Set the type of the competition
     * @param type The type of the competition
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Get the country id of the competition
     * @return The country id of the competition
     */
    public Integer getCountryId() {
        return countryId;
    }

    /**
     * Set the country id of the competition
     * @param countryId The country
     */
    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    /**
     * Get the country name of the competition
     * @return The country name of the competition
     */
    public String getCountryName() {
        return countryName;
    }

    /**
     * Set the country name of the competition
     * @param countryName The country name of the competition
     */
    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    /**
     * Get the domestic league code of the competition
     * @return The domestic league code of the competition
     */
    public String getDomesticLeagueCode() {
        return domesticLeagueCode;
    }

    /**
     * Set the domestic league code of the competition
     * @param domesticLeagueCode The domestic league code of the competition
     */
    public void setDomesticLeagueCode(String domesticLeagueCode) {
        this.domesticLeagueCode = domesticLeagueCode;
    }

    /**
     * Get the confederation of the competition
     * @return The confederation of the competition
     */
    public String getConfederation() {
        return confederation;
    }

    /**
     * Set the confederation of the competition
     * @param confederation The confederation of the competition
     */
    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    /**
     * Get the url of the competition
     * @return The url of the competition
     */
    public String getUrl() {
        return url;
    }

    /**
     * Set the url of the competition
     * @param url The url of the competition
     */
    public void setUrl(String url) {
        this.url = url;
    }

}