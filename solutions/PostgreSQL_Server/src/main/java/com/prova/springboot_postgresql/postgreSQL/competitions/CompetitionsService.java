package com.prova.springboot_postgresql.postgreSQL.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for the Competitions entity.
 * Used for handling business logic and communicating with the repository.
 */
@Service
public class CompetitionsService {

    private final CompetitionsRepository competitionsRepository;

    @Autowired
    public CompetitionsService(CompetitionsRepository competitionsRepository) {
        this.competitionsRepository = competitionsRepository;
    }

    /**
     * Method to get a competition by its id
     * @param competition_id The id of the competition to search for
     * @return An Optional containing the competition with the id passed as parameter if found.
     */
    public Optional<Competitions> getCompetitionByCompetitionId(String competition_id) {
        return competitionsRepository.findCompetitionByCompetitionId(competition_id);
    }

    /**
     * Method to get a competition by its name
     * @param name The name of the competition to search for
     * @return An Optional containing the competition with the name passed as parameter if found.
     */
    public Optional<Competitions> getCompetitionByName(String name) {
        return competitionsRepository.findCompetitionByName(name);
    }

    /**
     * Method to get competitions by country name
     * @param country_name The country name of the competition to search for
     * @return A list of competitions with the country name passed as parameter.
     */
    public List<Competitions> getCompetitionsByCountryName(String country_name) {
        return competitionsRepository.findCompetitionsByCountryName(country_name);
    }

    /**
     * Method to get all competitions DTO
     * @return A list of CompetitionsDTO.
     */
    public List<CompetitionsDTO> getAllCompetitionsDTO() {
        List<Object[]> results = competitionsRepository.findAllCompetitionsDTO();

        return results.stream().map(result -> new CompetitionsDTO(     // Mapping the results to a DTO
                (String) result[0],      // competitionName
                (String) result[1]   // competitionSubType
        )).collect(Collectors.toList());    // Collecting the results to a list
    }

    /**
     * Method to get competitions by type
     * @param type The type of the competition to search for
     * @return A list of CompetitionsDTO with the type passed as parameter.
     */
    public List<CompetitionsDTO> getCompetitionsByType(String type) {
        List<Object[]> results = competitionsRepository.findCompetitionsByType(type);

        return results.stream().map(result -> new CompetitionsDTO(    // Mapping the results to a DTO
                (String) result[0],      // competitionId
                (String) result[1]   // competitionCode
        )).collect(Collectors.toList());   // Collecting the results to a list
    }

    /**
     * Method to get all distinct types of competitions
     * @return A list of all distinct types of competitions.
     */
    public List<String> getDistinctTypes() {
        return competitionsRepository.findDistinctTypes();
    }

    /**
     * Method to get id, name and Country Name of all competitions
     * @return A list of id, name and Country Name of all competitions.
     */
    public List<Object[]> getCompetitionIdNameAndCountryName() {
        return competitionsRepository.findCompetitionIdNameAndCountryName();
    }
}
