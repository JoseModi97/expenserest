
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Users extends BaseModel {
	static init() {
		return super.init(
			{
				
				user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				username: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				password: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				createdat: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				updatedat: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "users",
				modelName: "users",
			}
		);
	}
	
	static listFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	static viewFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	static editFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			Sequelize.literal('createdAt AS createdat'), 
			Sequelize.literal('updatedAt AS updatedat')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("user_id LIKE :search"), 
			Sequelize.literal("username LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("createdAt LIKE :search"), 
			Sequelize.literal("updatedAt LIKE :search"), 
			Sequelize.literal("password LIKE :search"),
		];
	}

	
	
}
Users.init();
export default Users;
