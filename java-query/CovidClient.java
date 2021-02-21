import java.net.http.HttpResponse;
import java.util.concurrent.TimeUnit;

import org.cache2k.Cache;
import org.cache2k.Cache2kBuilder;

/**
 * CovidClient
 */
public class CovidClient {
  public static void main(String[] args) throws InterruptedException {
    Cache<Integer, HttpResponse<String>> cache = new Cache2kBuilder<Integer, HttpResponse<String>>() {
    }.name("locationID").eternal(true).entryCapacity(100).build();

    // Multi-thraded program -- able to do the same task in different
    // threads at the same time
    for (int i = 1; i <= 3; i++) {
      Task thread = new Task("Thread " + i, cache);
      thread.start();
      TimeUnit.SECONDS.sleep(1);
    }
  }
}

/**
 * Task
 */
class Task extends Thread {
  private String threadName;
  private Logger l = Logger.getInstance();
  private Cache<Integer, HttpResponse<String>> cache;

  public Task(String T, Cache<Integer, HttpResponse<String>> tCache) {
    threadName = T;
    cache = tCache;
    l.good(threadName + " -- Initializing...");
  }

  public void run() {
    l.good(threadName + " -- Running...");

    // Connecting to the API
    l.warn(threadName + " -- Sending a request to connect to the API...");
    ApiRequest request = new ApiRequest();
    request.connect(threadName, cache);
  }
}