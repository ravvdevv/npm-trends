# npm-trends

Actionable insights about npm packages directly in your terminal. **npm-trends** provides growth metrics, trending data, and dependency analysis to help you make informed decisions about your project's ecosystem.

[![npm version](https://img.shields.io/npm/v/npm-trends.svg?style=flat-square)](https://www.npmjs.com/package/npm-trends)
[![npm downloads](https://img.shields.io/npm/dm/npm-trends.svg?style=flat-square)](https://www.npmjs.com/package/npm-trends)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ravvdevv/npm-trends/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

---

## Features

- **Trending Analysis**: Discover fast-growing packages with weekly and monthly growth metrics.
- **Enhanced Search**: Search by keyword with integrated weekly download counts and quality scores.
- **Dependency Scanning**: Analyze your `package.json` to identify modern or more popular alternatives.
- **Ecosystem Dashboard**: Get a high-level overview of global trends and local project status.
- **CI/CD Ready**: Supports JSON output for easy integration with automation workflows.

## Installation

You can install `npm-trends` globally using your preferred package manager:

### Using Bun (Recommended)
```bash
bun add -g npm-trends
```

### Using npm
```bash
npm install -g npm-trends
```

### Using pnpm
```bash
pnpm add -g npm-trends
```

### Direct Usage (npx)
Run without installation:
```bash
npx npm-trends dashboard
```

## Usage

### Search for Packages
Find packages by keyword with real-time download statistics and scores.

```bash
npm-trends search <keyword>
```

### View Trending Packages
Identify packages gaining significant momentum in the ecosystem.

```bash
npm-trends trending
```
*Use the `--json` flag for machine-readable output.*

### Project Suggestions
Scan your local `package.json` for popular or trending dependency alternatives.

```bash
npm-trends suggest
```

### Dashboard
Display a summary of global trends and your current project's dependency status.

```bash
npm-trends dashboard
```

## Why npm-trends?

- **Data-Driven Decisions**: Evaluate packages based on actual growth and usage data rather than just names.
- **Developer Workflow**: Fits seamlessly into terminal-based development environments.
- **High Performance**: Built with [Bun](https://bun.sh) for high-speed API interaction and execution.

## Keywords

`npm`, `trends`, `cli`, `package-insights`, `dependency-analysis`, `downloads-stats`, `developer-tools`, `analytics`, `registry-search`, `bun`

## Contributing

Contributions are welcome! To contribute:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for the full text.

---
Built by [ravvdevv](https://github.com/ravvdevv)
