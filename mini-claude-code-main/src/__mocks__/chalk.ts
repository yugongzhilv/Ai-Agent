/**
 * Mock for chalk module in test environment
 */

const identity = (str: string) => str;

const chalk: any = identity;
chalk.bold = identity;
chalk.dim = identity;
chalk.italic = identity;
chalk.underline = identity;
chalk.inverse = identity;
chalk.hidden = identity;
chalk.strikethrough = identity;
chalk.black = identity;
chalk.red = identity;
chalk.green = identity;
chalk.yellow = identity;
chalk.blue = identity;
chalk.magenta = identity;
chalk.cyan = identity;
chalk.white = identity;
chalk.gray = identity;
chalk.grey = identity;
chalk.redBright = identity;
chalk.greenBright = identity;
chalk.yellowBright = identity;
chalk.blueBright = identity;
chalk.magentaBright = identity;
chalk.cyanBright = identity;
chalk.whiteBright = identity;
chalk.bgBlack = identity;
chalk.bgRed = identity;
chalk.bgGreen = identity;
chalk.bgYellow = identity;
chalk.bgBlue = identity;
chalk.bgMagenta = identity;
chalk.bgCyan = identity;
chalk.bgWhite = identity;

export default chalk;
