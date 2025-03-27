#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { execSync } = require("child_process");

const log = console.log;

class FriendlyError extends Error {}

async function run() {
  try {
    let projectPath = "";

    // Get package.json
    const packageJson = require("../package.json");

    program
      .name(packageJson.name)
      .version(packageJson.version)
      .arguments("[project-directory]")
      .usage(`${chalk.green("[project-directory]")} [options]`)
      .action((name) => {
        projectPath = name;
      })
      .option("--skip-git", "Skip initializing a git repository")
      .allowUnknownOption()
      .parse(process.argv);

    const options = program.opts();

    log();
    log(chalk.green("🚀 Welcome to Facet Dapp Generator!"));

    if (typeof projectPath === "string") {
      projectPath = projectPath.trim();
    }

    if (!projectPath) {
      log();
      const response = await inquirer.prompt([
        {
          type: "input",
          name: "value",
          message: "What is the name of your project?",
          default: "my-facet-dapp",
          validate: (value) => {
            if (!value.trim()) {
              return "Project name cannot be empty.";
            }
            return true;
          },
        },
      ]);

      projectPath = response.value.trim();
    }

    log();

    const targetPath = path.resolve(process.cwd(), projectPath);

    if (fs.existsSync(targetPath)) {
      throw new FriendlyError(
        [
          chalk.red(`👀 The target directory "${projectPath}" already exists.`),
          "🙏 Please remove this directory or choose a different project name.",
        ].join("\n")
      );
    }

    log(
      chalk.cyan(`🚀 Creating a new Facet dapp in ${chalk.bold(targetPath)}`)
    );

    // Copy template files
    const templatePath = path.join(__dirname, "../template");
    fs.copySync(templatePath, targetPath);

    // Update package.json - using fs.readFileSync instead of require to avoid path issues
    const packageJsonPath = path.join(targetPath, "package.json");
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
    const pkgJson = JSON.parse(packageJsonContent);
    pkgJson.name = path.basename(targetPath);

    // Write the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkgJson, null, 2));

    log(
      chalk.cyan(
        `📦 Installing dependencies with yarn. This could take a while.`
      )
    );

    // Install dependencies
    try {
      execSync("yarn", { cwd: targetPath, stdio: "inherit" });
    } catch (error) {
      log(
        chalk.yellow(
          "Dependencies installation failed. You can install them manually by running 'yarn' in the project directory."
        )
      );
    }

    // Initialize git repository
    if (!options.skipGit) {
      try {
        log(chalk.cyan("📚 Initializing git repository"));
        execSync("git init", { cwd: targetPath, stdio: "ignore" });
        execSync("git add .", { cwd: targetPath, stdio: "ignore" });
        execSync(
          'git commit --no-verify --message "Initial commit from create-facet-dapp"',
          { cwd: targetPath, stdio: "ignore" }
        );
        log(chalk.green("✅ Git repository initialized successfully"));
      } catch (error) {
        log(
          chalk.yellow(
            "⚠️ Failed to initialize Git repository. You can initialize it manually later."
          )
        );
      }
    }

    log(chalk.green("🎉 Done! Thanks for using Facet Dapp Generator! 🙏"));
    log();
    log(
      chalk.cyan(
        `👉 To get started, run ${chalk.bold(
          `cd ${projectPath}`
        )} and then ${chalk.bold("yarn dev")}`
      )
    );
    log();
  } catch (err) {
    if (err instanceof FriendlyError) {
      log(chalk.yellow(err.message));
      process.exit(1);
    } else {
      console.error(chalk.red("Error:"), err);
      process.exit(1);
    }
  }
}

run();
