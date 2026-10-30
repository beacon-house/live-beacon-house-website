// Parent Guides hub + guide index. Copy is Vishy's, from the "Parent Guides"
// tab of the page-copy Google Doc. Do not edit wording here without his sign-off.
// A guide with status "coming" shows on the hub as a card with no link, and
// gets no page, no sitemap entry and no schema.

export type GuideStatus = "live" | "coming";

export type GuideStage = "class-8-9" | "class-10" | "class-11-12" | "any";

export interface ParentGuide {
  slug: string;
  stage: GuideStage;
  title: string;
  cardSummary: string;
  status: GuideStatus;
  datePublished?: string;
  dateModified?: string;
}

export const PARENT_GUIDES_PATH = "/parent-guides";

export const parentGuidesHub = {
  eyebrow: "Parent Guides",
  title: "Make informed decisions at the moments that matter.",
  intro: [
    "Subject choices, academic direction, activities and university plans are closely connected. A decision made today can shape the options available later.",
    "Our guides help families understand these connections, weigh the trade-offs and decide what deserves attention now.",
  ],
  startTitle: "Start with the question your family is facing.",
  startBody: [
    "Some students have a clear interest but need to understand where it could lead. Others are doing well academically without knowing what they want to study. Many are already busy, yet unsure whether their effort is building towards anything meaningful.",
    "The right next step depends on the student’s stage, strengths, interests and ambitions.",
    "Explore the guides below to understand the choices ahead and prepare for more informed conversations with your child.",
  ],
  readLabel: "Read the Guide",
  comingLabel: "Guide coming soon",
  closing: {
    title: "Understand what these choices mean for your child.",
    body: [
      "A guide can help you ask better questions. A Strategic Review brings those questions into the context of your child’s academic record, interests, existing commitments and university goals.",
      "The aim is to identify what matters next and whether Beacon House is the right fit for your family.",
    ],
    secondaryLabel: "Explore Our Program",
    secondaryHref: "/our-program",
  },
} as const;

const PUBLISHED = "2026-10-30";

export const parentGuides: ParentGuide[] = [
  {
    slug: "child-doesnt-know-what-to-study",
    stage: "class-8-9",
    title: "My child doesn’t know what to study. Where do we begin?",
    cardSummary:
      "Good marks, enthusiasm for a subject and a lasting academic interest are not always the same thing. Understand how exposure, reflection and small experiments can help a student identify the directions worth exploring further.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "choosing-subjects-after-class-10",
    stage: "class-10",
    title: "Choosing subjects after Class 10",
    cardSummary:
      "Subject choices should support the student while preserving the right university pathways. Explore how interests, academic strengths, course requirements, school options and workload can inform a more deliberate decision.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "meaningful-student-profile",
    stage: "class-8-9",
    title: "What does a meaningful student profile look like?",
    cardSummary:
      "A strong profile develops through sustained work in a coherent direction. See how projects, research, writing and other commitments can build depth, and how to decide what to deepen, reduce or stop.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "when-to-start-college-planning",
    stage: "class-8-9",
    title: "When should college planning begin?",
    cardSummary:
      "Starting early should create room to explore. Understand what is useful in Classes 8, 9 and 10, what can wait, and how preparation can develop alongside schoolwork and the student’s changing interests.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "india-and-overseas-options",
    stage: "class-10",
    title: "Keeping India and overseas options open",
    cardSummary:
      "Families do not always need to choose a destination at the outset. Examine the academic choices, entrance preparation, costs and time commitments involved in keeping more than one pathway viable.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "research-or-capstone-project",
    stage: "class-11-12",
    title: "Research or a capstone project?",
    cardSummary:
      "Different forms of work serve different purposes. Understand what research and capstone projects involve, the student’s responsibilities, the mentor’s role and the kinds of outputs each can produce.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "is-class-11-too-late",
    stage: "class-11-12",
    title: "Is Class 11 too late to start?",
    cardSummary:
      "The time available matters, but so does the work already done. Understand what can still be strengthened, which decisions need attention now and how to build a realistic plan around schoolwork and application timelines.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "ib-vs-a-levels-vs-cbse",
    stage: "class-10",
    title: "IB, A-levels or CBSE: how should we choose?",
    cardSummary:
      "The right curriculum depends on the student and the pathways they may pursue. Explore how learning style, assessment, subject flexibility, school quality and university plans should inform the choice.",
    status: "live",
    datePublished: PUBLISHED,
  },
  {
    slug: "choosing-a-college-counsellor",
    stage: "any",
    title: "What should parents look for in a college counsellor?",
    cardSummary:
      "A counselling relationship may shape several years of a student’s development. Understand what to ask about the people involved, the work delivered, progress reviews, continuity and programme costs before choosing a partner.",
    status: "coming",
  },
  {
    slug: "budget-for-undergraduate-study-abroad",
    stage: "any",
    title: "How should we budget for undergraduate study abroad?",
    cardSummary:
      "A useful budget looks beyond tuition. Understand how living expenses, course duration, scholarships and preparation costs fit together, so that financial considerations inform the university plan from the beginning.",
    status: "coming",
  },
];

// The hub places each question at the class where families usually ask it.
// Stage labels are draft UI labels, pending Vishy's review.
export const GUIDE_STAGES: { id: GuideStage; label: string }[] = [
  { id: "class-8-9", label: "Class 8–9" },
  { id: "class-10", label: "Class 10" },
  { id: "class-11-12", label: "Class 11–12" },
  { id: "any", label: "At any stage" },
];

export const guidesByStage = (stage: GuideStage) =>
  parentGuides.filter((g) => g.stage === stage);

export const liveGuides = () => parentGuides.filter((g) => g.status === "live");

export const guideHref = (slug: string) => `${PARENT_GUIDES_PATH}/${slug}`;

export const getGuide = (slug: string) =>
  parentGuides.find((g) => g.slug === slug && g.status === "live");

export const GUIDE_AUTHOR = {
  name: "Viswanathan R",
  role: "Co-Founder, Beacon House",
  jobTitle: "Co-Founder",
  photo: "/about-us/vishy.png",
  linkedIn: "https://www.linkedin.com/in/viswanathan-r-8504182/",
} as const;
