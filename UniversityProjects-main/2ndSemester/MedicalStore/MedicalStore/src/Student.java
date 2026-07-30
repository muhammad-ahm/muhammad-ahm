public class Student extends Teacher {
//    studentID (String), name
//(String), and grade (double).
    private String studentID;
    private String name;
    private double grade;

    public Student(int i, String studentID, String name, double grade, String ahmed, String oop) {
        this.studentID = studentID;
        this.name = name;
        this.grade = grade;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    public void updateGrade(double newGrade){
        grade = newGrade;
    }

    public String getDetails(){
        return "Student ID: " + studentID + " Name: " + name + " Grade: "+ grade;
    }
}
