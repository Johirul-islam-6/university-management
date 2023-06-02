import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
    port: process.env.PORT,
    databaser_url: process.env.DATABASE_URL,
};