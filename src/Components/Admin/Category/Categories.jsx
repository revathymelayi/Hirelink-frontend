import React, { useState } from 'react';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';

const Categories = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen(true);
    };
    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between mb-4 mt-20'>
                <h2 className='text-2xl font-bold'>Categories</h2>
                <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="block text-white py-2 px-4 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm mr-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    type="button"
                    onClick={ toggleModal }
                >
                    Add Category
                </button>
            </div>
            { modalOpen && (
                <AddCategory setModalOpen={setModalOpen} />
            ) }
            <CategoryList />
        </div>
    );
}

export default Categories;
