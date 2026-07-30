public class Billing {
    private int billID;
    private Appointment appointment;
    private double totalAmount;

    public Billing(int billID, Appointment appointment, double totalAmount) {
        this.billID = billID;
        this.appointment = appointment;
        this.totalAmount = totalAmount;
    }

    public double generateBill(){
        totalAmount = appointment.getDoctor().getConsultationFee();
        return 0;
    }

    public void displaybill(){
        System.out.println("The Bill of Patient: ");
        System.out.println("Appointment ID: " + appointment.getAppointmentId());
        System.out.println("Patient: " + appointment.getPatient().getPatientName());
        System.out.println("Doctor: " + appointment.getDoctor().getName());
        System.out.println("Bill of Patient: " + totalAmount);
    }
}
