module com.dinorunner.toexhek {
//    requires javafx.controls;
//    requires javafx.fxml;
    requires java.desktop;
    requires java.sql;


    opens com.dinorunner.toexhek to javafx.fxml;
    exports com.dinorunner.toexhek;
}