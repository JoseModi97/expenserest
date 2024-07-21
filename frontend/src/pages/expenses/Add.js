import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const ExpensesAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		user_id: yup.string().nullable().label($t('userId')),
		category_id: yup.string().nullable().label($t('categoryId')),
		amount: yup.number().required().label($t('amount')),
		date: yup.string().required().label($t('date')),
		description: yup.string().nullable().label($t('description')),
		createdat: yup.string().required().label($t('createdat')),
		updatedat: yup.string().required().label($t('updatedat'))
	});
	
	//form default values
	const formDefaultValues = {
		user_id: '', 
		category_id: '', 
		amount: '', 
		date: '', 
		description: '', 
		createdat: '', 
		updatedat: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/expenses`);
		}
	}
	
	// page loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	
	//page has loaded any required data and ready to render
	if(pageReady){
		return (
<main id="ExpensesAddPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label={$t('')}  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title={$t('addNewExpens')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="md:col-9 sm:col-12 comp-grid" >
                    <div >
                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                            {(formik) => 
                            <>
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('userId')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/user_id_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="user_id"     optionLabel="label" optionValue="value" value={formik.values.user_id} onChange={formik.handleChange} options={response} label={$t('userId')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.user_id)}   />
                                                    <ErrorMessage name="user_id" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('categoryId')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/category_id_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="category_id"     optionLabel="label" optionValue="value" value={formik.values.category_id} onChange={formik.handleChange} options={response} label={$t('categoryId')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.category_id)}   />
                                                    <ErrorMessage name="category_id" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('amount')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="amount"  onChange={formik.handleChange}  value={formik.values.amount}   label={$t('amount')} type="number" placeholder={$t('enterAmount')}  min={0}  step={0.1}    className={inputClassName(formik?.errors?.amount)} />
                                                <ErrorMessage name="amount" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('date')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="date"  className={inputClassName(formik?.errors?.date)}   value={formik.values.date} placeholder={$t('enterDate')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="date" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('description')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="description"  className={inputClassName(formik?.errors?.description)}   value={formik.values.description} placeholder={$t('enterDescription')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="description" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('createdat')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="createdat"  className={inputClassName(formik?.errors?.createdat)}   value={formik.values.createdat} placeholder={$t('enterCreatedat')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="createdat" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('updatedat')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="updatedat"  className={inputClassName(formik?.errors?.updatedat)}   value={formik.values.updatedat} placeholder={$t('enterUpdatedat')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="updatedat" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label={$t('submit')} icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            </>
                            }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
		);
	}
}

//page props and default values
ExpensesAddPage.defaultProps = {
	primaryKey: 'expense_id',
	pageName: 'expenses',
	apiPath: 'expenses/add',
	routeName: 'expensesadd',
	submitButtonLabel: $t('submit'),
	formValidationError: $t('formIsInvalid'),
	formValidationMsg: $t('pleaseCompleteTheForm'),
	msgTitle: $t('createRecord'),
	msgAfterSave: $t('recordAddedSuccessfully'),
	msgBeforeSave: $t(''),
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default ExpensesAddPage;
