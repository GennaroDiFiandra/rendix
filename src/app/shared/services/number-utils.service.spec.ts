import { TestBed } from '@angular/core/testing';

import { NumberUtilsService } from './number-utils.service';

describe('NumberUtilsService', () => {
  let service: NumberUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parseDecimal', () => {
    it('should return a number from a string', () => {
      const result = service.parseDecimal('123');

      expect(typeof result).toBe('number');
      expect(result).toBe(123);
    });

    describe('should correctly parse a numeric string with', () => {
      it('a comma as decimal separator', () => {
        const result = service.parseDecimal('123,45');

        expect(result).toBe(123.45);
      });

      it('a dot as decimal separator', () => {
        const result = service.parseDecimal('123.45');

        expect(result).toBe(123.45);
      });
    });

    describe('should correctly parse a numeric string with only the decimal part', () => {
      it('with a comma as decimal separator', () => {
        const result = service.parseDecimal(',45');

        expect(result).toBe(0.45);
      });

      it('with a dot as decimal separator', () => {
        const result = service.parseDecimal('.45');

        expect(result).toBe(0.45);
      });
    });

    it('should ignore leading and trailing spaces', () => {
      const result = service.parseDecimal('  123 ');

      expect(result).toBe(123);
    });

    it('should correctly parse an alphanumeric string with numeric digits at the start', () => {
      const result = service.parseDecimal('1a');

      expect(result).toBe(1);
    });

    describe('when parsing numeric strings with a single separator', () => {
      it('should correctly parse a numeric string with a comma as the decimal separator', () => {
        const result = service.parseDecimal('1,234');
        expect(result).toBe(1.234);
      });

      it('should correctly parse a numeric string with a dot as the decimal separator', () => {
        const result = service.parseDecimal('1.234');
        expect(result).toBe(1.234);
      });
    });

    describe('when parsing numeric strings with multiple separators', () => {
      it('should correctly parse a numeric string interpreting first comma as decimal separator', () => {
        const result = service.parseDecimal('1,234.56');
        expect(result).toBe(1.234);
      });

      it('should correctly parse a numeric string interpreting first dot as decimal separator', () => {
        const result = service.parseDecimal('1.234,56');
        expect(result).toBe(1.234);
      });
    });

    describe('should return 0 from', () => {
      it('an empty string', () => {
        const result = service.parseDecimal('');

        expect(result).toBe(0);
      });

      it('an alphabetic string', () => {
        const result = service.parseDecimal('abc');

        expect(result).toBe(0);
      });

      it('an alphanumeric string with alphabetic characters at the start', () => {
        const result = service.parseDecimal('a1');

        expect(result).toBe(0);
      });
    });
  });
});
