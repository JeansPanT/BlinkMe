package com.blinkme.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MarkDeliveredRequest {
    private Long messageId;
    private Long recipientId;
}
