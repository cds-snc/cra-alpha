const options = ['Married', 'Living common-law', 'Widowed', 'Divorced', 'Separated', 'Single']

module.exports = {
  id: 'maritalStatus',
  label: 'Marital status',
  description: 'Please enter your marital status as of December 31, 2018.',
  type: 'radio',
  options: options,
  schema: {
    maritalStatus: {
      in: ['body'],
      isEmpty: {
        errorMessage: 'Marital status can’t be empty',
        negated: true,
      },
      isIn: {
        errorMessage: 'Marital status must be one of the provided options',
        options: [options],
      },
    },
  },
  previous: '/your-family',
}
