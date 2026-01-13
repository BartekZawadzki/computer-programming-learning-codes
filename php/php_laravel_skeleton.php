<?php
// Szkic Laravel: routing, kontroler, request z walidacją, model + migracja (komentarze).
// Zakłada projekt laravelowy; kod do wklejenia w odpowiednie pliki.

// routes/api.php
// Route::post('/users', [UserController::class, 'store']);      // REST create
// Route::get('/users/{id}', [UserController::class, 'show']);   // REST read

// app/Http/Controllers/UserController.php
// namespace App\Http\Controllers;
// use App\Http\Requests\UserStoreRequest;
// use App\Models\User;
// class UserController extends Controller {
//     public function store(UserStoreRequest $req) {
//         $user = User::create($req->validated());              // zapis z walidacją
//         return response()->json($user, 201);                  // zwróć JSON 201
//     }
//     public function show(string $id) {
//         $user = User::findOrFail($id);                        // 404 gdy brak
//         return response()->json($user);                       // zwróć JSON
//     }
// }

// app/Http/Requests/UserStoreRequest.php
// namespace App\Http\Requests;
// use Illuminate\Foundation\Http\FormRequest;
// class UserStoreRequest extends FormRequest {
//     public function rules(): array {
//         return [
//             'name' => ['required', 'string', 'max:100'],      // walidacja name
//             'email' => ['required', 'email', 'unique:users'], // unikalny email
//         ];
//     }
// }

// app/Models/User.php  (przykład: włącz fillable)
// namespace App\Models;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
// class User extends Model {
//     use HasFactory;
//     protected $fillable = ['name', 'email'];                  // mass-assignable
// }

// database/migrations/xxxx_create_users_table.php
// Schema::create('users', function (Blueprint $table) {
//     $table->id();                                             // PK
//     $table->string('name', 100);                              // kolumna name
//     $table->string('email')->unique();                        // unikalny email
//     $table->timestamps();                                     // created_at/updated_at
// });

// ---
// Dlaczego tak:
// - Szkic odwzorowuje typowy przepływ Laravel: route -> controller -> request (walidacja) -> model -> DB migracja.
// - UserStoreRequest wymusza walidację i unikalność email przed utworzeniem modelu.
// - Fillable chroni przed mass assignment, a migration definiuje unikalny indeks na email.
// - Komentarze z pełnymi ścieżkami plików ułatwiają wklejenie kodu w odpowiednie miejsca projektu.
