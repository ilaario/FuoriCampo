package com.prova.springboot_postgresql.postgreSQL.clubs;

/**
 * Data Transfer Object (DTO) for the Clubs entity.
 * Used to transfer specific information about clubs.
 */
public class ClubsDTO {

        private Integer clubId;
        private String clubName;
        private Long totalHighestMarketValue;


        //Constructors
        public ClubsDTO() {
        }

        public ClubsDTO(Integer clubId, String clubName, Long totalHighestMarketValue) {
            this.clubId = clubId;
            this.clubName = clubName;
            this.totalHighestMarketValue = totalHighestMarketValue;
        }

        //Getters and Setters
        public Integer getClubId() {
            return clubId;
        }

        public void setClubId(Integer clubId) {
            this.clubId = clubId;
        }

        public String getClubName() {
            return clubName;
        }

        public void setClubName(String clubName) {
            this.clubName = clubName;
        }

        public Long getTotalHighestMarketValue() {
            return totalHighestMarketValue;
        }

        public void setTotalHighestMarketValue(Long totalHighestMarketValue) {
            this.totalHighestMarketValue = totalHighestMarketValue;
        }
}

