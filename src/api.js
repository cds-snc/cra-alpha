var API = (function() {
  const _john = {
    _matches: ['john', 'j'],
    name: 'John Caldwell Abbott',
    address: '21275 Lakeshore Dr\nSainte-Anne-de-Bellevue\nQuébec\nH9X 3L9',
    maritalStatus: 'Widowed',
    children: '8',
    income: [
      { key: 'Employer Name', value: 'Acme Corp' },
      { Year: 2019 },
      { Box12: '123456789' },
      { key: 'Box14', value: 10000 },
      { key: 'Box22', value: 1000 },
    ],
  }

  const _arthur = {
    _matches: ['arthur', 'art', 'a'],
    name: 'Arthur Meighen',
    address: '23 St Clair Ave East\nToronto\nOntario\nM4T 1M4',
    maritalStatus: 'Married',
    children: '3',
    income: [
      { key: 'Employer Name', value: 'Alpha Corp' },
      { Year: 2019 },
      { Box12: '123789456' },
      { key: 'Box14', value: 100000 },
      { key: 'Box22', value: 10000 },
    ],
  }

  const _louis = {
    _matches: ['louis', 'lou', 'l'],
    name: 'Louis Stephen St. Laurent',
    address: '459-455 Boulevard de la Carrière\nGatineau\nQuébec\nJ8Y 6V7',
    maritalStatus: 'Widowed',
    children: '5',
    income: [
      { key: 'Employer Name', value: 'Acme Corp' },
      { Year: 2019 },
      { Box12: '456123789' },
      { key: 'Box14', value: 50000 },
      { key: 'Box22', value: 5000 },
    ],
  }

  const _kim = {
    _matches: ['avril', 'kim', 'k'],
    name: 'Avril Douglas Campbell',
    address: '850 Argyle Street\nPort Alberni\nBritish Columbia\nV9Y 1V8',
    maritalStatus: 'Married',
    children: '0',
    income: [
      { key: 'Employer Name', value: 'Acme Corp' },
      { Year: 2019 },
      { Box12: '321654987' },
      { key: 'Box14', value: 54321 },
      { key: 'Box22', value: 12345 },
    ],
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
