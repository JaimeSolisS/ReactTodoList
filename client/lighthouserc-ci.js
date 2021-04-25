module.exports = {
    ci: {
        collect: {
            settings: {
                emulatedFormFactor: 'desktop',
                throttling: { rttMs: 40, throughputKbps: 10 * 1024, cpuSlowdownMultiplier: 1 },
            },
            startServerCommand: 'npm start',
            numberOfRuns: 3,
            url: [
                'http://localhost:3000',
                'http://localhost:3000/register',
                'http://localhost:3000/projects',
            ],
        },
        assert: {
            assertions: {
                'categories:performance': ['error', { minScore: .8 }],
                'categories:accessibility': ['error', { minScore: .8 }],
                'categories:best-practices': ['error', { minScore: .8 }],
                'categories:seo': ['error', { minScore: .8 }],
            }
        },
        upload: {
            target: "temporary-public-storage",
        },
    },
};