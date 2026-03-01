# npm-trends

Actionable insights about npm packages directly in your terminal. npm-trends provides growth metrics, trending data, and dependency analysis to help you make informed decisions about your project's ecosystem.

[![npm version](https://img.shields.io/npm/v/npm-trends.svg?style=flat-square)](https://www.npmjs.com/package/npm-trends)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ravvdevv/npm-trends/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Features

- **Trending Analysis**: Discover fast-growing packages with weekly and monthly growth metrics.
- **Enhanced Search**: Search by keyword with integrated weekly download counts and quality scores.
- **Dependency Scanning**: Analyze your `package.json` to identify modern or more popular alternatives.
- **Ecosystem Dashboard**: Get a high-level overview of global trends and local project status.
- **CI/CD Ready**: Supports JSON output for easy integration with automation workflows.

## Installation

Install globally via [Bun](https://bun.sh):

```bash
bun add -g npm-trends
```

Or run directly using `npx`:

```bash
npx npm-trends dashboard
```

## Usage

### Search for Packages
Find packages by keyword with real-time download statistics.

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
Display a summary of global trends and your project's dependency status.

```bash
npm-trends dashboard
```

## Why npm-trends?

- **Data-Driven Decisions**: Evaluate packages based on actual growth and usage data rather than just names.
- **Developer Workflow**: Fits seamlessly into terminal-based development environments.
- **Performance**: Built with Bun for high-speed API interaction and execution.

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built by [ravvdevv](https://github.com/ravvdevv)
