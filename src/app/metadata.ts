export const defaultKeywords = [
  'tofupilot',
  'documentation',
  'docs',
  'hardware test',
  'python',
  'open source',
  'tofupilot api reference',
  'tofupilot integration',
  'test framework',
  'test automation',
  'hardware testing',
  'test execution engine',
  'open source teststand',
]

export const defaultOpenGraph = {
  siteName: 'TofuPilot',
  title: 'TofuPilot Documentation',
  description: 'Build and deploy manufacturing tests faster with TofuPilot.',
  url: 'https://tofupilot.com/docs',
  images: [
    {
      url: 'https://tofupilot.com/docs/analytics-header',
      width: 800,
      height: 600,
    },
  ],
  locale: 'en_US',
  type: 'website',
}

export const defaultMetadata = {
  title: {
    template: '%s - TofuPilot Documentation',
    default: 'TofuPilot Documentation',
  },
  description:
    'Documentation for TofuPilot, the plug-and-play analytics for manufacturing tests.',
  authors: [{ name: 'TofuPilot Team', url: 'https://tofupilot.com' }],
  keywords: defaultKeywords,
  openGraph: defaultOpenGraph,
}
