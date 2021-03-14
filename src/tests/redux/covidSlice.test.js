import reducer, { fetchCurrentCovid, fetchHistoricalCovid, fetchCountries } from '../../redux/covidSlice';
import expect from 'expect';

const axios = require('axios');

jest.mock('axios');

describe('async API calls', () => {
  it('should return data when call fetchCurrentCovid', async () => {
    axios.get.mockResolvedValue({
      data: {
        cases: 1000,
        deaths: 50,
        recovered: 800,
        active: 150
      }
    });

    const response = await fetchCurrentCovid();
    expect(response).toEqual({
      cases: 1000,
      deaths: 50,
      recovered: 800,
      active: 150
    });
  });

  it('should return data when call fetchHistoricalCovid', async () => {
    axios.get.mockResolvedValue({
      data: {
        cases: {
          '1/22/20': 1000
        },
        deaths: {
          '1/22/20': 50
        },
        recovered: {
          '1/22/20': 800
        }
      }
    });

    const response = await fetchHistoricalCovid();
    expect(response).toEqual({
      cases: {
        '1/22/20': 1000
      },
      deaths: {
        '1/22/20': 50
      },
      recovered: {
        '1/22/20': 800
      }
    });
  });

  it('should return data when call fetchCountries', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          "country": "Afghanistan",
          "countryInfo": {
            "iso2": "AF",
            "lat": 33,
            "long": 65,
            "flag": "https://disease.sh/assets/img/flags/af.png"
          },
          "cases": 51594,
          "deaths": 2133,
          "recovered": 40569,
          "active": 8892
        },
        {
          "country": "Albania",
          "countryInfo": {
            "iso2": "AL",
            "lat": 41,
            "long": 20,
            "flag": "https://disease.sh/assets/img/flags/al.png"
          },
          "cases": 54317,
          "deaths": 1117,
          "recovered": 29799,
          "active": 23401
        }
      ]
    });

    const response = await fetchCountries();
    expect(response).toEqual([
      {
        "country": "Afghanistan",
        "countryInfo": {
          "iso2": "AF",
          "lat": 33,
          "long": 65,
          "flag": "https://disease.sh/assets/img/flags/af.png"
        },
        "cases": 51594,
        "deaths": 2133,
        "recovered": 40569,
        "active": 8892
      },
      {
        "country": "Albania",
        "countryInfo": {
          "iso2": "AL",
          "lat": 41,
          "long": 20,
          "flag": "https://disease.sh/assets/img/flags/al.png"
        },
        "cases": 54317,
        "deaths": 1117,
        "recovered": 29799,
        "active": 23401
      }
    ]);
  });
});

describe('covid reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isLoading: false,
        currentData: {
          total: 0,
          recovered: 0,
          deaths: 0,
          active: 0
        },
        historicalData: {},
        countries: []
      }
    )
  })

  it('should handle fetchCurrentCovidData', () => {
    const initialState = {
      isLoading: false,
      currentData: {
        total: 0,
        recovered: 0,
        deaths: 0,
        active: 0
      },
      historicalData: {},
      countries: []
    };

    expect(
      reducer(initialState, {
        type: 'covid/fetchCurrentCovidData/pending'
      })
    ).toEqual(
      {
        ...initialState,
        isLoading: true
      }
    );

    expect(
      reducer(initialState, {
        type: 'covid/fetchCurrentCovidData/fulfilled',
        payload: {
          cases: 1000,
          recovered: 800,
          deaths: 50,
          active: 150
        }
      })
    ).toEqual(
      {
        ...initialState,
        isLoading: false,
        currentData: {
          total: 1000,
          recovered: 800,
          deaths: 50,
          active: 150
        }
      }
    );
  });

  it('should handle fetchHistoricalCovidData', () => {
    const initialState = {
      isLoading: false,
      currentData: {
        total: 0,
        recovered: 0,
        deaths: 0,
        active: 0
      },
      historicalData: {},
      countries: []
    };

    expect(
      reducer(initialState, {
        type: 'covid/fetchHistoricalCovidData/fulfilled',
        payload: {
          cases: {
            '1/22/20': 1000
          },
          deaths: {
            '1/22/20': 50
          },
          recovered: {
            '1/22/20': 800
          }
        }
      })
    ).toEqual(
      {
        ...initialState,
        historicalData: {
          cases: {
            '1/22/20': 1000
          },
          deaths: {
            '1/22/20': 50
          },
          recovered: {
            '1/22/20': 800
          }
        }
      }
    );
  });

  it('should handle fetchCountriesData', () => {
    const initialState = {
      isLoading: false,
      currentData: {
        total: 0,
        recovered: 0,
        deaths: 0,
        active: 0
      },
      historicalData: {},
      countries: []
    };

    expect(
      reducer(initialState, {
        type: 'covid/fetchCountriesData/fulfilled',
        payload: [
          {
            "country": "Afghanistan",
            "countryInfo": {
              "iso2": "AF",
              "lat": 33,
              "long": 65,
              "flag": "https://disease.sh/assets/img/flags/af.png"
            },
            "cases": 51594,
            "deaths": 2133,
            "recovered": 40569,
            "active": 8892
          },
          {
            "country": "Albania",
            "countryInfo": {
              "iso2": "AL",
              "lat": 41,
              "long": 20,
              "flag": "https://disease.sh/assets/img/flags/al.png"
            },
            "cases": 54317,
            "deaths": 1117,
            "recovered": 29799,
            "active": 23401
          }
        ]
      })
    ).toEqual(
      {
        ...initialState,
        countries: [
          {
            "country": "Afghanistan",
            "countryInfo": {
              "iso2": "AF",
              "lat": 33,
              "long": 65,
              "flag": "https://disease.sh/assets/img/flags/af.png"
            },
            "cases": 51594,
            "deaths": 2133,
            "recovered": 40569,
            "active": 8892
          },
          {
            "country": "Albania",
            "countryInfo": {
              "iso2": "AL",
              "lat": 41,
              "long": 20,
              "flag": "https://disease.sh/assets/img/flags/al.png"
            },
            "cases": 54317,
            "deaths": 1117,
            "recovered": 29799,
            "active": 23401
          }
        ]
      }
    );
  });
});