package com.blinkme.repositories;

import com.blinkme.models.GroupChat;
import com.blinkme.models.GroupJoinRequest;
import com.blinkme.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupJoinRequestRepository extends JpaRepository<GroupJoinRequest, Long> {
    Optional<GroupJoinRequest> findByGroupChatAndUser(GroupChat groupChat, User user);
    List<GroupJoinRequest> findByGroupChatAndStatus(GroupChat groupChat, com.blinkme.models.RequestStatus status);
}
