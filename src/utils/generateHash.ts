import crypto from "crypto";
export const generateHash = () => crypto.randomBytes(16).toString("hex");
