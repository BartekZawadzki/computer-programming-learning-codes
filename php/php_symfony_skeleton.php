<?php
// Szkic Symfony: kontroler, routing atrybutowy, serwis, prosty Doctrine entity/repo (komentarze).
// Zakłada projekt symfony; kod do wklejenia w odpowiednie pliki.

// src/Controller/UserController.php
// namespace App\Controller;
// use App\Service\UserService;
// use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
// use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\HttpFoundation\Request;
// use Symfony\Component\Routing\Annotation\Route;
// class UserController extends AbstractController {
//     public function __construct(private UserService $service) {} // DI serwisu
//     #[Route('/api/users', methods: ['POST'])]
//     public function create(Request $req): JsonResponse {
//         $data = json_decode($req->getContent(), true) ?? [];    // pobierz body
//         $user = $this->service->create($data['name'] ?? '', $data['email'] ?? ''); // logika
//         return $this->json($user, 201);                         // zwróć JSON 201
//     }
//     #[Route('/api/users/{id}', methods: ['GET'])]
//     public function getOne(int $id): JsonResponse {
//         $user = $this->service->get($id);                       // pobierz lub wyrzuć
//         return $this->json($user);                              // zwróć JSON
//     }
// }

// src/Service/UserService.php
// namespace App\Service;
// use App\Entity\User;
// use Doctrine\ORM\EntityManagerInterface;
// class UserService {
//     public function __construct(private EntityManagerInterface $em) {}
//     public function create(string $name, string $email): User {
//         if ($name === '' || $email === '') { throw new \InvalidArgumentException(); } // walidacja
//         $u = new User();                         // nowa encja
//         $u->setName($name); $u->setEmail($email); // ustaw pola
//         $this->em->persist($u); $this->em->flush(); // zapis do DB
//         return $u;                                // zwróć encję
//     }
//     public function get(int $id): User {
//         $u = $this->em->find(User::class, $id);   // znajdź po PK
//         if (!$u) { throw new \RuntimeException("Not found"); } // błąd gdy brak
//         return $u;                                 // zwróć
//     }
// }

// src/Entity/User.php
// namespace App\Entity;
// use Doctrine\ORM\Mapping as ORM;
// #[ORM\Entity]
// class User {
//     #[ORM\Id, ORM\GeneratedValue, ORM\Column] private ?int $id = null; // PK
//     #[ORM\Column(length: 100)] private string $name;                   // kolumna name
//     #[ORM\Column(length: 150, unique: true)] private string $email;    // kolumna email
//     public function getId(): ?int { return $this->id; }                // getter
//     public function getName(): string { return $this->name; }          // getter
//     public function setName(string $name): void { $this->name = $name; } // setter
//     public function getEmail(): string { return $this->email; }        // getter
//     public function setEmail(string $email): void { $this->email = $email; } // setter
// }

// ---
// Dlaczego tak:
// - Szkic pokazuje typowy stack Symfony: kontroler z routingiem atrybutowym, serwis z DI, encja Doctrine.
// - Walidacja danych wejściowych w serwisie chroni przed pustymi wartościami przed persist/flush.
// - Atrybuty ORM na polach encji definiują schemat (PK, unikalność email) bez dodatkowych plików.
// - Komentarze z pełnymi ścieżkami ułatwiają wklejenie kodu w odpowiednie miejsca projektu Symfony.
