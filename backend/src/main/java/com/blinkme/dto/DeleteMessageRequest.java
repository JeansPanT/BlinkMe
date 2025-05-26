package com.blinkme.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteMessageRequest {
    private Long messageId;
    private Long userId;
}
