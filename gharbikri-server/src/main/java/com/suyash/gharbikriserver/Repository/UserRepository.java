package com.suyash.gharbikriserver.Repository;

import com.suyash.gharbikriserver.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * this interface will provide the methods to perform the database operations on the user table
 */
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}
