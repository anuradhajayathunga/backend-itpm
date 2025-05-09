const collectorModel = require("../../models/collectorModel");


exports.searchCollectorEmails = async (req, res) => {
  try {
    const { workarea, location } = req.query;
    const query = {};
    
    if (workarea) query.workarea = workarea;
    if (location) query.location = location;
    
    if (Object.keys(query).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one search parameter (workarea or location)"
      });
    }
    
    const collectors = await collectorModel.find(query).select('email -_id');
    const emails = collectors.map(collector => collector.email);
    
    res.status(200).json({
      success: true,
      count: emails.length,
      data: emails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching collector emails",
      error: error.message
    });
  }
};