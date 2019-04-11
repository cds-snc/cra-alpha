var API = (function() {
  const _john = {
    name: 'John Caldwell Abbott',
    address: '21275 Lakeshore Dr\nSainte-Anne-de-Bellevue\nQuébec\nH9X 3L9',
    maritalStatus: 'Widowed',
    children: '8',
  }

  const _louis = {
    name: 'Louis Stephen St. Laurent',
    address: '459-455 Boulevard de la Carrière\nGatineau\nQuébec\nJ8Y 6V7',
    maritalStatus: 'Windowed',
    children: '5',
  }

  const _arthur = {
    name: 'Arthur Meighen',
    address: '23 St Clair Ave East\nToronto\nOntario\nM4T 1M4',
    maritalStatus: 'Married',
    children: '3',
  }

  const _kim = {
    name: 'Avril Douglas Campbell',
    address: '850 Argyle Street\nPort Alberni\nBritish Columbia\nV9Y 1V8',
    maritalStatus: 'married',
    children: '0',
  }

  const getUser = name => {
    if (!name) {
      return null
    }

    const firstName = name.split(' ')[0].toLowerCase()

    /* eslint-disable indent */

    switch (firstName) {
      case 'john':
      case 'j':
        return _john

      case 'louis':
      case 'lou':
      case 'l':
        return _louis

      case 'arthur':
      case 'art':
      case 'a':
        return _arthur

      case 'kim':
      case 'k':
      case 'avril':
        return _kim

      default:
        return null
    }
    /* eslint-enable indent */
  }

  return {
    getUser,
  }
})()

module.exports = API
