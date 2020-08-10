// core modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const { dirname } = require('path');
// third party modules
const slugify = require('slugify');
// own modules
const replaceTemplate = require('./modules/replaceTemplate');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);
const templateProjects = fs.readFileSync(`${__dirname}/templates/template-projects.html`, 'utf-8');
const templateProject = fs.readFileSync(`${__dirname}/templates/template-project.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const styles = fs.readFileSync(`${__dirname}/public/css/styles.css`, 'utf-8');

const slugs = dataObject.map((el) => slugify(el.projectName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);
    console.log(pathname);

    if (pathname === '/' || pathname === '/projects') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const cardsHTML = dataObject.map((el) => replaceTemplate(templateCard, el)).join('');
        const output = templateProjects.replace('{%PROJECT_CARDS%}', cardsHTML);
        res.end(output);

    } else if (pathname === '/project') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const project = dataObject[query.id];
        const output = replaceTemplate(templateProject, project);
        res.end(output);

    } else if (pathname === '/api') {
        res.writeHead('200', { 'content-type': 'application/json' });
        res.end(data);

    } else if (req.url.indexOf('.css') != -1) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(styles);
        res.end();

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>This page can not be found!</h1>');

    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to port 8000');
});