module.exports = {
  id: 'address',
  label: 'Mailing address',
  description: 'Please enter your current mailing address.',
  type: 'textarea',
  schema: {
    address: {
      in: ['body'],
      isEmpty: {
        errorMessage: 'Mailing address can’t be empty',
        negated: true,
      },
      trim: true,
    },
  },
  previous: '/checklist',
}
