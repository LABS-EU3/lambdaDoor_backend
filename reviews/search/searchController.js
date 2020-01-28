const Search = require('./searchModel');

const getCompanyResults = async (req, res) => {
  try {
    const searchTerms = req.body;
    const searchResults = await Search.companySearch(searchTerms);
    return res.status(200).json(searchResults);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getInterviewResults = async (req, res) => {
  try {
    const searchTerms = req.body;
    const searchResults = await Search.interviewSearch(searchTerms);
    return res.status(200).json(searchResults);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCompanyResults,
  getInterviewResults,
};