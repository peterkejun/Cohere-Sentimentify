import { intialize, sentimentifyHtml } from 'cohere-sentimentify';
import { readFileSync } from 'fs';


(async () => {
    const API_KEY = process.env.API_KEY;
    intialize(API_KEY);

    const html = readFileSync('./examples/email.html', 'utf-8');
    const colorizedHtml = await sentimentifyHtml(html);

    console.log(colorizedHtml);
})();



