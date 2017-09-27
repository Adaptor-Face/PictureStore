/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package no.ntnu.tollefsen.picturestore.domain;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Kristoffer
 */
@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public  class UserGroup implements  Serializable{
    public static final String ADMIN = "admin";
    public static final String USER = "user";
    @Id String name;
    @Id String userid;
    
}
