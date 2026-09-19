import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const BUDGETS = {
  jsGzipLimitKb: 250,
  cssGzipLimitKb: 60,
  serverLimitKb: 100,
};

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getFiles(fullPath) : [fullPath];
  });
}

function checkBundle() {
  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const files = getFiles(distDir);
  let failed = false;

  console.log('\n📦 Production Asset Bundle Budget Audit:');
  console.log('----------------------------------------------------------------------');
  console.log('File                                    | Raw Size   | Gzip Size  | Status');
  console.log('----------------------------------------------------------------------');

  for (const file of files) {
    const rel = path.relative(distDir, file);
    if (rel.endsWith('.map') || rel.endsWith('.html')) continue;

    const content = fs.readFileSync(file);
    const rawKb = (content.length / 1024).toFixed(2);
    const gzipKb = (zlib.gzipSync(content).length / 1024).toFixed(2);

    let budget = null;
    let metric = 'gzip';

    if (rel.endsWith('.js')) {
      budget = BUDGETS.jsGzipLimitKb;
    } else if (rel.endsWith('.css')) {
      budget = BUDGETS.cssGzipLimitKb;
    } else if (rel.includes('server')) {
      budget = BUDGETS.serverLimitKb;
      metric = 'raw';
    }

    const valueToCheck = metric === 'gzip' ? parseFloat(gzipKb) : parseFloat(rawKb);
    const passed = budget === null || valueToCheck <= budget;

    const status = passed ? '✅ PASS' : `❌ EXCEEDED (${metric.toUpperCase()} limit: ${budget}KB)`;
    if (!passed) failed = true;

    const fileCol = rel.padEnd(39).slice(0, 39);
    const rawCol = `${rawKb} KB`.padEnd(10);
    const gzipCol = `${gzipKb} KB`.padEnd(10);

    console.log(`${fileCol} | ${rawCol} | ${gzipCol} | ${status}`);
  }

  console.log('----------------------------------------------------------------------\n');

  if (failed) {
    console.error('❌ Bundle budget check failed!');
    process.exit(1);
  } else {
    console.log('✅ All production bundles within performance budgets!\n');
  }
}

checkBundle();
