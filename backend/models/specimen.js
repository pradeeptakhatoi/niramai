const mongoose = require("mongoose");

const specimenSchema = mongoose.Schema({
    specimen_id: { type: String, required: false },
    slide_id: { type: String, required: false },
    tissue_type: { type: String, required: false },
    percent_tumor_surface_area: { type: String, required: false },
    percent_tumor_nuclei: { type: String, required: false },
    percent_necrotic_surface_area: { type: String, required: false },
    weight_in_mg: { type: String, required: false },
});

module.exports = mongoose.model("specimen", specimenSchema);
