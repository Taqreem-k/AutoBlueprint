const express = require('express');
const { 
    generateBlueprintController, 
    getBlueprintByIdController, 
    getAllBlueprintsController 
} = require('../controllers/blueprint.controller');

const { authUser } = require('../middlewares/auth.middleware');

const blueprintRouter = express.Router();

blueprintRouter.post('/', authUser, generateBlueprintController);
blueprintRouter.get('/', authUser, getAllBlueprintsController);
blueprintRouter.get('/:id', authUser, getBlueprintByIdController);

module.exports = blueprintRouter;