package com.blinkme.repositories;

import com.blinkme.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    // Used for Login
    List<User> findByNameContainingIgnoreCase(String name);
}