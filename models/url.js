const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true, // This ensures the field is required
      unique: true,   // Ensures no two documents have the same shortId
    },
    redirectURL: {
      type: String,
      required: true, // This is also required
    },
    visitHistory: [
      {
        timestamp: { 
          type: String, 
          default: () => new Date().toISOString() // Store as ISO string by default
        },
      },
    ],
    
    createdBy:{
      type:  mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the model based on the schema
const URLmodel = mongoose.model("URL", urlSchema);

module.exports = URLmodel;
