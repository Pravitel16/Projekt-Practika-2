package net.java.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString


public class BookDto {
private Long id ;
private String title;
private String author;
private String publisher;
private String price;
private String status;




}
