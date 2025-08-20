import express from "express";

import bodyParser from "body-parser";
import { setupPlantsApi } from "./plant-api.js";

const app = express();

const slowEnabled = process.env.USE_SLOW === "true";

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,PUT,POST,PATCH,DELETE",
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use((req, _res, next) => {
  if (req.query.slow !== undefined || slowEnabled) {
    const timeout = parseInt(req.query.slow) || 1200;
    console.log(`Slow down ${timeout}ms`);
    setTimeout(next, timeout);
  } else {
    next();
  }
});

setupPlantsApi(app);

// >>>>> BITTE EINFÜGEN IN "backend/src/server.js"
//  nach Zeile 36 "setupPlantsApi(app)"

const plantQuotes = {
  currentIx: -1,
  nextQuote() {
    this.currentIx++;
    if (this.currentIx >= this.quotes.length) {
      this.currentIx = 0;
    }
    return this.quotes[this.currentIx];
  },
  quotes: [
    // Quelle: ChatGPT 🙄
    "Meine Zimmerpflanze und ich haben ein stilles Abkommen: ich gieße sie, sie lebt weiter.",
    "Kaktus: Der introvertierte unter den Pflanzen – wenig Wasser, viel Abstand.",
    "Pflanzen sind im Grunde wie React-Apps: ohne Props (Licht, Wasser, Dünger) laufen sie nicht.",
    "Manche reden mit ihren Pflanzen. Ich entschuldige mich einfach, wenn ich sie wieder fast vertrocknet habe.",
    "Pflanzen sind wie WG-Mitbewohner – sie hängen nur rum und erwarten trotzdem, dass man sich um sie kümmert.",
    "Die einzige grüne Pflanze, die bei mir immer überlebt: Schimmel im Kühlschrank.",
    "Meine Pflanze macht auch React: Sie re-rendered jedes Mal, wenn ich ihr Wasser gebe.",
    "Hooks für Pflanzen: useWater(), useSunlight(), useLove().",
    "Mein Kaktus ist wie ein PureComponent – der reagiert nur, wenn es wirklich nötig ist.",
    "Mein Gummibaum ist der State-Manager im Wohnzimmer – er entscheidet, ob’s frisch oder stickig aussieht.",
    "Wenn ich meine Pflanze zu oft gieße, fühlt sich das an wie ein endloser Re-Render-Loop.",
    "Pflanzen haben das beste Lifecycle-Management – nur dass man das unmounten lieber vermeiden sollte.",
  ],
};

app.get("/api/random-quote", (req, res) => {
  const quote = plantQuotes.nextQuote();
  res.json(quote);
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const port = process.env.SERVER_PORT || 7200;

app.listen(port, () => {
  console.log(`
    📞    Reservations API Server listening on port ${port}
    👉    Try http://localhost:${port}/api/plants
`);
});
