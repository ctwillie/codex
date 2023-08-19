import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { JSX } from "react";
import Tabs from "@/Components/Tabs";

export default function Technologies({ auth }: PageProps): JSX.Element {
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Technologies" />

            <Tabs tabs={tabs} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <p className="text-gray-100">Technologies</p>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
