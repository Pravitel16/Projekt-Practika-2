package net.java.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")


public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "task_name")
    private String title;
    @Column(name = "task_option")
    private String author;
    @Column(name = "Task_Priority")
    private String publisher;
     @Column(name= "Creation-Date" )
     private String price ;
   @Column(name = "Book-status")
  private String status;



}
