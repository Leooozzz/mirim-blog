import { Router } from "express";
import { PrivateRoute } from "../../middlewares/privateRoute";
import { checkAbility } from "../../middlewares/checkAbility";
import * as adminEditorController from '../admin.editor.controller'
const AdminEditor = Router()

AdminEditor.post('/create-editor',PrivateRoute,checkAbility("create","User"),adminEditorController.AdminCreateEditor)
AdminEditor.delete('/delete-editor/:id',PrivateRoute,checkAbility("delete","User"),adminEditorController.AdminDeleteEditor)

export default AdminEditor


