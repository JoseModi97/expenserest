import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list users records
 * @GET /users/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		let search = req.query.search;
		if(search){
			let searchFields = DB.Users.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'user_id', 'desc');
		query.attributes = DB.Users.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Users.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Users record
 * @GET /users/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['user_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Users.viewFields();
		let record = await DB.Users.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Users record
 * @POST /users/add
 */
router.post('/add/', 
	[
		body('username').not().isEmpty(),
		body('email').not().isEmpty(),
		body('password').not().isEmpty(),
		body('createdat').not().isEmpty(),
		body('updatedat').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Users record
		let record = await DB.Users.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['user_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Users record for edit
 * @GET /users/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['user_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Users.editFields();
		let record = await DB.Users.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Users record
 * @POST /users/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('username').optional({nullable: true}).not().isEmpty(),
		body('email').optional({nullable: true}).not().isEmpty(),
		body('createdat').optional({nullable: true}).not().isEmpty(),
		body('updatedat').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['user_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Users.editFields();
		let record = await DB.Users.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Users.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Users record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /users/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['user_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Users.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Users.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
