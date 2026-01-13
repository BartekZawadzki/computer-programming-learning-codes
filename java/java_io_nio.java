// I/O i NIO: czytanie/zapisywanie plików, bufory, kanały, Path/Files.

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.*;
import java.util.List;

public class java_io_nio {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("sample.txt");                  // ścieżka do pliku
        Files.writeString(path, "Hello\nWorld", StandardOpenOption.CREATE); // zapis tekstu

        String content = Files.readString(path);             // odczyt całego pliku
        System.out.println(content);                         // wypisanie

        List<String> lines = Files.readAllLines(path);       // odczyt linii
        System.out.println("lines=" + lines);                // podgląd

        // Stream linii (leniwa iteracja)
        try (var stream = Files.lines(path)) {
            stream.forEach(System.out::println);             // wypisz każdą linię
        }

        // NIO z kanałem i buforem
        try (RandomAccessFile raf = new RandomAccessFile("sample.bin", "rw");
             FileChannel channel = raf.getChannel()) {       // kanał pliku
            ByteBuffer buf = ByteBuffer.allocate(8);         // bufor 8 bajtów
            buf.putInt(42);                                  // zapis int
            buf.putInt(7);                                   // zapis int
            buf.flip();                                      // przygotuj do zapisu
            channel.write(buf);                              // zapis do pliku
        }
    }
}

// ---
// Dlaczego tak:
// - Files.writeString/readString/readAllLines pokazują prosty, wysokopoziomowy I/O.
// - Files.lines demonstruje strumieniowe czytanie dużych plików bez wczytywania całości.
// - NIO z FileChannel/ByteBuffer ilustruje niższy poziom pracy na binariach i kanałach.
// - try-with-resources zapewnia automatyczne zamknięcie zasobów I/O.
