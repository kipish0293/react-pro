import { routes, type RouteName } from "./routes";
import { exclaim, uppercase } from "./utils";

export async function showRoute(name: RouteName): Promise<string> {
  const page = await routes[name]();
  return `${uppercase("Build home Work")} - ${exclaim("ready")} - ${page.render()}`;
}
