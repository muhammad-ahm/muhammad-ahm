import java.sql.Date;
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        Patient patient1 = new Patient(1234567, "Ali Raza Qasmi", 15, "Eye Treatment");
        Patient patient2 = new Patient(1343234, "Alina Solier", 27, "Pragnancy");

        Doctor doctor1 = new Doctor(12987632, "Ahmed Khovaja", "Eye Specialist", 32000.98);
        Doctor doctor2 = new Doctor(63563348, "Muskan Kumari", "Gynacoligst", 25000.00);

        LocalDate localDate = LocalDate.of(2025, 4, 11);
        Date date = Date.valueOf(localDate);

        Appointment appointment1 = new Appointment(12345, patient1, doctor1, date,"Scheduled");
        Appointment appointment2 = new Appointment(12432, patient2, doctor2, date, "Completed");

        Billing bill1 = new Billing(123, appointment1, 32000.00);
        Billing bill2 = new Billing(432, appointment2, 25000.00);

        appointment1.scheduleAppointment();
        appointment1.completeAppointment();
        appointment2.scheduleAppointment();
        appointment2.completeAppointment();

        bill1.generateBill();
        bill1.displaybill();
        bill2.generateBill();
        bill2.displaybill();

    }
}


