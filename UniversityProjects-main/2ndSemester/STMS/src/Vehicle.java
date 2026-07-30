public abstract class Vehicle implements Regulations {
    protected String owner;
    protected String registrationNumber;
    protected int maxSpeed;

    public Vehicle(String owner, String registrationNumber, int maxSpeed) {
        this.owner = owner;
        this.registrationNumber = registrationNumber;
        this.maxSpeed = maxSpeed;
    }

    public void displayInfo(){
        System.out.println("Owner: " + owner);
        System.out.println("Registration Number: " + registrationNumber);
        System.out.println("Max Speed: " + maxSpeed + "km/h");
    }

    public abstract void start();
    public abstract void stop();
}
