
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Categories extends BaseModel {
	static init() {
		return super.init(
			{
				
				category_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				category_name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				createdat: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				updatedat: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "categories",
				modelName: "categories",
			}
		);
	}
	
	static listFields() {
		return [
			'category_id', 
			'user_id', 
			'category_name', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	static viewFields() {
		return [
			'category_id', 
			'user_id', 
			'category_name', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	static editFields() {
		return [
			'category_id', 
			'user_id', 
			'category_name', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("category_id LIKE :search"), 
			Sequelize.literal("category_name LIKE :search"), 
			Sequelize.literal("createdAt LIKE :search"), 
			Sequelize.literal("updatedAt LIKE :search"),
		];
	}

	
	
}
Categories.init();
export default Categories;
