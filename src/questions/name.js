const name = {
  id: 'name',
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

module.exports = name
