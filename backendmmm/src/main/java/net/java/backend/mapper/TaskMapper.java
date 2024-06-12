package net.java.backend.mapper;

import lombok.extern.slf4j.Slf4j;
import net.java.backend.dto.BookDto;
import net.java.backend.entity.Book;

@Slf4j
public class TaskMapper {

    public static BookDto mapToTaskDto(Book task) {
        return new BookDto(
                task.getId(),
                task.getTitle(),
                task.getAuthor(),
                task.getPublisher(),
                task.getPrice(),
                task.getStatus()

        );
    }

    public static Book mapToTask(BookDto taskDto) {
        log.info("TaskDTO {}", taskDto);
        return new Book(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getAuthor(),
                taskDto.getPublisher(),
                taskDto.getPrice(),
                taskDto.getStatus()
        );
    }
}
