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
  problem: string[]; // 01. Problem (Images)
  hypothesis: string[]; // 02. Hypothesis (Images)
  decisionExecution: string[]; // 03. Decision & Execution (Images)
  result: string[]; // 04. Result (Images)
  insight: string[]; // 05. Insight (Images)
  externalLinks: { name: string; url: string }[]; // External project links
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
