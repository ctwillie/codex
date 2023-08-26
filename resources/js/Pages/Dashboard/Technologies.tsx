import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { JSX } from "react";
import Tabs from "@/Components/Tabs";
import { Technology } from "@/types/codex";
import Table from "@/Components/Table";
import EditTechnologyModal from "./Technologies/EditTechnologyModal";
import { SelectOption } from "@/types/select";
import CreateTechnologyModal from "./Technologies/CreateTechnologyModal";

type Technologies = {
    categorySelectOptions: SelectOption[];
    technologies: Technology[];
};

export default function Technologies({
    auth,
}: PageProps<Technologies>): JSX.Element {
    const { categorySelectOptions, technologies } =
        usePage<PageProps<Technologies>>().props;

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
            title: "Category",
            render: (technology: Technology) => technology.category.name,
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
            render: (technology: Technology) => (
                <EditTechnologyModal
                    categorySelectOptions={categorySelectOptions}
                    technology={technology}
                />
            ),
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Technologies" />

            <Tabs tabs={tabs} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <Table
                            key="technologies-table"
                            title="Technologies"
                            description="A list of all technologies"
                            data={technologies}
                            columns={columns}
                            action={
                                <CreateTechnologyModal
                                    categorySelectOptions={
                                        categorySelectOptions
                                    }
                                />
                            }
                        />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
