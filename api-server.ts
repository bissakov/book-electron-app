import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { auth } from "express-oauth2-jwt-bearer";
import { config } from "./services/config";

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = `http://localhost:${appPort}`;

if (
  !config.auth0Domain ||
  !config.apiIdentifier ||
  config.apiIdentifier === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values",
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = auth({
  audience: config.apiIdentifier,
  issuerBaseURL: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
