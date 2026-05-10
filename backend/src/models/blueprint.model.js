const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    technology: { type: String, required: true },
    installCommand: { type: String, required: true },
    importStatement: { type: String, required: true }
}, { _id: false });

const techStackSchema = new mongoose.Schema({
    frontend: [{ type: String }],
    backend: [{ type: String }],
    database: [{ type: String }],
    infrastructure: [{ type: String }]
}, { _id: false });

const blueprintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transcript: {
        type: String,
        required: true 
    },
    systemOverview: {
        type: String,
        required: true
    },
    techStack: {
        type: techStackSchema,
        required: true
    },
    requiredImports: [packageSchema]
}, { timestamps: true });

const BlueprintModel = mongoose.model('Blueprint', blueprintSchema);

module.exports = BlueprintModel;