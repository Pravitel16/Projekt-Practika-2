package net.java.backend.repository;

import net.java.backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Book,Long> {
}
