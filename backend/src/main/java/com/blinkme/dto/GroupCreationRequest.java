package com.blinkme.dto;

import com.blinkme.models.GroupType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class GroupCreationRequest {
    // Getters and setters
    private Long ownerId;
    private String name;
    private String description;
    private GroupType groupType;
    private String profilePictureUrl;
}
