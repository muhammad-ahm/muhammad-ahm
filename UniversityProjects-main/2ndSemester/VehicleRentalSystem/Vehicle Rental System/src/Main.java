//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Vehicle car = new Vehicle(1312, "Car", "Toyota",2500.00, true);
        Vehicle bike = new Vehicle(2123, "Bike", "Honda",500.00, true);
        Vehicle van = new Vehicle(3312, "Van", "Suzuki",3000.00, true);
        Vehicle truck = new Vehicle(3122, "truck", "Suzuki",3050.00, true);
        Customer cust1 = new Customer(101, "Ali", "DL-12345");
        RentalTransaction rt1 = new RentalTransaction(1001, car, cust1, 12, "Available", 2500.0);
        RentalTransaction rt2 = new RentalTransaction(1011, bike, cust1, 12, "Available", 500.0);

        RentalInventory.addVehicle(car);
        RentalInventory.addVehicle(bike);
        RentalInventory.addVehicle(van);
        RentalInventory.addVehicle(truck);

        RentalInventory.removeVehicle(3122);

        RentalInventory.showAvailableVehicle();

        rt1.startRental();
        rt2.startRental();
        rt1.endRental();
        rt1.calculateCost();
        rt1.display();
    }
}