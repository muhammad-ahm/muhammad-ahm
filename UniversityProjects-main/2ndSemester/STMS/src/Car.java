public class Car extends Vehicle {
    public Car(String owner, String registrationNumber, int maxSpeed) {
        super(owner, registrationNumber, maxSpeed);
    }

    public void start() {
        System.out.println("Car started.");
    }

    public void stop(){
        System.out.println("Car stopped.");
    }

    public void checkSpeedLimit() {
        System.out.println("Car Out limit is 150 km/h.");
    }

    public void calculateTax() {
        System.out.println("Car paid tax is 120,000.");
    }

    public void environmentalImpact() {
        System.out.println("Car Moderate Impact.");
    }
}
