import { getCollection, type CollectionEntry } from 'astro:content';

export type About = CollectionEntry<'about'>['data'];

/**
 * Unico punto di accesso ai dati del profilo About. Stesso principio di
 * indirection di getProjects(): sostituire la fonte statica con un'API
 * futura richiede di modificare solo questa funzione.
 */
export async function getAbout(): Promise<About> {
  const entries = await getCollection('about');

  if (entries.length === 0) {
    throw new Error('Nessuna entry "about" trovata in src/content/about/.');
  }

  return entries[0].data;
}
