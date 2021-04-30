import { kelvinToFarenheit, kelvinToCelsius } from './temperature';

describe('temperature function', () => {
  describe('kelvin to farenheit', () => {
    it('should correctly convert kelvin to farenheit', () => {
      const testCases = [
        { kelvin: 305, farenheit: 89 },
        { kelvin: 313.15, farenheit: 104 },
        { kelvin: 273.15, farenheit: 32 },
        { kelvin: 273, farenheit: 32 },
        { kelvin: 255.5, farenheit: 0 },
        { kelvin: -10, farenheit: -478 },
      ];

      testCases.forEach((testCase) => {
        expect(kelvinToFarenheit(testCase.kelvin)).toBe(testCase.farenheit);
      });
    });
  });

  describe('kelvin to celsius', () => {
    it('should correctly convert kelvin to celsius', () => {
      const testCases = [
        { kelvin: 305, celsius: 32 },
        { kelvin: 313.15, celsius: 40 },
        { kelvin: 273.15, celsius: 0 },
        { kelvin: 273, celsius: 0 },
        { kelvin: 250, celsius: -23 },
        { kelvin: -10, celsius: -283 },
      ];

      testCases.forEach((testCase) => {
        expect(kelvinToCelsius(testCase.kelvin)).toBe(testCase.celsius);
      });
    });
  });
});
