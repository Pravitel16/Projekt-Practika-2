package net.java.backend.service;

import net.java.backend.dto.UserDto;
import net.java.backend.entity.Book;
import net.java.backend.entity.User;
import net.java.backend.repository.TaskRepository;
import net.java.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public void registerUser(UserDto userDto) {
        // Создание нового пользователя
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        // Сохранение пользователя в базе данных
        User savedUser = userRepository.save(user);

        // Создание и сохранение связанных сотрудников (tasks)
        List<Book> tasks = userDto.getEmployees().stream().map(taskDto -> {
            Book task = new Book();

            task.setTitle(taskDto.getTitle());
            task.setAuthor(taskDto.getAuthor());
            task.setPublisher(taskDto.getPublisher());
            task.setPrice(taskDto.getPrice());

            return task;
        }).collect(Collectors.toList());

        taskRepository.saveAll(tasks);
    }
}