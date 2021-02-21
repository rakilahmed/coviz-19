import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.cache2k.Cache;

public class ApiRequest {

    public ApiRequest() {
    }

    private Logger l = Logger.getInstance();

    public void connect(String threadName, Cache<Integer, HttpResponse<String>> cache) {
        // Generating a random location_id
        int min = 1, max = 212;
        l.good(threadName + " -- Generating random location_id...");

        int randLocationID = (int) Math.floor(Math.random() * (max - min) + min);
        l.good(threadName + " -- Random location_id generated, location_id is " + randLocationID + "...");

        if (cache.containsKey(randLocationID)) {
            l.good(threadName + " -- CACHE FOUND FOR LOCATION_ID: " + randLocationID + "...");
            // Calling the parse function from ParseRequest class to
            // parse the string resoponse to json
            l.warn(threadName + " -- Sending the response for parsing into JSON...");
            ParseRequest parseJSON = new ParseRequest();
            parseJSON.parse(threadName, cache.peek(randLocationID).body());
        } else {
            l.warn(threadName + " -- NO CACHE FOUND FOR LOCATION_ID: " + randLocationID);
            // TO USE HttpClient -- Java 11 needed
            l.good(threadName + " -- Setting up HttpClient...");
            HttpClient client = HttpClient.newHttpClient();

            // Creating a connection with the API || ID 88 got no data...
            l.warn(threadName + " -- Creating a connection with the API...");
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(String.format("https://demo-covid-api.herokuapp.com/api/" + randLocationID))).GET()
                    .build();
            l.good(threadName + " -- Connected successfully...");

            try {
                // Sends a async request to the given URI and gets the response
                // then calls the parse function and hands the responseBody
                l.warn(threadName + " -- Sending a request to the API...");
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                l.good(threadName + " -- Requested successfully and got the response back...");

                cache.put(randLocationID, response);
                l.warn(threadName + " -- NEW CACHE ADDED FOR LOCATION_ID " + randLocationID + "...");

                // Calling the parse function from ParseRequest class to
                // parse the string resoponse to json
                l.warn(threadName + " -- Sending the response for parsing into JSON...");
                ParseRequest parseJSON = new ParseRequest();
                parseJSON.parse(threadName, response.body());

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}