import express from "express";
import { auth } from "../middleware/auth.js";

import userRouter from "./controllers/users.js";

// inventory controller //
import inventoryCategoryRouter from "./controllers/inventory/inventoryCategory.js";
import inventoryFileRouter from "./controllers/inventory/inventoryFile.js";
import inventoryItemRouter from "./controllers/inventory/inventoryItem.js";
import leadInventoryItemRouter from "./controllers/inventory/leadInventoryItem.js";
// inventory controller end//

// task controller//
import taskRouter from "./controllers/tasks/tasks.js";
import taskAssigneeRouter from "./controllers/tasks/taskAssignee.js";
import taskFileRouter from "./controllers/tasks/taskFile.js";
import taskNotificationSettingRouter from "./controllers/tasks/taskNotificationSetting.js";
import taskPriorityRouter from "./controllers/tasks/taskPriority.js";
import taskStatusRouter from "./controllers/tasks/taskStatus.js";
import taskWeightageRouter from "./controllers/tasks/taskWeightage.js";
// task controller end //

// leads controller //
import leadRouter from "./controllers/leads/lead.js";
import leadActivityRouter from "./controllers/leads/leadActivity.js";
import leadSourceRouter from "./controllers/leads/leadSource.js";
import leadStatusRouter from "./controllers/leads/leadStatus.js";
// leads controller end //

// roles and permissions controller //
import permissionRouter from "./controllers/rolesAndPermissions/permission.js";
import roleRouter from "./controllers/rolesAndPermissions/role.js";
import rolePermissionRouter from "./controllers/rolesAndPermissions/rolePermission.js";

// roles and permissions end //

// misc route
import branchRouter from "./controllers/branch.js";
import notificationLogRouter from "./controllers/notificationLog.js";
import organisationRouter from "./controllers/organisation.js";
import settingsRouter from "./controllers/settings.js";

const router = express.Router();

// misc routes
router.use("/users", auth, userRouter);
router.use("/branch", auth, branchRouter);
router.use("/notificationLog", auth, notificationLogRouter);
router.use("/organisation", auth, organisationRouter);
router.use("/settings", auth, settingsRouter);
//misc routes end

// inventory routes
router.use("/inventoryCategory", auth, inventoryCategoryRouter);
router.use("/inventoryFile", auth, inventoryFileRouter);
router.use("/inventoryItem", auth, inventoryItemRouter);
router.use("/leadInventoryItem", auth, leadInventoryItemRouter);
//inventory routes end

//task routes
router.use("/tasks", auth, taskRouter);
router.use("/taskAssignee", auth, taskAssigneeRouter);
router.use('/taskFile', auth, taskFileRouter);
router.use('/taskNotificationSetting', auth, taskNotificationSettingRouter)
router.use('/taskPriority', auth, taskPriorityRouter)
router.use('/taskStatus', auth, taskStatusRouter)
router.use('/taskWeightage', auth, taskWeightageRouter)
    //task routes end

// lead routes
router.use("/lead", auth, leadRouter);
router.use('/leadActivity', auth, leadActivityRouter)
router.use('/leadSource', auth, leadSourceRouter)
router.use('/leadStatus', auth, leadStatusRouter)
    // lead routes end

// roles and permissions routes

router.use("/permission", auth, permissionRouter);
router.use("/role", auth, roleRouter);
router.use("/rolePermission", auth, rolePermissionRouter);

// roles and permissions routes end

export default router;