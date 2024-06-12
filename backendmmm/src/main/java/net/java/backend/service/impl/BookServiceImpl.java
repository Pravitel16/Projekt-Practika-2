package net.java.backend.service.impl;

import lombok.AllArgsConstructor;
import net.java.backend.dto.BookDto;
import net.java.backend.entity.Book;
import net.java.backend.expection.ResourceNotFounExeption;
import net.java.backend.mapper.TaskMapper;
import net.java.backend.repository.TaskRepository;
import net.java.backend.service.BookService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {

private TaskRepository taskRepository;
    @Override
    public BookDto create(BookDto taskDto) {
        Book employee = TaskMapper.mapToTask(taskDto);

       Book savedEmployee = taskRepository.save(employee);

        return TaskMapper.mapToTaskDto(savedEmployee);
    }

    @Override
    public BookDto getBookById(Long taskId) {
       Book task = taskRepository.findById(taskId)
              .orElseThrow(()->new ResourceNotFounExeption("Task is not existed with given id : " + taskId ));
        return TaskMapper.mapToTaskDto(task);
    }



    @Override
    public List<BookDto> getAllBooks() {
        List<Book> task =  taskRepository.findAll();


        return task.stream().map((Task) ->TaskMapper.mapToTaskDto(Task))
                .collect(Collectors.toList());

    }

    @Override
    public BookDto updateBook(Long TaskId, BookDto updateTask) {
        Book task =  taskRepository.findById(TaskId).orElseThrow(
                ()-> new ResourceNotFounExeption("Task is not exist with given id " + TaskId)

        );
        task.setTitle(updateTask.getTitle());
        task.setAuthor(updateTask.getAuthor());
        task.setPublisher(updateTask.getPublisher());
        task.setPrice(updateTask.getPrice());
        Book updateTaskObj =   taskRepository.save(task);


        return TaskMapper.mapToTaskDto(updateTaskObj);
    }

    @Override
    public void deleteBook(Long taskId) {
        Book task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFounExeption("Task does not exist with given id " + taskId)
        );
        taskRepository.deleteById(taskId);
    }


}
