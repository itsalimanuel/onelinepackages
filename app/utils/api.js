import axios from 'axios';

export const searchPackages = async (query) => {
    const url = `https://api.npms.io/v2/search/suggestions?q=${query}`;
    const response = await axios.get(url);
    return response.data.map((pkg) => ({ name: pkg.package.name }));
};