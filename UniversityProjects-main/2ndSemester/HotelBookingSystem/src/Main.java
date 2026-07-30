public class Main {
    public static void main(String[] args) {
        Room r1 = new Room(1, "Double", true, 5000);
        Room r2 = new Room(2, "Single", true, 3000);
        Room r3 = new Room(3, "Suite", true, 8000);
        Room r4 = new Room(4, "Single", true, 3000);
        Room r5 = new Room(5, "Suite", true, 8000);

        Guest g1 = new Guest(1324, "Khowaja Nawaz", "khowaja_nawaz@outlook.com");
        Guest g2 = new Guest(6543, "Karan Rajput", "rajputkaran@email.com");

        Booking b1 = new Booking(12345, g1, r1, 3, );


    }
}

