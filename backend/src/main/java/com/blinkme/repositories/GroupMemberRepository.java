package com.blinkme.repositories;

import com.blinkme.models.GroupChat;
import com.blinkme.models.GroupMember;
import com.blinkme.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
    Optional<GroupMember> findByGroupChatAndUser(GroupChat groupChat, User user);
    List<GroupMember> findByGroupChat(GroupChat groupChat);
    boolean existsByGroupChatAndUser(GroupChat groupChat, User user);
}
