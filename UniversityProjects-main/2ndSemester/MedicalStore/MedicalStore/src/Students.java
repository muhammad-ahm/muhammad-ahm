public class Students extends Teacher{
    private int rollNumber;
    private String nameStudent;
    private String grade;

    public Students(int teacherID, String name, String subject, int rollNumber, String nameStudent, String grade) {
        super(teacherID, name, subject);
        this.rollNumber = rollNumber;
        this.nameStudent = nameStudent;
        this.grade = grade;
    }

    public void display(){
        System.out.println("Student Details: ");
        System.out.println("Student Roll Number: " + rollNumber + " Name: " + nameStudent + "Grade: " + grade);
        System.out.println("Teacher ID: " + getTeacherID() + "name" + getName()+ "Subject" + getSubject());
    }
}
