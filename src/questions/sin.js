module.exports = {
  id: 'name',
  label: 'SIN Number',
  description: 'Please enter your SIN Number',
  type: 'text',
  schema: {
    name: {
      in: ['body'],
      isEmpty: {
        errorMessage: 'SIN Number can’t be empty',
        negated: true,
      },
      trim: true,
    },
  },
  previous: '/checklist',
}
