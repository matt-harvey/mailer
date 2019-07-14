import { superstruct } from 'superstruct';

const isEmail = str => /.+\@.+\..+/.test(str);

const struct = superstruct({
  types: {
    email: isEmail,
  },
});

const Email = struct({
  from: 'email',
  to: ['email'],
  subject: 'string',
  message: 'string',
});

export default Email;
