import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class Logger {

  private static Logger instance;

  public static Logger getInstance() {

    if (instance == null) {
      instance = new Logger();
    }

    return instance;
  }

  private boolean loggerSetup;
  private File f;
  FileWriter writer;
  BufferedWriter bw;

  private Logger() {
    try {
      this.f = new File("log.txt");
      writer = new FileWriter(f);
      bw = new BufferedWriter(writer);

      if (!f.exists()) {
        f.createNewFile();
        this.loggerSetup = true;
      }

    } catch (IOException e) {
      e.printStackTrace();
    }

    if (!f.exists()) {

      this.loggerSetup = true;
    }
  }

  public boolean isLoggerSetup() {
    return loggerSetup;
  }

  private void log(String msg) {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMM dd, yy hh:mm:ss a");
    LocalDateTime now = LocalDateTime.now();
    String message = "[" + dtf.format(now) + "] " + msg + "\n";

    try {
      bw.write(message);
      bw.flush();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void good(String msg) {
    log("-- [GOOD] " + msg);
  }

  public void warn(String msg) {
    log("-- [WARN] " + msg);
  }
}
