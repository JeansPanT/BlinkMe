package com.blinkme.repositories;

import com.blinkme.models.GroupChat;
import com.blinkme.models.GroupType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupChatRepository extends JpaRepository<GroupChat, Long> {
    List<GroupChat> findByNameContainingIgnoreCaseAndGroupType(String name, GroupType groupType);
}
