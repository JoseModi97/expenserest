import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import CategoriesViewPage from 'pages/categories/View';
import ExpensesEditPage from 'pages/expenses/Edit';
import useApp from 'hooks/useApp';
import UsersViewPage from 'pages/users/View';

import useViewPage from 'hooks/useViewPage';
const ExpensesViewPage = (props) => {
		const app = useApp();
	const pageController = useViewPage(props);
	const { item, pageReady, loading, apiRequestError, deleteItem } = pageController;
	function ActionButton(data){
		const items = [
		{
			label: $t('edit'),
			command: (event) => { app.openPageDialog(<ExpensesEditPage isSubPage apiPath={`/expenses/edit/${data.expense_id}`} />, {closeBtn: true }) },
			icon: "pi pi-pencil"
		},
		{
			label: $t('delete'),
			command: (event) => { deleteItem(data.expense_id) },
			icon: "pi pi-trash"
		}
	]
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
	<div className="flex justify-content-start">
	{ActionButton(item)}
	</div>
				</div>
			);
		}
	}
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if(pageReady){
		return (
			<div>
<main id="ExpensesViewPage" className="main-page">
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
                    <Title title={$t('expensDetails')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                        {/*PageComponentStart*/}
                        <div className="mb-3 grid ">
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('expenseId')}</div>
                                        <div className="font-bold">{ item.expense_id }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('userId')}</div>
                                        <div className="font-bold">{item.user_id && <Button className="p-button-text" icon="pi pi-eye" label={$t('usersDetail')} onClick={() => app.openPageDialog(<UsersViewPage isSubPage apiPath={`/users/view/${item.user_id}`} />, {closeBtn: true })} /> }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('categoryId')}</div>
                                        <div className="font-bold">{item.category_id && <Button className="p-button-text" icon="pi pi-eye" label={$t('categoriesDetail')} onClick={() => app.openPageDialog(<CategoriesViewPage isSubPage apiPath={`/categories/view/${item.category_id}`} />, {closeBtn: true })} /> }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('amount')}</div>
                                        <div className="font-bold">{ item.amount }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('date')}</div>
                                        <div className="font-bold">{ item.date }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('description')}</div>
                                        <div className="font-bold">{ item.description }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('createdat')}</div>
                                        <div className="font-bold">{ item.createdat }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('updatedat')}</div>
                                        <div className="font-bold">{ item.updatedat }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*PageComponentEnd*/}
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
				<PageFooter />
			</div>
		);
	}
}
ExpensesViewPage.defaultProps = {
	id: null,
	primaryKey: 'expense_id',
	pageName: 'expenses',
	apiPath: 'expenses/view',
	routeName: 'expensesview',
	msgBeforeDelete: $t('promptDeleteRecord'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('recordDeletedSuccessfully'),
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default ExpensesViewPage;
