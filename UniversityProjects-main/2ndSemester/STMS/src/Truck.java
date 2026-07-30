public class Truck extends Vehicle {
    public Truck(String owner, String registrationNumber, int maxSpeed) {
        super(owner, registrationNumber, maxSpeed);
    }

    public void start() {
        System.out.println("Truck started.");
    }
    public void stop(){
        System.out.println("Truck stopped.");
    }

    public void checkSpeedLimit() {
        System.out.println("Truck Out limit is 90 km/h.");
    }

    public void calculateTax() {
        System.out.println("Car paid tax is 300,000.");
    }

    public void environmentalImpact() {
        System.out.println("Car High Impact.");
    }
}
