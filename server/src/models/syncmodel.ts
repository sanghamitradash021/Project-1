import User from "./user";


const syncTables = async () => {
    try {
        await User.sync()
        console.log("User table synced successfully")
    } catch (error) {
        console.error("Error in syncing tables:", error)
    }
}

export default syncTables