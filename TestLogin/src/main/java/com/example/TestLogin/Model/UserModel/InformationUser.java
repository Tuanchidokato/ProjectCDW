package com.example.TestLogin.Model.UserModel;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "informationuser")
public class InformationUser implements Serializable {

    @Id
    @OneToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    private String firstName;
    private String lastName;
    private String address;
    private float phoneNumber;

    public InformationUser() {
    }

    public InformationUser(User user, String firstName, String lastName, String address, float phoneNumber) {
        this.user = user;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(float phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "InformationUser{" +
                "user=" + user +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber=" + phoneNumber +
                '}';
    }
}
