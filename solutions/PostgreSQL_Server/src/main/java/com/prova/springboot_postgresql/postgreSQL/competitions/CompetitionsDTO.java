package com.prova.springboot_postgresql.postgreSQL.competitions;


/**
 * Data Transfer Object (DTO) for the Competitions entity.
 * Used to transfer specific information about competitions.
 */
public class CompetitionsDTO {

    private String name;
    private String subType;
    private Long competitionId;
    private String competitionCode;

    // Constructors
    public CompetitionsDTO() {
    }

    //Constructor for findAllCompetitions query
    public CompetitionsDTO(String name, String subType) {
        this.name = name;
        this.subType = subType;
    }

    // Constructor for getCompetitionsByType query
    public CompetitionsDTO(Long competitionId, String competitionCode) {
        this.competitionId = competitionId;
        this.competitionCode = competitionCode;
    }


    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public Long getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(Long competitionId) {
        this.competitionId = competitionId;
    }

    public String getCompetitionCode() {
        return competitionCode;
    }

    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }
}
