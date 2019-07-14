import { superstruct } from 'superstruct';

const isEmail = str => /.+\@.+\..+/.test(str);
const isNonEmpty = v => v && v.length !== 0;

// Custom validations: see superstruct package for details.
const struct = superstruct({
  types: {
    email: isEmail,
    nonEmpty: isNonEmpty,
  },
});

const { intersection } = struct;

// Validation schema for Email: see superstruct package
// for details.
const Email = struct({
  from: 'email',
  to: intersection([['email'], 'nonEmpty']),
  cc: ['email'],
  bcc: ['email'],
  subject: 'string',
  message: 'string',
});

export default Email;
