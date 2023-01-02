"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cohere_sentimentify_1 = require("cohere-sentimentify");
const fs_1 = require("fs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const API_KEY = process.env.API_KEY;
    (0, cohere_sentimentify_1.intialize)(API_KEY);
    const html = (0, fs_1.readFileSync)('./examples/positive.html', 'utf-8');
    const colorizedHtml = yield (0, cohere_sentimentify_1.sentimentifyHtml)(html);
    console.log(colorizedHtml);
}))();
//# sourceMappingURL=index.js.map