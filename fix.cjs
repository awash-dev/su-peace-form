const fs = require('fs');

const html = fs.readFileSync('temp_html.txt', 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const cssContent = styleMatch ? styleMatch[1] : '';

let dashboard = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dashboard = dashboard.replace('${cssContent || \'\'}', cssContent);
fs.writeFileSync('src/pages/Dashboard.jsx', dashboard);
console.log('Fixed CSS interpolation');
