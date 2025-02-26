
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { SiAuthy } from "react-icons/si";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes: (string | boolean)[]): string {
    return classes.filter(Boolean).join(" ");
}

const PrivateNavbar: React.FC = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutAction());
        localStorage.removeItem("userInfo");
    };

    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex justify-start items-center">
                                <div className="-ml-2 mr-2 flex md:hidden">
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-shrink-0 items-center">
                                    <SiAuthy className="h-8 w-auto text-purple-500" />
                                </div>
                                <div className="hidden md:ml-6 md:flex md:space-x-8">
                                    <Link to="/" className="inline-flex items-center border-b-2 border-purple-600 px-1 pt-1 text-sm font-medium text-gray-900">
                                        BudgetBuddy
                                    </Link>
                                    {["dashboard", "add-category", "add-transaction", "categories", "profile"].map((route) => (
                                        <Link
                                            key={route}
                                            to={`/${route}`}
                                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        >
                                            {route.replace("-", " ")}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={logoutHandler}
                                    type="button"
                                    className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-purple-600"
                                >
                                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                                    <span>Logout</span>
                                </button>
                                <Menu as="div" className="relative ml-1">
                                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                        <span className="sr-only">Open user menu</span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/student-dashboard"
                                                        className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                                                    >
                                                        My Dashboard
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={logoutHandler}
                                                        className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Nav */}
                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            <Link to="/" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                                BudgetBuddy
                            </Link>
                            {["add-transaction", "add-category", "categories", "profile", "dashboard"].map((route) => (
                                <Link
                                    key={route}
                                    to={`/${route}`}
                                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    {route.replace("-", " ")}
                                </Link>
                            ))}
                        </div>
                        {/* Sign out button */}
                        <div className="border-t border-gray-200 pb-3 pt-4">
                            <div className="mt-3 space-y-1">
                                <Disclosure.Button
                                    as="button"
                                    onClick={logoutHandler}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                                >
                                    Sign out
                                </Disclosure.Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default PrivateNavbar;


