const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/plans/FacebookPlan.tsx',
    'src/pages/plans/InstagramPlan.tsx',
    'src/pages/plans/LinkedInPlan.tsx',
    'src/pages/plans/XPlan.tsx',
];

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf8');

    // Append the missing closing tags to our top-toc block
    // We only want to do this if it's currently broken (i.e., we see the orphaned tags before {/* Main Content */})
    if (content.match(/<\/div>\s*<\/nav>\s*({\/\*\s*Main Content\s*\*\/})/s)) {
        // Fix the top-toc block inside main
        content = content.replace(/(<nav className="top-toc">.*?<nav className="toc-links">.*?<\/nav>\s*)/s, '$1                    </div>\n                </nav>\n');

        // Remove the orphaned tags before Main Content
        content = content.replace(/<\/div>\s*<\/nav>\s*({\/\*\s*Main Content\s*\*\/})/s, '$1');

        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed', file);
    } else {
        console.log('Skipped', file);
    }
});
