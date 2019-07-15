import Email from './email';

describe('Email', () => {
  let makeValidEmail = () => ({
    from: "someone@example.net",
    to: ["someoneelse@example.net"],
    cc: [],
    bcc: [],
    subject: "hi",
    message: "yo",
  });

  describe('from field', () => {
    it('is validated to be an email and be non-blank', () => {
      const testCases = [
        { from: '', valid: false },
        { from: 'someone@example.net', valid: true },
        { from: 'someoneexample.net', valid: false },
      ]
      testCases.forEach(({ from, valid }) => {
        const email = makeValidEmail();
        email.from = from;
        if (valid) {
          expect(() => Email(email)).not.toThrow();
        } else {
          expect(() => Email(email)).toThrow();
        }
      });
    });
  });

  describe('to field', () => {
    it('is validated to be an array of emails, and may not be empty', () => {
      const testCases = [
        { to: [], valid: false },
        { to: ['someone@example.net'], valid: true },
        { to: ['someone@example.net', 'someoneelse@example.net'], valid: true },
        { to: ['someoneexample.net'], valid: false },
        { to: [9], valid: false },
      ]
      testCases.forEach(({ to, valid }) => {
        const email = makeValidEmail();
        email.to = to;
        if (valid) {
          expect(() => Email(email)).not.toThrow();
        } else {
          expect(() => Email(email)).toThrow();
        }
      });
    });
  });

  describe('cc field', () => {
    it('is validated to be an array of emails, but may be empty', () => {
      const testCases = [
        { cc: [], valid: true },
        { cc: ['someone@example.net'], valid: true },
        { cc: ['someoneexample.net'], valid: false },
        { cc: [9], valid: false },
      ]
      testCases.forEach(({ cc, valid }) => {
        const email = makeValidEmail();
        email.cc = cc;
        if (valid) {
          expect(() => Email(email)).not.toThrow();
        } else {
          expect(() => Email(email)).toThrow();
        }
      });
    });
  });

  describe('bcc field', () => {
    it('is validated to be an array of emails, but may be empty', () => {
      const testCases = [
        { bcc: [], valid: true },
        { bcc: ['someone@example.net'], valid: true },
        { bcc: ['someoneexample.net'], valid: false },
        { bcc: [9], valid: false },
      ]
      testCases.forEach(({ bcc, valid }) => {
        const email = makeValidEmail();
        email.bcc = bcc;
        if (valid) {
          expect(() => Email(email)).not.toThrow();
        } else {
          expect(() => Email(email)).toThrow();
        }
      });
    });
  });

  describe('subject field', () => {
    it('is validated to be a non-empty string', () => {
      const testCases = [
        { subject: '', valid: false },
        { subject: 'Yeah cool', valid: true },
        { subject: ['Yeah cool'], valid: false },
        { subject: 9, valid: false },
      ]
      testCases.forEach(({ subject, valid }) => {
        const email = makeValidEmail();
        email.subject = subject;
        if (valid) {
          expect(() => Email(email)).not.toThrow();
        } else {
          expect(() => Email(email)).toThrow();
        }
      });
    });
  });

  describe('message field', () => {
    it('is validated to be a non-empty string', () => {
      const testCases = [
        { message: '', valid: false },
        { message: 'Yeah cool', valid: true },
        { message: ['Yeah cool'], valid: false },
        { message: 9, valid: false },
      ]
      testCases.forEach(({ message, valid }) => {
        const email = makeValidEmail();
        email.message = message;
        if (valid) {
          expect(() => Email(email)).not.toThrow();
        } else {
          expect(() => Email(email)).toThrow();
        }
      });
    });
  });
});
