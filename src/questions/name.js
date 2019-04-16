module.exports = {
  id: 'name',
  label: 'Full name',
  description: 'Please enter your full name.',
  type: 'text',
  schema: {
    name: {
      in: ['body'],
      isEmpty: {
        errorMessage: 'Name can’t be empty',
        negated: true,
      },
    },
  },
}
