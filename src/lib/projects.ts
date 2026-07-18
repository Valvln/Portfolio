import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>['data'] & { slug: string };

/**
 * Unico punto di accesso ai dati progetto. Se in futuro la fonte diventa
 * un'API invece di file statici (Principio "Scalabilità Architetturale"),
 * solo questa funzione va modificata: i componenti che la consumano restano
 * invariati.
 */
export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');

  return entries
    .map((entry) => ({ ...entry.data, slug: entry.id }))
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return a.title.localeCompare(b.title);
    });
}
