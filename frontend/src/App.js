import { Routes, Route } from 'react-router-dom';

import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import CategoriesList from 'pages/categories/List';
import CategoriesView from 'pages/categories/View';
import CategoriesAdd from 'pages/categories/Add';
import CategoriesEdit from 'pages/categories/Edit';
import ExpensesList from 'pages/expenses/List';
import ExpensesView from 'pages/expenses/View';
import ExpensesAdd from 'pages/expenses/Add';
import ExpensesEdit from 'pages/expenses/Edit';
import PaymentmethodsList from 'pages/paymentmethods/List';
import PaymentmethodsView from 'pages/paymentmethods/View';
import PaymentmethodsAdd from 'pages/paymentmethods/Add';
import PaymentmethodsEdit from 'pages/paymentmethods/Edit';
import UsersList from 'pages/users/List';
import UsersView from 'pages/users/View';
import UsersAdd from 'pages/users/Add';
import UsersEdit from 'pages/users/Edit';
import HomePage from './pages/home/HomePage';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/home" element={<HomePage />} />
				

				{/* categories pages routes */}
				<Route path="/categories" element={<CategoriesList />} />
				<Route path="/categories/:fieldName/:fieldValue" element={<CategoriesList />} />
				<Route path="/categories/index/:fieldName/:fieldValue" element={<CategoriesList />} />
				<Route path="/categories/view/:pageid" element={<CategoriesView />} />
				<Route path="/categories/add" element={<CategoriesAdd />} />
				<Route path="/categories/edit/:pageid" element={<CategoriesEdit />} />

				{/* expenses pages routes */}
				<Route path="/expenses" element={<ExpensesList />} />
				<Route path="/expenses/:fieldName/:fieldValue" element={<ExpensesList />} />
				<Route path="/expenses/index/:fieldName/:fieldValue" element={<ExpensesList />} />
				<Route path="/expenses/view/:pageid" element={<ExpensesView />} />
				<Route path="/expenses/add" element={<ExpensesAdd />} />
				<Route path="/expenses/edit/:pageid" element={<ExpensesEdit />} />

				{/* paymentmethods pages routes */}
				<Route path="/paymentmethods" element={<PaymentmethodsList />} />
				<Route path="/paymentmethods/:fieldName/:fieldValue" element={<PaymentmethodsList />} />
				<Route path="/paymentmethods/index/:fieldName/:fieldValue" element={<PaymentmethodsList />} />
				<Route path="/paymentmethods/view/:pageid" element={<PaymentmethodsView />} />
				<Route path="/paymentmethods/add" element={<PaymentmethodsAdd />} />
				<Route path="/paymentmethods/edit/:pageid" element={<PaymentmethodsEdit />} />

				{/* users pages routes */}
				<Route path="/users" element={<UsersList />} />
				<Route path="/users/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/index/:fieldName/:fieldValue" element={<UsersList />} />
				<Route path="/users/view/:pageid" element={<UsersView />} />
				<Route path="/users/add" element={<UsersAdd />} />
				<Route path="/users/edit/:pageid" element={<UsersEdit />} />
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
