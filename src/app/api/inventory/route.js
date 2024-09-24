import { dbCloseConnection, dbConnect } from "@/models";
import Inventory from "@/models/Inventory";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;

    try {
        const query = searchParams.get('query');
        const limit = parseInt(searchParams.get('limit')) || 10;
        const offset = parseInt(searchParams.get('offset')) || 0;

        const db = await dbConnect();

        const conditions = query ? {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { vendor: { $regex: query, $options: 'i' } },
                { price: { $regex: query, $options: 'i' } },
                { quantity: { $regex: query, $options: 'i' } },
            ]
        } : {};

        const pipeline = [
            { $match: conditions },
            { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'createdBy' } },
            { $unwind: '$createdBy' },
            { $project: { 'password': 0, 'createdBy.password': 0 } },
            { $sort: { updatedAt: -1 } },
            {
                $facet: {
                    paginatedResults: [{ $skip: offset }, { $limit: limit }],
                    totalCount: [{ $count: 'count' }]
                }
            }
        ];

        const results = await Inventory.aggregate(pipeline);

        const count = results[0].totalCount[0] ? results[0].totalCount[0].count : 0;
        const inventoryItems = results[0].paginatedResults;

        return Response.json({ status: true, count, inventoryItems });
    } catch (error) {
        console.log(error);
        return Response.json({ status: false, error: error.message });
    } finally {
        // await dbCloseConnection();
    }
};