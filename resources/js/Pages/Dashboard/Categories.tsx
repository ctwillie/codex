import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { JSX } from "react";
import Tabs from "@/Components/Tabs";
import Table from "@/Components/Table";
import EditCategoryModal from "./Categories/EditCategoryModal";
import CreateCategoryModal from "./Categories/CreateCategoryModal";

const categories = [
    {
        id: 1,
        name: "Backend Development",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 2,
        name: "Frontend Development",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 3,
        name: "CLI Applications",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 4,
        name: "Cloud Computing",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 5,
        name: "Databases",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 6,
        name: "API Development",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 7,
        name: "Mobile Development",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 8,
        name: "Data Modeling",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 9,
        name: "Data Visualization",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
    {
        id: 10,
        name: "DevOps & CI/CD",
        description: "A utility library for make development super efficient",
        createdAt: "An hour ago",
        updatedAt: "Two days ago",
    },
];

export default function Categories({ auth }: PageProps): JSX.Element {
    const tabs: Array<any> = [
        {
            name: "Resources",
            href: route("dashboard"),
            current: route().current("dashboard"),
        },
        {
            name: "Categories",
            href: route("dashboard.categories"),
            current: route().current("dashboard.categories"),
        },
        {
            name: "Technologies",
            href: route("dashboard.technologies"),
            current: route().current("dashboard.technologies"),
        },
        {
            name: "Tags",
            href: route("dashboard.tags"),
            current: route().current("dashboard.tags"),
        },
    ];

    const columns = [
        {
            key: "id",
            title: "Name",
            render: "name",
        },
        {
            key: "id",
            title: "Description",
            render: "description",
        },
        {
            key: "id",
            title: "Created",
            render: "createdAt",
        },
        {
            key: "id",
            title: "Updated",
            render: "updatedAt",
        },
        {
            key: "id",
            render: (item: any) => <EditCategoryModal category={item} />,
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />

            <Tabs tabs={tabs} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <Card className="!p-12">
                        <Table
                            title="Categories"
                            data={categories}
                            columns={columns}
                            description="A list of all the categories including their
                        name, description, and when they were created and updated"
                            action={<CreateCategoryModal />}
                        />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
