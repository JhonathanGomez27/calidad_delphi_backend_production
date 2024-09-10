"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanText = cleanText;
function cleanText(text) {
    const textLowerCase = text.toLowerCase();
    const textTrim = textLowerCase.trim();
    const textWithoutPunctuation = textTrim.replace(/[()¿?!¡]/g, '');
    const textWithoutComma = textWithoutPunctuation.replace(/([^0-9]),([^0-9])/g, '$1$2');
    const textWithoutDot = textWithoutComma.replace(/([^0-9])\.([^0-9])/g, '$1$2');
    const textWithoutColon = textWithoutDot.replace(/([^0-9]):([^0-9])/g, '$1$2');
    return textWithoutColon;
}
//# sourceMappingURL=format-text.js.map