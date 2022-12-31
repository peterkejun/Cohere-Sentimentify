import { Sentiment } from "../sentiment/types";
import { ColorConstructorOptions } from "./types";

export class Color {
    private red: number;
    private green: number;
    private blue: number;
    private alpha: number;

    constructor(options: ColorConstructorOptions) {
        if (options.rgb) {
            this.red = options.rgb[0];
            this.green = options.rgb[1];
            this.blue = options.rgb[2];
        } else if (options.hex) {
            const rgb = this.hexToRgb(options.hex);
            this.red = rgb[0];
            this.green = rgb[1];
            this.blue = rgb[2];
        }
        
        if (options.alpha != null) {
            this.alpha = options.alpha;
        } else {
            this.alpha = 1;
        }
    }

    private hexToRgb = (hex: string): [number, number, number] => {
        const hexas = '0123456789ABCDEF'.split('');
        const hexDigitToDecimal = (d: string) => {
            return hexas.findIndex(_d => _d === d);
        }
        const _hex = hex.substring(0, 6);
        const red = hexDigitToDecimal(_hex[0]) * 16 + hexDigitToDecimal(_hex[1]);
        const green = hexDigitToDecimal(_hex[2]) * 16 + hexDigitToDecimal(_hex[3]);
        const blue = hexDigitToDecimal(_hex[4]) * 16 + hexDigitToDecimal(_hex[5]);
        return [red, green, blue];
    }

    getRgb = (): [number, number, number] => {
        return [this.red, this.green, this.blue];
    }

    getHex = (): string => {
        const hexas = '0123456789ABCDEF';
        const decimalToHex = (d: number) => {
            const b = Math.floor(d / 16);
            const a = d - b * 16;
            return hexas[b] + hexas[a];
        }
        return decimalToHex(this.red) + decimalToHex(this.green) + decimalToHex(this.blue);
    }

    getAlpha = (): number => this.alpha;
}

const Colors = {
    [Sentiment.POSITIVE]: '2ECC71',
    [Sentiment.NEGATIVE]: 'E53935',
    [Sentiment.NEUTRAL]: 'F1C40F',
};

export const getColorOfSentiment = (sentiment: Sentiment, confidence: number): Color => {
    const hex = Colors[sentiment];
    const color = new Color({
        hex,
        alpha: confidence,
    });
    return color;
}
