/* import Link from "next/link";
import { SanityDocument } from "next-sanity";

import { sanityFetch } from "@/sanity/client";
import { Button } from "@nextui-org/react";
import { ThemeSelector } from "./Ui/ThemeSelector";

const EVENTS_QUERY = `*[
  _type == "pin"
  && defined(slug.current)
]{_id, name, slug, created_at}|order(date desc)`;

export default async function IndexPage() {
  const events = await sanityFetch<SanityDocument[]>({query: EVENTS_QUERY});

  return (
    <main className="flex min-h-screen flex-col p-24 gap-12">
      <ThemeSelector/>
      <h1 className="text-4xl font-bold tracking-tighter">
        Events
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {events.map((event:any) => (
          <li
            className="bg-white p-4 rounded-lg"
            key={event._id}
          >
            <Link
              className="hover:underline"
              href={`/events/${event.slug.current}`}
            >
              <h2 className="text-xl text-gray-900 font-semibold">{event?.name}</h2>
              <p className="text-gray-500">
                {new Date(event?.date).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 items-center ">
      <Button className="bg-background" variant="solid">
        Solid
      </Button>
      <Button color="primary" variant="faded">
        Faded
      </Button>
      <Button color="primary" variant="bordered">
        Bordered
      </Button>
      <Button color="primary" variant="light">
        Light
      </Button>
      <Button color="primary" variant="flat">
        Flat
      </Button>
      <Button color="primary" variant="ghost">
        Ghost
      </Button>
      <Button color="primary" variant="shadow">
        Shadow
      </Button>
    </div>
    </main>
  );
} */