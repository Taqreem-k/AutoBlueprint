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
            user: req.user.id, // Comes from the auth middleware
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

module.exports = {
    generateBlueprintController
};