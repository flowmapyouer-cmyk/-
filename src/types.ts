/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  thumbnail: string;
  images: string[]; // Support multiple images
  problem: string;
  hypothesis: string;
  decision: string;
  execution: string;
  result: string;
  insight: string;
  published: boolean;
}

export interface WorkLog {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string; // Markdown supported
  excerpt: string;
  published: boolean;
  pinned?: boolean;
}

export interface ContactInfo {
  email: string;
  ctaText: string;
  links: { label: string; url: string }[];
}
