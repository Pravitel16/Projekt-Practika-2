package net.java.backend.expection;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFounExeption extends  RuntimeException{
public ResourceNotFounExeption (String message){


    super(message);
}

}
