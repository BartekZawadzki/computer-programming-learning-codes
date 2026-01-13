# Declarative Jenkinsfile z komentarzami: build/test/lint + przykładowy stage deploy.
pipeline {
    agent any                                 // uruchom na dowolnym agencie

    options {
        timestamps()                          // logi z czasem
        ansiColor('xterm')                    // kolory w konsoli
        disableConcurrentBuilds()             // uniknij równoległych buildów tego samego joba
    }

    environment {
        NODE_ENV = "production"               // przykład zmiennej środowiskowej
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm                  // pobierz kod z repo
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci --prefer-offline'  // instalacja zależności (powtarzalna)
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'             // lint (ESLint itp.)
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'                 // testy
            }
            post {
                always {
                    junit 'reports/junit/*.xml' // archiwizacja raportów JUnit (jeśli istnieją)
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'            // build aplikacji
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true // artefakty
                }
            }
        }

        stage('Deploy (example)') {
            when { branch 'main' }            // tylko na gałęzi main
            steps {
                echo 'Tutaj dodaj kroki wdrożenia (ssh/kubectl/helm/rsync itp.)'
            }
        }
    }

    post {
        success {
            echo 'Build OK'                   // wiadomość na sukces
        }
        failure {
            echo 'Build FAILED'               // wiadomość na porażkę
        }
        always {
            cleanWs()                         // sprzątanie workspace
        }
    }
}

// ---
// Dlaczego tak:
// - Deklaratywny pipeline jest czytelny i łatwo go rozszerzać o kolejne stage'e.
// - Rozdzielenie Install/Lint/Test/Build pozwala szybko zidentyfikować, gdzie padł build.
// - Post-sekcje (junit, archiveArtifacts, cleanWs) dbają o raporty i porządek niezależnie od wyniku.
// - Przykładowy Deploy z warunkiem na branch pokazuje miejsce na kroki wydania bez wpływu na gałęzie robocze.
