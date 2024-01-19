import { render, screen } from '@testing-library/react';
import { GROUP_MATCH_REGEXP, handleURLs } from '../HandleUrls';

describe('handleURLs', () => {
  it('should return the same value if it is not a string', () => {
    // We will only likely get strings, but it shouldn't break/NPE if they are not
    expect(handleURLs(null as any)).toBe('null');
    expect(handleURLs(undefined as any)).toBe(undefined);
    expect(handleURLs(true as any)).toBe('true');
    const v = {};
    expect(handleURLs(v as any)).toBe('{}');
  });

  it('should not do anything if there are no URLs in the string', () => {
    const stringsWithoutURLs = ['not a URL', 'redhat.com', 'http', '://something.com'];
    stringsWithoutURLs.forEach((string: string) => {
      expect(handleURLs(string)).toBe(string);
    });
  });
});

const validStringsWithURL: { [testName: string]: string } = {
  straightURL: 'https://redhat.com',
  prefixedURL: 'Red Hat website: https://redhat.com',
  suffixedURL: "https://redhat.com is Red Hat's website",
  bothPrefixAndSuffixURL: 'This is the company website https://redhat.com for Red Hat',
};

describe('Test easy URL Examples', () => {
  Object.keys(validStringsWithURL).forEach((testName: string) => {
    const string = validStringsWithURL[testName];
    it(`should create an ExternalLink for the URL, test ${testName}`, () => {
      const reactRendering = handleURLs(string);
      expect(typeof reactRendering).not.toBe('string');
      render(<div>{reactRendering}</div>);

      screen.getByRole('link', { name: 'result link' });
    });
  });
});

describe('verify backing RegExp finds the urls', () => {
  Object.keys(validStringsWithURL).forEach((testName: string) => {
    const string = validStringsWithURL[testName];
    it(`should find the URL, test ${testName}`, () => {
      const result = string.match(GROUP_MATCH_REGEXP);
      expect(result?.[2]).toBe('https://redhat.com');
    });
  });
});
