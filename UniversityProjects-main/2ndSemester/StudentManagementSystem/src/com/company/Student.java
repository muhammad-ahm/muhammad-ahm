package com.company;

import java.util.ArrayList;
import java.util.List;

public class Student {
    private String name;
    private int studentID;
    private Gender gender;
    List<Course> enrolledCourses = new ArrayList<>();

    public Student(String name, int studentID, Gender gender, List<Course> enrolledCourses) {
        this.name = name;
        this.studentID = studentID;
        this.gender = gender;
        this.enrolledCourses = enrolledCourses;
    }

    public Student(String zaid, int studentID, Gender gender) {
        this.name = name;
        this.studentID = studentID;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStudentID() {
        return studentID;
    }

    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public List<Course> getEnrolledCourses() {
        return enrolledCourses;
    }

    public void setEnrolledCourses(List<Course> enrolledCourses) {
        this.enrolledCourses = enrolledCourses;
    }

    public void enrollInCourse(Course course) {
        System.out.println("The new course is assigned by you. The course is " + course.getCourseName() + " and " + course.getCourseCode() + ".");
        enrolledCourses.add(course);
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", studentID=" + studentID +
                ", gender=" + gender +
                ", enrolledCourses=" + enrolledCourses +
                '}';
    }
}
