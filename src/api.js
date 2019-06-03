var API = (function() {
  const _john = {
    _matches: ['john', 'j'],
    personal: {
      firstName: 'John',
      lastName: 'Abbott',
      addresses: {
        home: {
          buildingNum: '1234',
          streetNum: '345',
          streetName: 'Seasame st',
          POBox: '',
          ruralRoute: '',
          postalCode: 'K1A 0D2',
          city: 'Ottawa',
          province: 'ON',
        },
        mailing: '',
        mailingSameAsHome: true,
      },
      maritalStatus: 'Widowed',
      children: '8',
      SIN: '123-456-789',
    },
    return: {
      // Income
      line101: 12000, //Employment income (All t4s Box 14 added up)
      line113: 1000, //Old Age Security Pension (OAS)
      line146: 500, // Guaranteed income supplement (GIS)
      line150: 12000, // total income
      line236: 11000, // Net income
      line260: 10000, // Taxable income
      //Non-Refundable Tax Credits (NRTCs)
      line350: 1200, //Total Federal NRTCs
      line6150: 1000, //Total Provincial NRTCs
      line300: 12500, //Basic Personal Amount
      line303: 5000, //Spouce Common-Law Amount
      line305: 0, // Amount for Eligible Dependants
      line316: 0, //Disability (self)
      line330: 0, // Medical for Spouse
      line331: 0, //Medical for other dependants
      line367: 0, // Caregiver for Infirm Children Amount
      //Taxes
      line420: 250, //Net Federal Tax
      line428: 50, // Net Provincial Tax
      line435: 300, // Total Payable
      line437: 500, //Total Deducted (Calculated)
      line482: 200, //Total Credits (Calculated)
      line484: 200, //Refund (Calculated)
      line485: 0, //Balance Owing (Calculated)
    },
    t4s: [
      {
        employerName: 'BRAVO Corp',
        year: 2019,
        box14: 10000, //Employment income
        box22: 1000, // Income Tax Deducted
        box10: 'ON', //Province of employment
        box16: 100, //Employee CPP Contributions
        box24: 10000, //EI Insurable earnings
        box26: 10000, //CPP pensionable earnings
      },
    ],
  }

  const _arthur = {
    _matches: ['arthur', 'art', 'a'],
    personal: {
      firstName: 'Arthur',
      lastName: 'Meighen',
      address: '23 St Clair Ave East\nToronto\nOntario\nM4T 1M4',
      maritalStatus: 'Married',
      children: '3',
      SIN: '123-456-789',
    },
    return: {
      // Income
      line101: 12000, //Employment income (Calculated from All t4s Box 14 added up and T4A box 20)
      line113: 1000, //Old Age Security Pension (OAS)
      line146: 500, // Guaranteed income supplement (GIS)
      line150: 12000, // total income (Calculated)
      line236: 11000, // Net income (Calculated)
      line260: 10000, // Taxable income (Calculated)
      //Non-Refundable Tax Credits (NRTCs)
      line350: 1200, //Total Federal NRTCs (Calculated)
      line6150: 1000, //Total Provincial NRTCs (Calculated)
      line300: 12500, //Basic Personal Amount
      line303: 5000, //Spouce Common-Law Amount
      line305: 0, // Amount for Eligible Dependants
      line316: 0, //Disability (self)
      line330: 0, // Medical for Spouse
      line331: 0, //Medical for other dependants
      line367: 0, // Caregiver for Infirm Children Amount
      //Taxes
      line420: 250, //Net Federal Tax (Calculated)
      line428: 50, // Net Provincial Tax (Calculated)
      line435: 300, // Total Payable (Calculated)
      line437: 500, //Total Deducted (Calculated)
      line482: 200, //Total Credits (Calculated)
      line484: 200, //Refund (Calculated)
      line485: 0, //Balance Owing (Calculated)
    },
    t4s: [
      {
        employerName: 'ALPHA Corp',
        year: 2019,
        box14: 15000, //Employment income
        box22: 2000, // Income Tax Deducted
        box10: 'ON', //Province of employment
        box16: 150, //Employee CPP Contributions
        box24: 15000, //EI Insurable earnings
        box26: 15000, //CPP pensionable earnings
      },
    ],
  }

  const _louis = {
    _matches: ['louis', 'lou', 'l'],
    personal: {
      firstName: 'Louis',
      lastName: 'St. Laurent',
      address: '459-455 Boulevard de la Carrière\nGatineau\nQuébec\nJ8Y 6V7',
      maritalStatus: 'Widowed',
      children: '5',
      SIN: '123-456-789',
    },
    return: {
      // Income
      line101: 35000, //Employment income (Calculated from All t4s Box 14 added up and T4A box 20)
      line113: 0, //Old Age Security Pension (OAS)
      line146: 0, // Guaranteed income supplement (GIS)
      line150: 35000, // total income (Calculated)
      line236: 25000, // Net income (Calculated)
      line260: 25000, // Taxable income (Calculated)
      //Non-Refundable Tax Credits (NRTCs)
      line350: 1200, //Total Federal NRTCs (Calculated)
      line6150: 1000, //Total Provincial NRTCs (Calculated)
      line300: 12500, //Basic Personal Amount
      line303: 5000, //Spouce Common-Law Amount
      line305: 0, // Amount for Eligible Dependants
      line316: 0, //Disability (self)
      line330: 0, // Medical for Spouse
      line331: 0, //Medical for other dependants
      line367: 0, // Caregiver for Infirm Children Amount
      //Taxes
      line420: 250, //Net Federal Tax (Calculated)
      line428: 50, // Net Provincial Tax (Calculated)
      line435: 300, // Total Payable (Calculated)
      line437: 500, //Total Deducted (Calculated)
      line482: 200, //Total Credits (Calculated)
      line484: 200, //Refund (Calculated)
      line485: 0, //Balance Owing (Calculated)
    },
    t4s: [
      {
        employerName: 'ACME Corp',
        year: 2019,
        box14: 30000, //Employment income
        box22: 5000, // Income Tax Deducted
        box10: 'QC', //Province of employment
        box16: 7500, //Employee CPP Contributions
        box24: 30000, //EI Insurable earnings
        box26: 30000, //CPP pensionable earnings
      },
      {
        employerName: 'Zebra Inc.',
        year: 2019,
        box14: 5000, //Employment income
        box22: 500, // Income Tax Deducted
        box10: 'QC', //Province of employment
        box16: 700, //Employee CPP Contributions
        box24: 5000, //EI Insurable earnings
        box26: 5000, //CPP pensionable earnings
      },
    ],
  }

  const _kim = {
    _matches: ['avril', 'kim', 'k'],
    personal: {
      firstName: 'Avril',
      lastName: 'Campbell',
      address: '850 Argyle Street\nPort Alberni\nBritish Columbia\nV9Y 1V8',
      maritalStatus: 'Married',
      children: '0',
      SIN: '123-456-789',
    },

    return: {
      // Income related lines
      line101: 20000, //Employment income (Calculated from All t4s Box 14 added up and T4A box 20)
      line113: 0, //Old Age Security Pension (OAS)
      line146: 0, // Guaranteed income supplement (GIS)
      line150: 20000, // total income (Calculated)
      line236: 15000, // Net income (Calculated)
      line260: 15000, // Taxable income (Calculated)
      //Non-Refundable Tax Credits (NRTCs)
      line350: 1200, //Total Federal NRTCs (Calculated)
      line6150: 1000, //Total Provincial NRTCs (Calculated)
      line300: 12500, //Basic Personal Amount
      line303: 5000, //Spouce Common-Law Amount
      line305: 0, // Amount for Eligible Dependants
      line316: 0, //Disability (self)
      line330: 0, // Medical for Spouse
      line331: 0, //Medical for other dependants
      line367: 0, // Caregiver for Infirm Children Amount
      //Taxes
      line420: 250, //Net Federal Tax (Calculated)
      line428: 50, // Net Provincial Tax (Calculated)
      line435: 300, // Total Payable (Calculated)
      line437: 500, //Total Deducted (Calculated)
      line482: 200, //Total Credits (Calculated)
      line484: 200, //Refund (Calculated)
      line485: 0, //Balance Owing (Calculated)
    },
    t4s: [
      {
        employerName: 'ACME Corp',
        year: 2019,
        box14: 20000, //Employment income
        box22: 3000, // Income Tax Deducted
        box10: 'BC', //Province of employment
        box16: 1500, //Employee CPP Contributions
        box24: 20000, //EI Insurable earnings
        box26: 20000, //CPP pensionable earnings
      },
    ],
  }

  const _users = [_john, _arthur, _louis, _kim]

  //private
  const _formatAddress = function(address = {}) {
    // This address formatting will probably need to change after more user research
    // Also, we can arrow function this if need be later
    fullTextAddress = ''

    //If we have any of these let's put them on a line by themselves
    if (address.buildingNum || address.streetNum || address.streetName) {
      fullTextAddress +=
        address.buildingNum + '-' + address.streetNum + ' ' + address.streetName + '\n'
    }

    if (address.POBox || address.ruralRoute) {
      //Does the POBox property include the "Box" or is it just a number?
      fullTextAddress += address.POBox + ' ' + address.ruralRoute + '\n'
    }

    fullTextAddress += address.city + ' ' + address.province + ' ' + address.postalCode

    return fullTextAddress
  }

  //Getters
  const getFirstName = (firstName = '') => firstName.trim().split(' ')[0]

  const getHomeAddress = function(user = {}) {
    return _formatAddress(user.personal.addresses.home)
  }

  const getMailingAddress = function(user = {}) {
    if (user.personal.addresses.mailingSameAsHome) {
      return _formatAddress(user.personal.addresses.home)
    } else {
      return _formatAddress(user.personal.addresses.mailing)
    }
  }

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
    getHomeAddress,
    getMailingAddress,
    getFirstName,
    getUser,
    getMatches,
  }
})()

module.exports = API
