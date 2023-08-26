import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { JSX } from "react";
import Tabs from "@/Components/Tabs";
import Table from "@/Components/Table";
import EditCategoryModal from "./Categories/EditCategoryModal";
import CreateCategoryModal from "./Categories/CreateCategoryModal";
import { Category } from "@/types/codex";
import { Column } from "@/types/table";

type Categories = { categories: Category[] };

export default function Categories({ auth }: PageProps): JSX.Element {
    const { categories } = usePage<PageProps<Categories>>().props;

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

    const columns: Column[] = [
        {
            key: "id",
            title: "Name",
            render: "name",
        },
        {
            key: "id",
            title: "Description",
            render: "description",
            format: "truncate",
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
            render: (category: Category) => (
                <EditCategoryModal category={category} />
            ),
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />

            <Tabs tabs={tabs} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <Table
                            key="categories-table"
                            title="Categories"
                            data={categories}
                            columns={columns}
                            description="A list of all categories"
                            action={<CreateCategoryModal />}
                        />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
