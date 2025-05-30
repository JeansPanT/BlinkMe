package com.blinkme.dto;

import com.blinkme.models.Message;
import com.blinkme.models.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Data
public class ChatSearchResponse {
    private User user;
    private List<Message> messages;

    public ChatSearchResponse() {
    }

    public ChatSearchResponse(User user, List<Message> messages) {
        this.user = user;
        this.messages = messages;
    }

}
