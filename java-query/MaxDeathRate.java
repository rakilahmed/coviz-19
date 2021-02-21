import java.text.DecimalFormat;

public class MaxDeathRate {
    public MaxDeathRate() {
    }

    private static DecimalFormat df2 = new DecimalFormat("#.##");
    private Logger l = Logger.getInstance();

    public void outputData(String threadName, int location_id, String location, int allCases, int allDeaths) {
        // Calculating the Max Death Rate and printing out the final output
        l.warn(threadName + " -- Calulating the MDR...");
        double maxDeathRate = (double) allDeaths / allCases * 100;
        l.good(threadName + " -- Successfully calculated... MDR: " + maxDeathRate);

        // Safety check -- few location's don't have enough
        // data available to do the calculation
        l.good(threadName + " -- Doing a safety check to make sure all data are available...");
        if (allCases == 0 && allDeaths == 0) {
            l.warn(threadName + " -- NO DATA FOUND!!! location_id: " + location_id + " location: " + location + "...");
            System.out.println("\n" + threadName + "\nLocation ID: " + location_id + "\s\t|\t" + "Location: " + location
                    + "\nTotal Cases: NO DATA" + "\s\t|\t" + "Total Deaths: NO DATA" + "\nMax Death Rate: NO DATA");
        } else if (allCases == 0 || allDeaths == 0) {
            if (allCases == 0) {
                l.warn(threadName + " -- ALL CASES = 0, MDR SET TO NO DATA!!! location id: " + location_id
                        + " location: " + location + "...");
            } else if (allDeaths == 0) {
                l.warn(threadName + " -- ALL DEATHS = 0, MDR SET TO NO DATA!!! location id: " + location_id
                        + " location: " + location + "...");
            }
        } else {
            l.good(threadName + " -- All data found & MDR calculation completed...");
            System.out.println("\n" + threadName + " -->>\nLocation ID: " + location_id + "\s\t|\t" + "Location: "
                    + location + "\nTotal Cases: " + allCases + "\s\t|\t" + "Total Deaths: " + allDeaths
                    + "\nMax Death Rate: " + df2.format(maxDeathRate) + "%");
            l.good(threadName + " -- Final output printed on the console...");
        }
    }
}