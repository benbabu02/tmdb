import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    tmdbId: { type: Number, required: true },
    title: { type: String, required: true },
    posterPath: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

schema.index({ userId: 1, tmdbId: 1 }, { unique: true });

export default mongoose.model("Favorite", schema);
