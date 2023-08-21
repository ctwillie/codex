import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { JSX } from "react";
import Tabs from "@/Components/Tabs";
import { Tag } from "@/types/codex";
import Table from "@/Components/Table";
import { Column } from "@/types/table";
import EditTagModal from "./Tags/EditTagModal";
import CreateTagModal from "./Tags/CreateTagModal";

type Tags = { tags: Tag[] };

export default function Tags({ auth }: PageProps): JSX.Element {
    const { tags } = usePage<PageProps<Tags>>().props;

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
            title: "Slug",
            render: "slug",
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
            render: (tag: Tag) => <EditTagModal tag={tag} />,
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tags" />

            <Tabs tabs={tabs} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card className="!p-12">
                        <Table
                            key="tags-table"
                            title="Tags"
                            description="A list of all tags"
                            data={tags}
                            columns={columns}
                            action={<CreateTagModal />}
                        />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
