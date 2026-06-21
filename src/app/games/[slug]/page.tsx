import { games } from "@/data/games";
import ClientGamePage from "./ClientGamePage";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  return <ClientGamePage slug={params.slug} />;
}
