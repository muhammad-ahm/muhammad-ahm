public class ElectricScooter extends Vehicle {
    public ElectricScooter(String owner, String registrationNumber, int maxSpeed) {
        super(owner, registrationNumber, maxSpeed);
    }

    public void start() {
        System.out.println("Electric Scooter started.");
    }

    public void stop(){
        System.out.println("Electric Scooter stopped.");
    }

    public void checkSpeedLimit() {
        System.out.println("Electric Scooter Out limit is 180 km/h.");
    }

    public void calculateTax() {
        System.out.println("Electric Scooter paid tax is 450,000.");
    }

    public void environmentalImpact() {
        System.out.println("Electric Scooter Moderate Impact.");
    }
}
