# npm-trends 🚀

[![npm version](https://img.shields.io/npm/v/npm-trends.svg?style=flat-square)](https://www.npmjs.com/package/npm-trends)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ravvdevv/npm-trends/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**Actionable insights about npm packages right where you code.**  
Think `npm search` on steroids, designed for the terminal.

## ✨ Features

- **🔥 Trending Packages**: Discover the fastest-growing packages over the past week and month with accurate growth metrics.
- **🔍 Advanced Search**: Search by keywords and instantly see weekly download counts and quality scores.
- **📦 Project Integration**: Scan your local `package.json` to find modern, trending alternatives for your current dependencies.
- **📊 Quick Dashboard**: Get a high-level overview of the ecosystem and your project's health in one command.
- **🤖 JSON Output**: Integrate growth data into your CI/CD pipelines or custom automation scripts.

## 🚀 Installation

Install globally using [Bun](https://bun.sh):

```bash
bun add -g npm-trends
```

Or run directly without installation using `npx`:

```bash
npx npm-trends dashboard
```

## 🛠 Usage

### 🔍 Search for Packages
Find packages by keyword with live download statistics.

```bash
npm-trends search <keyword>
```

### 🔥 View Trending Packages
See what's gaining momentum in the ecosystem.

```bash
npm-trends trending
```

*Use `--json` for structured output.*

### 📦 Scan Your Project
Scan your `package.json` and get suggestions for better or more popular alternatives.

```bash
npm-trends suggest
```

### 📊 Ecosystem Dashboard
A summary of top trends and your current project status.

```bash
npm-trends dashboard
```

## 📈 Why npm-trends?

- **Zero Guesswork**: Stop picking packages based on just the name. Use growth data.
- **Terminal Native**: Fits perfectly into your existing development workflow.
- **Lightweight & Fast**: Powered by Bun for near-instant execution.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by [ravvdevv](https://github.com/ravvdevv)
