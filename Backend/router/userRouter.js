import express, { Router } from "express";
import { addNewAdmin, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controllers/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/docters", getAllDoctors);
router.get("/admin/me" , isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated , getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);


export default router;