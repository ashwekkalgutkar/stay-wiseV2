import Property from '../models/Property.js';
export const listProperties = async (req, res) => {
    try {
        const { city, search, page = 1, limit = 10 } = req.query;
        const query = {};
        if (city)
            query.city = city;
        if (search)
            query.title = { $regex: search, $options: 'i' };
        const properties = await Property.find(query)
            .skip((+page - 1) * +limit)
            .limit(+limit)
            .sort({ createdAt: -1 });
        res.json(properties);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch properties', error: err });
    }
};
export const getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property)
            return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch property', error: err });
    }
};
export const createProperty = async (req, res) => {
    try {
        const { title, description, city, address, price, images } = req.body;
        const property = await Property.create({
            title,
            description,
            city,
            address,
            price,
            images,
            owner: req.user._id,
        });
        res.status(201).json(property);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create property', error: err });
    }
};
//# sourceMappingURL=propertyController.js.map