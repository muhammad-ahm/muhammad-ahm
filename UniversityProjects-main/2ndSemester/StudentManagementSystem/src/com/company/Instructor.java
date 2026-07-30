package com.company;

import java.util.ArrayList;
import java.util.List;

public class Instructor {
    private String name;
    private int instructorId;
    private List<Course> coursesTaught = new ArrayList<>();

    public Instructor(String name, int instructorId) {
        this.name = name;
        this.instructorId = instructorId;
        this.coursesTaught = coursesTaught;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(int instructorId) {
        this.instructorId = instructorId;
    }

    public List<Course> getCoursesTaught() {
        return coursesTaught;
    }

    public void setCoursesTaught(List<Course> coursesTaught) {
        this.coursesTaught = coursesTaught;
    }

    public void assignCourse(Course course){
        System.out.println("The course assigned from you is " + course.getCourseName() + " and the code " + course.getCourseCode());
        coursesTaught.add(course);
    }

    @Override
    public String toString() {
        return "Instructor{" +
                "name='" + name + '\'' +
                ", instructorId=" + instructorId +
                ", coursesTaught=" + coursesTaught +
                '}';
    }
}
