package com.prova.springboot_postgresql.postgreSQL.competitions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class that handles the HTTP requests for the Competitions entity.
 * Provides endpoints for retrieving competitions information.
 */
@RestController
@RequestMapping("/competitions")   // Mapping the controller to /competitions
public class CompetitionsController {

    private final CompetitionsService competitionsService;

    public CompetitionsController(CompetitionsService competitionsService) {
        this.competitionsService = competitionsService;
    }

    /**
     * Method that returns a competition by its id
     * @param competition_id The id of the competition to search for
     * @return ResponseEntity containing the competition with the id passed as parameter or a 404 status code if the competition is not found
     */
    @GetMapping("/getCompetitionByCompetitionId")
    public ResponseEntity<Competitions> getCompetitionById(@RequestParam String competition_id) {
        Optional<Competitions> competitions = competitionsService.getCompetitionByCompetitionId(competition_id);
        return competitions.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Method that returns a competition with name passed as parameter
     * @param name The name of the competition to search for
     * @return ResponseEntity containing the competition with the name passed as parameter or a 404 status code if the competition is not found
     */
    @GetMapping("/getCompetitionByName")
    public ResponseEntity<Competitions> getCompetitionByName(@RequestParam String name) {
        Optional<Competitions> competitions = competitionsService.getCompetitionByName(name);
        return competitions.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Method that returns a competition with country name passed as parameter
     * @param country_name The country name of the competition to search for
     * @return ResponseEntity containing the competition with the country name passed as parameter or a 404 status code if the competition is not found
     */
    @GetMapping("/getCompetitionByCountryName")
    public ResponseEntity<List<Competitions>> getCompetitionsByCountryName(@RequestParam String country_name) {
        List<Competitions> competitions = competitionsService.getCompetitionsByCountryName(country_name);
        if (competitions.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(competitions);
        }
    }

    /**
     * Method that returns all competitions
     * @return ResponseEntity containing a list of CompetitionsDTO or a 404 status code if no competitions are found
     */
    @GetMapping("/getAllCompetitionsDTO")
    public ResponseEntity<List<CompetitionsDTO>> getAllCompetitionsDTO() {
        List<CompetitionsDTO> competitions = competitionsService.getAllCompetitionsDTO();
        if (competitions.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(competitions);
        }
    }

    /**
     * Method that returns competitions by type
     * @param type The type of the competition to search for
     * @return ResponseEntity containing a list of CompetitionsDTO or a 404 status code if no competitions are found
     */
    @GetMapping("/getCompetitionsByType")
    public ResponseEntity<List<CompetitionsDTO>> getCompetitionsByType(@RequestParam String type) {
        List<CompetitionsDTO> competitions = competitionsService.getCompetitionsByType(type);
        if (competitions.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(competitions);
        }
    }

    /**
     * Method that returns distinct types of competitions
     * @return ResponseEntity containing a list of distinct types of competitions or a 404 status code if no competitions are found
     */
    @GetMapping("/getAllChampionships")
    public ResponseEntity<?> viewDistinctTypes() {
        List<String> types = competitionsService.getDistinctTypes();
        if (types.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(types);
        }
    }

    /**
     * Method that returns id, name and country name of all competitions
     * @return ResponseEntity containing a list of all competitions or a 404 status code if no competitions are found
     */
    @GetMapping("/allCompetitions")
    public ResponseEntity<?> getAllCompetitions() {
        List<Object[]> competitions = competitionsService.getCompetitionIdNameAndCountryName();
        if (competitions.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(competitions);
        }
    }
}
