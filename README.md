# Cohere Sentimentify
[![npm version](https://badge.fury.io/js/cohere-sentimentify.svg)](https://badge.fury.io/js/cohere-sentimentify)

Colorize HTML texts by analyzing each sentence's sentiment using Cohere NLP model.

<img  src="https://raw.githubusercontent.com/peterkejun/Cohere-Sentimentify/main/assets/cohere-sentimentify%20example.png"  alt="Screenshot of the example app"/>  

## Installation
```bash
npm i cohere-sentimentify
```

## Co:here API Key
`cohere-sentimentify` uses the `finance-sentiment` NLP classification model by [Co:here](https://cohere.ai/), therefore the client application needs to apply an API key. However, this model is accessible using the trial API key, with a limit of 100 calls / minute.

## Usage

`cohere-sentimentify` takes in HTML as a string and produces a new HTML with the same text content and similar DOM structure but with colors (based on sentence sentiment)  

```javascript
import { intialize, sentimentifyHtml } from  'cohere-sentimentify';
import { readFileSync } from  'fs';

(async () => {
	const  API_KEY  =  process.env.API_KEY;
	intialize(API_KEY);
	
	const  html  =  readFileSync('./examples/email.html', 'utf-8');
	const  colorizedHtml  =  await  sentimentifyHtml(html);
	
	console.log(colorizedHtml);
})();
```

## License
This project is under the [MIT](https://github.com/peterkejun/Cohere-Sentimentify/blob/main/lib/MIT-LICENSE.txt) license.

## Contributions
All contributions are welcomed!
