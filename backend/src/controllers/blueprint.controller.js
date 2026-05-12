const BlueprintModel = require('../models/blueprint.model');
const { generateArchitectureBlueprint } = require('../services/ai.service');

const generateBlueprintController = async (req, res) => {
    try {
        const { transcript } = req.body;

        if (!transcript) {
            return res.status(400).json({ message: "Audio transcript is required." });
        }

        const aiBlueprint = await generateArchitectureBlueprint(transcript);

        const savedBlueprint = await BlueprintModel.create({
            user: req.user.id, 
            transcript: transcript,
            systemOverview: aiBlueprint.systemOverview,
            techStack: aiBlueprint.techStack,
            requiredImports: aiBlueprint.requiredImports
        });

        res.status(201).json({
            message: "Architecture Blueprint generated successfully",
            blueprint: savedBlueprint
        });

    } catch (error) {
        console.error("Error generating blueprint:", error);
        res.status(500).json({ message: "Internal server error during generation" });
    }
};

const getBlueprintByIdController = async (req, res) => {
    try {
        const blueprint = await BlueprintModel.findById(req.params.id);
        if (!blueprint) {
            return res.status(404).json({ message: "Blueprint not found" });
        }
        res.status(200).json({ blueprint });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blueprint" });
    }
};

const getAllBlueprintsController = async (req, res) => {
    try {
        const blueprints = await BlueprintModel.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ blueprints });
    } catch (error) {
        res.status(500).json({ message: "Error fetching blueprints history" });
    }
};

module.exports = {
    generateBlueprintController,
    getBlueprintByIdController,
    getAllBlueprintsController
};