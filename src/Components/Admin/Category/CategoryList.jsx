
import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import axios from "../../../Config/axios";
import { Switch } from "@mui/material";
import EditCategory from "./EditCategory";

const CategoryList = () => {
    const [openEditModal, setEditModalOpen] = useState(false)
    const [categoryDetails, setCategoryDetails] = useState("")
    const toggleModal = (category) => {
        setCategoryDetails(category);
        setEditModalOpen(true)
    }
    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: " ",
                columns: [
                    {
                        Header: "Id",
                        accessor: "id",
                    },
                    {
                        Header: "Category",
                        accessor: "name",
                    },
                    {
                        Header: "Actions",
                        accessor: "status",
                        Cell: ({ value, row }) => {
                            const [isChecked, setIsChecked] = useState(
                                value
                            );
                            const handleUserStatus = async (e) => {
                                setIsChecked(!isChecked);

                                const response = await axios.put(
                                    `/api/admin/category/change-status?categoryId=${ row.original._id }`
                                );
                                alert(response.data.message);
                            };
                            return (
                                <div style={ { display: "flex", flexDirection: "row", justifyContent: "center" } }>
                                    <Switch
                                        color="primary"
                                        checked={ isChecked }
                                        onChange={ handleUserStatus }
                                    />
                                    <button type="button" class="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 text-center mr-2 mb-2 dark:focus:ring-blue-900" onClick={ () => toggleModal(row.original) }>Edit</button>
                                </div>
                            );
                        },
                    },
                ],
            },
        ],
        []
    );

    const [data, setData] = useState([])
    const fetchCategories = async () => {
        let count = 1
        const result = await axios.get("/api/admin/categories");
        const list = result.data.categories.map((category) => ({
            ...category,
            id: count++
        }))
        setData(list)
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    return (
        <>
            <div className="App">
                <Table
                    columns={ columns }
                    data={ data }
                />
            </div>
            {
                openEditModal && (
                    <EditCategory setEditModalOpen={ setEditModalOpen } categoryName={ categoryDetails.name } categoryId={ categoryDetails._id } setData={ setData } categoryData={data} />
                )
            }
        </>
    );
};

export default CategoryList;
