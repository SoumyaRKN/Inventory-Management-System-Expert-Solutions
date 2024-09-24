"use server"

import { getCurrentUser } from '.';
import { dbConnect, dbCloseConnection } from '@/models';
import Inventory from '@/models/Inventory';

export const addItemToInventory = async (data) => {
    try {
        const user = await getCurrentUser();
        if (!user.status) return user;

        const db = await dbConnect();

        const itemToCreate = new Inventory({
            name: data.name,
            vendor: data.vendor,
            price: data.price,
            quantity: data.quantity,
            createdBy: user.value._id
        });

        const item = await itemToCreate.save();
        console.log(item);

        return { status: true, message: "Added successfully!" };
    } catch (error) {
        console.log(error);
        return { status: false, error: error.message };
    } finally {
        // await dbCloseConnection();
    }
};

export const updateItemInInventory = async (id, data) => {
    try {
        const db = await dbConnect();

        const updatedData = {
            name: data.name,
            vendor: data.vendor,
            price: data.price,
            quantity: data.quantity,
        };

        const updatedItem = await Inventory.updateOne({ _id: id }, updatedData, { new: true });
        console.log(updatedItem);

        if (!updatedItem) return { status: false, error: "Inventory item not available!" };

        return { status: true, message: "Updated successfully!" };
    } catch (error) {
        console.log(error);
        return { status: false, error: error.message };
    } finally {
        // await dbCloseConnection();
    }
};

export const deleteItemFromInventory = async (id) => {
    try {
        const db = await dbConnect();

        const deletedItem = await Inventory.findByIdAndDelete(id);
        console.log(deletedItem);

        if (!deletedItem) return { status: false, error: "Inventory item not available!" };

        return { status: true, message: "Deleted successfully!" };
    } catch (error) {
        console.log(error);
        return { status: false, error: error.message };
    } finally {
        // await dbCloseConnection();
    }
};