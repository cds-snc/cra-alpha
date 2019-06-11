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
      isLength: {
        errorMessage: 'Name must be at least 13 characters long',
        options: { min: 13 },
      },
      trim: true,
    },
  },
  previous: '/about-you',
}
