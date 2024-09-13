# Football Data Analytics System

## Introduction

Questo progetto è focalizzato sull'applicazione delle tecniche per accedere al Web e analizzare i suoi contenuti. Utilizzando i metodi e le tecnologie presentate nel modulo, il sistema permette di accedere e analizzare dati calcistici estratti da Transfermarkt, organizzati in file CSV. Il sistema è progettato per essere utilizzato sia da fan (non esperti) sia da esperti del settore calcistico (pundits), offrendo un'interfaccia facile da usare per esplorare e visualizzare i dati.

## Requirements

### Architettura

L'architettura è composta da più server, scritti in diversi linguaggi:

- **Javascript (Express)**: Server centrale per la gestione delle query e la comunicazione con altri server.
- **Java (Spring Boot)**: Server dedicato per l'accesso ai database.

I dati sono memorizzati in due tipi di database:

- **MongoDB**: Per i dati dinamici come partite, punteggi e goal.
- **PostgreSQL**: Per i dati più statici, come le informazioni sui giocatori e i valori di mercato.

### Funzionalità Principali

Il sistema offre le seguenti funzionalità:

1. **Interfaccia Web**: Pagina HTML + JavaScript + CSS per l'esplorazione e la visualizzazione dei dati calcistici. Gli utenti possono effettuare query personalizzate per accedere ai dati.
   
2. **Query Distribuite**: Le richieste sono gestite da un server centrale (Express), che comunica con altri server (Express, SpringBoot) per accedere ai dati nei database. Il server centrale è progettato per essere leggero e veloce, capace di servire migliaia di utenti.

3. **Gestione dei Dati**:
   - **Dati Dinamici** (partite, punteggi, goal): Memorizzati in MongoDB per garantire un accesso veloce ai dati aggiornati frequentemente.
   - **Dati Statici** (informazioni sui giocatori, nomi delle competizioni): Memorizzati in PostgreSQL per la gestione dei dati meno volatili.

4. **Sistema di Chat**: Viene implementata un sistema di chat per discutere di specifiche tematiche calcistiche in stanze dedicate ai diversi campionati. Questo è stato realizzato con **Socket.io** per garantire comunicazioni in tempo reale tra gli utenti.

### Jupyter Notebooks

Le funzionalità dei **Jupyter Notebook** includono:

- Analisi dettagliata di un sottoinsieme di dati (ad esempio, statistiche sui giocatori italiani, squadre tedesche, ecc.).
- Visualizzazioni multiple e varie (grafici a barre, grafici a torta, istogrammi, ecc.) per fornire una comprensione completa dei dati.

## Installazione

1. Clona la repository:
    ```bash
    git clone https://github.com/ilaario/IUM-TWEB_Project.git
    ```

2. Installa le dipendenze per i server:
    - **Express Main (Node.js)**:
      ```bash
      cd solutions/Main_Server
      npm install
      ```

    - **Express MongoDB (Node.js)**:
      ```bash
      cd solutions/MongoDB_Server
      npm install
      ```
    
    - **SpringBoot PostgreSQL (Java)**:
      Importa il progetto in un IDE come IntelliJ o Eclipse e risolvi le dipendenze tramite Gradle.

3. Configura i database:
    - Avvia i database MongoDB e PostgreSQL e importa i file CSV nei database corrispondenti.

4. Avvia i server:
    - **Express Main**:
      ```bash
      npm start
      ```

    - **Express MongoDB**:
      ```bash
      npm start
      ```

    - **SpringBoot PostgreSQL**: Avvia il server tramite IDE o linea di comando.

5. Accedi al sistema tramite l'interfaccia web.

## Utilizzo

- Gli utenti possono accedere all'interfaccia web per esplorare i dati calcistici, effettuare query personalizzate e visualizzare le informazioni.
- Gli esperti e i fan possono partecipare a discussioni in tempo reale attraverso il sistema di chat.
- Gli utenti possono anche scaricare ed esaminare i Jupyter Notebooks per visualizzare le analisi avanzate sui dati.

## Struttura del Progetto

```bash
/FUORICampo
│
├── /solutions/                 # Codice dei server
|   ├── /Data_Analysis/         # Jupyter Notebooks
│   ├── /Main_Server/           # Server Express (Node.js)
|   |   └── /public/            # Frontend HTML, CSS e JavaScript
│   ├── /MongoDB_Server/        # Server Express (Node.js)
│   └── /PostgreSQL_Server/     # Server Spring Boot (Java)
│
├── /databaseschema/            # Dump schema SQL per PostgreSQL
│
├── /queryexamples/             # Screenshot di esempio delle diverse query
|
├── /report/                    # Report del progetto
│
└── README.md                   # Il file che stai leggendo