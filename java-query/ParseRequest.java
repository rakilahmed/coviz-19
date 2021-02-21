import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ParseRequest {
    public ParseRequest() {
    }

    private Logger l = Logger.getInstance();

    public void parse(String threadName, String responseBody) {
        JSONArray allData;
        try {
            // An array with all the data from the responseBody
            l.warn(threadName + " -- Converting the response body to JSON...");
            allData = new JSONArray(responseBody);
            l.good(threadName + " -- Successfully converted...");

            // Variable initialization -- to be used globaly in the scope
            int allCases = 0, allDeaths = 0, location_id = 0;
            String location = "", date = "";

            // Loop through the JSONArray -- get the data (# of cases) from each object
            l.warn(threadName + " -- Looping through the JSON array & calculating the total cases and deaths...");
            for (int i = 0; i < allData.length(); i++) {
                JSONObject data = allData.getJSONObject(i);
                location_id = data.getInt("location_id");
                location = data.getString("location");
                date = data.getString("date");

                // Safety check -- if the data is not available then continue
                int total_cases = 0, total_deaths = 0;
                try {
                    total_cases = data.getInt("total_cases");
                    total_deaths = data.getInt("total_deaths");
                } catch (Exception e) {
                    l.warn(threadName + " -- NO DATA FOUND!!! item number: " + i + " location_id: " + location_id
                            + " location: " + location + " date: " + date + "...");
                    continue;
                }

                // Add the total_cases & total_deaths from each
                // object to the allCases & allDeaths
                allCases += total_cases;
                allDeaths += total_deaths;
            }
            l.good(threadName + " -- Successfully calculated the total cases and deaths...");

            // Calculating the MDR
            l.warn(threadName + " -- Passing the data to calculate the Max Death Rate...");
            MaxDeathRate calculateMDR = new MaxDeathRate();
            calculateMDR.outputData(threadName, location_id, location, allCases, allDeaths);
            l.good(threadName + " -- [DONE] Printed everything successfully! [ENJOY]...");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}