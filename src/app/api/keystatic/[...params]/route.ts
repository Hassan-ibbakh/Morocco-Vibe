import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

/**
 * API du tableau de bord : connexion GitHub et lecture/écriture du contenu.
 * En production, elle n'est active que si les variables de l'application
 * GitHub sont définies (voir le README) ; sinon elle répond 503 au lieu de
 * faire échouer le build.
 */
const configured =
  config.storage.kind === "local" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );

const notConfigured = () =>
  new Response(
    "Tableau de bord non configuré : définissez KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET et KEYSTATIC_SECRET.",
    { status: 503 },
  );

const handlers = configured ? makeRouteHandler({ config }) : { GET: notConfigured, POST: notConfigured };

export const GET = handlers.GET;
export const POST = handlers.POST;
