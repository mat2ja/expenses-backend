import Expense from './expense.model.js';

export const listExpenses = async (userId) => {
	try {
		return await Expense.find({ owner: userId });
	} catch (err) {
		throw new Error('Error fetching expenses');
	}
};

export const getExpense = async (_id, owner) => {
	try {
		return await Expense.findOne({ _id, owner });
	} catch (err) {
		throw new Error('Error fetching expense');
	}
};

export const createExpense = async (expenseData, owner) => {
	const expense = new Expense({ ...expenseData, owner });

	const err = expense.validateSync();
	if (err) {
		const errorMsgs = Object.values(err.errors).reduce(
			(acc, val) => [...acc, val],
			[]
		);
		throw new Error(errorMsgs.join(' '));
	}

	try {
		return await expense.save();
	} catch (err) {
		throw new Error('Error creating expense.');
	}
};

export const updateExpense = async (_id, expenseData, owner) => {
	try {
		return await Expense.findOneAndUpdate({ _id, owner }, expenseData, {
			new: true,
			runValidators: true,
		});
	} catch (err) {
		throw new Error(err.message);
	}
};

export const deleteExpense = async (_id, owner) => {
	try {
		return await Expense.findOneAndDelete({ _id, owner });
	} catch (err) {
		throw new Error('Error deleting expense');
	}
};
