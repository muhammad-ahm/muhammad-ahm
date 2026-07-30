import java.sql.Date;

public class Appointment {
    private int appointmentId;
    private Patient patient;
    private Doctor doctor;
    private Date date;
    private String status;

    public Appointment(int appointmentId, Patient patient, Doctor doctor, Date date, String status) {
        this.appointmentId = appointmentId;
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.status = status;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void scheduleAppointment(){
        System.out.println("Appointment Timing: ");
        System.out.println("Appointment ID: " + appointmentId);
        System.out.println("Patient ID: " + patient.getPatientID() + " Name " + patient.getPatientName());
        System.out.println("Doctor ID: " + doctor.getId()+ " Name " +doctor.getName());
        System.out.println("Date: " + date);
        System.out.println("Status: " + status);
    }

    public void completeAppointment(){
        System.out.println("The Appointment is Complete.");
        setStatus("Complete");
        System.out.println("Appointment ID: " + appointmentId);
        System.out.println("Patient: " + patient.getPatientName());
        System.out.println("Doctor: " + doctor.getName());
        System.out.println("Date: " + date);
        System.out.println("Status: " + status);
    }
}
