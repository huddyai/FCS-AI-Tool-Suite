import { ToolData } from './types';

export const TOOLS: ToolData[] = [
  {
    id: 'doc-intelligence',
    title: 'FCS Document Intelligence',
    subtitle: 'Turn anywhere from 1 to 3,000 page reports into a private AI expert you can chat with.',
    description: 'This tool transforms any uploaded document into a private AI agent that can summarize, extract, and answer questions, built specifically for FCS-style environmental and permitting documents.',
    bullets: [
      'Upload EIRs, EAs, technical studies, permits, contracts, and more.',
      'Handle documents from 1 to 3,000 pages in a single upload.',
      'Ask natural-language questions and get precise, page-referenced answers.',
      'Generate executive summaries, key findings, and mitigation lists on demand.',
      'Emphasize data privacy and non-sharing of content outside the tool context.'
    ],
    idealFor: 'Environmental impact reports, environmental assessments, technical appendices, complex regulatory permits, and client-facing summaries.',
    useCases: [
      'Quickly answer "Where are traffic impacts discussed and what are the recommended mitigations?"',
      'Pull all conditions of approval related to air quality in seconds.',
      'Generate a one-page summary for an executive who doesn\'t have time to read 800 pages.'
    ],
    ctaLink: 'https://fcsdocintelligence.netlify.app/',
    theme: 'dark'
  },
  {
    id: 'doc-fetch',
    title: 'FCS Document Fetch',
    subtitle: 'Ask for any kind of document. Get a fresh, legally unique draft tailored for FCS.',
    description: 'From a simple prompt, Document Fetch searches for high-quality precedents online and generates a brand-new document with the same structure and intent, but original wording and a sources list.',
    bullets: [
      'Accepts plain-language prompts like "Create a mitigation monitoring plan for a mixed-use infill project".',
      'Searches for authoritative regulatory and contract examples as reference.',
      'Synthesizes a new document mirroring structure, content, and intent with fresh language.',
      'Provides a reference list so FCS teams can verify and refine.'
    ],
    idealFor: 'Mitigation monitoring plans, template language for permits, contract clauses, scopes of work, and regulatory checklists.',
    useCases: [
      'Draft a starting mitigation monitoring plan tailored to a specific jurisdiction.',
      'Generate baseline contract language that legal can refine instead of starting from scratch.',
      'Create a checklist aligned with a specific regulatory framework.'
    ],
    ctaLink: 'https://fcsdocfetch.netlify.app/',
    theme: 'light'
  },
  {
    id: 'field-monitor',
    title: 'FCS Field Monitor Assistant',
    subtitle: 'Hands-free field notes that turn into structured, submission-ready reports.',
    description: 'Field monitors can speak naturally while working; the assistant turns these spoken notes into organized surveys, inventories, and site condition assessments.',
    bullets: [
      'Captures spoken observations from field monitors in real time.',
      'Organizes notes into categories like inventory, site recording, excavations, and site conditions.',
      'Generates structured summaries and reports at the end of each assignment.',
      'Flags missing details and prompts monitors to fill gaps before finalizing.'
    ],
    idealFor: 'Cultural resources monitoring, excavation documentation, site condition assessments, and other field surveys.',
    useCases: [
      'A monitor narrates discoveries during a trench excavation; the tool turns it into a formal excavation summary.',
      'Log daily site conditions verbally and output a formatted condition assessment.',
      'Ensure no required fields are forgotten before handing reports to project managers.'
    ],
    ctaLink: 'https://fcs-field-monitor-assistant.netlify.app/',
    theme: 'dark'
  },
  {
    id: 'permit-tracker',
    title: 'FCS AI Permit Tracker',
    subtitle: 'Centralized permit milestones, conditions, and evidence — always up to date.',
    description: 'This tool provides a central view of all permits, milestones, conditions, owners, and evidence, with reminders and digests.',
    bullets: [
      'Capture permits, milestones, and conditions via forms or voice input.',
      'Assign responsible owners and due dates for each condition.',
      'Attach evidence and documentation so everything is audit-ready.',
      'Send automated reminders and weekly digests to internal teams and clients.'
    ],
    idealFor: 'Regulatory permits, mitigation monitoring, client-facing compliance status updates, and multi-agency obligations.',
    useCases: [
      'Track which conditions of approval have evidence and which still need field verification.',
      'Provide a weekly digest to project managers and clients showing what\'s due next.',
      'Get a single view of compliance across multiple permits for a large project.'
    ],
    ctaLink: 'https://fcs-ai-permit-tracker.netlify.app/',
    theme: 'light'
  }
];