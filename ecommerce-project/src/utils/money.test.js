import { it, expect, describe } from "vitest";
import formatMoney from './money';

describe('formatMoney', () => {
    it('formats 1999 cents as JOD19.99', () => {
        expect(formatMoney(1999)).toBe('JOD19.99');
    });

    it('displays 2 decimals', () => {
        expect(formatMoney(1090)).toBe('JOD10.90');
        expect(formatMoney(100)).toBe('JOD1.00');
    });
});
