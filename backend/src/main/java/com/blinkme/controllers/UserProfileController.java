package com.blinkme.controllers;

import com.blinkme.models.User;
import com.blinkme.models.UserProfile;
import com.blinkme.services.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class UserProfileController {

    private final UserProfileService profileService;

    public UserProfileController(UserProfileService profileService) {
        this.profileService = profileService;
    }

    /**
     * GET endpoint to retrieve a user's profile by userId.
     * Adds full URL for profilePictureUrl before returning.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable Long userId) {
        UserProfile profile = profileService.getProfileByUserId(userId);
        if (profile != null && profile.getProfilePictureUrl() != null) {
            // Assuming profilePictureUrl stores path like /uploads/abc.jpg
            String imageUrl = "http://localhost:8080" + profile.getProfilePictureUrl();
            profile.setProfilePictureUrl(imageUrl);
        }
        return ResponseEntity.ok(profile);
    }

    /**
     * PUT endpoint to update a user's profile info and optionally upload a profile picture.
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserProfile> updateProfile(
            @PathVariable Long userId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) MultipartFile profilePicture) {
        UserProfile updatedProfile = profileService.updateProfile(userId, status, bio, profilePicture);
        if (updatedProfile != null && updatedProfile.getProfilePictureUrl() != null) {
            String imageUrl = "http://localhost:8080" + updatedProfile.getProfilePictureUrl();
            updatedProfile.setProfilePictureUrl(imageUrl);
        }
        return ResponseEntity.ok(updatedProfile);
    }

    /**
     * Search users by partial or full name.
     */
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String name) {
        List<User> users = profileService.searchUsersByName(name);
        return ResponseEntity.ok(users);
    }

    /**
     * Get all users (used by your frontend to load all chats/users).
     */
    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = profileService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
