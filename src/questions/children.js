module.exports = {
  id: 'children',
  label: 'Number of children',
  description: 'Please enter the number of children you have as dependents.',
  type: 'number',
  schema: {
    children: {
      in: ['body'],
      isEmpty: {
        errorMessage: 'Number of children can’t be empty',
        negated: true,
      },
      isInt: {
        errorMessage: 'Number of children must be 0 or higher',
        options: { min: 0 },
      },
    },
  },
  previous: '/your-family',
}
