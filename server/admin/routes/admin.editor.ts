import { Router } from "express";
import { PrivateRoute } from "../../middlewares/privateRoute";
import { checkAbility } from "../../middlewares/checkAbility";
import * as adminEditorController from '../admin.editor.controller'
const AdminEditor = Router()

AdminEditor.post('/create-editor',PrivateRoute,checkAbility("create","User"),adminEditorController.AdminCreateEditor)
AdminEditor.put("/update-editor/:id",PrivateRoute,checkAbility("update","User"), adminEditorController.AdminUpdateEditor)
AdminEditor.delete('/delete-editor/:id',PrivateRoute,checkAbility("delete","User"),adminEditorController.AdminDeleteEditor)
export default AdminEditor


