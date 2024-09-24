import { isValidObjectId } from "mongoose";
import { dbCloseConnection, dbConnect } from "@/models";
import Inventory from "@/models/Inventory";

export async function GET(request, { params }) {
    try {
        const inventoryItemId = params.slug;

        const db = await dbConnect();

        if (!isValidObjectId(inventoryItemId)) return Response.json({ status: false, error: "Invalid inventory item!" });

        const inventoryItem = await Inventory.findById({ _id: inventoryItemId }).populate([{ path: 'createdBy', select: '-password' }]).lean().exec();

        if (!inventoryItem) return Response.json({ status: false, error: "Inventory item not available!" });

        return Response.json({ status: true, inventoryItem });
    } catch (error) {
        console.log(error);
        return Response.json({ status: false, error: error.message });
    } finally {
        // await dbCloseConnection();
    }
};