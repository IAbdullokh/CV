// Shapes of the site's content. All text lives in ./site.ts so it can be edited without touching components.

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type WorkStep = {
  title: string;
  text: string;
  example: string;
};

export type ExperienceItem = {
  org: string;
  place: string;
  /** Left out until confirmed — the layout copes without it. */
  role?: string;
  /** Left out until confirmed — the layout copes without it. */
  period?: string;
  summary: string;
  bullets: string[];
};

export type Credit = {
  who: string;
  text: string;
};

export type Decision = {
  title: string;
  paragraphs: string[];
};

export type Outcome = {
  proven: string[];
  notProven: string[];
};

export type DiagramKind = "hilol" | "clinic" | "applekor";

export type Project = {
  slug: string;
  name: string;
  title: string;
  /** One sentence for the home-page card. */
  card: string;
  /** Two or three short points for the home-page card. */
  highlights: string[];
  /** Colour of the project's app-icon tile. */
  tone: "pink" | "mint" | "orange";
  status: string;
  period: string;
  tags: string[];
  summary: string;
  facts: Fact[];
  problem: string[];
  responsibility: string[];
  credits: Credit[];
  howItWorks: string[];
  diagram: DiagramKind;
  diagramCaption: string;
  /** Section title for the implementation list ("How it works", "What I changed"). */
  howTitle: string;
  decision: Decision;
  outcome: Outcome;
  tech: string[];
};

export type MoreWork = {
  title: string;
  text: string;
  period: string;
  tags: string[];
};

export type SkillGroup = {
  name: string;
  items: string[];
  note?: string;
};

export type EducationItem = {
  label: string;
  badge?: string;
  title: string;
  org: string;
  /** Large figure, e.g. a score. */
  score?: string;
  scoreNote?: string;
  note?: string;
};
