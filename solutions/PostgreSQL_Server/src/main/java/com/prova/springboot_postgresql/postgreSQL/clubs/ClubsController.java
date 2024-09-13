package com.prova.springboot_postgresql.postgreSQL.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class that handles the HTTP requests for the Clubs entity.
 * Provides endpoints for retrieving clubs information.
 */
@RestController
@RequestMapping("/clubs") // Mapping the controller to /clubs
public class ClubsController {
    private final ClubsService clubsService;

    @Autowired
    public ClubsController(ClubsService clubsService) {
        this.clubsService = clubsService;
    }


    /**
     * Method that returns the club with the name passed as parameter
     * @param name The name of the club to search for
     * @return ResponseEntity containing the club with the name passed as parameter or a 404 status code if the club is not found
     */
    @GetMapping("/getClubByName")
    public ResponseEntity<Clubs> findClubByName(@RequestParam String name) {
        Optional<Clubs> club = clubsService.getClubByName(name);
        return club.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Method that returns the club with the id passed as parameter
     * @param club_id The id of the club to search for
     * @return ResponseEntity containing the club with the id passed as parameter or a 404 status code if the club is not found
     */
    @GetMapping("/getClubById")
    public ResponseEntity<Clubs> findClubById(@RequestParam Integer club_id) {
        Optional<Clubs> club = clubsService.getClubById(club_id);
        return club.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Method that returns the best clubs
     * @return ResponseEntity containing a list of ClubsDTO or a 404 status code if no clubs are found
     */
    @GetMapping("/getBestClubs")
    public ResponseEntity<List<ClubsDTO>> getBestClubs() {
        List<ClubsDTO> bestClubs = clubsService.getBestClubs();
        if (bestClubs.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(bestClubs);
        }
    }

    /**
     * Method that returns all the clubs
     * @return ResponseEntity containing the full list of Clubs or a 404 status code if no clubs are found
     */
    @GetMapping("/getAllClubs")
    public ResponseEntity<List<Clubs>> getAllClubs() {
        List<Clubs> clubs = clubsService.getAllClubs();
        if (clubs.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(clubs);
        }
    }

}
