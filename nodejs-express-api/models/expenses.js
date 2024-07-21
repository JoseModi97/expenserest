
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Expenses extends BaseModel {
	static init() {
		return super.init(
			{
				
				expense_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				category_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				amount: { type:Sequelize.NUMBER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				date: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				description: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				createdat: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				updatedat: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "expenses",
				modelName: "expenses",
			}
		);
	}
	
	static listFields() {
		return [
			'expense_id', 
			'user_id', 
			'category_id', 
			'amount', 
			'date', 
			'description', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	static viewFields() {
		return [
			'expense_id', 
			'user_id', 
			'category_id', 
			'amount', 
			'date', 
			'description', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	static editFields() {
		return [
			'expense_id', 
			'user_id', 
			'category_id', 
			'amount', 
			'date', 
			'description', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("expense_id LIKE :search"), 
			Sequelize.literal("date LIKE :search"), 
			Sequelize.literal("description LIKE :search"), 
			Sequelize.literal("createdAt LIKE :search"), 
			Sequelize.literal("updatedAt LIKE :search"),
		];
	}

	
	
}
Expenses.init();
export default Expenses;
