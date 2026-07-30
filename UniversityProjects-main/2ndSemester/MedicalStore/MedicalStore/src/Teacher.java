public class Teacher {
    private int teacherID;
    private String name;
    private String subject;

    public Teacher(int teacherID, String name, String subject) {
        this.teacherID = teacherID;
        this.name = name;
        this.subject = subject;
    }

    public int getTeacherID() {
        return teacherID;
    }

    public void setTeacherID(int teacherID) {
        this.teacherID = teacherID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
