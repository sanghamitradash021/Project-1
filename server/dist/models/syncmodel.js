"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const syncTables = async () => {
    try {
        await user_1.default.sync();
        console.log("User table synced successfully");
    }
    catch (error) {
        console.error("Error in syncing tables:", error);
    }
};
exports.default = syncTables;
