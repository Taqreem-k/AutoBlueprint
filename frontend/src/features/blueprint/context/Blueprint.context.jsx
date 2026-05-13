import { createContext, useState } from 'react';

export const BlueprintContext = createContext();

export const BlueprintProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [blueprints, setBlueprints] = useState([]);
    const [currentBlueprint, setCurrentBlueprint] = useState(null);

    return (
        <BlueprintContext.Provider value={{
            loading, setLoading,
            blueprints, setBlueprints,
            currentBlueprint, setCurrentBlueprint
        }}>
            {children}
        </BlueprintContext.Provider>
    );
};