import data from './projects.json';

export type GalleryItem = { src: string; alt: string; caption: string; note?: string };
export type Project = {
  slug: string; title: string; category: string; summary: string;
  tags: string[]; stack: string[]; url?: string; cover: string;
  task: string; role: string;
  features: { title: string; text: string }[];
  architecture: { title: string; text: string; source?: string }[];
  qa: { title: string; type: string; text: string; source?: string }[];
  qaNote?: string; gallery: GalleryItem[];
  materials?: { title: string; url: string; download?: boolean }[];
};
export const projects: Project[] = data;
