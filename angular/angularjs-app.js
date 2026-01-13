// AngularJS 1.x – moduł i kontroler z prostą logiką in-memory.
angular.module('legacyApp', [])                 // definiujemy moduł
.controller('MainCtrl', function() {            // kontroler główny
  const vm = this;                              // vm = view-model
  vm.title = 'AngularJS 1.x przykład';          // tytuł
  vm.users = [                                  // lista użytkowników in-memory
    { id: 1, name: 'Ala', email: 'ala@example.com' },
    { id: 2, name: 'Ola', email: 'ola@example.com' },
  ];
  vm.newName = '';                              // pola formularza
  vm.newEmail = '';

  vm.addUser = function() {                     // dodawanie użytkownika
    if (!vm.newName || !vm.newEmail) return;    // prosta walidacja
    const id = vm.users.length ? vm.users[vm.users.length - 1].id + 1 : 1; // kolejne id
    vm.users.push({ id, name: vm.newName, email: vm.newEmail }); // dodaj do listy
    vm.newName = ''; vm.newEmail = '';          // wyczyść formularz
  };

  vm.remove = function(id) {                    // usuwanie użytkownika po id
    vm.users = vm.users.filter(u => u.id !== id);
  };
});

// ---
// Dlaczego tak:
// - Użycie vm=this (controllerAs) zamiast $scope upraszcza wiązania i czytelność.
// - Prosta in-memory lista pokazuje podstawy AngularJS (ng-model, ng-repeat, ng-click) bez zewnętrznych serwisów.
// - Dodawanie/usuwanie w kontrolerze ilustruje dwukierunkowy binding i aktualizację widoku automatycznie przez digest.
