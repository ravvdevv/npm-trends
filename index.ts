#!/usr/bin/env bun
import { Command } from 'commander';
import chalk from 'chalk';
import Table from 'cli-table3';
import ora from 'ora';
import { z } from 'zod';

const program = new Command();

program
  .name('npm-trends')
  .description('A terminal-based tool for npm package insights')
  .version('0.0.1');

program
  .command('search')
  .description('Search for a package by keyword')
  .argument('<keyword>', 'The keyword to search for')
  .action(async (keyword) => {
    const spinner = ora(`Searching for ${chalk.cyan(keyword)}...`).start();
    try {
      const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(keyword)}&size=10`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      spinner.stop();

      const table = new Table({
        head: [
          chalk.bold('Name'),
          chalk.bold('Version'),
          chalk.bold('Score'),
          chalk.bold('Downloads (Weekly)')
        ],
        colWidths: [20, 10, 10, 20]
      });

      // Zod schema for simple validation
      const SearchResultSchema = z.object({
        objects: z.array(z.object({
          package: z.object({
            name: z.string(),
            version: z.string(),
            description: z.string().optional(),
          }),
          score: z.object({
            final: z.number(),
          }),
        }))
      });

      const parsed = SearchResultSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error('Unexpected API response structure');
      }

      const results = parsed.data.objects.map(obj => ({
        name: obj.package.name,
        version: obj.package.version,
        score: Math.round(obj.score.final * 10) / 10,
        downloads: 'Loading...'
      }));

      // Fetch downloads in parallel
await Promise.all(results.map(async (res) => {
        try {
          const dlResponse = await fetch(`https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(res.name)}`);
          if (dlResponse.ok) {
            const dlData = await dlResponse.json();
            res.downloads = dlData.downloads.toLocaleString();
          } else {
            res.downloads = 'N/A';
          }
        } catch (err) {
          res.downloads = 'Err';
        }
      }));

      results.forEach(res => {
        table.push([res.name, res.version, res.score, res.downloads]);
      });

      console.log(table.toString());
    } catch (error) {
      spinner.fail(`Search failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

program
  .command('trending')
  .description('List trending packages in last 7 days')
  .option('--week', 'Trending for the week', true)
  .option('--json', 'Output results in JSON format')
  .action(async (options) => {
    const isJson = options.json;
    const spinner = ora('Fetching trending packages...').start();
    if (isJson) spinner.stop();
    try {
      // Search for popular packages in several common categories
      const categories = ['cli', 'utility', 'react', 'node', 'testing'];
      const searchPromises = categories.map(cat => 
        fetch(`https://registry.npmjs.org/-/v1/search?text=${cat}&size=20&popularity=1.0`)
          .then(res => res.json())
      );
      
      const allResults = await Promise.all(searchPromises);
      const uniquePackages = new Map();
      
      allResults.forEach(data => {
        data.objects.forEach((obj: any) => {
          uniquePackages.set(obj.package.name, obj.package.name);
        });
      });

      if (!isJson) spinner.text = `Calculating growth for ${uniquePackages.size} packages...`;

      const results = Array.from(uniquePackages.values()).map(name => ({
        name,
        weekly: 0,
        monthly: 0,
        growth: 0
      }));

      // Fetch downloads in chunks to avoid overwhelming the API
      const chunkSize = 10;
      for (let i = 0; i < results.length; i += chunkSize) {
        const chunk = results.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (res: any) => {
          try {
            const [weeklyResp, monthlyResp] = await Promise.all([
              fetch(`https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(res.name)}`),
              fetch(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(res.name)}`)
            ]);
            
            if (weeklyResp.ok && monthlyResp.ok) {
              const weeklyData = await weeklyResp.json();
              const monthlyData = await monthlyResp.json();
              res.weekly = weeklyData.downloads;
              res.monthly = monthlyData.downloads;
              if (res.monthly > 0) {
                const avgWeeklyMonthly = res.monthly / 4;
                res.growth = ((res.weekly - avgWeeklyMonthly) / avgWeeklyMonthly) * 100;
              }
            }
          } catch (err) { }
        }));
      }

      const trending = results
        .filter(res => res.weekly > 1000)
        .sort((a: any, b: any) => b.growth - a.growth)
        .slice(0, 20);

      if (isJson) {
        console.log(JSON.stringify(trending, null, 2));
        return;
      }

      spinner.stop();

      const table = new Table({
        head: [
          chalk.bold('Package'),
          chalk.bold('Weekly Downloads'),
          chalk.bold('Monthly Downloads'),
          chalk.bold('Growth (approx)')
        ]
      });

      trending.forEach((res: any) => {
        const growthColor = res.growth > 0 ? chalk.green : chalk.red;
        table.push([
          res.name,
          res.weekly.toLocaleString(),
          res.monthly.toLocaleString(),
          growthColor(`${res.growth.toFixed(1)}%`)
        ]);
      });

      console.log(table.toString());
    } catch (error) {
      if (!isJson) spinner.fail(`Trending failed: ${error instanceof Error ? error.message : String(error)}`);
      else console.error(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
    }
  });

program
  .command('suggest')
  .description('Scan your project for missing trending dependencies')
  .argument('[path]', 'Path to the project', '.')
  .action(async (dirPath) => {
    const spinner = ora('Scanning project dependencies...').start();
    try {
      const packageJsonPath = `${dirPath}/package.json`;
      const packageJsonContent = await Bun.file(packageJsonPath).text();
      const packageJson = JSON.parse(packageJsonContent);
      
      const deps = { 
        ...packageJson.dependencies, 
        ...packageJson.devDependencies 
      };
      
      const depNames = Object.keys(deps);
      if (depNames.length === 0) {
        spinner.fail('No dependencies found in package.json');
        return;
      }

      spinner.text = `Found ${depNames.length} dependencies. Analyzing...`;

      const suggestionsTable = new Table({
        head: [
          chalk.bold('Current Package'),
          chalk.bold('Trending Alternative'),
          chalk.bold('Reason')
        ]
      });

      // For MVP, we'll just check a few dependencies to avoid long wait
      const depsToCheck = depNames.slice(0, 5);
      
      for (const dep of depsToCheck) {
        spinner.text = `Checking alternatives for ${chalk.cyan(dep)}...`;
        
        // Fetch package info to get keywords
        const resp = await fetch(`https://registry.npmjs.org/${encodeURIComponent(dep)}`);
        if (!resp.ok) continue;
        const data = await resp.json();
        const keywords = data.keywords || [];
        
        if (keywords.length > 0) {
          // Search for packages with similar keywords
          const searchKeyword = keywords[0];
          const searchResp = await fetch(`https://registry.npmjs.org/-/v1/search?text=${searchKeyword}&size=5&popularity=1.0`);
          if (searchResp.ok) {
            const searchData = await searchResp.json();
            const alternative = searchData.objects.find((obj: any) => obj.package.name !== dep);
            
            if (alternative) {
              suggestionsTable.push([
                dep,
                alternative.package.name,
                `Popular in ${searchKeyword}`
              ]);
            }
          }
        }
      }

      spinner.stop();
      if (suggestionsTable.length > 0) {
        console.log(chalk.bold('\nSuggested Alternatives:'));
        console.log(suggestionsTable.toString());
      } else {
        console.log(chalk.green('\nYour dependencies look great! No suggestions found.'));
      }
    } catch (error) {
      spinner.fail(`Suggest failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

program
  .command('dashboard')
  .description('Quick summary of npm trends and your project')
  .action(async () => {
    console.log(chalk.bold.blue('\n--- NPM TRENDS DASHBOARD ---\n'));
    
    // 1. Trending Summary
    console.log(chalk.bold('🔥 Top 3 Trending (Growth):'));
    const trendingResp = await fetch('https://registry.npmjs.org/-/v1/search?text=cli&size=20&popularity=1.0');
    if (trendingResp.ok) {
      const data = await trendingResp.json();
      const top3 = data.objects.slice(0, 3);
      top3.forEach((obj: any, i: number) => {
        console.log(`${i + 1}. ${chalk.cyan(obj.package.name)} (${obj.package.version})`);
      });
    }
    
    // 2. Project Summary
    console.log(chalk.bold('\n📦 Project Status:'));
    try {
      const pkg = JSON.parse(await Bun.file('package.json').text());
      const depCount = Object.keys(pkg.dependencies || {}).length;
      const devDepCount = Object.keys(pkg.devDependencies || {}).length;
      console.log(`- Dependencies: ${chalk.green(depCount)}`);
      console.log(`- Dev Dependencies: ${chalk.green(devDepCount)}`);
    } catch (e) {
      console.log(chalk.red('- No package.json found in current directory.'));
    }
    
    console.log(chalk.dim('\nRun `npm-trends trending` or `npm-trends suggest` for more details.\n'));
  });

program.parse();
