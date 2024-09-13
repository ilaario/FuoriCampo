package com.prova.springboot_postgresql.postgreSQL.players;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service class for the Players entity.
 * Used for handling business logic and communicating with the repository.
 */
@Service
public class PlayersService {

    private final PlayersRepository playersRepository;

    public PlayersService(PlayersRepository playersRepository) {
        this.playersRepository = playersRepository;
    }

    /**
     * Method to get a player by its id
     * @param player_id The id of the player to search for
     * @return An Optional containing the player with the id passed as parameter if found.
     */
    public Optional<Players> getPlayerById(Integer player_id){
        return playersRepository.findPlayerById(player_id);
    }

    /**
     * Method to get a player by its name
     * @param name The name of the player to search for
     * @return A list of players with the name passed as parameter if found.
     */
    public List<Players> getPlayerByName(String name){
        return playersRepository.findPlayerByName(name);
    }

    /**
     * Method to get a player by its country of citizenship
     * @param country_of_citizenship The country of citizenship of the player to search for
     * @return A list of players with the country of citizenship passed as parameter if found.
     */
    public List<Players> getPlayerByCountryOfCitizenship(String country_of_citizenship){
        return playersRepository.findPlayerByCountryOfCitizenship(country_of_citizenship);
    }

    /**
     * Method to get a player by its birth year
     * @param year The birth year of the player to search for
     * @return A list of players with the birth year passed as parameter if found.
     */
    public List<Players> getPlayerByBirthYear(Integer year){
        return playersRepository.findPlayerByBirthYear(year);
    }

    /**
     * Method to get a player by its position
     * @param position The position of the player to search for
     * @return A list of players with the position passed as parameter if found.
     */
    public List<Players> getPlayerByPosition(String position){
        return playersRepository.findPlayerByPosition(position);
    }

    /**
     * Method to get a player by its current club domestic competition id
     * @param current_club_domestic_competition_id The current club domestic competition id of the player to search for
     * @return A list of players with the current club domestic competition id passed as parameter if found.
     */
    public List<Players> getPlayerByCurrentClubDomesticCompetitionId(String current_club_domestic_competition_id){
        return playersRepository.findPlayerByCurrentClubDomesticCompetitionId(current_club_domestic_competition_id);
    }

    /**
     * Method to get a player by its current club name
     * @param current_club_name The current club name of the player to search for
     * @return A list of players with the current club name passed as parameter if found.
     */
    public List<Players> getPlayerByCurrentClubName(String current_club_name){
        return playersRepository.findPlayerByCurrentClubName(current_club_name);
    }

    /**
     * Method to get the top 10 players based on their market value
     * @return A list of the top 10 players based on their market value.
     */
    public List<Players> getTop10Players(){
        Pageable limit = PageRequest.of(0, 10); //Limiting the result to 10
        return playersRepository.findTop10PlayersWithValue(limit);
    }

    /**
     * Method to get a player by its current club id
     * @param current_club_id The current club id of the player to search for
     * @return A list of players with the current club id passed as parameter if found.
     */
    public List<Players> getPlayerByCurrentClubId(Integer current_club_id){
        return playersRepository.findPlayerByCurrentClubId(current_club_id);
    }

    /**
     * Method to get all players
     * @return A list of all players.
     */
    public List<Players> getAllPlayers(){
        return playersRepository.findAllPlayers();
    }
}
