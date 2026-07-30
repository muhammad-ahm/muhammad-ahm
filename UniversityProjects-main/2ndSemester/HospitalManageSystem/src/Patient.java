public class Patient {
    private int patientID;
    private String patientName;
    private int patientAge;
    private String patientAilment;

    public Patient(int patientID, String patientName, int patientAge, String patientAilment) {
        this.patientID = patientID;
        this.patientName = patientName;
        this.patientAge = patientAge;
        this.patientAilment = patientAilment;
    }

    public int getPatientID() {
        return patientID;
    }

    public void setPatientID(int patientID) {
        this.patientID = patientID;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public int getPatientAge() {
        return patientAge;
    }

    public void setPatientAge(int patientAge) {
        this.patientAge = patientAge;
    }

    public String getPatientAilment() {
        return patientAilment;
    }

    public void setPatientAilment(String patientAilment) {
        this.patientAilment = patientAilment;
    }
}
