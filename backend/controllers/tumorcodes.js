const TumorCode = require("../models/tumor_code");
const axios = require('axios')

exports.getTumorCodes = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const keyword = req.query?.keyword ?? "";

  let dataQuery;
  if (keyword) {
    dataQuery = TumorCode.find({ 'case_id': new RegExp(keyword, 'i') });
  } else {
    dataQuery = TumorCode.find();
  }

  let fetchedTumorCodes;
  if (pageSize && currentPage) {
    dataQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  dataQuery
    .then(documents => {
      fetchedTumorCodes = documents;
      return TumorCode.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Tumor codes fetched successfully!",
        data: fetchedTumorCodes,
        maxRecordsCount: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching data failed!"
      });
    });
};

exports.getTumorCode = (req, res, next) => {
  TumorCode.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "TumorCode not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};

exports.deleteTumorCode = (req, res, next) => {
  TumorCode.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};

exports.populateData = async (req, res, next) => {
  try {
    const url = 'https://clinicalapi-cptac.esacinc.com/api/tcia/clinical_data/tumor_code/CCRCC';
    const results = await axios.get(url);
    const items = results.data;
    const itemCount = items.length;

    for (var i = 0; i < itemCount; i++) {
      const item = items[i];
      const tumorCode = new TumorCode({
        ...item
      });
      tumorCode.save();
    }

    res.status(200).json({ message: "Data Saved Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save!" });
  }
};
