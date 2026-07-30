import java.util.ArrayList;

public class HotelInventory {
    private static ArrayList<Room> rooms = new ArrayList<>();

    public static void addRoom(Room room){
        rooms.add(room);
    }

    public static void checkAvailability(){
        for (Room room : rooms){
            System.out.println("The Available Room; " + room.getRoomNumber());
        }
    }
}
