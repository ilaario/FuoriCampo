package com.prova.springboot_postgresql.postgreSQL.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for the Clubs entity.
 * Used for handling business logic and communicating with the repository.
 */
@Service
public class ClubsService {
    private final ClubsRepository clubsRepository;

    @Autowired
    public ClubsService(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }

    /**
     * Method to get a club by id
     * @param club_id The id of the club to search for
     * @return An Optional containing the club with the id passed as parameter if found.
     */
    public Optional<Clubs> getClubById(Integer club_id) {
        return clubsRepository.findClubById(club_id);
    }

    /**
     * Method to get a club by name
     * @param name The name of the club to search for
     * @return An Optional containing the club with the name passed as parameter if found.
     */
    public Optional<Clubs> getClubByName(String name) {
        return clubsRepository.findClubByName(name);
    }

    /**
     * Method to get the best clubs based on the total highest market value of their players in the last season
     * @return A list of ClubsDTO with the total highest market value.
     */
    public List<ClubsDTO> getBestClubs() {
        Pageable limit = PageRequest.of(0, 10);
        List<Object[]> results = clubsRepository.findBestClubs(limit);

        return results.stream().map(result -> new ClubsDTO( //Mapping the results to the DTO
                (Integer) result[0],      // clubId
                (String) result[1],    // clubName
                (Long) result[2]     // totalHighestMarketValue
        )).collect(Collectors.toList()); //Collecting the results to a list
    }

    /**
     * Method to get all clubs ordered by name
     * @return A list of all clubs ordered by name.
     */
    public List<Clubs> getAllClubs() {
        return clubsRepository.findAllClubs();
    }

}
