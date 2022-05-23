package com.example.TestLogin.Controller;

import com.example.TestLogin.Model.ResponseObject.ResponseObject;
import com.example.TestLogin.Model.UserModel.User;
import com.example.TestLogin.Repository.UserRepository;
import com.example.TestLogin.Service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.print.attribute.standard.Media;
import java.io.File;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "api/auth/FileUpLoad")
public class FileUpLoadController {

    @Autowired
    private IStorageService storageService;

    @Autowired
    private UserRepository userRepository;

    private static String imageDirectory = System.getProperty("user.dir") + "/images/";
    @PostMapping("")
    public ResponseEntity<ResponseObject> upLoadFile(@RequestParam("file")MultipartFile file){
        try {

            // save file to a folder  => use a service
            String generatedFileName = storageService.storeFile(file);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok","upload file successfully", generatedFileName)
            );
        }catch (Exception exception){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("ok",exception.getMessage(),"")
            );
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<ResponseObject> insertImage(@PathVariable Long id,@RequestParam("file") MultipartFile file){
        try {
            String generatedFileName = storageService.storeFile(file);
            User user= userRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Không tìm thấy user")
            );
            user.setImageUrl(generatedFileName);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok","Upload image successfully",user)
            );
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("not ok", e.getMessage(), "")
            );
        }
    }

    @GetMapping(value = "/file/{fileName:.+}",produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName){

        try {
            byte[] bytes =storageService.readFileContent(fileName);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        }
        catch (Exception e){
                return ResponseEntity.noContent().build();
        }
    }
    @GetMapping("")
    public ResponseEntity<ResponseObject> getUpLoadFiles(){
        try {
            List<String >urls = storageService.loadAll()
                    .map(path -> {
                        String urlPath= MvcUriComponentsBuilder.fromMethodName(FileUpLoadController.class,
                                "readDetailFile", path.getFileName().toString()
                                ).build().toUri().toString();
                        return urlPath;
                    }).collect(Collectors.toList());
            return ResponseEntity.ok(new ResponseObject("ok","list file successfully",urls));
        }catch (Exception e ){
            return ResponseEntity.ok(new ResponseObject("failed","List files fail",new String[]{}));

        }
    }

}
