/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package no.ntnu.tollefsen.picturestore.domain;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Kristoffer
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement @XmlAccessorType(XmlAccessType.FIELD)
public class SecureUser implements Serializable {

    @Id
    String userId;

    @XmlTransient
    String password;
}
