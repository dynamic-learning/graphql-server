import mongoose from "mongoose";

const Schema = mongoose.Schema;

const simSchema = new Schema ({
    _id: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    imageURL: {
        type: String
    }
});

export default mongoose.model("sim", simSchema);