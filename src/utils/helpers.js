export const getValuesFromRawData = (rawData, filterArray) => {
  const filteredValues = Object.values(
    Object.keys(rawData || {})
      .filter(key => filterArray.includes(key.split('/')[1]))
      .reduce((obj, key) => {
        obj[key] = rawData[key];
        return obj;
      }, {})
  );
  return filteredValues;
};

export const getMonthlyValuesFromRawData = (rawData, filterArray) => {
  const filteredValues = Object.values(
    Object.keys(rawData || {})
      .filter(key => filterArray.includes(key))
      .reduce((obj, key) => {
        obj[key] = rawData[key];
        return obj;
      }, {})
  );
  return filteredValues;
};

export const getKeysFromRawData = (rawData, filterArray) => {
  const filteredValues = Object.keys(
    Object.keys(rawData || {})
      .filter(key => filterArray.includes(key.split('/')[1]))
      .reduce((obj, key) => {
        obj[key] = rawData[key];
        return obj;
      }, {})
  );
  return filteredValues;
};

export const getCountryCodeFromName = (countriesList, countryName) => {
  return countriesList?.filter(country => country.country === countryName)[0].countryInfo.iso2.toLowerCase() || '';
};