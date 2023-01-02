// import * as winkNLP from 'wink-nlp';
const winkNLP = require('wink-nlp')
// Load english language model.
const model = require('wink-eng-lite-web-model');
// Instantiate winkNLP.
const nlp = winkNLP( model );
// Obtain "its" helper to extract item properties.
const its = nlp.its;
// Obtain "as" reducer helper to reduce a collection.
const as = nlp.as;

export const breakIntoSentences = (str: string): string[] => {
    const doc = nlp.readDoc(str);
    return doc.sentences().out();
}

