var API = (function() {
  const _john = {
    _matches: ['john', 'j'],
    name: 'John Caldwell Abbott',
    address: '21275 Lakeshore Dr\nSainte-Anne-de-Bellevue\nQuébec\nH9X 3L9',
    maritalStatus: 'Widowed',
    children: '8',
    income: {
      employerName: 'BRAVO Corp',
      year: 2019,
      box12: '321987645',
      box14: 10000,
      box22: 1000,
    },
  }

  const _arthur = {
    _matches: ['arthur', 'art', 'a'],
    name: 'Arthur Meighen',
    address: '23 St Clair Ave East\nToronto\nOntario\nM4T 1M4',
    maritalStatus: 'Married',
    children: '3',
    income: {
      employerName: 'BETA Corp',
      year: 2019,
      box12: '321654987',
      box14: 20000,
      box22: 1500,
    },
  }

  const _louis = {
    _matches: ['louis', 'lou', 'l'],
    name: 'Louis Stephen St. Laurent',
    address: '459-455 Boulevard de la Carrière\nGatineau\nQuébec\nJ8Y 6V7',
    maritalStatus: 'Widowed',
    children: '5',
    income: {
      employerName: 'ALPHA Corp',
      year: 2019,
      box12: '254528961',
      box14: 35000,
      box22: 4000,
    },
  }

  const _kim = {
    _matches: ['avril', 'kim', 'k'],
    name: 'Avril Douglas Campbell',
    address: '850 Argyle Street\nPort Alberni\nBritish Columbia\nV9Y 1V8',
    maritalStatus: 'Married',
    children: '0',
    income: {
      employerName: 'BLORB Corp',
      year: 2019,
      box12: '532658742',
      box14: 12345,
      box22: 1234,
    },
  }

  const _users = [_john, _arthur, _louis, _kim]

  const getFirstName = (name = '') => name.trim().split(' ')[0]

  const getUser = name => {
    let found = null

    if (!name) {
      return found
    }

    const firstName = getFirstName(name).toLowerCase()

    _users.forEach(user => {
      if (user._matches.includes(firstName)) {
        found = user
      }
    })

    return found
  }

  const getMatches = () => {
    return [].concat.apply([], _users.map(user => user._matches))
  }

  return {
    getFirstName,
    getUser,
    getMatches,
  }
})()

module.exports = API
