public class Bike extends Vehicle {
    public Bike(String owner, String registrationNumber, int maxSpeed) {
        super(owner, registrationNumber, maxSpeed);
    }

    public void start() {
        System.out.println("Bike started.");
    }
    public void stop(){
        System.out.println("Bike stopped.");
    }

    public void checkSpeedLimit() {
        System.out.println("Bike Out limit is 120 km/h.");
    }

    public void calculateTax() {
        System.out.println("Bike paid tax is 200,000.");
    }

    public void environmentalImpact() {
        System.out.println("Bike Low Impact.");
    }
}
