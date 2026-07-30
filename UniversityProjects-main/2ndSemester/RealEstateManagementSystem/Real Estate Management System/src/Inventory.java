import java.awt.print.Book;
import java.util.ArrayList;

public class Inventory {
    private static ArrayList<Property> properties = new ArrayList<>();

    public static void addProperty(Property property){
        properties.add(property);
    }

    public static boolean removeProperty(int id){
        return properties.removeIf(property -> property.getId() = id);
    }

    public static void displayProperty(){
        for (Property property : properties){
            System.out.println("Location: " + property.getLocation());
            System.out.println("Area: " + property.getArea());
        }
    }
}
