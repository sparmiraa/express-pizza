import { User, Role } from "../models/index.js";
import Roles from "../constants/roles.js";
import { normalizeEmail } from "../utils/normalizeEmail.js";
import { env } from "../config/env.config.js";
import { hashPassword } from "../crypto/index.js"

export const initAdmin = async () => {
  const adminEmail = normalizeEmail(env.ADMIN_EMAIL);

  const existingAdmin = await User.findOne({
    where: { email: adminEmail },
    include: Role,
  });

  if (existingAdmin) {
    return;
  }

  const adminPassword = await hashPassword(env.ADMIN_PASSWORD)

  const admin = await User.create({
    firstName: "Admin",
    lastName: "Admin",
    email: adminEmail,
    password: adminPassword,
  })

  const userRole = await Role.findOne({
    where: { name: Roles.USER }
  })
  const adminRole = await Role.findOne({
    where: { name: Roles.ADMIN }
  })

  await admin.addRoles([userRole, adminRole])
}
