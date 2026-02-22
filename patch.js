const fs = require('fs');
const platforms = ['news', 'saudi', 'academy', 'launch', 'radar'];

let sourceContent = fs.readFileSync('src/platforms/news/pages/PlanningPage.tsx', 'utf8');

// Fix interface Program by adding systemPlatform?: string;
if (!sourceContent.includes('systemPlatform?: string;')) {
    sourceContent = sourceContent.replace(
        'order: number;',
        'order: number;\n    systemPlatform?: string;'
    );
}

// Remove the loadSampleJSON button
sourceContent = sourceContent.replace(
    /\s*<button onClick=\{loadSampleJSON\}[^>]*>.*<\/button>/g,
    ''
);

// Iterate through platforms and write the fixed content
for (const p of platforms) {
    const filePath = 'src/platforms/' + p + '/pages/PlanningPage.tsx';
    fs.writeFileSync(filePath, sourceContent, 'utf8');
    console.log('Updated ' + filePath);
}
