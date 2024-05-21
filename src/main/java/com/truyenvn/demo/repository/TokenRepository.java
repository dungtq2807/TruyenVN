package com.truyenvn.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.truyenvn.demo.entity.Token;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TokenRepository extends JpaRepository<Token, UUID> {

    @Query("select t from Token t inner join User u " +
            "on t.user.id = u.id " +
            "where t.user.id = :id and t.loggedOut = false ")
    List<Token> findAllTokenByUser(UUID id);
    Optional<Token> findByToken(String token);
}
