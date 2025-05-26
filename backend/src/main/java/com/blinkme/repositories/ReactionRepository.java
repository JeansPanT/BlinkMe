package com.blinkme.repositories;

import com.blinkme.models.Message;
import com.blinkme.models.Reaction;
import com.blinkme.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    // Find all reactions for a given message
    List<Reaction> findByMessage(Message message);

    // Find a reaction by message and user (to check if a reaction already exists)
    Optional<Reaction> findByMessageAndUser(Message message, User user);
}
