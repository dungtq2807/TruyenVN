package com.truyenvn.demo.service;

import com.truyenvn.demo.entity.Token;
import com.truyenvn.demo.entity.User;
import com.truyenvn.demo.repository.TokenRepository;
import com.truyenvn.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;


    public Map<String, Object> register(User request) {

        // check if user already exist. if exist than authenticate the user
        if (repository.findByUsername(request.getUsername()).isPresent()) {
//            return new AuthenticationResponse(null, "User already exist");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));


        user.setRole(request.getRole());

        user = repository.save(user);

        String jwt = jwtService.generateToken(user);

        saveUserToken(user, jwt);

        Map<String, Object> result = new HashMap<>();
        result.put("token", jwt);
        result.put("data", user);
        return result;

    }

    public Map<String, Object> authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        saveUserToken(user, jwt);


        List<Token> validTokenListByUser = tokenRepository.findAllTokenByUser(user.getId());

        if(!validTokenListByUser.isEmpty()){
            validTokenListByUser.forEach(t -> {
                t.setLoggedOut(false);
            });
        }

        tokenRepository.saveAll(validTokenListByUser);

        Map<String, Object> result = new HashMap<>();
        result.put("token", jwt);
        result.put("data", user);

        return result;

    }


    private void saveUserToken(User user, String jwt) {
        Token token = new Token().builder()
                .token(jwt)
                .loggedOut(false)
                .user(user)
                .build();
        tokenRepository.save(token);
    }
}
