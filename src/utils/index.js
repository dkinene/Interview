import axios from '../services/http'

const fetchData = (query, variables = null) => {
  return axios({
    method: 'POST',
    data: {
      query,
      variables,
    }
  });
};

export { fetchData };