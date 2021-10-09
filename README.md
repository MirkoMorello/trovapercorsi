# 🚵‍♀️ Trovapercorsi 🚵‍♀️

Trovapercorsi è un sito web costruito attorno alle API messe a disposizione dal [sito della lombardia](https://dati.lombardia.it/), più specificatamente utilizza il dataset messo a disposizione contenente le informazioni sui percorsi ciclabili nella provincia di Monza e Brianza, questo progetto è un Proof of Concept di cosa si potrebbe fare utilizzando la varie API disponibili online, in quanto tale, la scelta di scegliere la provincia di Monza e Brianza è stata presa in quanto si ha un dataset più completo rispetto ad altre province.

Per via dell'inconsistenza dei campi dei dataset delle varie province, questo progetto è meno modulare di quanto avrei voluto, che fosse, essendo incentrato completamente sui campi del dataset della provincia di Monza e Brianza.

### Relazione
La relazione è stata scritta in [LaTeX](https://www.latex-project.org/), si è scelto di evitare di inserire il codice sorgente della relazione poichè contiene informazioni di contatto personali e non vorrei fosse indexabile da spam bot che scannerizzano le varie repo in github, se si vuole avere accesso a tale codice sorgente basta usare quest'ultime informazioni per contattarmi e sarò più che felice di fornirlo.

## Installazione

Usare il package manager [npm](https://www.npmjs.com/) per installare tutte le dipendenze presenti in package.json

```bash
npm install .
```

## Utilizzo

Per avviare il server basta eseguire il file www
```bash
node bin/www
```
Tuttavia, è caldamente consigliato l'utilizzo di [Nodemon](https://www.npmjs.com/package/nodemon) per apportare modifiche in tempo reale senza avere la necessità di riavviare costantemente il server
```bash
nodemon
```
### Errori comuni:
```bash
const utf8Encoder = new TextEncoder();
                    ^

ReferenceError: TextEncoder is not defined
    at Object.<anonymous> (path/to/file/trovapercorsi/node_modules/whatwg-url/dist/encoding.js:2:21)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Module.require (internal/modules/cjs/loader.js:692:17)
    at require (internal/modules/cjs/helpers.js:25:18)
    at Object.<anonymous> (path/to/file/trovapercorsi/node_modules/whatwg-url/dist/url-state-machine.js:5:34)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
```
Se avete questo tipo di errore al primo avvio del server, basta andare a modificare /node_modules/whatwg-url/dist/encoding.js ed aggiungere la seguente riga di codice all'inizio:
```javascript
const { TextEncoder, TextDecoder } = require("util");
```

## Roadmap
Attualmente, è stato utilizzato [Bower](https://bower.io/) per installare tutti i pacchetti e file necessari per [Bootstrap](https://getbootstrap.com/) e [JQuery](https://jquery.com/), tali file sono stati caricati all'interno di questa repository senza quindi richiedere la che l'utente finale debba installare Bower per non dilungare troppo il processo di installazione (anche se è estremamente semplice), per ragioni di pulizia, spazio e sicurezza, in futuro tale decisione verrà cambiata e verrà richiesto di installare bower per poi procedere all'installazione di JQuery e Bootstrap

In caso si voglia utilizzare il proprio processo di installazione di JQuery e Bootstrap, sarà necessario modificare il path dei vari file puntando alla propria installazione.

## Contribuzione
Le Pull requests sono benvenute. Per modifiche sostanziose, per favore apri una issue per poter discutere di cosa si ha intenzione di modificare.

Questo progetto è stato creato a scopo didattico da [Mirko Morello](https://github.com/MirkoMorello), per qualsiasi applicazione commerciale si richiede di richiedere approvazione per l'applicazione al suddetto.





## ⚠️ License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/) - Mirko Morello - 2021