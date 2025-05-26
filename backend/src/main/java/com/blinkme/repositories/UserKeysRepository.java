package com.blinkme.repositories;

import com.blinkme.models.UserKeys;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserKeysRepository extends JpaRepository<UserKeys, Long> {
    boolean existsByUserId(Long userId);
    Optional<UserKeys> findByUserId(Long userId);
}
