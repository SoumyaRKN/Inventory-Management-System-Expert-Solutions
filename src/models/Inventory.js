import { Schema, models, model } from 'mongoose';

const InventorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

export default models.inventory || model('inventory', InventorySchema);