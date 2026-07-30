public class Booking {
    private int bookingID;
    private Guest guest;
    private Room room;
    private int night;
    private double totalPrice;

    public Booking(int bookingID, Guest guest, Room room, int night, double totalPrice) {
        this.bookingID = bookingID;
        this.guest = guest;
        this.room = room;
        this.night = night;
        this.calculateCharge() = totalPrice;
    }

    public void confirmBooking(){
        System.out.println("The Room Booking is complete. The Room Number: " + room.getRoomNumber());
    }

    public double calculateCharge(){
        totalPrice = night * room.getPricePerNight();
        return totalPrice;
    }
}
