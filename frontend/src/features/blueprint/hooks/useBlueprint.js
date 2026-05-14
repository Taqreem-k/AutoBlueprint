import { useContext } from 'react';
import { BlueprintContext } from '../context/BlueprintContext';
import { generateBlueprint, getBlueprintById, getAllBlueprints } from '../services/blueprint.api';

export const useBlueprint = () => {
    const context = useContext(BlueprintContext);
    if (!context) throw new Error("useBlueprint must be used within BlueprintProvider");

    const { loading, setLoading, blueprints, setBlueprints, setCurrentBlueprint } = context;

    const handleGenerate = async (transcript) => {
        setLoading(true);
        try {
            const data = await generateBlueprint(transcript);
            setCurrentBlueprint(data.blueprint);
            return data.blueprint;
        } catch (error) {
            console.error("Failed to generate", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleGetById = async (id) => {
        setLoading(true);
        try {
            const data = await getBlueprintById(id);
            setCurrentBlueprint(data.blueprint);
        } catch (error) {
            console.error("Failed to fetch blueprint", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetAll = async () => {
        try {
            const data = await getAllBlueprints();
            setBlueprints(data.blueprints); 
        } catch (error) {
            console.error("Failed to fetch history", error);
        }
    };

    return { ...context, handleGenerate, handleGetById, handleGetAll };
};