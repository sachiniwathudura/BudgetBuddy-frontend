import React from "react";
import {
    FaMoneyBillWave,
    FaSignInAlt,
    FaList,
    FaChartPie,
    FaQuoteLeft,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
    return (
        <>
            <div className="bg-gradient-to-r from-white via-purple-400 to-purple-900 text-white py-20 px-4 w-full">

                <div className="w-full flex flex-col items-center">
                    {/* Heading */}
                    <h1 className="text-5xl font-bold text-center text-black">
                        Smart Spending Starts Here
                    </h1>

                    {/* Subheading */}
                    <p className="mt-4 text-xl text-center">
                        Streamline Your Finances with a Smart and Simple Solution.
                    </p>

                    {/* Feature Icons */}
                    <div className="flex space-x-8 mt-10 text-purple-900 font-weight-600">
                        <div className="flex flex-col items-center">
                            <FaMoneyBillWave className="text-3xl"/>
                            <p className="mt-2">Smart Expense Tracking</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaFilter className="text-3xl"/>
                            <p className="mt-2">Advanced Filtering</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <IoIosStats className="text-3xl"/>
                            <p className="mt-2">Financial Insights</p>
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <Link to="/register">
                        <button
                            className="mt-8 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition duration-300 bg-black border-3 border-[#0c0b0b] hover:bg-white hover:text-purple-900 "
                        >
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>

            {/* How it works */}
            <div className="py-20 px-4 w-full bg-black">
                <h2 className="text-3xl font-bold text-center text-white">
                    How It Works
                </h2>
                <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center text-white">
                        <div className="p-4 rounded-full bg-purple-700 text-white mb-4">
                            <FaSignInAlt className="text-xl"/>
                        </div>
                        <h3 className="mb-2 font-semibold text-purple-300">Sign Up</h3>
                        <p>Register and start managing your expenses in a minute.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full bg-purple-800 text-white mb-4">
                            <FaList className="text-xl"/>
                        </div>
                        <h3 className="mb-2 font-semibold text-purple-300">Add Transactions</h3>
                        <p>Quickly add income and expenses to your account.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full bg-purple-600 text-white mb-4">
                            <FaChartPie className="text-xl"/>
                        </div>
                        <h3 className="mb-2 font-semibold text-purple-300">View Reports</h3>
                        <p>See insightful reports & graphs of your finances.</p>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg- py-20 px-4 w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    What Our Users Say
                </h2>
                <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg shadow-purple-300">
                        <FaQuoteLeft className="text-xl text-purple-800"/>
                        <p className="mt-4 text-purple-800 text-[20px]">
                            "This app has revolutionized the way I track my expenses. Highly
                            intuitive and user-friendly."
                        </p>
                        <p className="mt-4 font-bold text-purple-800">- Jane Doe</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg shadow-purple-300">
                        <FaQuoteLeft className="text-xl text-purple-800"/>
                        <p className="mt-4 text-purple-900 text-[20px]">
                            "Finally, a hassle-free way to manage my finances. The insights
                            feature is a game changer!"
                        </p>
                        <p className="mt-4 font-bold text-purple-800">- John Smith</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-purple-800 text-white py-20 px-4 w-full">
                <div className="w-full text-center">
                    <h2 className="text-3xl text-black font-bold">
                        Ready to Take Control of Your Finances?
                    </h2>
                    <p className="mt-4">
                        Join us now and start managing your expenses like a pro!
                    </p>
                    <Link to="/register">
                        <button
                            className="mt-8 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-100 hover:text-purple-800 transition duration-300">
                            Sign Up For Free
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HeroSection;