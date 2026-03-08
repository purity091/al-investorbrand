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

    // Check if already processed
    if (content.includes('className="top-toc"')) {
        console.log('Already processed', file);
        return;
    }

    // Replace <section...> <h2>...</h2> with <section...><details className="toggle-section" open><summary><h2>...</h2><span className="toggle-icon">▼</span></summary><div className="toggle-content">
    content = content.replace(/(<section[^>]*>)\s*(<h2[^>]*>.*?<\/h2>)/gs, (match, section, h2) => {
        return `${section}\n                        <details className="toggle-section">\n                            <summary>\n                                ${h2}\n                                <span className="toggle-icon">▼</span>\n                            </summary>\n                            <div className="toggle-content">`;
    });

    // Replace </section> with </div></details></section>
    content = content.replace(/<\/section>/g, '                            </div>\n                        </details>\n                    </section>');

    // Modify the sidebar layout to be horizontal
    content = content.replace(/<aside className="sidebar">/g, '<nav className="top-toc">');
    content = content.replace(/<\/aside>/g, '</nav>');

    // Move <nav className="top-toc"> inside <main className="main-content">
    const navMatch = content.match(/(<nav className="top-toc">.*?<\/nav>)/s);
    if (navMatch) {
        const navHtml = navMatch[1];
        content = content.replace(/(<nav className="top-toc">.*?<\/nav>)\s*/s, '');
        content = content.replace(/(<main className="main-content">)/, `$1\n                ${navHtml}\n`);
    }

    // Since we are changing section toggling, we might want to ensure 'handleScroll' logic doesn't crash 
    // when sections are collapsed. But actually native 'details' just hides content. It's fine to leave it.

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Processed', file);
});
