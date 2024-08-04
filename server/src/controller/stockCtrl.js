const Stock = require('../models/stockModel');

const createStock = async (req, res) => {
    const { productName, quantity, type, date } = req.body;

    try {
        const newStock = new Stock({ productName, type, quantity, date });
        await newStock.save();
        res.status(201).json({ message: 'Stock Added.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json(stocks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getStockById = async (req, res) => {
    const { id } = req.params;

    try {
        const stock = await Stock.findById(id);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateStock = async (req, res) => {
    const { id } = req.params;
    const { productName, quantity, date } = req.body;

    try {
        const stock = await Stock.findByIdAndUpdate(
            id,
            { productName, quantity, date },
            { new: true, runValidators: true }
        );
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteStock = async (req, res) => {
    const { id } = req.params;

    try {
        const stock = await Stock.findByIdAndDelete(id);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.status(200).json({ message: 'Stock deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createStock, getStocks, getStockById, updateStock, deleteStock };
