import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Contratto dati: vedi specs/001-portfolio-showcase/contracts/content-schema.md
// Ogni entry non conforme fa fallire la build (Principio "Data-First Design").
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      tags: z.array(z.enum(['sql', 'ml', 'viz', 'python'])).min(1),
      githubUrl: z.string().url().optional(),
      linkedinUrl: z.string().url().optional(),
      pdfPresentation: z
        .object({
          file: z.string().min(1),
          label: z.string().optional(),
        })
        .optional(),
      order: z.number().optional(),
    })
    .refine((data) => Boolean(data.githubUrl) || Boolean(data.linkedinUrl), {
      message: 'Almeno uno tra githubUrl e linkedinUrl deve essere presente (FR-003).',
    }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z
    .object({
      summary: z.string().min(1),
      skills: z.array(z.string()).min(1),
      contactEmail: z.string().email().optional(),
      linkedinUrl: z.string().url().optional(),
    })
    .refine((data) => Boolean(data.contactEmail) || Boolean(data.linkedinUrl), {
      message:
        'Almeno un canale di contatto (contactEmail o linkedinUrl) deve essere presente (FR-010).',
    }),
});

export const collections = { projects, about };
