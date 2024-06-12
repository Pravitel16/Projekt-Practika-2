package net.java.backend.service;

import net.java.backend.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto create(BookDto taskDto);
    BookDto getBookById(Long taskId);

    List<BookDto> getAllBooks();


    BookDto updateBook(Long TaskId, BookDto updateTask);

    void deleteBook(Long TaskId );


}
