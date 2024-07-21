import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const UsersAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		username: yup.string().required().label($t('username')),
		email: yup.string().required().label($t('email')),
		password: yup.string().required().label($t('password')),
		createdat: yup.string().required().label($t('createdat')),
		updatedat: yup.string().required().label($t('updatedat'))
	});
	
	//form default values
	const formDefaultValues = {
		username: '', 
		email: '', 
		password: '', 
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
			app.navigate(`/users`);
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
<main id="UsersAddPage" className="main-page">
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
                    <Title title={$t('addNewUser')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('username')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="username"  className={inputClassName(formik?.errors?.username)}   value={formik.values.username} placeholder={$t('enterUsername')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="username" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('email')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="email"  className={inputClassName(formik?.errors?.email)}   value={formik.values.email} placeholder={$t('enterEmail')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="email" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('password')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="password"  className={inputClassName(formik?.errors?.password)}   value={formik.values.password} placeholder={$t('enterPassword')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="password" component="span" className="p-error" />
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
UsersAddPage.defaultProps = {
	primaryKey: 'user_id',
	pageName: 'users',
	apiPath: 'users/add',
	routeName: 'usersadd',
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
export default UsersAddPage;
